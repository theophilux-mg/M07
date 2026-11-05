import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { dataService } from '../services/dataService';
import { Booking, BookingStatus } from '../types';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Car, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Printer, 
  CreditCard, 
  Phone, 
  AlertCircle 
} from 'lucide-react';

export const TrackingPage: React.FC = () => {
  const { trackingRef, setTrackingRef, openVoucherModal, openMpesaModal } = useApp();
  const [searchInput, setSearchInput] = useState(trackingRef || 'M07-2026-7842');
  const [searchedBooking, setSearchedBooking] = useState<Booking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (trackingRef) {
      setSearchInput(trackingRef);
      handleSearch(trackingRef);
    } else {
      // Default initial view with a sample confirmed booking
      handleSearch('M07-2026-7842');
    }
  }, [trackingRef]);

  const handleSearch = (refQuery?: string) => {
    const q = refQuery || searchInput;
    setHasSearched(true);
    if (!q.trim()) return;

    const found = dataService.getBookingByReference(q.trim());
    setSearchedBooking(found || null);
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed': return 'bg-emerald-950 text-emerald-400 border-emerald-700';
      case 'In progress': return 'bg-blue-950 text-blue-400 border-blue-700';
      case 'Pending': return 'bg-amber-950 text-amber-400 border-amber-700';
      case 'Completed': return 'bg-purple-950 text-purple-400 border-purple-700';
      case 'Rejected':
      case 'Cancelled': return 'bg-red-950 text-red-400 border-red-700';
      default: return 'bg-neutral-800 text-neutral-300';
    }
  };

  const steps: BookingStatus[] = ['Pending', 'Confirmed', 'In progress', 'Completed'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Reservation Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Track Your Reservation Status
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Enter your unique M07 reservation reference to check vehicle readiness, driver dispatch, and payment status.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-[#0F141D] border border-neutral-800 p-4 rounded-2xl max-w-2xl mx-auto shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter reference e.g. M07-2026-7842"
              className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold text-xs rounded-lg hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
          >
            Track Status
          </button>
        </form>

        {/* Quick Demo Reference Pill Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-neutral-850 text-[11px] text-neutral-400">
          <span>Quick Samples:</span>
          {['M07-2026-7842', 'M07-2026-8911', 'M07-2026-9204'].map(ref => (
            <button
              key={ref}
              type="button"
              onClick={() => {
                setSearchInput(ref);
                handleSearch(ref);
              }}
              className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-[10px] border border-neutral-800"
            >
              {ref}
            </button>
          ))}
        </div>
      </div>

      {/* Result Display */}
      {searchedBooking ? (
        <div className="bg-[#0F141D] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wide">
                  {searchedBooking.reference}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(searchedBooking.status)}`}>
                  {searchedBooking.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Reserved by <strong className="text-white">{searchedBooking.customerName}</strong> on {new Date(searchedBooking.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => openVoucherModal(searchedBooking)}
                className="px-3.5 py-2 bg-neutral-850 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-neutral-700 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>View Voucher</span>
              </button>

              {searchedBooking.paymentStatus !== 'Paid - M-Pesa' && searchedBooking.paymentStatus !== 'Paid - Card' && (
                <button
                  onClick={() => openMpesaModal(searchedBooking.reference, searchedBooking.totalCostKsh, searchedBooking.customerPhone)}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay with M-Pesa</span>
                </button>
              )}
            </div>
          </div>

          {/* Progress Timeline */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-4">
              Trip Milestone Timeline
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {steps.map((st, i) => {
                const currentIndex = steps.indexOf(searchedBooking.status);
                const isPassed = currentIndex >= i;
                const isCurrent = searchedBooking.status === st;

                return (
                  <div
                    key={st}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-[#141B26] border-[#D4AF37] text-white shadow-lg'
                        : isPassed
                        ? 'bg-neutral-900/80 border-neutral-700 text-neutral-300'
                        : 'bg-neutral-950/40 border-neutral-900 text-neutral-600'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      {isPassed ? (
                        <CheckCircle className={`w-4 h-4 ${isCurrent ? 'text-[#D4AF37]' : 'text-emerald-400'}`} />
                      ) : (
                        <Clock className="w-4 h-4 text-neutral-600" />
                      )}
                      <span className="text-[10px] font-mono text-neutral-400">Step 0{i + 1}</span>
                    </div>
                    <p className={`text-xs font-bold ${isCurrent ? 'text-[#D4AF37]' : ''}`}>{st}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* Vehicle & Chauffeur Card */}
            <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-20 h-14 rounded-lg overflow-hidden bg-neutral-950 shrink-0">
                  <img
                    src={searchedBooking.vehicleImage}
                    alt={searchedBooking.vehicleName}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#D4AF37] font-semibold">{searchedBooking.vehicleCategory}</span>
                  <h5 className="font-bold text-white text-sm">{searchedBooking.vehicleName}</h5>
                  <p className="text-neutral-400 text-[11px]">{searchedBooking.serviceType}</p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-neutral-800">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Chauffeur:</span>
                  <span className="text-white">{searchedBooking.chauffeurIncluded ? 'Included (Assigned)' : 'Self-Drive'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Passengers:</span>
                  <span className="text-white">{searchedBooking.passengers} Guests</span>
                </div>
                {searchedBooking.adminNotes && (
                  <div className="p-2.5 bg-[#141B26] rounded border border-neutral-700 mt-2">
                    <span className="text-[10px] text-[#D4AF37] font-bold block uppercase">Fleet Dispatch Note:</span>
                    <p className="text-neutral-200 text-[11px] mt-0.5">{searchedBooking.adminNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Schedule & Financials */}
            <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800 space-y-3">
              <h5 className="font-bold text-white text-xs uppercase tracking-wider">Itinerary & Payment</h5>
              
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Pickup Location:</span>
                  <span className="text-white font-medium truncate max-w-[200px]">{searchedBooking.pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Destination:</span>
                  <span className="text-white font-medium truncate max-w-[200px]">{searchedBooking.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Pickup Date/Time:</span>
                  <span className="text-white">{searchedBooking.pickupDate} @ {searchedBooking.pickupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Return Date:</span>
                  <span className="text-white">{searchedBooking.returnDate} ({searchedBooking.rentalDays} Days)</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline">
                  <span className="text-neutral-300 font-bold">Total Tariff:</span>
                  <span className="text-base font-extrabold text-[#D4AF37] font-mono">
                    KSh {searchedBooking.totalCostKsh.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Payment Status:</span>
                  <span className={`font-semibold ${searchedBooking.paymentStatus.startsWith('Paid') ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {searchedBooking.paymentStatus} {searchedBooking.paymentReference ? `(${searchedBooking.paymentReference})` : ''}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Help Line */}
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-2">
            <span>Need schedule changes or flight updates?</span>
            <a
              href={`https://wa.me/254729255154?text=${encodeURIComponent(
                `Hello M07, I am inquiring about my reservation ${searchedBooking.reference}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Dispatch Desk (+254 729 255 154)</span>
            </a>
          </div>

        </div>
      ) : hasSearched ? (
        <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
          <h4 className="text-base font-bold text-white">No Reservation Found</h4>
          <p className="text-xs text-neutral-400">
            We couldn't find a booking matching <span className="text-white font-mono">{searchInput}</span>. Please verify the reference on your confirmation or contact our support team.
          </p>
        </div>
      ) : null}

    </div>
  );
};
