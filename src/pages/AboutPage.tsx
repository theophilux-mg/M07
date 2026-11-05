import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Shield, Award, Users, Compass, CheckCircle2, ArrowRight, Clock, Phone } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300 font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            About Msanifu Zero Seven
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Your Travel Partner for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-sky-400">
              Memorable Journeys.
            </span>
          </h1>
          <p className="text-base text-amber-300 font-medium">
            Travel in Comfort and Style · Explore Kenya with Us! · A Phone Call Away
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Founded with an unwavering dedication to reliability and coastal hospitality, <strong className="text-white">Msanifu Zero Seven Tour and Travel (M07)</strong> provides dependable car hire, executive airport and SGR transfers, and bespoke coastal excursions across Kenya.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Based in Mombasa, Kenya, we operate across Moi International Airport (MBA), the SGR Miritini Terminus, Mombasa Island, Diani Beach, Kwale Town, and the coastal corridor through Kilifi and Malindi.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-800">
            <div>
              <span className="text-2xl font-black text-amber-300 font-mono">100%</span>
              <p className="text-xs text-slate-400 mt-1">NTSA Verified & Insured</p>
            </div>
            <div>
              <span className="text-2xl font-black text-white font-mono">0 Overlap</span>
              <p className="text-xs text-slate-400 mt-1">Guaranteed Vehicle Assignment</p>
            </div>
            <div>
              <span className="text-2xl font-black text-emerald-400 font-mono">0729 255154</span>
              <p className="text-xs text-slate-400 mt-1">Direct Customer Hotline</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <img
              src="/images/prado_tx_luxury_1793873968849.jpg"
              alt="Msanifu Zero Seven Fleet in Mombasa"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white">
              <span className="text-amber-400 font-bold uppercase tracking-wider block text-[10px]">Mombasa Operations Desk</span>
              <span>Toyota Coaster 20-pax bus, Noah/Voxy 7-seater, and Executive 4x4s</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Core Pillars from the Flyer */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Our Standards</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">The Four Core Pillars of M07</h2>
          <p className="text-xs text-slate-400">Straight from our founding pledge to every traveler in Kenya.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <Shield className="w-8 h-8 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Safe & Comfortable Transport</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Meticulously maintained, fully air-conditioned vehicles prepared with safety gear, high-tread tyres, and comfortable upholstery for coastal journeys.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <Award className="w-8 h-8 text-amber-400" />
            <h3 className="text-base font-bold text-white">Professional Drivers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Courteous, vetted local chauffeurs with deep route knowledge across Mombasa, Dongo Kundu bypass, Diani Beach, Kwale hills, and SGR connections.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <Clock className="w-8 h-8 text-sky-400" />
            <h3 className="text-base font-bold text-white">Reliable & On Time</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We monitor flight radar at Moi International Airport (MBA) and train schedules at SGR Miritini to ensure on-time pickups without delay.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <Compass className="w-8 h-8 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Tours & Travel Packages</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              From family vacations in the Toyota Noah/Voxy to 20-passenger Toyota Coaster group tours, we craft memorable itineraries across coastal Kenya.
            </p>
          </div>
        </div>
      </div>

      {/* Contact prompt */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">Speak With Our Operations Team</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Have bespoke route requirements, multi-leg group itineraries, or 20-seater Coaster bookings? We are just a phone call away.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="px-6 py-3 bg-gradient-to-r from-amber-300 to-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-all"
          >
            Contact Mombasa Desk
          </Link>
          <a
            href="tel:+254729255154"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>0729 255154</span>
          </a>
        </div>
      </div>

    </div>
  );
};
