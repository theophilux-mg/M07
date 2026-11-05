import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { dataService } from '../services/dataService';
import { 
  Users, 
  Briefcase, 
  Gauge, 
  Fuel, 
  Search, 
  ArrowRight, 
  Calendar,
  Sparkles,
  Phone
} from 'lucide-react';

export const FleetPage: React.FC = () => {
  const { navigateTo } = useApp();
  const vehicles = dataService.getVehicles();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    'All',
    'Toyota Coaster (20-seater)',
    'Noah/Voxy/Serena',
    'Small cars',
    'RAV4',
    'Double cabins',
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300 font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Original M07 Fleet Tariffs
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Our Vehicle Fleet Catalogue
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          From the <strong className="text-white">Toyota Noah/Voxy 7-seater</strong> (from KSh 6,000/day daily hire in Mombasa) to our <strong className="text-emerald-400">20-Passenger Toyota Coaster bus</strong> and executive 4x4 Land Cruisers. Every vehicle is clean, air-conditioned, and maintained to the highest safety standards.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search model, feature, or seats..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map(veh => {
          const isCoaster = veh.category === 'Toyota Coaster (20-seater)';

          return (
            <div
              key={veh.id}
              className={`bg-slate-900/80 border ${isCoaster ? 'border-emerald-500/50 bg-gradient-to-b from-slate-900 to-emerald-950/20' : 'border-slate-800'} hover:border-amber-400/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between shadow-xl`}
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={veh.image}
                    alt={veh.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-400/30 uppercase tracking-wide">
                      {veh.category}
                    </span>
                    {veh.isPopular && (
                      <span className="px-2 py-1 rounded bg-amber-400 text-[10px] font-bold text-slate-950 uppercase tracking-wide">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold backdrop-blur-md ${
                      veh.isAvailable 
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-600' 
                        : 'bg-red-950/80 text-red-300 border border-red-800'
                    }`}>
                      {veh.isAvailable ? 'Available' : 'Reserved'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 font-medium">
                    <span>Year {veh.modelYear}</span>
                    <span className="text-white font-mono">
                      <strong className="text-base text-amber-300 font-bold">KSh {veh.pricePerDay.toLocaleString()}</strong>
                      <span className="text-[11px] text-slate-400"> / day</span>
                    </span>
                  </div>
                </div>

                {/* Specs & Description */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {veh.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {veh.description}
                    </p>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-800 text-center text-xs">
                    <div className="flex flex-col items-center">
                      <Users className="w-3.5 h-3.5 text-emerald-400 mb-1" />
                      <span className="font-semibold text-white">{veh.seats} Seats</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 mb-1" />
                      <span className="font-semibold text-white">{veh.luggageCapacity} Bags</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Gauge className="w-3.5 h-3.5 text-slate-400 mb-1" />
                      <span className="font-semibold text-white text-[11px]">{veh.transmission}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Fuel className="w-3.5 h-3.5 text-slate-400 mb-1" />
                      <span className="font-semibold text-white text-[11px]">{veh.fuelType}</span>
                    </div>
                  </div>

                  {/* Feature Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {veh.features.slice(0, 3).map((feat, i) => (
                      <span 
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {feat}
                      </span>
                    ))}
                    {veh.features.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-500">
                        +{veh.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Chauffeur rate info */}
                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                    <span>Chauffeur add-on:</span>
                    <span className="font-mono text-emerald-400">+KSh {veh.chauffeurDailyRate.toLocaleString()}/day</span>
                  </div>
                </div>
              </div>

              {/* Action Card Bottom */}
              <div className="p-5 pt-0 space-y-2">
                {isCoaster && (
                  <Link
                    to="/quotation"
                    className="w-full py-2.5 px-4 bg-emerald-950/90 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Request Group Quotation (20 Pax)</span>
                  </Link>
                )}

                <button
                  onClick={() => navigateTo('booking', { vehicleId: veh.id })}
                  disabled={!veh.isAvailable}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{veh.isAvailable ? 'Reserve This Vehicle' : 'Currently Reserved'}</span>
                  {veh.isAvailable && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-16 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <p className="text-slate-400 text-sm">No vehicles found matching your criteria.</p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Fleet Assurance Strip */}
      <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-base font-bold text-white">Need a custom group itinerary or monthly lease?</h4>
          <p className="text-xs text-slate-400">We offer custom quotes for 20-pax Coasters, corporate fleets, and dedicated drivers.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/quotation"
            className="px-5 py-2.5 bg-emerald-950 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Group Quotation
          </Link>
          <Link
            to="/corporate"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Corporate Inquiries
          </Link>
        </div>
      </div>

    </div>
  );
};
