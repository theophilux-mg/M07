import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS } from '../data/fleetData';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
          Clear Answers & Guidelines
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Everything you need to know about renting a vehicle with M07 in Mombasa, Kenya.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#0F141D] border border-neutral-800 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#D4AF37] font-bold">0{idx + 1}.</span>
                  <span className="text-sm font-bold text-white leading-snug">{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-neutral-300 leading-relaxed border-t border-neutral-850">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions banner */}
      <div className="bg-[#05070A] border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-white">Have a specific question not listed here?</h4>
          <p className="text-xs text-neutral-400">Our Nyali dispatch team is always ready to answer any questions.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:+254729255154"
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Call +254 729 255 154</span>
          </a>
          <button
            onClick={() => navigateTo('booking')}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#AA820A] text-black rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Start Booking
          </button>
        </div>
      </div>

    </div>
  );
};
