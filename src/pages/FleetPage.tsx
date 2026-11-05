import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dataService } from '../services/dataService';
import { VehicleCategory } from '../types';
import { 
  Users, 
  Briefcase, 
  Gauge, 
  Fuel, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';

export const FleetPage: React.FC = () => {
  const { navigateTo } = useApp();
  const vehicles = dataService.getVehicles();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    'All',
    'Small cars',
    'Noah/Voxy/Serena',
    'Double cabins',
    'RAV4',
    'Prado',
    'Land Cruiser',
    'Passenger vans'
  ];

  const filteredVehicles = vehicles.filter(v => {
    const matchesCat = activeCategory === 'All' || v.category === activeCategory;
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Curated Prestige Fleet
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Our Vehicle Fleet Catalogue
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Every vehicle in our Mombasa collection is meticulously maintained, sanitized, fully insured, and prepared for immediate self-drive or executive chauffeur assignment.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 bg-[#0F141D] rounded-2xl border border-neutral-800">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#080B10] shadow'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search model, feature, or seats..."
            className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map(veh => (
          <div
            key={veh.id}
            className="bg-[#0F141D] border border-neutral-800 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Image Container with Badges */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-950">
                <img
                  src={veh.image}
                  alt={veh.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F141D] via-transparent to-black/20"></div>

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30 uppercase tracking-wide">
                    {veh.category}
                  </span>
                  {veh.isPopular && (
                    <span className="px-2 py-1 rounded bg-[#D4AF37] text-[10px] font-bold text-black uppercase tracking-wide">
                      Popular
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold backdrop-blur-md ${
                    veh.isAvailable 
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700' 
                      : 'bg-red-950/80 text-red-300 border border-red-800'
                  }`}>
                    {veh.isAvailable ? 'Available' : 'Reserved'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-300 font-medium">
                  <span>Year {veh.modelYear}</span>
                  <span className="text-white font-mono">
                    <strong className="text-base text-[#D4AF37] font-bold">KSh {veh.pricePerDay.toLocaleString()}</strong>
                    <span className="text-[11px] text-neutral-400"> / day</span>
                  </span>
                </div>
              </div>

              {/* Specs & Description */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors font-display">
                    {veh.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {veh.description}
                  </p>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-4 gap-2 py-3 border-y border-neutral-850 text-center text-xs">
                  <div className="flex flex-col items-center">
                    <Users className="w-3.5 h-3.5 text-neutral-400 mb-1" />
                    <span className="font-semibold text-white">{veh.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Briefcase className="w-3.5 h-3.5 text-neutral-400 mb-1" />
                    <span className="font-semibold text-white">{veh.luggageCapacity} Bags</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Gauge className="w-3.5 h-3.5 text-neutral-400 mb-1" />
                    <span className="font-semibold text-white text-[11px]">{veh.transmission}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Fuel className="w-3.5 h-3.5 text-neutral-400 mb-1" />
                    <span className="font-semibold text-white text-[11px]">{veh.fuelType}</span>
                  </div>
                </div>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {veh.features.slice(0, 3).map((feat, i) => (
                    <span 
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
                    >
                      {feat}
                    </span>
                  ))}
                  {veh.features.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500">
                      +{veh.features.length - 3} more
                    </span>
                  )}
                </div>

                {/* Chauffeur rate info */}
                <div className="text-[11px] text-neutral-400 flex items-center justify-between pt-1">
                  <span>Chauffeur add-on:</span>
                  <span className="font-mono text-neutral-200">+KSh {veh.chauffeurDailyRate.toLocaleString()}/day</span>
                </div>
              </div>
            </div>

            {/* Action Card Bottom */}
            <div className="p-5 pt-0">
              <button
                onClick={() => navigateTo('booking', { vehicleId: veh.id })}
                disabled={!veh.isAvailable}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-[#D4AF37] hover:text-[#080B10] disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{veh.isAvailable ? 'Reserve This Vehicle' : 'Currently Reserved'}</span>
                {veh.isAvailable && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-16 bg-[#0F141D] rounded-2xl border border-neutral-800 space-y-3">
          <p className="text-neutral-400 text-sm">No vehicles found matching your criteria.</p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
            className="px-4 py-2 bg-neutral-800 text-white rounded-lg text-xs"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Fleet Assurance Strip */}
      <div className="bg-[#05070A] p-8 rounded-2xl border border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-base font-bold text-white font-display">Need a custom fleet package or long-term lease?</h4>
          <p className="text-xs text-neutral-400">We provide monthly corporate accounts and dedicated drivers for coastal projects.</p>
        </div>
        <button
          onClick={() => navigateTo('corporate')}
          className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
        >
          Corporate Fleet Inquiries
        </button>
      </div>

    </div>
  );
};
