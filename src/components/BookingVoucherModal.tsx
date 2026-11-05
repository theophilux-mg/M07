import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Printer, Share2, CheckCircle2, ShieldCheck, Calendar, MapPin, Car, Phone } from 'lucide-react';

export const BookingVoucherModal: React.FC = () => {
  const { activeVoucher, closeVoucherModal, openMpesaModal } = useApp();

  if (!activeVoucher) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `*M07 MSANIFU ZERO SEVEN - RESERVATION VOUCHER*
Ref: ${activeVoucher.reference}
Vehicle: ${activeVoucher.vehicleName}
Customer: ${activeVoucher.customerName}
Pickup: ${activeVoucher.pickupLocation} on ${activeVoucher.pickupDate} at ${activeVoucher.pickupTime}
Return: ${activeVoucher.returnDate}
Total Cost: KSh ${activeVoucher.totalCostKsh.toLocaleString()}
Payment Status: ${activeVoucher.paymentStatus}
Booking Status: ${activeVoucher.status}

M07 Hotline: +254 729 255 154 | Mombasa, Kenya`;

    window.open(`https://wa.me/254729255154?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#0F141D] border border-[#D4AF37]/40 rounded-2xl w-full max-w-2xl my-8 p-6 sm:p-8 shadow-2xl relative text-neutral-100">
        
        {/* Actions bar (hidden in print) */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800 no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Official Reservation Voucher
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-750 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
              Print
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              WhatsApp Dispatch
            </button>
            <button
              onClick={closeVoucherModal}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Voucher Body (Target for printing) */}
        <div className="pt-6 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <img src="/images/m07_logo.svg" alt="M07" className="w-8 h-8 object-contain" />
                <span className="text-sm font-bold tracking-widest text-[#D4AF37]">MSANIFU ZERO SEVEN TOUR AND TRAVEL</span>
              </div>
              <p className="text-xs text-neutral-400">A Phone Call Away · Car Hire · Airport Transfers · Tourism Logistics</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">Mombasa, Kenya · Hotline: 0729 255154 (+254 729 255 154)</p>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">Booking Reference</span>
              <span className="text-xl font-black font-mono text-[#D4AF37] tracking-wider block">
                {activeVoucher.reference}
              </span>
              <div className="flex items-center sm:justify-end gap-2 mt-1">
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                  activeVoucher.status === 'Confirmed' 
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                    : activeVoucher.status === 'Pending'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-neutral-800 text-neutral-300'
                }`}>
                  {activeVoucher.status.toUpperCase()}
                </span>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                  activeVoucher.paymentStatus.startsWith('Paid') 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                    : 'bg-red-950 text-red-300 border border-red-800'
                }`}>
                  {activeVoucher.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Customer & Schedule Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80 space-y-2">
              <h5 className="font-semibold text-neutral-300 uppercase tracking-wider text-[11px]">Renter Information</h5>
              <div className="flex justify-between">
                <span className="text-neutral-400">Customer Name:</span>
                <span className="font-medium text-white">{activeVoucher.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Phone Number:</span>
                <span className="font-medium text-white">{activeVoucher.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Email Address:</span>
                <span className="font-medium text-white truncate max-w-[160px]">{activeVoucher.customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Passengers:</span>
                <span className="font-medium text-white">{activeVoucher.passengers} Guests</span>
              </div>
            </div>

            <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80 space-y-2">
              <h5 className="font-semibold text-neutral-300 uppercase tracking-wider text-[11px]">Rental Schedule & Route</h5>
              <div className="flex justify-between">
                <span className="text-neutral-400">Pickup Date/Time:</span>
                <span className="font-medium text-white">{activeVoucher.pickupDate} @ {activeVoucher.pickupTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Return Date:</span>
                <span className="font-medium text-white">{activeVoucher.returnDate} ({activeVoucher.rentalDays} Days)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Pickup Location:</span>
                <span className="font-medium text-white truncate max-w-[160px]">{activeVoucher.pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Destination:</span>
                <span className="font-medium text-white truncate max-w-[160px]">{activeVoucher.destination}</span>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-neutral-900/80 p-4 rounded-xl border border-[#D4AF37]/20 flex flex-col sm:flex-row items-center gap-4 text-xs">
            <div className="w-full sm:w-36 h-24 rounded-lg overflow-hidden bg-neutral-950 shrink-0">
              <img 
                src={activeVoucher.vehicleImage} 
                alt={activeVoucher.vehicleName} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1.5 flex-1 w-full">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#D4AF37] font-semibold">{activeVoucher.vehicleCategory}</span>
                <span className="text-[10px] text-neutral-400 font-mono">Assigned M07 Fleet Unit</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">{activeVoucher.vehicleName}</h4>
              <p className="text-neutral-400 text-[11px]">
                Service Mode: <strong className="text-white">{activeVoucher.serviceType}</strong>
                {activeVoucher.chauffeurIncluded ? ' · Professional Chauffeur Included' : ' · Self-Drive Agreement'}
              </p>
              {activeVoucher.adminNotes && (
                <p className="text-[11px] text-amber-300 bg-amber-950/40 p-1.5 rounded border border-amber-900/60">
                  Note: {activeVoucher.adminNotes}
                </p>
              )}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Vehicle Rental Rate ({activeVoucher.rentalDays} days @ KSh {activeVoucher.dailyRate.toLocaleString()}/day):</span>
              <span className="text-white font-mono">KSh {activeVoucher.subtotalKsh.toLocaleString()}</span>
            </div>
            {activeVoucher.chauffeurIncluded && (
              <div className="flex justify-between text-neutral-400">
                <span>Chauffeur & Driver Allowance ({activeVoucher.rentalDays} days):</span>
                <span className="text-white font-mono">KSh {activeVoucher.chauffeurCostKsh.toLocaleString()}</span>
              </div>
            )}
            <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-sm font-bold">
              <span className="text-white">Total Estimated Cost:</span>
              <span className="text-lg font-mono font-black text-[#D4AF37]">
                KSh {activeVoucher.totalCostKsh.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Bottom Notice & Unpaid Pay CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div className="text-[10px] text-neutral-500 leading-normal max-w-sm">
              * Renter agrees to M07 rental terms, comprehensive insurance guidelines, and Mombasa coastal operating zones. Bring valid ID/Passport and Driving License upon vehicle handover.
            </div>

            {activeVoucher.paymentStatus !== 'Paid - M-Pesa' && activeVoucher.paymentStatus !== 'Paid - Card' && (
              <button
                onClick={() => {
                  closeVoucherModal();
                  openMpesaModal(activeVoucher.reference, activeVoucher.totalCostKsh, activeVoucher.customerPhone);
                }}
                className="no-print px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Pay KSh {activeVoucher.totalCostKsh.toLocaleString()} via M-Pesa
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
