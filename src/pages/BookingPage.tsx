import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { dataService } from '../services/dataService';
import { COASTAL_LOCATIONS } from '../data/fleetData';
import { Vehicle } from '../types';
import { 
  Calendar, 
  MapPin, 
  Car, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Info,
  DollarSign 
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { 
    selectedVehicleId, 
    setSelectedVehicleId, 
    openVoucherModal, 
    openMpesaModal, 
    navigateTo 
  } = useApp();

  const vehicles = dataService.getVehicles();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [pickupLocation, setPickupLocation] = useState(COASTAL_LOCATIONS[0]);
  const [customPickup, setCustomPickup] = useState('');
  const [destination, setDestination] = useState(COASTAL_LOCATIONS[1]);
  const [customDestination, setCustomDestination] = useState('');
  
  // Dates: Default today + tomorrow
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [pickupDate, setPickupDate] = useState(todayStr);
  const [pickupTime, setPickupTime] = useState('09:00');
  const [returnDate, setReturnDate] = useState(tomorrowStr);
  
  const [vehicleId, setVehicleId] = useState<string>(
    selectedVehicleId || vehicles[0]?.id || ''
  );
  const [serviceType, setServiceType] = useState<'Self-drive' | 'Chauffeur Driven' | 'Airport Transfer' | 'Tour Package'>('Self-drive');
  const [passengers, setPassengers] = useState<number>(2);
  const [chauffeurIncluded, setChauffeurIncluded] = useState<boolean>(false);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Submission & Validation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string | null>(null);

  // Sync selectedVehicleId from context if it changes
  useEffect(() => {
    if (selectedVehicleId) {
      setVehicleId(selectedVehicleId);
    }
  }, [selectedVehicleId]);

  // Adjust chauffeur flag if service type implies it
  useEffect(() => {
    if (serviceType === 'Chauffeur Driven' || serviceType === 'Airport Transfer' || serviceType === 'Tour Package') {
      setChauffeurIncluded(true);
    }
  }, [serviceType]);

  const activeVehicle = vehicles.find(v => v.id === vehicleId) || vehicles[0];

  // Calculate rental duration
  const d1 = new Date(pickupDate);
  const d2 = new Date(returnDate);
  const diffDays = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  const rentalDays = diffDays > 0 ? diffDays : 1;

  // Rate calculation
  const dailyRate = (rentalDays >= 7 && activeVehicle?.pricePerDayWeekly) 
    ? activeVehicle.pricePerDayWeekly 
    : (activeVehicle?.pricePerDay || 3500);

  const subtotal = dailyRate * rentalDays;
  const chauffeurFee = (chauffeurIncluded && activeVehicle) 
    ? (activeVehicle.chauffeurDailyRate * rentalDays) 
    : 0;
  const totalCost = subtotal + chauffeurFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setValidationError('Please complete all contact details (Name, Phone number, and Email).');
      return;
    }

    if (new Date(returnDate) < new Date(pickupDate)) {
      setValidationError('Return date cannot be earlier than pickup date.');
      return;
    }

    setIsSubmitting(true);

    const actualPickup = pickupLocation === 'Other / Custom Address' ? customPickup : pickupLocation;
    const actualDest = destination === 'Other / Custom Address' ? customDestination : destination;

    const result = dataService.createBooking({
      customerName,
      customerPhone,
      customerEmail,
      pickupLocation: actualPickup || 'Mombasa Central',
      destination: actualDest || 'Nyali / North Coast',
      pickupDate,
      pickupTime,
      returnDate,
      vehicleId,
      serviceType,
      passengers,
      chauffeurIncluded,
      specialInstructions
    });

    setIsSubmitting(false);

    if (!result.success) {
      setValidationError(result.error || 'Failed to complete reservation.');
      return;
    }

    if (result.booking) {
      setConfirmedBookingRef(result.booking.reference);
      // Auto open voucher for customer convenience
      openVoucherModal(result.booking);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Real-Time Reservation Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Book & Reserve Your Vehicle
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Transparent coastal rates, guaranteed availability without overlapping dates, and instant confirmation reference.
        </p>
      </div>

      {/* Success Banner if just booked */}
      {confirmedBookingRef && (
        <div className="bg-emerald-950/60 border border-emerald-600 rounded-2xl p-6 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-emerald-900 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Reservation Successfully Registered!</h3>
            <p className="text-xs text-neutral-300 mt-1">
              Your official reservation reference is <strong className="text-[#D4AF37] font-mono text-base">{confirmedBookingRef}</strong>.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                const b = dataService.getBookingByReference(confirmedBookingRef);
                if (b) openVoucherModal(b);
              }}
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold border border-neutral-700"
            >
              View & Print Voucher
            </button>
            <button
              onClick={() => {
                const b = dataService.getBookingByReference(confirmedBookingRef);
                if (b) openMpesaModal(b.reference, b.totalCostKsh, b.customerPhone);
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow"
            >
              Pay via M-Pesa STK Push
            </button>
            <button
              onClick={() => navigateTo('tracking', { bookingRef: confirmedBookingRef })}
              className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#AA820A] text-black rounded-lg text-xs font-bold"
            >
              Track Reservation
            </button>
          </div>
        </div>
      )}

      {/* Booking Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Column (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          {validationError && (
            <div className="p-4 bg-red-950/70 border border-red-700 rounded-xl text-xs text-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Reservation Alert</p>
                <p className="mt-0.5">{validationError}</p>
              </div>
            </div>
          )}

          {/* Section 1: Vehicle & Service Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-neutral-800">
              <Car className="w-4 h-4 text-[#D4AF37]" />
              <span>1. Vehicle & Service Options</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1.5">Select Fleet Vehicle *</label>
                <select
                  value={vehicleId}
                  onChange={(e) => {
                    setVehicleId(e.target.value);
                    setSelectedVehicleId(e.target.value);
                  }}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.name} – KSh {v.pricePerDay.toLocaleString()}/day ({v.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1.5">Service Type *</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Self-drive">Self-drive (Client drives)</option>
                  <option value="Chauffeur Driven">Executive Chauffeur Driven</option>
                  <option value="Airport Transfer">Airport Transfer (Moi MBA)</option>
                  <option value="Tour Package">Coastal Tour / Safari Package</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs">
              <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chauffeurIncluded}
                  onChange={(e) => setChauffeurIncluded(e.target.checked)}
                  className="rounded accent-[#D4AF37]"
                />
                <span>Include Professional Chauffeur (+KSh {activeVehicle?.chauffeurDailyRate.toLocaleString()}/day)</span>
              </label>
              <span className="text-[11px] text-neutral-400">Uniformed & vetted driver</span>
            </div>
          </div>

          {/* Section 2: Dates and Route */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-neutral-800">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>2. Rental Schedule & Locations</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Pickup Date *</label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Pickup Time</label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Return Date *</label>
                <input
                  type="date"
                  required
                  min={pickupDate}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Pickup Location *</label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {COASTAL_LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                  <option value="Other / Custom Address">Other / Custom Villa Address</option>
                </select>
                {pickupLocation === 'Other / Custom Address' && (
                  <input
                    type="text"
                    placeholder="Enter hotel name or specific address..."
                    value={customPickup}
                    onChange={(e) => setCustomPickup(e.target.value)}
                    className="mt-2 w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-xs text-white"
                  />
                )}
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Destination / Primary Route *</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {COASTAL_LOCATIONS.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                  <option value="Other / Custom Address">Other / Custom Destination</option>
                </select>
                {destination === 'Other / Custom Address' && (
                  <input
                    type="text"
                    placeholder="Enter intended destination..."
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    className="mt-2 w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-xs text-white"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Customer Information */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-neutral-800">
              <User className="w-4 h-4 text-[#D4AF37]" />
              <span>3. Primary Renter Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Omondi or Jane Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+254 729 255 154"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="client@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Estimated Passengers</label>
                <input
                  type="number"
                  min={1}
                  max={activeVehicle?.seats || 8}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1 text-xs">Flight Number / Special Instructions (Optional)</label>
              <textarea
                rows={2}
                placeholder="e.g. Arriving on Kenya Airways KQ608 from Nairobi at 14:15. Please have driver hold name board."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-neutral-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA820A] text-[#080B10] font-bold text-sm tracking-wide rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirm Reservation & Generate Voucher</span>
            </button>
            <p className="text-[11px] text-center text-neutral-400 mt-2">
              No immediate upfront credit card required. Lock in your vehicle now and pay upon arrival or via M-Pesa.
            </p>
          </div>

        </form>

        {/* Right Summary Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-28">
          
          {/* Vehicle Snapshot Card */}
          {activeVehicle && (
            <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-950">
                <img
                  src={activeVehicle.image}
                  alt={activeVehicle.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded bg-black/70 text-[10px] text-[#D4AF37] font-bold">
                  {activeVehicle.category}
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-white font-display">{activeVehicle.name}</h4>
                <p className="text-xs text-neutral-400 mt-0.5">{activeVehicle.description}</p>
              </div>

              {/* Specs pill preview */}
              <div className="flex items-center gap-3 text-xs text-neutral-400 pt-1">
                <span>{activeVehicle.seats} Passengers</span>
                <span>·</span>
                <span>{activeVehicle.transmission}</span>
                <span>·</span>
                <span>{activeVehicle.fuelType}</span>
              </div>
            </div>
          )}

          {/* Pricing Breakdown Card */}
          <div className="bg-[#0F141D] border border-[#D4AF37]/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold pb-2 border-b border-neutral-800 flex items-center justify-between">
              <span>Rental Cost Breakdown</span>
              <span className="text-[#D4AF37]">KES Currency</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span>Duration:</span>
                <span className="font-semibold text-white">{rentalDays} Day{rentalDays > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Base Rate:</span>
                <span className="font-mono text-white">KSh {dailyRate.toLocaleString()} / day</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Vehicle Subtotal:</span>
                <span className="font-mono text-white">KSh {subtotal.toLocaleString()}</span>
              </div>
              {chauffeurIncluded && (
                <div className="flex justify-between text-neutral-300">
                  <span>Chauffeur Allowance:</span>
                  <span className="font-mono text-[#D4AF37]">+KSh {chauffeurFee.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-neutral-400 block">Total Estimated Cost</span>
                <span className="text-[10px] text-emerald-400">VAT & Road Taxes Included</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#D4AF37] font-mono">
                  KSh {totalCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Assistance */}
            <div className="pt-4 border-t border-neutral-800 text-center">
              <a
                href={`https://wa.me/254729255154?text=${encodeURIComponent(
                  `Hello M07, I am booking ${activeVehicle?.name} from ${pickupDate} to ${returnDate} (Est: KSh ${totalCost.toLocaleString()}). Can you assist?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <span>Have a quick question before booking? WhatsApp us</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* Overlap Guarantee */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400 space-y-1">
            <div className="flex items-center gap-2 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Zero-Overlap Fleet Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Our backend reservation engine validates dates against confirmed bookings in real time, preventing double bookings for any vehicle in our coastal fleet.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
