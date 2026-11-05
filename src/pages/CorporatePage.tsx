import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dataService } from '../services/dataService';
import { 
  Building2, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ArrowRight 
} from 'lucide-react';

export const CorporatePage: React.FC = () => {
  const { navigateTo } = useApp();
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fleetNeeds, setFleetNeeds] = useState('3-5 Vehicles (Monthly Lease)');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.createEnquiry({
      name: `${contactPerson} (${companyName})`,
      email,
      phone,
      subject: `Corporate Fleet Partnership: ${companyName}`,
      serviceInterest: fleetNeeds,
      message: `Corporate proposal request. Fleet needs: ${fleetNeeds}. Details: ${notes}`
    });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          B2B Automotive Fleet Solutions
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Corporate & Enterprise Partnerships
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Tailored logistics infrastructure for Mombasa port logistics, shipping lines, multinational energy firms, NGOs, and luxury beachfront hotel resorts.
        </p>
      </div>

      {/* Corporate Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#0F141D] border border-neutral-800 p-8 rounded-2xl space-y-3">
          <FileText className="w-8 h-8 text-[#D4AF37]" />
          <h3 className="text-lg font-bold text-white">Monthly Consolidated Invoicing</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Eliminate petty cash friction. Receive comprehensive monthly statements itemized by department, traveler name, and vehicle registration with full KRA ETR compliance.
          </p>
        </div>

        <div className="bg-[#0F141D] border border-neutral-800 p-8 rounded-2xl space-y-3">
          <Building2 className="w-8 h-8 text-[#D4AF37]" />
          <h3 className="text-lg font-bold text-white">Dedicated Fleet Allocation</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Reserve dedicated Toyota Prados, Double Cabins, or 14-seater executive vans exclusively for your company’s long-term coastal projects with guaranteed replacement vehicles.
          </p>
        </div>

        <div className="bg-[#0F141D] border border-neutral-800 p-8 rounded-2xl space-y-3">
          <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
          <h3 className="text-lg font-bold text-white">24/7 Account Management</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            A designated senior account manager on standby around the clock for emergency airport runs, executive protocol changes, and urgent weekend staff dispatches.
          </p>
        </div>
      </div>

      {/* Corporate Request Form */}
      <div className="bg-[#0F141D] border border-[#D4AF37]/30 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <h3 className="text-2xl font-bold text-white font-display">Request Corporate Account Proposal</h3>
          <p className="text-xs text-neutral-400">
            Tell us about your organization's mobility requirements. Our commercial team will deliver a customized rate agreement within 4 business hours.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center bg-emerald-950/60 border border-emerald-600 rounded-2xl space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Corporate Inquiry Received</h4>
            <p className="text-xs text-neutral-300">
              Thank you, {contactPerson}. Our Corporate Accounts Director will review your requirements for {companyName} and reach out via email and phone shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-2 text-xs text-[#D4AF37] underline"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Company / Organization Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maersk Coastal Logistics Ltd"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Contact Person & Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Margaret Wambui, Head of Procurement"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Corporate Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="procurement@company.co.ke"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Direct Phone / Mobile *</label>
                <input
                  type="tel"
                  required
                  placeholder="+254 729 255 154"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Estimated Fleet Volume / Service Scope *</label>
              <select
                value={fleetNeeds}
                onChange={(e) => setFleetNeeds(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="1-2 Executive SUVs (Prado / Land Cruiser)">1-2 Executive SUVs (Prado / Land Cruiser)</option>
                <option value="3-5 Vehicles (Monthly Commercial Lease)">3-5 Vehicles (Monthly Commercial Lease)</option>
                <option value="6-10+ Fleet Vehicles (Double Cabins & Vans)">6-10+ Fleet Vehicles (Double Cabins & Vans)</option>
                <option value="Airport Shuttle Transfers Only (Corporate Account)">Airport Shuttle Transfers Only (Corporate Account)</option>
                <option value="Event Motorcade / VIP Conference (Short-term)">Event Motorcade / VIP Conference (Short-term)</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-300 font-medium mb-1">Project Details & Routing Notes</label>
              <textarea
                rows={3}
                placeholder="Mention expected rental duration, pickup locations, driver requirements, and billing preference..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA820A] text-black font-bold text-xs rounded-xl hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Submit Corporate Account Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
