import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Compass, 
  ShieldCheck 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [serviceInterest, setServiceInterest] = useState('General Car Hire');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dataService.createEnquiry({
      name,
      email,
      phone,
      subject: subject || 'General Customer Inquiry',
      serviceInterest,
      message
    });
    setIsSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          24/7 Operations Desk
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Contact M07 – MSANIFU ZERO SEVEN
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Our dispatch and concierge team is available 24 hours a day across Mombasa, Moi International Airport, and Diani Beach.
        </p>
      </div>

      {/* Contact Grid: Details vs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Information Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#0F141D] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white font-display pb-3 border-b border-neutral-800">
              Direct Contact Information
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#141B26] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-400 block font-medium">Hotline & WhatsApp Dispatch</span>
                  <a href="tel:+254729255154" className="text-white hover:text-[#D4AF37] font-bold text-sm block mt-0.5">
                    +254 729 255 154
                  </a>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Calls, SMS & WhatsApp 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#141B26] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-400 block font-medium">Official Email Desk</span>
                  <a href="mailto:msanifuzeroseven@gmail.com" className="text-white hover:text-[#D4AF37] font-bold text-sm block mt-0.5">
                    msanifuzeroseven@gmail.com
                  </a>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Quotes, agreements & corporate inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#141B26] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-400 block font-medium">Physical Headquarters</span>
                  <p className="text-white font-bold text-sm mt-0.5">Links Road, Nyali</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Mombasa, Coast Province, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#141B26] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-neutral-400 block font-medium">Operating Hours</span>
                  <p className="text-white font-bold text-sm mt-0.5">24 Hours / 7 Days a Week</p>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Round-the-clock airport delivery & emergency assistance</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <a
                href={`https://wa.me/254729255154?text=${encodeURIComponent(
                  'Hello M07, I am contacting you from the website contact page for immediate assistance.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Coastal Service Hubs */}
          <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">Key Staging Hubs</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
              <span className="p-2 bg-neutral-950 rounded border border-neutral-850">Moi Airport (MBA)</span>
              <span className="p-2 bg-neutral-950 rounded border border-neutral-850">Nyali Beach Hub</span>
              <span className="p-2 bg-neutral-950 rounded border border-neutral-850">Diani Beach Station</span>
              <span className="p-2 bg-neutral-950 rounded border border-neutral-850">SGR Miritini Terminus</span>
            </div>
          </div>

        </div>

        {/* Right Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-bold text-white font-display mb-2">Send Us an Enquiry</h3>
          <p className="text-xs text-neutral-400 mb-6">
            Fill out the form below. Messages are logged directly to our dispatch dashboard and answered promptly.
          </p>

          {isSuccess ? (
            <div className="p-8 text-center bg-emerald-950/60 border border-emerald-600 rounded-xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Message Dispatched!</h4>
              <p className="text-xs text-neutral-300">
                Thank you for contacting M07 Msanifu Zero Seven. A fleet representative will respond within 30 minutes.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-xs text-[#D4AF37] underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Captain James Kariuki"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Phone Number (WhatsApp) *</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Service of Interest</label>
                  <select
                    value={serviceInterest}
                    onChange={(e) => setServiceInterest(e.target.value)}
                    className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="General Car Hire">General Car Hire (Self-Drive)</option>
                    <option value="Airport Transfer (Moi MBA)">Airport Transfer (Moi MBA)</option>
                    <option value="Chauffeur VIP Escort">Chauffeur VIP Escort</option>
                    <option value="Mombasa City Tour">Mombasa City Tour / Safari</option>
                    <option value="Corporate Fleet Account">Corporate Fleet Account</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Prado TX hire from March 10 to 15"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Your Detailed Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us your dates, flight details, preferred vehicle, or route requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA820A] text-black font-bold text-xs rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Dispatch Desk</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
