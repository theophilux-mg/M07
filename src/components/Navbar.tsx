import React, { useState } from 'react';
import { useApp, PageView } from '../context/AppContext';
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
  FileText 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, navigateTo, isAdmin, adminLogout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: PageView) => {
    navigateTo(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top utility contact ticker - quiet & elegant */}
      <div className="bg-[#05070A] border-b border-neutral-900 text-[11px] text-neutral-400 py-1.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              Mombasa, Kenya · Nyali & Moi Int'l Airport (MBA)
            </span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <a 
              href="tel:+254729255154" 
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              +254 729 255 154
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNav('tracking')}
              className={`hover:text-[#D4AF37] transition-colors flex items-center gap-1 ${currentView === 'tracking' ? 'text-[#D4AF37]' : ''}`}
            >
              <Search className="w-3 h-3" />
              Track Reservation
            </button>
            <span className="text-neutral-700">·</span>
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleNav('admin')}
                  className="text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Admin Console
                </button>
                <button 
                  onClick={adminLogout}
                  className="text-neutral-400 hover:text-white text-[10px]"
                >
                  (Sign Out)
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handleNav('admin')}
                className="hover:text-neutral-200 transition-colors flex items-center gap-1"
                title="Management Sign In"
              >
                <ShieldCheck className="w-3 h-3 text-neutral-500" />
                Staff Access
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation: Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#080B10]/90 backdrop-blur-md border-b border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] via-[#AA820A] to-[#080B10] p-[1px] shadow-sm">
              <div className="w-full h-full bg-[#080B10] rounded-[7px] flex items-center justify-center">
                <span className="font-bold text-sm tracking-wider text-[#D4AF37]">M07</span>
              </div>
            </div>
            <div className="whitespace-nowrap shrink-0">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white block group-hover:text-[#D4AF37] transition-colors">
                MSANIFU ZERO SEVEN
              </span>
            </div>
          </button>

          {/* Zone 2: 4–5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <button 
              onClick={() => handleNav('fleet')}
              className={`hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 ${currentView === 'fleet' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              Our Fleet
            </button>
            <button 
              onClick={() => handleNav('car-hire')}
              className={`hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 ${currentView === 'car-hire' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              Car Hire
            </button>
            <button 
              onClick={() => handleNav('transfers')}
              className={`hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 ${currentView === 'transfers' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              Airport Transfers
            </button>
            <button 
              onClick={() => handleNav('tours')}
              className={`hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 ${currentView === 'tours' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              City Tours
            </button>
            <button 
              onClick={() => handleNav('chauffeur')}
              className={`hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 ${currentView === 'chauffeur' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              Chauffeur VIP
            </button>
            <button 
              onClick={() => handleNav('about')}
              className={`hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 ${currentView === 'about' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNav('contact')}
              className={`hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 ${currentView === 'contact' ? 'text-[#D4AF37] font-semibold' : ''}`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('booking')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-[#080B10] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA820A] rounded-md shadow-md hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Vehicle</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
              <span className="font-bold text-lg text-white">M07 Navigation</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 mt-6">
              {[
                { view: 'home', label: 'Home', icon: Car },
                { view: 'fleet', label: 'Our Fleet', icon: Car },
                { view: 'car-hire', label: 'Car Hire (Self-Drive & Chauffeur)', icon: FileText },
                { view: 'transfers', label: 'Airport Transfers (Moi MBA)', icon: Plane },
                { view: 'tours', label: 'Mombasa City Tours & Safaris', icon: Compass },
                { view: 'chauffeur', label: 'VIP Chauffeur Services', icon: UserCheck },
                { view: 'booking', label: 'Book & Reserve Now', icon: Calendar },
                { view: 'tracking', label: 'Track Reservation Status', icon: Search },
                { view: 'gallery', label: 'Fleet & Mombasa Gallery', icon: Car },
                { view: 'corporate', label: 'Corporate Partnerships', icon: ShieldCheck },
                { view: 'about', label: 'About M07', icon: FileText },
                { view: 'faqs', label: 'Rental FAQs & Requirements', icon: FileText },
                { view: 'contact', label: 'Contact Office (Nyali)', icon: Phone },
                { view: 'terms', label: 'Rental Terms & Conditions', icon: FileText },
                { view: 'privacy', label: 'Privacy Policy', icon: FileText },
                { view: 'admin', label: 'Staff / Admin Portal', icon: ShieldCheck },
              ].map(item => {
                const Icon = item.icon;
                const active = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => handleNav(item.view as PageView)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-left text-sm font-medium transition-colors ${
                      active ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30' : 'text-neutral-300 hover:bg-neutral-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-neutral-800 text-xs text-neutral-400">
            <p className="font-semibold text-white mb-1">M07 – MSANIFU ZERO SEVEN</p>
            <p>Hotline: +254 729 255 154</p>
            <p>Email: msanifuzeroseven@gmail.com</p>
          </div>
        </div>
      )}
    </>
  );
};
