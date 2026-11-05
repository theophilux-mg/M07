import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dataService } from '../services/dataService';
import { X, CheckCircle, AlertCircle, Loader2, Smartphone, ShieldCheck } from 'lucide-react';

export const MpesaModal: React.FC = () => {
  const { mpesaModal, closeMpesaModal } = useApp();
  const [phone, setPhone] = useState(mpesaModal.phone || '+254729255154');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!mpesaModal.isOpen) return null;

  const handleSTKPush = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      setErrorMsg('Please enter a valid Kenyan Safaricom phone number.');
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);

    try {
      const res = await dataService.simulateMpesaPayment(
        mpesaModal.bookingRef,
        phone,
        mpesaModal.amount
      );

      if (res.success && res.receipt) {
        setSuccessReceipt(res.receipt);
      } else {
        setErrorMsg(res.message || 'Payment simulation failed.');
      }
    } catch {
      setErrorMsg('An unexpected error occurred during payment processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setSuccessReceipt(null);
    setErrorMsg(null);
    closeMpesaModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0F141D] border border-[#D4AF37]/30 rounded-2xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-[#D4AF37] to-emerald-600"></div>

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-bold rounded border border-emerald-800/60">
                LIPA NA M-PESA
              </span>
              <span className="text-xs text-neutral-400">Daraja STK Gateway</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">Safaricom Express Checkout</h3>
          </div>
          <button 
            onClick={handleClose}
            className="text-neutral-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {successReceipt ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Payment Confirmed!</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Your reservation is now fully secured with M07 Msanifu Zero Seven.
              </p>
            </div>

            <div className="bg-neutral-900/90 rounded-xl p-4 border border-neutral-800 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">M-Pesa Receipt:</span>
                <span className="font-mono font-bold text-emerald-400">{successReceipt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Booking Reference:</span>
                <span className="font-mono font-bold text-white">{mpesaModal.bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Amount Paid:</span>
                <span className="font-bold text-[#D4AF37]">KSh {mpesaModal.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Paybill / Till:</span>
                <span className="text-neutral-300">807007 (M07 Luxury Transport)</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Done & View Reservation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSTKPush} className="py-5 space-y-4">
            <div className="bg-neutral-900/70 p-3.5 rounded-xl border border-neutral-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Reservation Ref:</span>
                <span className="font-mono text-white font-semibold">{mpesaModal.bookingRef}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Payable Amount:</span>
                <span className="text-base font-extrabold text-[#D4AF37] font-mono">
                  KSh {mpesaModal.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Merchant Account:</span>
                <span className="text-neutral-300">M07 MSANIFU ZERO SEVEN</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center justify-between">
                <span>M-Pesa Registered Mobile Number:</span>
                <span className="text-[10px] text-neutral-400">e.g. 0729255154 or +254...</span>
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-[#D4AF37] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254 729 255 154"
                  className="w-full pl-10 pr-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1.5 leading-normal">
                An instant STK Prompt will appear on this phone screen. Enter your secret M-Pesa PIN to authorize payment securely.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-lg text-xs font-bold tracking-wide shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Safaricom Prompt...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay KSh {mpesaModal.amount.toLocaleString()} via M-Pesa</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-center text-neutral-400 flex items-center justify-center gap-1">
              <span>Encrypted via Safaricom Daraja API</span>
              <span>·</span>
              <span>256-bit SSL</span>
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
