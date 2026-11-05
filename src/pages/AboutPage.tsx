import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Award, Users, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            The M07 Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">
            Setting the Benchmark for Luxury Mobility in Mombasa.
          </h1>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Founded with an unwavering dedication to reliability and hospitality, <strong className="text-white">M07 – MSANIFU ZERO SEVEN</strong> bridges the gap between premium executive automotive rentals and personalized coastal tourism in Kenya.
          </p>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Headquartered along Links Road in Nyali, we operate 24/7 across Moi International Airport (MBA), the SGR Miritini Terminus, Mombasa Island, Diani Beach, and the North Coast corridor through Kilifi and Malindi.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-neutral-800">
            <div>
              <span className="text-2xl font-black text-[#D4AF37] font-display">100%</span>
              <p className="text-xs text-neutral-400 mt-1">Fleet Compliance & NTSA Insured</p>
            </div>
            <div>
              <span className="text-2xl font-black text-white font-display">30 Min</span>
              <p className="text-xs text-neutral-400 mt-1">Average Airport Delivery Time</p>
            </div>
            <div>
              <span className="text-2xl font-black text-[#D4AF37] font-display">2,500+</span>
              <p className="text-xs text-neutral-400 mt-1">Successful Trips Executed</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative">
            <img
              src="/src/assets/images/prado_tx_luxury_1793873968849.jpg"
              alt="M07 Prado at Nyali Estate"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
              <span className="text-[#D4AF37] font-bold uppercase tracking-wider block text-[10px]">Nyali Operations Desk</span>
              <span>Dedicated fleet maintenance and VIP chauffeur dispatch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars of Excellence */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Our Standard</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Why Discerning Clients Choose M07</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0F141D] border border-neutral-800 p-6 rounded-2xl space-y-3">
            <Shield className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-base font-bold text-white">Guaranteed Availability</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We never overbook or make speculative promises. When you reserve a vehicle, our reservation engine locks out conflicting dates, ensuring your exact vehicle is staged and waiting.
            </p>
          </div>

          <div className="bg-[#0F141D] border border-neutral-800 p-6 rounded-2xl space-y-3">
            <Award className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-base font-bold text-white">Meticulous Mechanical Maintenance</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every vehicle undergoes a multi-point inspection before every dispatch: pristine braking systems, ice-cold air conditioning, high-tread all-terrain tyres, and full valeting.
            </p>
          </div>

          <div className="bg-[#0F141D] border border-neutral-800 p-6 rounded-2xl space-y-3">
            <Users className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="text-base font-bold text-white">Professional Coastal Chauffeurs</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Our drivers are certified, vetted, English and Swahili fluent, deeply knowledgeable about coastal shortcuts, ferry dynamics, and high-level hospitality protocols.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Contact prompt */}
      <div className="bg-[#0F141D] border border-neutral-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white font-display">Speak With Our Operations Team</h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
            Have bespoke route requirements, multi-vehicle motorcades, or VIP security escort needs in Coastal Kenya? Connect with us directly.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-[#AA820A] text-black font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Contact Nyali Office
          </button>
          <button
            onClick={() => navigateTo('fleet')}
            className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs rounded-lg border border-neutral-700 transition-colors cursor-pointer"
          >
            Explore Fleet
          </button>
        </div>
      </div>

    </div>
  );
};
