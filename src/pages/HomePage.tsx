import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dataService } from '../services/dataService';
import { COASTAL_LOCATIONS, TOUR_PACKAGES } from '../data/fleetData';
import { 
  ShieldCheck, 
  Car, 
  Plane, 
  MapPin, 
  Calendar, 
  Star, 
  ArrowRight, 
  Clock, 
  Check, 
  Sparkles, 
  Award, 
  Phone 
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, openVoucherModal } = useApp();
  const vehicles = dataService.getVehicles();
  const reviews = dataService.getReviews().filter(r => r.approved);

  // Quick booking calculator state in Hero
  const [quickCategory, setQuickCategory] = useState<string>('Prado');
  const [quickDays, setQuickDays] = useState<number>(3);
  const [quickChauffeur, setQuickChauffeur] = useState<boolean>(true);

  // Find sample vehicle for quick estimate
  const sampleVehicle = vehicles.find(v => v.category === quickCategory) || vehicles[0];
  const estDaily = sampleVehicle?.pricePerDay || 15000;
  const estChauffeur = quickChauffeur ? (sampleVehicle?.chauffeurDailyRate || 3000) * quickDays : 0;
  const estTotal = (estDaily * quickDays) + estChauffeur;

  return (
    <div className="space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-8 pb-16 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141B26] border border-[#D4AF37]/30 text-xs text-[#D4AF37]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                <span className="font-semibold tracking-wider uppercase">Mombasa’s Elite Automotive Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight font-display">
                Pure Coastal Luxury. <br />
                <span className="gold-gradient-text">Uncompromising Reliability.</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
                From self-drive exploration along the Diani and Malindi coastlines to VIP terminal transfers at Moi International Airport (MBA). Drive premium Toyota Prados, executive vans, and reliable SUVs from <strong className="text-[#D4AF37]">KSh 3,500/day</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('booking')}
                  className="px-7 py-3.5 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA820A] text-[#080B10] font-bold text-sm rounded-lg shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Reserve a Vehicle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('fleet')}
                  className="px-7 py-3.5 bg-neutral-900 hover:bg-neutral-850 text-white font-medium text-sm rounded-lg border border-neutral-700 hover:border-[#D4AF37]/50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Car className="w-4 h-4 text-[#D4AF37]" />
                  <span>View All Fleet</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-xl font-extrabold text-white font-display block">100%</span>
                  <span className="text-neutral-400">Insured & AA Roadside</span>
                </div>
                <div>
                  <span className="text-xl font-extrabold text-[#D4AF37] font-display block">0 Overlap</span>
                  <span className="text-neutral-400">Guaranteed Confirmation</span>
                </div>
                <div>
                  <span className="text-xl font-extrabold text-white font-display block">24 / 7</span>
                  <span className="text-neutral-400">Mombasa Concierge</span>
                </div>
              </div>
            </div>

            {/* Right Visual & Quick Estimator Column */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Featured Showcase Card with generated high-fidelity asset */}
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative group bg-[#0F141D]">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src="/src/assets/images/hero_m07_fleet_1793873968288.jpg"
                    alt="M07 Executive Fleet at Mombasa Ocean View"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F141D] via-transparent to-black/30"></div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-xs text-[#D4AF37] font-bold">
                    Nyali & Moi MBA Ready
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">Featured Flagship</p>
                    <p className="text-base font-bold text-white">Toyota Land Cruiser Prado TX / TZ</p>
                    <p className="text-xs text-neutral-300">Daily rate: KSh 15,000 / day</p>
                  </div>
                </div>

                {/* Quick Estimator Widget */}
                <div className="p-5 bg-[#0F141D] border-t border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-800">
                    <span className="font-bold text-white uppercase tracking-wider">Live Rental Calculator</span>
                    <span className="text-[#D4AF37]">Original M07 Rates</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-neutral-400 block mb-1">Vehicle Category</label>
                      <select
                        value={quickCategory}
                        onChange={(e) => setQuickCategory(e.target.value)}
                        className="w-full p-2 bg-[#080B10] border border-neutral-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Small cars">Small cars (KSh 3,500)</option>
                        <option value="Noah/Voxy/Serena">Noah / Voxy (KSh 6k-8k)</option>
                        <option value="RAV4">Toyota RAV4 (KSh 7,000)</option>
                        <option value="Double cabins">Double Cabins (KSh 9,000)</option>
                        <option value="Prado">Toyota Prado (KSh 15,000)</option>
                        <option value="Land Cruiser">Land Cruiser V8 (KSh 28,000)</option>
                        <option value="Passenger vans">Passenger Vans (KSh 9k-18k)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-neutral-400 block mb-1">Rental Duration</label>
                      <select
                        value={quickDays}
                        onChange={(e) => setQuickDays(Number(e.target.value))}
                        className="w-full p-2 bg-[#080B10] border border-neutral-700 rounded text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value={1}>1 Day</option>
                        <option value={2}>2 Days</option>
                        <option value={3}>3 Days</option>
                        <option value={5}>5 Days</option>
                        <option value={7}>7 Days (Weekly Discount)</option>
                        <option value={14}>14 Days</option>
                        <option value={30}>30 Days (Monthly)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                      <input
                        type="checkbox"
                        checked={quickChauffeur}
                        onChange={(e) => setQuickChauffeur(e.target.checked)}
                        className="rounded accent-[#D4AF37]"
                      />
                      <span>Include Professional Chauffeur</span>
                    </label>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 block">Est. Investment:</span>
                      <span className="text-base font-extrabold text-[#D4AF37] font-mono">
                        KSh {estTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (sampleVehicle) {
                        navigateTo('booking', { vehicleId: sampleVehicle.id });
                      } else {
                        navigateTo('booking');
                      }
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#080B10] font-bold text-xs rounded hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Proceed with {sampleVehicle?.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. ORIGINAL M07 PRICING TIERS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Transparent Coastal Rates</span>
          <h2 className="text-3xl font-extrabold text-white mt-2 font-display">The M07 Fleet & Pricing Standard</h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Exact, honest tariffs based on genuine Kenyan automotive market values. Never inflated, always confirmed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              category: 'Small cars',
              rate: 'KSh 3,500',
              unit: '/ day',
              examples: 'Toyota Vitz, Axio, Fielder, Demio',
              desc: 'Fuel efficient, compact ease for town errands & city cruising.',
              icon: Car,
              tag: 'Best Economy'
            },
            {
              category: 'Noah / Voxy / Serena',
              rate: 'KSh 6,000 – 8,000',
              unit: '/ day',
              examples: 'Toyota Noah Si, Voxy ZS, Serena',
              desc: '7–8 passenger executive shuttles with captain seats & dual AC.',
              icon: Car,
              tag: 'Family Favorite'
            },
            {
              category: 'RAV4 Luxury AWD',
              rate: 'KSh 7,000',
              unit: '/ day',
              examples: 'Toyota RAV4 Dynamic AWD',
              desc: 'Sleek compact crossover for stylish coastal highway drives.',
              icon: Car,
              tag: 'Popular'
            },
            {
              category: 'Double Cabins 4x4',
              rate: 'KSh 9,000',
              unit: '/ day',
              examples: 'Toyota Hilux Revo, Isuzu D-Max',
              desc: 'High ground clearance, heavy-duty canopy, rough track ready.',
              icon: Car,
              tag: 'Rugged 4WD'
            },
            {
              category: 'Toyota Prado TX/TZ',
              rate: 'KSh 15,000',
              unit: '/ day',
              examples: 'Land Cruiser Prado Luxury 7-Seater',
              desc: 'Commanding prestige, cool box, leather interior, VIP standard.',
              icon: Award,
              tag: 'Executive Choice'
            },
            {
              category: 'Land Cruiser V8 / LC300',
              rate: 'KSh 28,000',
              unit: '/ day',
              examples: 'V8 Executive / Safari Cruiser',
              desc: 'The pinnacle of African prestige, diplomatic security & safari.',
              icon: Sparkles,
              tag: 'VIP Ultimate'
            },
            {
              category: 'Passenger Vans',
              rate: 'KSh 9,000 – 18,000',
              unit: '/ day',
              examples: 'HiAce 10-seater, Commuter 14-seater',
              desc: 'High roof group mobility for corporate delegates and tours.',
              icon: Car,
              tag: 'Group Travel'
            },
            {
              category: 'Airport Meet & Greet',
              rate: 'Flat Zone Rates',
              unit: 'per trip',
              examples: 'Moi Airport MBA to Nyali, Diani, Bamburi',
              desc: 'Uniformed chauffeur waiting at terminal hall with flight tracking.',
              icon: Plane,
              tag: 'Airport Specialist'
            }
          ].map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <div 
                key={idx}
                className="bg-[#0F141D] border border-neutral-800 hover:border-[#D4AF37]/50 p-6 rounded-2xl transition-all hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#141B26] text-[#D4AF37] border border-[#D4AF37]/30">
                      {tier.tag}
                    </span>
                    <Icon className="w-5 h-5 text-neutral-500 group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display">{tier.category}</h3>
                  <div className="mt-2 mb-3">
                    <span className="text-xl font-extrabold text-[#D4AF37] font-mono">{tier.rate}</span>
                    <span className="text-xs text-neutral-400 ml-1">{tier.unit}</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-medium">{tier.examples}</p>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{tier.desc}</p>
                </div>

                <button
                  onClick={() => navigateTo('fleet')}
                  className="mt-6 w-full py-2 bg-neutral-900 group-hover:bg-[#D4AF37] group-hover:text-black text-neutral-300 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Select Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CORE SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-8 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">Moi Airport (MBA) Transfers</h3>
            <p className="text-xs leading-relaxed text-neutral-400">
              Never get stranded at the coastal airport terminal. Our chauffeur tracks your flight in real time, assists with your heavy luggage, and whisks you straight to your oceanfront resort or villa in Nyali, Bamburi, or Diani.
            </p>
            <button
              onClick={() => navigateTo('transfers')}
              className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 pt-2 cursor-pointer"
            >
              Learn about Airport Transfers <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-8 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">Self-Drive Freedom</h3>
            <p className="text-xs leading-relaxed text-neutral-400">
              Experience Coastal Kenya on your own terms. Unlimited regional mileage across Mombasa, Kilifi, Watamu, and Kwale. Clean handover, transparent fuel policy, and instant deposit refund upon scheduled return.
            </p>
            <button
              onClick={() => navigateTo('car-hire')}
              className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 pt-2 cursor-pointer"
            >
              Explore Self-Drive Conditions <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-8 space-y-4 hover:border-[#D4AF37]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">VIP Chauffeur & Escort</h3>
            <p className="text-xs leading-relaxed text-neutral-400">
              Punctual, vetted professional drivers dressed in formal suits. Discreet, road-savvy, and trained in diplomatic protocols, executive business meetings, weddings, and high-profile delegations.
            </p>
            <button
              onClick={() => navigateTo('chauffeur')}
              className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 pt-2 cursor-pointer"
            >
              View Chauffeur Protocol <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. CURATED TOURS & SAFARIS TEASER */}
      <section className="bg-[#05070A] py-16 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Excursions & Safaris</span>
              <h2 className="text-3xl font-extrabold text-white mt-1 font-display">Signature Coastal Journeys</h2>
              <p className="text-xs text-neutral-400 mt-1">Discover Fort Jesus, Wasini Island dolphins, and Tsavo wildlife in M07 comfort.</p>
            </div>
            <button
              onClick={() => navigateTo('tours')}
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg border border-neutral-800 transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <span>Explore All Tours</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOUR_PACKAGES.map(pkg => (
              <div 
                key={pkg.id}
                className="bg-[#0F141D] border border-neutral-800 rounded-xl overflow-hidden group hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] text-[#D4AF37] font-bold border border-[#D4AF37]/30">
                    {pkg.duration}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {pkg.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-850 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 block">From</span>
                      <span className="text-sm font-bold text-[#D4AF37] font-mono">
                        KSh {pkg.priceKsh.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => navigateTo('tours')}
                      className="px-3 py-1.5 bg-[#141B26] hover:bg-[#D4AF37] hover:text-black text-white text-[11px] font-semibold rounded transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VERIFIED REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Client Endorsements</span>
          <h2 className="text-3xl font-extrabold text-white mt-1 font-display">Trusted By Discerning Travelers</h2>
          <p className="text-xs text-neutral-400 mt-1">Real feedback from business leaders, international visitors, and families.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map(rev => (
            <div 
              key={rev.id}
              className="bg-[#0F141D] border border-neutral-800 p-5 rounded-xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-850">
                <p className="text-xs font-bold text-white">{rev.author}</p>
                <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-0.5">
                  <span>{rev.location}</span>
                  <span className="text-[#D4AF37] font-medium">{rev.vehicleHired}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-r from-[#0F141D] via-[#141B26] to-[#0A192F] p-8 sm:p-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Ready to Travel?</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Reserve Your Vehicle in Under 2 Minutes.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Immediate reservation reference, automatic conflict check to ensure zero overlapping bookings, and instant M-Pesa or card confirmation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('booking')}
              className="px-7 py-3.5 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA820A] text-[#080B10] font-bold text-sm rounded-lg shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Start Reservation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:+254729255154"
              className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm rounded-lg border border-neutral-700 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call +254 729 255 154</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
