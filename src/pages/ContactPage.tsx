import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Users
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300 font-semibold uppercase tracking-wider">
          <Phone className="w-3.5 h-3.5 text-emerald-400" /> A Phone Call Away
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Contact Msanifu Zero Seven
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Your travel partner for memorable journeys across Mombasa, Diani Beach, Kwale, and SGR Miritini.
        </p>
      </div>

      {/* Contact Grid: Details vs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Information Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white pb-3 border-b border-slate-800">
              Direct Contact Details
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Hotline & WhatsApp</span>
                  <a href="tel:+254729255154" className="text-white hover:text-amber-300 font-bold text-sm block mt-0.5 font-mono">
                    0729 255154 / +254 729 255 154
                  </a>
                  <p className="text-slate-400 text-[11px] mt-0.5">Calls, SMS & WhatsApp inquiries</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-950 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Official Email</span>
                  <a href="mailto:msanifuzeroseven@gmail.com" className="text-white hover:text-sky-300 font-bold text-sm block mt-0.5">
                    msanifuzeroseven@gmail.com
                  </a>
                  <p className="text-slate-400 text-[11px] mt-0.5">Quotations, corporate contracts & bookings</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Location</span>
                  <p className="text-white font-bold text-sm mt-0.5">Mombasa, Kenya</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Serving Mombasa, SGR Miritini, Diani & Kwale</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <a
                href={`https://wa.me/254729255154?text=${encodeURIComponent(
                  'Hello Msanifu Zero Seven, I would like to inquire about vehicle hire / transfer services in Mombasa.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-950/40"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <Link
                to="/quotation"
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Request Group Quotation</span>
              </Link>
            </div>
          </div>

          {/* Coastal Staging Hubs */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h4 className="text-xs uppercase font-bold text-white tracking-wider">Service Coverage</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <span className="p-2 bg-slate-950 rounded border border-slate-800">Moi Airport (MBA)</span>
              <span className="p-2 bg-slate-950 rounded border border-slate-800">SGR Miritini Terminus</span>
              <span className="p-2 bg-slate-950 rounded border border-slate-800">Diani Beach (South Coast)</span>
              <span className="p-2 bg-slate-950 rounded border border-slate-800">Kwale Town & Shimba Hills</span>
            </div>
          </div>

        </div>

        {/* Right Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-2">Send Us an Enquiry</h3>
          <p className="text-xs text-slate-400 mb-6">
            Fill out the form below. Messages are logged directly and answered promptly by our dispatch desk.
          </p>

          {isSuccess ? (
            <div className="p-8 text-center bg-emerald-950/60 border border-emerald-600 rounded-xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Message Dispatched!</h4>
              <p className="text-xs text-slate-300">
                Thank you for contacting Msanifu Zero Seven. Our team will respond promptly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-xs text-amber-400 underline pt-2 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hassan Omar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0729 255154"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Service of Interest</label>
                  <select
                    value={serviceInterest}
                    onChange={(e) => setServiceInterest(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="General Car Hire">General Car Hire (Self-Drive / Chauffeur)</option>
                    <option value="Noah/Voxy Mombasa Hire">Toyota Noah / Voxy Hire (from KSh 6,000)</option>
                    <option value="Group Coaster Bus">Toyota Coaster (20-Passenger Bus)</option>
                    <option value="Airport Transfer (Moi MBA)">Airport Transfer (Moi MBA)</option>
                    <option value="SGR Miritini Transfer">SGR Miritini Transfer / Diani</option>
                    <option value="Diani Beach & Kwale Day Hire">Diani Beach & Kwale Day Hire</option>
                    <option value="Corporate Fleet Account">Corporate Fleet Account</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Noah 7-seater daily hire in Mombasa"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Detailed Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us your travel dates, pickup location, destinations, passenger count, or special requests..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-slate-950 font-bold text-xs rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Msanifu Zero Seven</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
