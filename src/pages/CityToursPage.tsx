import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TOUR_PACKAGES } from '../data/fleetData';
import { 
  Compass, 
  Clock, 
  MapPin, 
  Check, 
  Car, 
  ArrowRight, 
  Star,
  Users,
  Phone,
  MessageCircle
} from 'lucide-react';

export const CityToursPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300 font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-emerald-400" /> Explore Kenya with Us!
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          Mombasa City Tours, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-sky-400">
            Diani Beach & Kwale Town Day Hire
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From full-day private hire to Diani Beach and Kwale Town, to SGR Miritini arrivals and Swahili heritage trails. Travel in comfort with professional drivers and well-maintained vehicles.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/quotation"
            className="px-5 py-2.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Users className="w-4 h-4 text-emerald-400" /> Group Quotation (20 Pax Coaster)
          </Link>
          <a
            href="tel:+254729255154"
            className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" /> Dispatch: 0729 255154
          </a>
        </div>
      </div>

      {/* Kwale & Diani Day Hire Feature Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
            Featured Day Hire Route
          </span>
          <h3 className="text-lg font-bold text-white">
            Diani Beach & Kwale Town Dedicated Day Hire
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Full-day dedicated vehicle hire (up to 10 hours) including experienced driver. Explore Diani's coastline, Shimba Hills National Reserve, Sheldrick Falls, and rural Kwale culture.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/quotation"
            className="px-5 py-2.5 bg-gradient-to-r from-amber-300 to-amber-500 text-slate-950 rounded-lg text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5"
          >
            <span>Quote 20-Pax Coaster</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Tour Packages Cards */}
      <div className="space-y-12">
        {TOUR_PACKAGES.map((pkg, idx) => (
          <div
            key={pkg.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900"></div>

              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/75 backdrop-blur-md border border-amber-400/30 text-xs font-bold text-amber-300">
                {pkg.duration}
              </div>
            </div>

            {/* Content Column (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                    Package #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {pkg.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Itinerary Highlights */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Experience Highlights:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stops */}
                <div className="text-xs text-slate-400 flex items-center gap-2 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Key Locations: <strong className="text-slate-200">{pkg.destinations.join(' · ')}</strong></span>
                </div>
              </div>

              {/* Bottom Tariff & Action */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 block">Package Tariff</span>
                  <span className="text-2xl font-black text-amber-300 font-mono">
                    KSh {pkg.priceKsh.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Recommended: {pkg.recommendedVehicle}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/254729255154?text=${encodeURIComponent(
                      `Hello Msanifu Zero Seven, I would like to inquire about the "${pkg.title}" tour package.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Inquire
                  </a>
                  <Link
                    to="/booking"
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-300 to-amber-500 text-slate-950 rounded-lg text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
