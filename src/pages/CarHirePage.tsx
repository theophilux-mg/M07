import React from 'react';
import { useApp } from '../context/AppContext';
import { dataService } from '../services/dataService';
import { 
  Car, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Fuel, 
  MapPin, 
  FileText, 
  CreditCard 
} from 'lucide-react';

export const CarHirePage: React.FC = () => {
  const { navigateTo } = useApp();
  const vehicles = dataService.getVehicles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Self-Drive & Chauffeur Services
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Car Hire in Mombasa, Kenya
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Whether you need a compact economy runner for quick town errands or a commanding Toyota Prado for coastal business, experience hassle-free hiring with zero hidden costs.
        </p>
      </div>

      {/* 2 Options Comparison Grid: Self-Drive vs Chauffeur */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-[#0F141D] border border-neutral-800 hover:border-[#D4AF37]/50 p-8 rounded-2xl space-y-6 transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#141B26] text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
              Option 01
            </div>
            <h3 className="text-2xl font-bold text-white font-display">Self-Drive Car Hire</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Total freedom to explore the coast at your own pace. Cruise from Nyali to Diani Beach via the Likoni Ferry or Dongo Kundu bypass, or take scenic day drives to Kilifi and Watamu.
            </p>

            <ul className="space-y-2.5 text-xs text-neutral-300 pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Unlimited coastal regional mileage</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Full comprehensive insurance coverage</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>AA Kenya coastal roadside rescue & prompt support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Refundable security deposit via M-Pesa or card</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigateTo('booking')}
            className="w-full py-3 bg-neutral-900 hover:bg-[#D4AF37] hover:text-black text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book Self-Drive</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-[#0F141D] border border-[#D4AF37]/40 p-8 rounded-2xl space-y-6 transition-all flex flex-col justify-between relative shadow-2xl">
          <div className="absolute top-4 right-4 px-3 py-1 rounded bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-wider">
            Most Convenient
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#141B26] text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30">
              Option 02
            </div>
            <h3 className="text-2xl font-bold text-white font-display">Chauffeured Executive Hire</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Relax in air-conditioned luxury while our vetted, experienced local driver handles Mombasa traffic, navigation, parking, and ferry queues.
            </p>

            <ul className="space-y-2.5 text-xs text-neutral-300 pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Zero liability or security deposit required</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Smart, uniformed, certified professional driver</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Local shortcut mastery & tourist destination guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Airport terminal meet & greet included</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => navigateTo('booking')}
            className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black text-xs font-bold rounded-lg hover:brightness-110 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book Chauffeured Ride</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Pricing Quick Reference Table */}
      <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-xl font-bold text-white font-display">M07 Daily Tariffs at a Glance</h3>
            <p className="text-xs text-neutral-400">All prices in Kenya Shillings (KSh). Minimum rental 1 day.</p>
          </div>
          <button
            onClick={() => navigateTo('booking')}
            className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold rounded hover:bg-[#AA820A] transition-colors self-start sm:self-auto cursor-pointer"
          >
            Calculate Trip Cost
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-neutral-400 border-b border-neutral-800">
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Popular Models</th>
                <th className="pb-3 font-semibold">Daily Rate</th>
                <th className="pb-3 font-semibold">Chauffeur Add-on</th>
                <th className="pb-3 font-semibold">Seats / Luggage</th>
                <th className="pb-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {[
                { cat: 'Toyota Coaster (20-seater)', models: 'Executive 20-Passenger Luxury Bus (Group Transport)', rate: 'KSh 22,000', chf: '+KSh 3,500/day', cap: '20 Seats · 16 Bags' },
                { cat: 'Noah / Voxy / Serena', models: 'Toyota Noah / Voxy 7-seater (from 6k/day in Mombasa)', rate: 'From KSh 6,000', chf: '+KSh 2,500/day', cap: '7 Seats · 5 Bags' },
                { cat: 'Small cars', models: 'Toyota Vitz, Axio, Fielder, Demio', rate: 'KSh 3,500', chf: '+KSh 2,000/day', cap: '4-5 Seats · 2-3 Bags' },
                { cat: 'Double cabins 4x4', models: 'Toyota Hilux Revo, Isuzu D-Max', rate: 'KSh 9,000', chf: '+KSh 2,500/day', cap: '5 Seats · 8 Bags' },
                { cat: 'RAV4 Luxury AWD', models: 'Toyota RAV4 Dynamic AWD', rate: 'KSh 7,000', chf: '+KSh 2,500/day', cap: '5 Seats · 4 Bags' },
                { cat: 'Toyota Prado TX/TZ', models: 'Land Cruiser Prado Luxury 7-Seater', rate: 'KSh 15,000', chf: '+KSh 3,000/day', cap: '7 Seats · 6 Bags' },
                { cat: 'Land Cruiser V8 / LC300', models: 'Toyota Land Cruiser V8 / LC300', rate: 'KSh 28,000', chf: '+KSh 3,500/day', cap: '7 Seats · 7 Bags' },
                { cat: 'Passenger Vans', models: 'HiAce Shark 10-seater, Commuter 14s', rate: 'KSh 9,000 – 18,000', chf: '+KSh 2,500 - 3,000/day', cap: '10-14 Seats · 8-10 Bags' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-neutral-900/50">
                  <td className="py-3 font-bold text-white">{row.cat}</td>
                  <td className="py-3 text-neutral-300">{row.models}</td>
                  <td className="py-3 font-mono font-bold text-[#D4AF37]">{row.rate}</td>
                  <td className="py-3 font-mono text-neutral-400">{row.chf}</td>
                  <td className="py-3 text-neutral-400">{row.cap}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => navigateTo('booking')}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-[#D4AF37] hover:text-black rounded text-[11px] font-medium transition-colors"
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Step by Step Rental Guide */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white text-center font-display">How Simple It Is to Rent with M07</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="bg-[#0F141D] border border-neutral-800 p-5 rounded-xl space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-[#141B26] text-[#D4AF37] font-bold font-mono flex items-center justify-center mx-auto border border-[#D4AF37]/30">1</span>
            <h4 className="text-sm font-bold text-white">Select Vehicle</h4>
            <p className="text-xs text-neutral-400">Choose your model according to seats, style, and budget.</p>
          </div>
          <div className="bg-[#0F141D] border border-neutral-800 p-5 rounded-xl space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-[#141B26] text-[#D4AF37] font-bold font-mono flex items-center justify-center mx-auto border border-[#D4AF37]/30">2</span>
            <h4 className="text-sm font-bold text-white">Select Dates</h4>
            <p className="text-xs text-neutral-400">Instant check prevents date overlaps and reserves your slot.</p>
          </div>
          <div className="bg-[#0F141D] border border-neutral-800 p-5 rounded-xl space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-[#141B26] text-[#D4AF37] font-bold font-mono flex items-center justify-center mx-auto border border-[#D4AF37]/30">3</span>
            <h4 className="text-sm font-bold text-white">Airport / Villa Handover</h4>
            <p className="text-xs text-neutral-400">We deliver your washed, inspected car right to your location.</p>
          </div>
          <div className="bg-[#0F141D] border border-neutral-800 p-5 rounded-xl space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-[#141B26] text-[#D4AF37] font-bold font-mono flex items-center justify-center mx-auto border border-[#D4AF37]/30">4</span>
            <h4 className="text-sm font-bold text-white">Drive & Return</h4>
            <p className="text-xs text-neutral-400">Simple return check; instant security deposit release.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
