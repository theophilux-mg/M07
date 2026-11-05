import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Plane, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Luggage, 
  UserCheck,
  Users,
  Compass,
  Train
} from 'lucide-react';

export const AirportTransfersPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header with Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300 font-semibold uppercase tracking-wider">
            <Plane className="w-3.5 h-3.5 text-emerald-400" /> Moi Airport (MBA) & SGR Miritini Transfers
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Punctual Airport & SGR Transfers <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-sky-400">
              Across Coastal Kenya.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Arrive in Mombasa without the stress of taxi negotiations, ferry queues, or delays. Whether stepping off flight arrivals at Moi International Airport (MBA) or arriving aboard the Madaraka Express at SGR Miritini Terminus, Msanifu Zero Seven guarantees clean, air-conditioned transport straight to Diani Beach, Kwale Town, Nyali, or Malindi.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/booking"
              className="px-6 py-3 bg-gradient-to-r from-amber-300 to-amber-500 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plane className="w-4 h-4" />
              <span>Book Airport / SGR Transfer</span>
            </Link>

            <Link
              to="/quotation"
              className="px-6 py-3 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 font-semibold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Group Transfer Quote (20 Pax)</span>
            </Link>

            <a
              href="tel:+254729255154"
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-xs sm:text-sm rounded-lg border border-slate-700 transition-colors"
            >
              Call 0729 255154
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <img
              src="/images/airport_transfer_vip_1793873970135.jpg"
              alt="Moi International Airport & SGR Miritini VIP transfer van and chauffeur"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
              <span className="text-amber-400 font-bold uppercase tracking-wider block text-[10px]">Punctual Meet & Greet</span>
              <span>Toyota Coaster 20-pax bus, Toyota Noah 7-seater & Executive Prado TX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Coastal Transfer Routes Table - Featuring SGR, Diani & Kwale */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white">Popular Airport & SGR Routes</h3>
            <p className="text-xs text-slate-400">Fixed rate tariffs from Moi International Airport (MBA) & SGR Miritini Terminus.</p>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">Includes Driver, Fuel & Flight/Train Tracking</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              from: 'SGR Miritini Terminus',
              to: 'Diani Beach (South Coast)',
              dist: 'Direct via Dongo Kundu bypass',
              rateSmall: 'KSh 5,500',
              rateNoah: 'KSh 7,500',
              rateCoaster: 'KSh 21,000 (20 pax)',
              badge: 'Most Requested'
            },
            {
              from: 'Diani Beach',
              to: 'SGR Miritini Terminus (Return)',
              dist: 'Scheduled for train departure',
              rateSmall: 'KSh 5,500',
              rateNoah: 'KSh 7,500',
              rateCoaster: 'KSh 26,000 (20 pax)',
              badge: 'Return Special'
            },
            {
              from: 'Moi Airport (MBA)',
              to: 'Diani Beach Resorts',
              dist: '45 km · Flight radar sync',
              rateSmall: 'KSh 6,500',
              rateNoah: 'KSh 8,500',
              rateCoaster: 'KSh 22,000 (20 pax)',
              badge: 'Airport Direct'
            },
            {
              from: 'SGR Miritini / Moi MBA',
              to: 'Kwale Town & Shimba Hills',
              dist: 'Scenic coastal hills route',
              rateSmall: 'KSh 6,000',
              rateNoah: 'KSh 8,000',
              rateCoaster: 'KSh 24,000 (20 pax)',
              badge: 'Kwale Scenic'
            },
            {
              from: 'SGR Miritini Terminus',
              to: 'Nyali & Mombasa Island',
              dist: '22 km · ~35 mins',
              rateSmall: 'KSh 3,500',
              rateNoah: 'KSh 5,500',
              rateCoaster: 'KSh 16,000 (20 pax)',
              badge: 'City Shuttle'
            },
            {
              from: 'Moi Airport (MBA)',
              to: 'Kilifi / Watamu / Malindi',
              dist: 'North Coast luxury transfer',
              rateSmall: 'KSh 8,500',
              rateNoah: 'KSh 12,500',
              rateCoaster: 'KSh 32,000 (20 pax)',
              badge: 'North Coast'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {item.from}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  {item.badge}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">To: {item.to}</h4>
              <p className="text-[11px] text-slate-400">{item.dist}</p>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Small car (4 pax):</span>
                  <span className="font-mono font-bold text-white">{item.rateSmall}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Toyota Noah/Voxy (7 pax):</span>
                  <span className="font-mono font-bold text-amber-300">{item.rateNoah}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Toyota Coaster Bus (20 pax):</span>
                  <span className="font-mono font-bold text-emerald-400">{item.rateCoaster}</span>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2">
                <Link
                  to="/booking"
                  className="py-2 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 rounded text-xs font-semibold text-slate-200 text-center transition-colors"
                >
                  Book 1-7 Pax
                </Link>
                <Link
                  to="/quotation"
                  className="py-2 bg-emerald-950/80 hover:bg-emerald-800 rounded text-xs font-semibold text-emerald-300 text-center border border-emerald-500/30 transition-colors"
                >
                  Group Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <Clock className="w-7 h-7 text-emerald-400" />
          <h4 className="text-base font-bold text-white">Live Flight & SGR Train Sync</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Whether your Kenya Airways or Jambojet flight is delayed, or the Madaraka Express arrives ahead of schedule, our dispatch desk monitors timing in real time. Zero waiting surcharges.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <Luggage className="w-7 h-7 text-amber-400" />
          <h4 className="text-base font-bold text-white">Dedicated Luggage Assistance</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            From heavy family suitcases to specialized sports gear, our drivers handle loading and secure tie-downs into spacious boots and overhead racks.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
          <UserCheck className="w-7 h-7 text-sky-400" />
          <h4 className="text-base font-bold text-white">Personalized Arrival Signboard</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Step out of the arrival hall and easily spot your name or group name displayed on an M07 signboard by a courteous driver waiting at the terminal exit.
          </p>
        </div>
      </div>

    </div>
  );
};
