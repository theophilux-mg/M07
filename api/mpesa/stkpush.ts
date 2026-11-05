import type { Request, Response } from 'express';

// Vercel Serverless Function handler for Daraja STK Push
export default async function handler(req: any, res: any) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { phone, amount, bookingRef } = req.body;

    if (!phone || !amount || !bookingRef) {
      return res.status(400).json({ error: 'Missing phone, amount, or bookingRef in request body.' });
    }

    // Format phone number to 254XXXXXXXXX
    let formattedPhone = phone.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.slice(1);
    } else if (formattedPhone.startsWith('7') || formattedPhone.startsWith('1')) {
      formattedPhone = '254' + formattedPhone;
    }

    const env = process.env.MPESA_ENVIRONMENT || 'sandbox';
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const passkey = process.env.MPESA_PASSKEY;
    const shortCode = process.env.MPESA_SHORTCODE;

    // Check if real credentials are provided
    if (!consumerKey || !consumerSecret || !passkey || !shortCode) {
      // Return simulated live response if credentials not yet loaded in Vercel env
      const simulatedReceipt = 'S' + Math.random().toString(36).substring(2, 10).toUpperCase();
      return res.status(200).json({
        isLive: false,
        success: true,
        receipt: simulatedReceipt,
        message: 'Credentials not configured in Vercel. Simulated STK Prompt triggered for test.',
        notice: 'To connect real money: Add MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_PASSKEY, and MPESA_SHORTCODE in Vercel Settings > Environment Variables.'
      });
    }

    // 1. Get OAuth Access Token from Safaricom
    const authUrl = env === 'production'
      ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
      : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const authBuffer = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const authResponse = await fetch(authUrl, {
      headers: {
        Authorization: `Basic ${authBuffer}`
      }
    });

    const authData: any = await authResponse.json();
    if (!authData.access_token) {
      return res.status(500).json({ error: 'Failed to authenticate with Safaricom Daraja API.', details: authData });
    }

    const accessToken = authData.access_token;

    // 2. Generate Timestamp and Password
    // Format: YYYYMMDDHHmmss
    const date = new Date();
    const timestamp = date.getFullYear() +
      String(date.getMonth() + 1).padStart(2, '0') +
      String(date.getDate()).padStart(2, '0') +
      String(date.getHours()).padStart(2, '0') +
      String(date.getMinutes()).padStart(2, '0') +
      String(date.getSeconds()).padStart(2, '0');

    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    // Callback URL where Safaricom sends payment confirmation
    const callbackUrl = process.env.APP_URL 
      ? `${process.env.APP_URL}/api/mpesa/callback` 
      : 'https://m07carhire.com/api/mpesa/callback';

    // 3. Initiate STK Push (Process Request)
    const stkUrl = env === 'production'
      ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
      : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const stkResponse = await fetch(stkUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline', // Or 'CustomerBuyGoodsOnline' for Till
        Amount: Math.round(Number(amount)),
        PartyA: formattedPhone,
        PartyB: shortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: bookingRef,
        TransactionDesc: `Car Hire ${bookingRef}`
      })
    });

    const stkData: any = await stkResponse.json();

    if (stkData.ResponseCode === '0') {
      return res.status(200).json({
        isLive: true,
        success: true,
        checkoutRequestId: stkData.CheckoutRequestID,
        merchantRequestId: stkData.MerchantRequestID,
        message: 'STK push successfully sent to customer handset. Awaiting PIN entry.'
      });
    } else {
      return res.status(400).json({
        isLive: true,
        success: false,
        error: stkData.ResponseDescription || 'Safaricom declined STK request.',
        details: stkData
      });
    }

  } catch (err: any) {
    return res.status(500).json({
      error: 'Internal server error while executing STK Push.',
      message: err.message
    });
  }
}
