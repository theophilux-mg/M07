import React from 'react';
import { useApp, PageView } from '../context/AppContext';
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#05070A] border-t border-neutral-900 text-neutral-400 text-sm mt-20 no-print">
      {/* Top Value Strip */}
      <div className="border-b border-neutral-900/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Verified & Insured Fleet</h4>
              <p className="text-xs text-neutral-400 mt-1">Full comprehensive insurance with 24/7 AA Kenya roadside rescue.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Punctual Airport Delivery</h4>
              <p className="text-xs text-neutral-400 mt-1">Moi International (MBA) VIP meet & greet right at the arrival terminal.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Transparent Original Rates</h4>
              <p className="text-xs text-neutral-400 mt-1">Starting from KSh 3,500/day. Zero hidden fees or surprise charges.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">24/7 Coastal Support</h4>
              <p className="text-xs text-neutral-400 mt-1">Dedicated dispatch team across Mombasa, Diani, Kilifi, and Malindi.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center font-bold text-xs text-black">
                M07
              </div>
              <span className="text-white font-extrabold text-base tracking-wide">
                MSANIFU ZERO SEVEN
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
              Mombasa’s premier automotive mobility and travel service. Delivering flawless self-drive car hire, executive chauffeured VIP transfers, SGR connectivity, and coastal safari expeditions with uncompromising precision.
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Links Road, Nyali, Mombasa, Kenya</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+254729255154" className="hover:text-[#D4AF37] transition-colors">
                  +254 729 255 154 (Hotline & WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="mailto:msanifuzeroseven@gmail.com" className="hover:text-[#D4AF37] transition-colors">
                  msanifuzeroseven@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Core Services</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('car-hire')} className="hover:text-[#D4AF37] transition-colors">
                  Self-Drive Car Hire
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('transfers')} className="hover:text-[#D4AF37] transition-colors">
                  Airport Transfers (MBA)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('chauffeur')} className="hover:text-[#D4AF37] transition-colors">
                  Chauffeur VIP Services
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tours')} className="hover:text-[#D4AF37] transition-colors">
                  Mombasa City Tours
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('corporate')} className="hover:text-[#D4AF37] transition-colors">
                  Corporate Partnerships
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Fleet & Bookings */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Fleet & Booking</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('fleet')} className="hover:text-[#D4AF37] transition-colors">
                  View Full Fleet Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('booking')} className="hover:text-[#D4AF37] transition-colors">
                  Instant Rental Calculator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tracking')} className="hover:text-[#D4AF37] transition-colors">
                  Track Reservation Status
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('gallery')} className="hover:text-[#D4AF37] transition-colors">
                  Fleet & Coast Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faqs')} className="hover:text-[#D4AF37] transition-colors">
                  Rental Requirements & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Trust & Legal</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#D4AF37] transition-colors">
                  About M07 Standards
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-[#D4AF37] transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-[#D4AF37] transition-colors">
                  Privacy Policy (KDPA 2019)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#D4AF37] transition-colors">
                  Nyali Office & Map
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="text-neutral-500 hover:text-[#D4AF37] transition-colors">
                  Staff & Admin Console
                </button>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-neutral-900">
              <span className="text-[10px] text-neutral-500 block mb-2 uppercase tracking-wider">Accepted Payments</span>
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-neutral-300">
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded font-medium text-emerald-400">
                  M-PESA
                </span>
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded font-medium">
                  VISA
                </span>
                <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded font-medium">
                  Mastercard
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} M07 – MSANIFU ZERO SEVEN. All Rights Reserved. Mombasa, Kenya.</p>
          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <span>Registered Under Kenyan Transport & Tourism Regulations</span>
            <span>·</span>
            <span>NTSA Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
