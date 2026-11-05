import React from 'react';
import { useApp } from '../context/AppContext';
import { TOUR_PACKAGES } from '../data/fleetData';
import { 
  Compass, 
  Clock, 
  MapPin, 
  Check, 
  Car, 
  ArrowRight, 
  Star 
} from 'lucide-react';

export const CityToursPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Authentic Coastal Kenya Experiences
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Mombasa City Tours & Coastal Safaris
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Discover the rich history of Fort Jesus, sail with wild dolphins in Wasini, or venture into the untamed red wilderness of Tsavo in our safari-ready vehicles.
        </p>
      </div>

      {/* Tour Packages Cards */}
      <div className="space-y-12">
        {TOUR_PACKAGES.map((pkg, idx) => (
          <div
            key={pkg.id}
            className="bg-[#0F141D] border border-neutral-800 hover:border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl transition-all grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F141D] via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-[#0F141D]"></div>

              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/75 backdrop-blur-md border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37]">
                {pkg.duration}
              </div>
            </div>

            {/* Content Column (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Package #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white font-display">
                  {pkg.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Itinerary Highlights */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Experience Highlights:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stops */}
                <div className="text-xs text-neutral-400 flex items-center gap-2 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <span>Key Stops: <strong className="text-neutral-200">{pkg.destinations.join(' · ')}</strong></span>
                </div>
              </div>

              {/* Bottom Tariff & Action */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-neutral-500 block">Package Tariff</span>
                  <span className="text-2xl font-black text-[#D4AF37] font-mono">
                    KSh {pkg.priceKsh.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-neutral-400 block mt-0.5">
                    Recommended: {pkg.recommendedVehicle}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/254729255154?text=${encodeURIComponent(
                      `Hello M07, I would like to book the "${pkg.title}" tour package.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    WhatsApp Inquire
                  </a>
                  <button
                    onClick={() => navigateTo('booking')}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black rounded-lg text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Tour Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
