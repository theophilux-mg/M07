import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { dataService } from '../services/dataService';
import { COASTAL_LOCATIONS, TOUR_PACKAGES } from '../data/fleetData';
import { 
  ShieldCheck, 
  Car, 
  Plane, 
  Calendar, 
  Star, 
  ArrowRight, 
  Clock, 
  Check, 
  Sparkles, 
  Award, 
  Phone,
  Users,
  Compass,
  MessageCircle,
  Shield
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useApp();
  const vehicles = dataService.getVehicles();
  const reviews = dataService.getReviews().filter(r => r.approved);

  // Quick booking calculator state in Hero
  const [quickCategory, setQuickCategory] = useState<string>('Toyota Coaster (20-seater)');
  const [quickDays, setQuickDays] = useState<number>(3);
  const [quickChauffeur, setQuickChauffeur] = useState<boolean>(true);

  // Find sample vehicle for quick estimate
  const sampleVehicle = vehicles.find(v => v.category === quickCategory) || vehicles[0];
  const estDaily = sampleVehicle?.pricePerDay || 22000;
  const estChauffeur = quickChauffeur ? (sampleVehicle?.chauffeurDailyRate || 3500) * quickDays : 0;
  const estTotal = (estDaily * quickDays) + estChauffeur;

  return (
    <div className="space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-8 pb-16 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-semibold tracking-wider uppercase">Msanifu Zero Seven Tour and Travel</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                Your Travel Partner for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-sky-400">
                  Memorable Journeys.
                </span>
              </h1>

              <p className="text-lg text-amber-300 font-semibold tracking-wide">
                Travel in Comfort and Style · Explore Kenya with Us!
              </p>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Mombasa's reliable automotive and travel specialist. From the <strong className="text-white">Toyota Noah/Voxy 7-seater</strong> (from KSh 6,000/day in Mombasa) to our <strong className="text-emerald-400">20-Passenger Toyota Coaster bus</strong>, executive Prados, and prompt SGR Miritini / Moi Airport (MBA) transfers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/booking"
                  className="px-7 py-3.5 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm rounded-lg shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Vehicle Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/quotation"
                  className="px-7 py-3.5 bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-200 font-semibold text-sm rounded-lg border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Request Group Quotation</span>
                </Link>

                <a
                  href="tel:+254729255154"
                  className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-sm rounded-lg border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>0729 255154</span>
                </a>
              </div>

              {/* Trust Indicators - Real Brand Values */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-lg font-extrabold text-white block">A Phone Call Away</span>
                  <span className="text-slate-400">Direct Hotline: 0729 255154</span>
                </div>
                <div>
                  <span className="text-lg font-extrabold text-amber-400 block">From KSh 6,000</span>
                  <span className="text-slate-400">Noah/Voxy Mombasa Day Hire</span>
                </div>
                <div>
                  <span className="text-lg font-extrabold text-emerald-400 block">20 Pax Coaster</span>
                  <span className="text-slate-400">Group Transport & Tours</span>
                </div>
              </div>
            </div>

            {/* Right Visual & Quick Estimator Column */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Featured Showcase Card */}
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative group bg-slate-900/90">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src="/images/hero_m07_fleet_1793873968288.jpg"
                    alt="Msanifu Zero Seven Fleet in Mombasa"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30"></div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-emerald-500/40 text-xs text-emerald-300 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    SGR & Airport Ready
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Fleet Highlight</p>
                    <p className="text-base font-bold text-white">Toyota Noah / Voxy 7-Seater</p>
                    <p className="text-xs text-emerald-300">Daily hire within Mombasa: from KSh 6,000 / day</p>
                  </div>
                </div>

                {/* Quick Estimator Widget */}
                <div className="p-5 bg-slate-950/80 border-t border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="font-bold text-white uppercase tracking-wider">Instant Rate Estimator</span>
                    <span className="text-amber-400">Original M07 Tariffs</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Vehicle Category</label>
                      <select
                        value={quickCategory}
                        onChange={(e) => setQuickCategory(e.target.value)}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-emerald-500 text-xs"
                      >
                        <option value="Toyota Coaster (20-seater)">Toyota Coaster 20 Pax (KSh 22k)</option>
                        <option value="Noah/Voxy/Serena">Noah / Voxy (from KSh 6k)</option>
                        <option value="Small cars">Small cars (KSh 3,500)</option>
                        <option value="RAV4">Toyota RAV4 (KSh 7,000)</option>
                        <option value="Double cabins">Double Cabins (KSh 9,000)</option>
                        <option value="Prado">Toyota Prado TX (KSh 15,000)</option>
                        <option value="Land Cruiser">Land Cruiser Safari (KSh 28,000)</option>
                        <option value="Passenger vans">Passenger Vans (KSh 14,000)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Rental Duration</label>
                      <select
                        value={quickDays}
                        onChange={(e) => setQuickDays(Number(e.target.value))}
                        className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-white focus:outline-none focus:border-emerald-500 text-xs"
                      >
                        <option value={1}>1 Day</option>
                        <option value={2}>2 Days</option>
                        <option value={3}>3 Days</option>
                        <option value={5}>5 Days</option>
                        <option value={7}>7 Days (Discounted)</option>
                        <option value={14}>14 Days</option>
                        <option value={30}>30 Days (Monthly)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={quickChauffeur}
                        onChange={(e) => setQuickChauffeur(e.target.checked)}
                        className="rounded accent-emerald-500"
                      />
                      <span>Include Professional Driver</span>
                    </label>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Est. Cost:</span>
                      <span className="text-base font-extrabold text-amber-300 font-mono">
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
                    className="w-full py-2.5 bg-gradient-to-r from-amber-300 to-amber-500 text-slate-950 font-bold text-xs rounded hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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

      {/* 2. FOUR CORE PILLARS FROM THE FLYER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">The Msanifu Zero Seven Commitment</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Travel in Comfort and Style
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Built on four unshakeable pillars to ensure your coastal journeys and safari expeditions are seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Safe & Comfortable Transport</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Meticulously maintained vehicles equipped with heavy-duty coastal air conditioning, sanitized interiors, and full comprehensive insurance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-950/70 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Professional Drivers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Courteous, vetted local chauffeurs with deep navigation knowledge of Mombasa Island, Diani Beach, Kwale roads, and SGR Miritini bypasses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-sky-950/70 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Reliable & On Time</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero delays. Punctual airport and SGR meet & greet synchronized with your flight or Madaraka Express train arrival time.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Tours & Travel Packages</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Customized scenic coastal excursions, Diani beach transfers, Shimba Hills safaris, and 20-passenger Coaster group hire.
            </p>
          </div>
        </div>
      </section>

      {/* 3. GROUP QUOTATION & COASTER FEATURE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" /> Group Travel & Coaster 20-Pax Bus
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Planning a Group Trip to Diani, Kwale, or SGR?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Our 20-passenger Toyota Coaster bus is equipped with dual heavy-duty air conditioning, high-back reclining seats, PA sound system, and generous luggage capacity. Request a tailored multi-leg quotation with instant per-person calculation!
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/quotation"
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:brightness-110 shadow-lg shadow-amber-950/50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4" /> Build Group Quotation
                </Link>
                <a
                  href="https://wa.me/254729255154?text=Hello%20M07%2C%20I%20would%20like%20a%20quotation%20for%20the%2020-seater%20Toyota%20Coaster%20bus."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-emerald-200 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/40 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Quotation Desk
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <img 
                src="/images/airport_transfer_vip_1793873970135.jpg" 
                alt="Toyota Coaster Group Bus" 
                className="w-full h-56 object-cover"
              />
              <div className="p-4 bg-slate-950/90 text-xs space-y-1">
                <p className="text-white font-bold">Toyota Coaster (20-Passenger Bus)</p>
                <p className="text-emerald-400">Ideal for conferences, weddings, SGR & Diani tours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ORIGINAL M07 PRICING TIERS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Transparent Coastal Rates</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Our Fleet & Original Tariffs</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Exact, honest tariffs based on genuine coastal market rates. Never inflated, always confirmed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              category: 'Toyota Noah / Voxy 7-Seater',
              rate: 'From KSh 6,000',
              unit: '/ day in Mombasa',
              examples: 'Spacious 7-seater, dual AC, power sliding doors',
              desc: 'From KSh 6,000 per day, daily hire within Mombasa. Spacious, air-conditioned, ideal for tours and transfers.',
              icon: Car,
              tag: 'Flyer Featured',
              highlight: true
            },
            {
              category: 'Toyota Coaster (20-Seater)',
              rate: 'KSh 22,000',
              unit: '/ day',
              examples: '20 passengers, PA system, overhead racks',
              desc: 'Executive group bus for corporate teams, weddings, SGR transfers, and coastal excursions.',
              icon: Users,
              tag: 'Group Choice',
              highlight: true
            },
            {
              category: 'Small Cars (Daily Hire)',
              rate: 'KSh 3,500',
              unit: '/ day',
              examples: 'Toyota Vitz, Axio, Demio',
              desc: 'Fuel efficient, compact ease for town errands & Mombasa city cruising.',
              icon: Car,
              tag: 'Best Economy',
              highlight: false
            },
            {
              category: 'Toyota RAV4 AWD',
              rate: 'KSh 7,000',
              unit: '/ day',
              examples: 'Toyota RAV4 Dynamic AWD',
              desc: 'Sleek compact crossover for stylish coastal highway drives between Mombasa & Diani.',
              icon: Car,
              tag: 'Popular',
              highlight: false
            },
            {
              category: 'Double Cabins 4x4',
              rate: 'KSh 9,000',
              unit: '/ day',
              examples: 'Toyota Hilux Revo, Isuzu D-Max 4WD',
              desc: 'High ground clearance, heavy-duty canopy bed, Kwale rural & rough track ready.',
              icon: Car,
              tag: 'Rugged 4WD',
              highlight: false
            },
            {
              category: 'Toyota Prado TX/TZ',
              rate: 'KSh 15,000',
              unit: '/ day',
              examples: 'Land Cruiser Prado Executive 7-Seater',
              desc: 'Commanding prestige, cool box, plush interior, VIP and delegation standard.',
              icon: Award,
              tag: 'Executive Choice',
              highlight: false
            },
            {
              category: 'Land Cruiser Safari Cruiser / V8',
              rate: 'KSh 28,000',
              unit: '/ day',
              examples: 'Safari Cruiser with pop-up roof / V8',
              desc: 'The pinnacle of African travel, safari exploration across Shimba Hills and Tsavo.',
              icon: Sparkles,
              tag: 'Safari Ready',
              highlight: false
            },
            {
              category: 'Passenger Vans (10-14 Seater)',
              rate: 'KSh 9,000 – 18,000',
              unit: '/ day',
              examples: 'Toyota HiAce Executive Van',
              desc: 'High roof group mobility for airport runs, family safaris, and coastal tours.',
              icon: Car,
              tag: 'Group Travel',
              highlight: false
            }
          ].map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <div 
                key={idx}
                className={`bg-slate-900/70 border ${tier.highlight ? 'border-emerald-500/40 bg-gradient-to-b from-slate-900 to-emerald-950/20' : 'border-slate-800'} p-6 rounded-2xl transition-all hover:-translate-y-1 group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${tier.highlight ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-amber-400'}`}>
                      {tier.tag}
                    </span>
                    <Icon className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-white">{tier.category}</h3>
                  <div className="mt-2 mb-3">
                    <span className="text-xl font-extrabold text-amber-300 font-mono">{tier.rate}</span>
                    <span className="text-xs text-slate-400 ml-1">{tier.unit}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{tier.examples}</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tier.desc}</p>
                </div>

                <Link
                  to="/fleet"
                  className="mt-6 w-full py-2 bg-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CURATED TOURS & SAFARIS TEASER */}
      <section className="bg-slate-950/60 py-16 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Excursions & Safaris</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Signature Coastal Journeys</h2>
              <p className="text-xs text-slate-400 mt-1">Diani Beach, Kwale Town day hire, SGR Miritini heritage tours, and Wasini Island.</p>
            </div>
            <Link
              to="/city-tours"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg border border-slate-800 transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <span>Explore All Tours</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOUR_PACKAGES.map(pkg => (
              <div 
                key={pkg.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden group hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] text-amber-300 font-bold border border-amber-400/30">
                    {pkg.duration}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {pkg.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block">From</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        KSh {pkg.priceKsh.toLocaleString()}
                      </span>
                    </div>
                    <Link
                      to="/city-tours"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 text-[11px] font-semibold rounded transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HONEST REVIEWS SECTION (EMPTY STATE HONESTY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Client Feedback</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Customer Reviews</h2>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-10 text-center max-w-xl mx-auto space-y-3">
            <Star className="w-8 h-8 text-amber-400/40 mx-auto" />
            <p className="text-white font-bold text-base">No reviews yet.</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Be the first to share your journey with Msanifu Zero Seven! Book your vehicle or transfer today and let us know about your experience.
            </p>
            <div className="pt-2">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors"
              >
                <span>Book Your First Trip</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map(rev => (
              <div 
                key={rev.id}
                className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <p className="text-xs font-bold text-white">{rev.author}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>{rev.location}</span>
                    <span className="text-amber-400 font-medium">{rev.vehicleHired}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-8 sm:p-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">A Phone Call Away</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Reserve Your Coastal Journey?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Instant reservation reference, date conflict check to guarantee zero double bookings, and transparent Lipa Na M-Pesa payments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/booking"
              className="px-7 py-3.5 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm rounded-lg shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Start Reservation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:+254729255154"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>0729 255154</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
