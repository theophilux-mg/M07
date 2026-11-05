import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plane, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Luggage, 
  UserCheck 
} from 'lucide-react';

export const AirportTransfersPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header with Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Punctual Coastal Arrivals & Departures
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-tight">
            Moi International Airport (MBA) VIP Transfers
          </h1>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Arrive in Mombasa without the stress of taxi negotiations, parking queues, or delays. Our uniformed chauffeur monitors your incoming flight in real time, greets you with a personalized name board at the terminal arrival gate, assists with luggage, and whisks you straight to your destination in air-conditioned privacy.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('booking')}
              className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold text-xs rounded-lg shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plane className="w-4 h-4" />
              <span>Book Airport Transfer</span>
            </button>
            <a
              href="tel:+254729255154"
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs rounded-lg border border-neutral-700 transition-colors"
            >
              Call Airport Dispatch: +254 729 255 154
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative">
            <img
              src="/src/assets/images/airport_transfer_vip_1793873970135.jpg"
              alt="Moi International Airport VIP transfer van and chauffeur"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
              <span className="text-[#D4AF37] font-bold uppercase tracking-wider block text-[10px]">Terminal 1 & 2 Meet & Greet</span>
              <span>Chauffeured Mercedes / Noah / HiAce shuttles staged outside arrivals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Coastal Transfer Routes Table */}
      <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-xl font-bold text-white font-display">Popular Airport Transfer Routes</h3>
            <p className="text-xs text-neutral-400">Fixed rate tariffs from Moi International Airport (MBA) & SGR Miritini Terminus.</p>
          </div>
          <span className="text-xs text-[#D4AF37] font-semibold">Includes Driver, Fuel & Parking</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              from: 'Moi Airport (MBA)',
              to: 'Nyali Beach & Hotels',
              dist: '18 km · ~35 mins',
              rateSmall: 'KSh 3,500',
              rateVan: 'KSh 6,500',
              ratePrado: 'KSh 12,000'
            },
            {
              from: 'Moi Airport (MBA)',
              to: 'Bamburi & Shanzu Resorts',
              dist: '26 km · ~50 mins',
              rateSmall: 'KSh 4,500',
              rateVan: 'KSh 7,500',
              ratePrado: 'KSh 14,000'
            },
            {
              from: 'Moi Airport (MBA)',
              to: 'Diani Beach (South Coast)',
              dist: '45 km · ~1 hr 15 mins (via Bypass)',
              rateSmall: 'KSh 6,500',
              rateVan: 'KSh 9,500',
              ratePrado: 'KSh 18,000'
            },
            {
              from: 'SGR Miritini Terminus',
              to: 'Nyali / North Coast',
              dist: '22 km · ~40 mins',
              rateSmall: 'KSh 4,000',
              rateVan: 'KSh 7,000',
              ratePrado: 'KSh 13,000'
            },
            {
              from: 'Moi Airport (MBA)',
              to: 'Kilifi Town & Bofa Beach',
              dist: '70 km · ~1 hr 30 mins',
              rateSmall: 'KSh 8,500',
              rateVan: 'KSh 12,500',
              ratePrado: 'KSh 22,000'
            },
            {
              from: 'Moi Airport (MBA)',
              to: 'Watamu / Malindi Resorts',
              dist: '120 km · ~2 hrs 15 mins',
              rateSmall: 'KSh 12,000',
              rateVan: 'KSh 16,500',
              ratePrado: 'KSh 28,000'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                <span className="flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5" />
                  {item.from}
                </span>
                <span className="text-neutral-400 text-[11px] font-mono">{item.dist}</span>
              </div>
              <h4 className="text-sm font-bold text-white">To: {item.to}</h4>

              <div className="pt-2 border-t border-neutral-850 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Sedan / Small car:</span>
                  <span className="font-mono font-bold text-white">{item.rateSmall}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Noah / 7-Seater Van:</span>
                  <span className="font-mono font-bold text-[#D4AF37]">{item.rateVan}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Toyota Prado TX VIP:</span>
                  <span className="font-mono font-bold text-white">{item.ratePrado}</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('booking')}
                className="w-full mt-2 py-2 bg-neutral-900 hover:bg-[#D4AF37] hover:text-black rounded text-xs font-semibold text-neutral-300 transition-colors"
              >
                Reserve This Route
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0F141D] border border-neutral-800 p-6 rounded-2xl space-y-3">
          <Clock className="w-7 h-7 text-[#D4AF37]" />
          <h4 className="text-base font-bold text-white">Live Flight Radar Sync</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Whether your Kenya Airways, Jambojet, Fly540, or international flight lands early or gets delayed, our dispatch team tracks your tail number. No waiting fees.
          </p>
        </div>

        <div className="bg-[#0F141D] border border-neutral-800 p-6 rounded-2xl space-y-3">
          <Luggage className="w-7 h-7 text-[#D4AF37]" />
          <h4 className="text-base font-bold text-white">Dedicated Luggage Assistance</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            From heavy family suitcases to specialized scuba dive bags and golf clubs, our chauffeurs handle the loading and secure tie-downs.
          </p>
        </div>

        <div className="bg-[#0F141D] border border-neutral-800 p-6 rounded-2xl space-y-3">
          <UserCheck className="w-7 h-7 text-[#D4AF37]" />
          <h4 className="text-base font-bold text-white">Personalized Arrival Signboard</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Walk out of customs and spot your name or company logo clearly displayed by an M07 uniformed chauffeur waiting right at the arrivals exit gate.
          </p>
        </div>
      </div>

    </div>
  );
};
