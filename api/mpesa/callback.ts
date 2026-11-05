// Vercel Serverless Function to receive Safaricom Daraja STK Push Callback Webhook
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST callbacks accepted.' });
  }

  try {
    const callbackData = req.body;
    console.log('[SAFARICOM CALLBACK RECEIVED]:', JSON.stringify(callbackData, null, 2));

    const stkCallback = callbackData?.Body?.stkCallback;
    if (!stkCallback) {
      return res.status(400).json({ ResultCode: 1, ResultDesc: 'Invalid payload structure' });
    }

    const resultCode = stkCallback.ResultCode;
    const resultDesc = stkCallback.ResultDesc;
    const merchantRequestId = stkCallback.MerchantRequestID;
    const checkoutRequestId = stkCallback.CheckoutRequestID;

    if (resultCode === 0) {
      // Payment Successful
      const items = stkCallback.CallbackMetadata?.Item || [];
      const amountItem = items.find((i: any) => i.Name === 'Amount');
      const receiptItem = items.find((i: any) => i.Name === 'MpesaReceiptNumber');
      const phoneItem = items.find((i: any) => i.Name === 'PhoneNumber');
      const dateItem = items.find((i: any) => i.Name === 'TransactionDate');

      const amount = amountItem?.Value;
      const mpesaReceipt = receiptItem?.Value;
      const phoneNumber = phoneItem?.Value;
      const transactionDate = dateItem?.Value;

      console.log(`[PAYMENT VERIFIED]: Receipt ${mpesaReceipt}, Amount ${amount}, Phone ${phoneNumber}`);

      // If Supabase credentials are configured, persist to database:
      const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (supabaseUrl && supabaseServiceKey) {
        try {
          await fetch(`${supabaseUrl}/rest/v1/payments`, {
            method: 'POST',
            headers: {
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              mpesa_receipt_number: mpesaReceipt,
              phone_number: String(phoneNumber),
              amount: Number(amount),
              status: 'Success',
              created_at: new Date().toISOString()
            })
          });
        } catch (dbErr) {
          console.error('[DATABASE PERSIST ERROR]:', dbErr);
        }
      }

      // Return standard Safaricom acknowledgement
      return res.status(200).json({ ResultCode: 0, ResultDesc: 'Callback processed successfully' });
    } else {
      // Payment Cancelled or Failed (e.g. User cancelled on handset or insufficient funds)
      console.warn(`[PAYMENT FAILED / CANCELLED]: Code ${resultCode}: ${resultDesc}`);
      return res.status(200).json({ ResultCode: 0, ResultDesc: 'Acknowledgement received' });
    }
  } catch (error: any) {
    console.error('[CALLBACK HANDLER ERROR]:', error);
    return res.status(500).json({ ResultCode: 1, ResultDesc: error.message });
  }
}
