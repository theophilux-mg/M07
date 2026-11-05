import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Menu, 
  X, 
  ShieldCheck, 
  Search, 
  Calendar, 
  Car, 
  Plane, 
  Compass, 
  UserCheck, 
  FileText,
  Users
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAdmin, adminLogout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top utility contact ticker - coastal & reliable */}
      <div className="bg-[#05070A] border-b border-slate-900 text-[11px] text-slate-400 py-1.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Mombasa, Kenya · SGR Miritini · Diani · Kwale
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a 
              href="tel:+254729255154" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold text-slate-200"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              0729 255154
            </a>
            <span className="hidden md:inline text-amber-400/90 font-medium">
              "A Phone Call Away"
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/quotation"
              className={`hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium ${isActive('/quotation') ? 'text-emerald-400' : ''}`}
            >
              <Users className="w-3 h-3 text-emerald-400" />
              Group Quotation
            </Link>
            <span className="text-slate-700">·</span>
            <Link 
              to="/tracking"
              className={`hover:text-amber-400 transition-colors flex items-center gap-1 ${isActive('/tracking') ? 'text-amber-400' : ''}`}
            >
              <Search className="w-3 h-3" />
              Track Booking
            </Link>
            <span className="text-slate-700">·</span>
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Link 
                  to="/admin"
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Admin Console
                </Link>
                <button 
                  onClick={adminLogout}
                  className="text-slate-400 hover:text-white text-[10px] cursor-pointer"
                >
                  (Sign Out)
                </button>
              </div>
            ) : (
              <Link 
                to="/admin"
                className="hover:text-slate-200 transition-colors flex items-center gap-1"
                title="Management Sign In"
              >
                <ShieldCheck className="w-3 h-3 text-slate-500" />
                Staff Access
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#080B10]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Logo & Brand */}
          <Link 
            to="/"
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none shrink-0"
          >
            <img 
              src="/images/m07_logo.svg" 
              alt="Msanifu Zero Seven Logo" 
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="whitespace-nowrap">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white block group-hover:text-amber-300 transition-colors">
                MSANIFU ZERO SEVEN
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold tracking-wider block">
                Tour and Travel · <span className="text-amber-400/90 font-normal">A Phone Call Away</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-300">
            <Link 
              to="/fleet"
              className={`hover:text-amber-300 transition-colors whitespace-nowrap ${isActive('/fleet') ? 'text-amber-300 font-semibold' : ''}`}
            >
              Our Fleet
            </Link>
            <Link 
              to="/car-hire"
              className={`hover:text-amber-300 transition-colors whitespace-nowrap ${isActive('/car-hire') ? 'text-amber-300 font-semibold' : ''}`}
            >
              Car Hire
            </Link>
            <Link 
              to="/airport-transfers"
              className={`hover:text-amber-300 transition-colors whitespace-nowrap ${isActive('/airport-transfers') ? 'text-amber-300 font-semibold' : ''}`}
            >
              Airport & SGR
            </Link>
            <Link 
              to="/city-tours"
              className={`hover:text-amber-300 transition-colors whitespace-nowrap ${isActive('/city-tours') ? 'text-amber-300 font-semibold' : ''}`}
            >
              City Tours & Diani
            </Link>
            <Link 
              to="/quotation"
              className={`hover:text-emerald-400 transition-colors whitespace-nowrap font-semibold ${isActive('/quotation') ? 'text-emerald-400' : 'text-emerald-400/90'}`}
            >
              Group Quotation
            </Link>
            <Link 
              to="/chauffeur"
              className={`hover:text-amber-300 transition-colors whitespace-nowrap ${isActive('/chauffeur') ? 'text-amber-300 font-semibold' : ''}`}
            >
              Chauffeur VIP
            </Link>
            <Link 
              to="/about"
              className={`hover:text-amber-300 transition-colors whitespace-nowrap ${isActive('/about') ? 'text-amber-300 font-semibold' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact"
              className={`hover:text-amber-300 transition-colors whitespace-nowrap ${isActive('/contact') ? 'text-amber-300 font-semibold' : ''}`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/booking"
              className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Vehicle</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden bg-black/85 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <img src="/images/m07_logo.svg" alt="M07" className="w-10 h-10 object-contain" />
                <div>
                  <span className="font-bold text-base text-white block">Msanifu Zero Seven</span>
                  <span className="text-[11px] text-amber-400">A Phone Call Away</span>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-1.5 mt-6">
              {[
                { path: '/', label: 'Home', icon: Car },
                { path: '/fleet', label: 'Our Fleet (Toyota Coaster, Noah/Voxy...)', icon: Car },
                { path: '/quotation', label: 'Request a Group Quotation (New)', icon: Users, highlight: true },
                { path: '/car-hire', label: 'Car Hire (Self-Drive & Chauffeur)', icon: FileText },
                { path: '/airport-transfers', label: 'Airport & SGR Miritini Transfers', icon: Plane },
                { path: '/city-tours', label: 'City Tours, Diani & Kwale Day Hire', icon: Compass },
                { path: '/chauffeur', label: 'VIP Chauffeur Services', icon: UserCheck },
                { path: '/booking', label: 'Book & Reserve Vehicle', icon: Calendar },
                { path: '/tracking', label: 'Track Booking Status', icon: Search },
                { path: '/gallery', label: 'Fleet & Coastal Gallery', icon: Car },
                { path: '/corporate', label: 'Corporate Partnerships', icon: ShieldCheck },
                { path: '/about', label: 'About Msanifu Zero Seven', icon: FileText },
                { path: '/faqs', label: 'Rental FAQs & Rates', icon: FileText },
                { path: '/contact', label: 'Contact (Mombasa, Kenya)', icon: Phone },
                { path: '/terms', label: 'Rental Terms & Conditions', icon: FileText },
                { path: '/privacy', label: 'Privacy Policy', icon: FileText },
                { path: '/admin', label: 'Staff / Admin Portal', icon: ShieldCheck },
              ].map(item => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left text-sm font-medium transition-colors ${
                      active 
                        ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30' 
                        : item.highlight 
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' 
                          : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${item.highlight ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
            <p className="font-semibold text-white mb-1">Msanifu Zero Seven Tour and Travel</p>
            <p>Phone: 0729 255154 · Mombasa, Kenya</p>
            <p>Email: msanifuzeroseven@gmail.com</p>
          </div>
        </div>
      )}
    </>
  );
};
