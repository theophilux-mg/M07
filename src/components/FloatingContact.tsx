import React, { useState } from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/254729255154?text=${encodeURIComponent(
    'Hello M07 – MSANIFU ZERO SEVEN, I would like to inquire about luxury car hire / airport transfers in Mombasa.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 no-print">
      {isOpen && (
        <div className="bg-[#0F141D] border border-[#D4AF37]/30 rounded-xl p-4 shadow-2xl w-72 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <p className="text-xs font-bold text-white">M07 VIP Concierge</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Online · Instant Mombasa Dispatch
              </p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-neutral-300 my-3 leading-relaxed">
            Need urgent airport pickup at Moi MBA or self-drive vehicle reservation? Connect directly with our dispatch desk:
          </p>

          <div className="space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp (+254 729 255 154)
            </a>

            <a
              href="tel:+254729255154"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition-colors border border-neutral-700"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              Call Dispatch Directly
            </a>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-400/30"
        aria-label="Direct WhatsApp Contact"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">WhatsApp M07</span>
      </button>
    </div>
  );
};
