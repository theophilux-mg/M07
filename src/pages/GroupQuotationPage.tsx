import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  CheckCircle2, 
  Info, 
  Building2, 
  User, 
  Phone, 
  Mail,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { QuotationLeg, GroupQuotation } from '../types';
import { COASTAL_LOCATIONS } from '../data/fleetData';

export const GroupQuotationPage: React.FC = () => {
  const [passengers, setPassengers] = useState<number>(20);
  const [clientName, setClientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Default baseline legs matching user's flyer itinerary example
  const [legs, setLegs] = useState<QuotationLeg[]>([
    {
      id: 'leg-1',
      pickup: 'SGR Miritini Terminus',
      destination: 'Diani Beach',
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      serviceType: 'Transfer',
      estimatedPriceKsh: 21000
    },
    {
      id: 'leg-2',
      pickup: 'Diani Beach',
      destination: 'Kwale Town / Shimba Hills',
      date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      serviceType: 'Full-Day Hire',
      estimatedPriceKsh: 32000
    },
    {
      id: 'leg-3',
      pickup: 'Diani Beach',
      destination: 'SGR Miritini Terminus',
      date: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
      serviceType: 'Transfer',
      estimatedPriceKsh: 26000
    }
  ]);

  const [submittedQuotation, setSubmittedQuotation] = useState<GroupQuotation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Calculations
  const totalEstimateKsh = legs.reduce((acc, leg) => acc + (Number(leg.estimatedPriceKsh) || 0), 0);
  const validPassengers = passengers > 0 ? passengers : 1;
  const perPersonKsh = Math.round(totalEstimateKsh / validPassengers);

  const handleAddLeg = () => {
    const defaultDate = legs.length > 0 
      ? legs[legs.length - 1].date 
      : new Date().toISOString().split('T')[0];
    
    const newLeg: QuotationLeg = {
      id: `leg-${Date.now()}`,
      pickup: 'Moi International Airport (MBA)',
      destination: 'Diani Beach',
      date: defaultDate,
      serviceType: 'Transfer',
      estimatedPriceKsh: 22000
    };
    setLegs([...legs, newLeg]);
  };

  const handleRemoveLeg = (id: string) => {
    if (legs.length <= 1) return;
    setLegs(legs.filter(l => l.id !== id));
  };

  const handleLegChange = (id: string, field: keyof QuotationLeg, value: any) => {
    setLegs(prev => prev.map(leg => {
      if (leg.id !== id) return leg;
      const updated = { ...leg, [field]: value };
      
      // Auto-recalculate estimate if pickup, destination or serviceType changes
      if (field === 'pickup' || field === 'destination' || field === 'serviceType') {
        const est = dataService.estimateLegPrice(
          field === 'pickup' ? value : leg.pickup,
          field === 'destination' ? value : leg.destination,
          field === 'serviceType' ? value : leg.serviceType
        );
        updated.estimatedPriceKsh = est;
      }
      return updated;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }
    setIsSubmitting(true);

    const quotation = dataService.createGroupQuotation({
      clientName,
      phone,
      email,
      organization,
      passengers: validPassengers,
      legs,
      totalEstimateKsh,
      perPersonKsh,
      specialRequests
    });

    setSubmittedQuotation(quotation);
    setIsSubmitting(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppSend = () => {
    const lines = [
      `*MSANIFU ZERO SEVEN - GROUP QUOTATION REQUEST*`,
      `Client: ${clientName}`,
      organization ? `Organization: ${organization}` : '',
      `Phone: ${phone}`,
      `Passengers: ${validPassengers}`,
      ``,
      `*Itinerary Legs:*`,
      ...legs.map((leg, i) => 
        `Leg ${i + 1}: ${leg.pickup} ➔ ${leg.destination} (${leg.date}, ${leg.serviceType}) ~ KSh ${leg.estimatedPriceKsh.toLocaleString()}`
      ),
      ``,
      `*Estimated Total:* KSh ${totalEstimateKsh.toLocaleString()}`,
      `*Per Person Estimate:* KSh ${perPersonKsh.toLocaleString()} for ${validPassengers} pax`,
      specialRequests ? `Notes: ${specialRequests}` : '',
      ``,
      `_Estimate, subject to confirmation by M07_`
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/254729255154?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Users className="w-3.5 h-3.5 text-emerald-400" /> Executive Group Transport & Tours
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Request a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-sky-400">Group Quotation</span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Tailored multi-leg itineraries for corporate delegations, conferences, weddings, family safaris, and 20-passenger Toyota Coaster journeys.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-emerald-400" /> Build Your Multi-Leg Itinerary
            </h2>

            {/* Passenger Count Selector */}
            <div className="mb-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Number of Passengers (e.g. 20 pax for Toyota Coaster)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={passengers}
                  onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-28 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold text-center text-lg focus:border-emerald-500 focus:outline-none"
                />
                <div className="text-xs text-slate-400 leading-relaxed">
                  {passengers >= 15 ? (
                    <span className="text-emerald-400 font-medium">Recommended: Executive 20-Passenger Toyota Coaster bus</span>
                  ) : passengers >= 6 ? (
                    <span className="text-sky-400 font-medium">Recommended: Toyota HiAce 14-seater or Toyota Noah 7-seater</span>
                  ) : (
                    <span className="text-amber-400 font-medium">Recommended: Toyota Noah/Voxy or Executive Prado TX</span>
                  )}
                </div>
              </div>
            </div>

            {/* Itinerary Legs */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Trip Legs ({legs.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddLeg}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Another Leg
                </button>
              </div>

              {legs.map((leg, index) => (
                <div key={leg.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 relative group transition-all hover:border-slate-700">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Leg #{index + 1}
                    </span>
                    {legs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLeg(leg.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove leg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Pickup Location
                      </label>
                      <input
                        type="text"
                        list={`locations-${leg.id}`}
                        value={leg.pickup}
                        onChange={(e) => handleLegChange(leg.id, 'pickup', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                        placeholder="e.g. SGR Miritini Terminus"
                        required
                      />
                      <datalist id={`locations-${leg.id}`}>
                        {COASTAL_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Destination
                      </label>
                      <input
                        type="text"
                        list={`dest-${leg.id}`}
                        value={leg.destination}
                        onChange={(e) => handleLegChange(leg.id, 'destination', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                        placeholder="e.g. Diani Beach"
                        required
                      />
                      <datalist id={`dest-${leg.id}`}>
                        {COASTAL_LOCATIONS.map((loc) => (
                          <option key={loc} value={loc} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        value={leg.date}
                        onChange={(e) => handleLegChange(leg.id, 'date', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Service Type
                      </label>
                      <select
                        value={leg.serviceType}
                        onChange={(e) => handleLegChange(leg.id, 'serviceType', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="Transfer">Transfer</option>
                        <option value="Full-Day Hire">Full-Day Hire</option>
                        <option value="Safari Excursion">Safari Excursion</option>
                        <option value="Tour">Coastal Tour</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Tariff Rate (KSh)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="500"
                        value={leg.estimatedPriceKsh}
                        onChange={(e) => handleLegChange(leg.id, 'estimatedPriceKsh', parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-emerald-400 font-bold focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Details */}
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 pt-4 border-t border-slate-800">
              Contact & Lead Passenger Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Your Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Phone Number (WhatsApp) *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0729 255154"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@organization.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Organization / Group Name</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Coast Tourism Delegation"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs text-slate-400 mb-1">Special Instructions or Luggage Requirements</label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. 20 suitcases, flight number, child booster seats, microphone sound system..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-5 h-5" /> Generate & Submit Group Quotation
            </button>
          </form>
        </div>

        {/* Right Printable Quotation Preview Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            {/* Header / Brand in Quotation */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img 
                  src="/images/m07_logo.svg" 
                  alt="Msanifu Zero Seven Logo" 
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="font-extrabold text-white text-base leading-tight">
                    Msanifu Zero Seven
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">Tour and Travel</p>
                  <p className="text-[11px] text-slate-400">A Phone Call Away</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {submittedQuotation ? submittedQuotation.reference : 'LIVE ESTIMATE'}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">Mombasa, Kenya</p>
                <p className="text-[11px] text-emerald-400 font-mono">0729 255154</p>
              </div>
            </div>

            {/* Client summary if typed */}
            {clientName && (
              <div className="py-3 border-b border-slate-800 text-xs text-slate-300">
                <p><strong className="text-white">Client:</strong> {clientName} {organization && `(${organization})`}</p>
                <p><strong className="text-white">Phone:</strong> {phone || '—'}</p>
              </div>
            )}

            {/* Line by line itinerary breakdown */}
            <div className="py-4 space-y-3">
              <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider pb-1">
                <span>Itinerary Leg</span>
                <span>Estimate (KSh)</span>
              </div>

              {legs.map((leg, i) => (
                <div key={leg.id} className="flex justify-between items-start text-xs border-b border-slate-800/60 pb-2">
                  <div className="pr-3">
                    <p className="font-medium text-white">
                      {i + 1}. {leg.pickup} ➔ {leg.destination}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {leg.date} · <span className="text-sky-300">{leg.serviceType}</span>
                    </p>
                  </div>
                  <div className="font-mono font-bold text-amber-300 text-sm whitespace-nowrap">
                    KSh {Number(leg.estimatedPriceKsh).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="space-y-3 pt-2 pb-4 border-b border-slate-800">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Total Group Estimate:</span>
                <span className="font-mono font-extrabold text-xl text-white">
                  KSh {totalEstimateKsh.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex justify-between items-center">
                <div>
                  <span className="text-xs text-emerald-300 font-semibold block">
                    Per-Person Estimate
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Based on {validPassengers} passenger{validPassengers > 1 ? 's' : ''} (Total / {validPassengers})
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-extrabold text-2xl text-emerald-400">
                    KSh {perPersonKsh.toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-emerald-300">/ person</span>
                </div>
              </div>
            </div>

            {/* Mandatory Disclaimer Label */}
            <div className="my-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold uppercase tracking-wider text-[11px] text-amber-300">
                  Estimate, subject to confirmation by M07
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Final rates may adjust based on specific vehicle assignment, overnight driver allowances, toll fees, and exact route timing.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="py-2.5 px-3 rounded-xl font-medium text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>

              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="py-2.5 px-3 rounded-xl font-medium text-xs text-emerald-100 bg-emerald-700 hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/40"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Desk
              </button>
            </div>

            {submittedQuotation && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  Quotation saved! Reference: <strong>{submittedQuotation.reference}</strong>. Our team will review and confirm promptly.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
