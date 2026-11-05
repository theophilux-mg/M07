import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, CheckCircle2, Award, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070A] border-t border-slate-900 text-slate-400 text-sm mt-20 no-print">
      {/* 4 Core Pillars Strip (from flyer) */}
      <div className="border-b border-slate-900 py-8 px-4 sm:px-6 lg:px-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Safe & Comfortable Transport</h4>
              <p className="text-xs text-slate-400 mt-1">Well-maintained, fully air-conditioned vehicles for smooth coastal and safari travel.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Professional Drivers</h4>
              <p className="text-xs text-slate-400 mt-1">Courteous, experienced local chauffeurs with deep knowledge of coastal routes.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Reliable & On Time</h4>
              <p className="text-xs text-slate-400 mt-1">Punctual SGR Miritini and Moi Airport meet & greet scheduled around your timetable.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white text-xs font-semibold tracking-wider uppercase">A Phone Call Away</h4>
              <p className="text-xs text-slate-400 mt-1">Direct dispatch desk ready to assist on 0729 255154 across Mombasa, Diani, and Kwale.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/m07_logo.svg" 
                alt="Msanifu Zero Seven" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="text-white font-extrabold text-base tracking-wide block">
                  MSANIFU ZERO SEVEN
                </span>
                <span className="text-xs text-emerald-400 font-semibold block">
                  Tour and Travel · <span className="text-amber-400 font-normal">A Phone Call Away</span>
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Your Travel Partner for Memorable Journeys. Travel in Comfort and Style, and Explore Kenya with Us. Delivering reliable car hire, airport & SGR transfers, Diani Beach trips, and 20-passenger group excursions across coastal Kenya.
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mombasa, Kenya</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+254729255154" className="hover:text-amber-300 transition-colors font-medium">
                  0729 255154 / +254 729 255 154 (Hotline & WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:msanifuzeroseven@gmail.com" className="hover:text-sky-300 transition-colors">
                  msanifuzeroseven@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Services</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/car-hire" className="hover:text-amber-300 transition-colors">
                  Car Hire (Self-Drive & Chauffeur)
                </Link>
              </li>
              <li>
                <Link to="/airport-transfers" className="hover:text-amber-300 transition-colors">
                  Airport Transfers (Moi MBA)
                </Link>
              </li>
              <li>
                <Link to="/airport-transfers" className="hover:text-amber-300 transition-colors">
                  SGR Miritini Pickups & Drop-offs
                </Link>
              </li>
              <li>
                <Link to="/city-tours" className="hover:text-amber-300 transition-colors">
                  Diani Beach & Kwale Day Hire
                </Link>
              </li>
              <li>
                <Link to="/chauffeur" className="hover:text-amber-300 transition-colors">
                  Chauffeur VIP Services
                </Link>
              </li>
              <li>
                <Link to="/quotation" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Group Quotation (20 Pax)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Fleet & Bookings */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">Fleet & Booking</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/fleet" className="hover:text-amber-300 transition-colors">
                  Toyota Coaster (20-Passenger Bus)
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-amber-300 transition-colors">
                  Toyota Noah / Voxy 7-Seater (from 6K)
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-amber-300 transition-colors">
                  Executive Land Cruiser Prado TX
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-amber-300 transition-colors">
                  Book Online Reservation
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="hover:text-amber-300 transition-colors">
                  Track Reservation Status
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-amber-300 transition-colors">
                  Rental FAQs & Tariffs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">About & Legal</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">
                  About Msanifu Zero Seven
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">
                  Contact Mombasa Office
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-500 hover:text-amber-300 transition-colors">
                  Staff & Admin Console
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-900">
              <span className="text-[10px] text-slate-500 block mb-2 uppercase tracking-wider">Accepted Payment Methods</span>
              <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-300">
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-medium text-emerald-400">
                  Lipa Na M-PESA
                </span>
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-medium">
                  Bank Transfer / EFT
                </span>
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-medium">
                  Cash on Handover
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Msanifu Zero Seven Tour and Travel (M07). All Rights Reserved. Mombasa, Kenya.</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>A Phone Call Away: 0729 255154</span>
            <span>·</span>
            <span>Explore Kenya With Us!</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
