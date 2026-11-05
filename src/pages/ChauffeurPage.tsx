import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  Shield, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Car 
} from 'lucide-react';

export const ChauffeurPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Discrete, Polished, Reliable
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Executive VIP Chauffeur Services
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Designed for corporate executives, government delegations, luxury weddings, and high-profile visitors who require immaculate service, route discretion, and punctual execution.
        </p>
      </div>

      {/* 3 Core Chauffeur Offerings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-[#0F141D] border border-neutral-800 p-8 rounded-2xl space-y-4 hover:border-[#D4AF37]/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Diplomatic & Executive Delegations</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Strict confidentiality, defensive driving protocols, and seamless multi-vehicle convoys for dignitaries, board meetings, and high-stakes coastal conferences.
          </p>
          <ul className="text-xs text-neutral-300 space-y-2 pt-2 border-t border-neutral-850">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Signed Non-Disclosure Agreements (NDA)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Security detail accommodation</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#0F141D] border border-neutral-800 p-8 rounded-2xl space-y-4 hover:border-[#D4AF37]/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Coastal Wedding Motorcades</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Turn heads on your special day in Nyali, Diani, or Vipingo Ridge. Immaculate pearl black Toyota Prados and Land Cruisers decorated to your theme with white-gloved chauffeurs.
          </p>
          <ul className="text-xs text-neutral-300 space-y-2 pt-2 border-t border-neutral-850">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Synchronized multi-car arrivals</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Bridal suite chilled champagne cooler</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#0F141D] border border-neutral-800 p-8 rounded-2xl space-y-4 hover:border-[#D4AF37]/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-display">Daily Dedicated Chauffeur</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Have a personal driver on standby throughout your stay. Available for business dinners, private beach hopping, and late-night returns with zero driving worries.
          </p>
          <ul className="text-xs text-neutral-300 space-y-2 pt-2 border-t border-neutral-850">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Full 12-hour or 24-hour daily availability</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Transparent driver allowance included</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Chauffeur Code of Conduct */}
      <div className="bg-[#05070A] border border-neutral-900 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Strict Standard</span>
          <h3 className="text-2xl font-bold text-white font-display">The M07 Chauffeur Code</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-neutral-300">
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 space-y-1.5">
            <h4 className="font-bold text-white text-sm">Punctuality Rule</h4>
            <p className="text-neutral-400">Drivers arrive at pickup points at least 15 minutes before the scheduled time.</p>
          </div>
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 space-y-1.5">
            <h4 className="font-bold text-white text-sm">Formal Attire</h4>
            <p className="text-neutral-400">Pressed dark suit, tie, clean grooming, and official M07 security identification.</p>
          </div>
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 space-y-1.5">
            <h4 className="font-bold text-white text-sm">Client Privacy</h4>
            <p className="text-neutral-400">No unauthorized photography, zero conversation intrusion, and strict discretion.</p>
          </div>
          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 space-y-1.5">
            <h4 className="font-bold text-white text-sm">Defensive Driving</h4>
            <p className="text-neutral-400">Certified by NTSA and Kenya Police Driving School for safe, smooth journey pacing.</p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('booking')}
            className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold text-xs rounded-lg hover:brightness-110 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Book Chauffeured Experience</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
