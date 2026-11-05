import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-neutral-300 text-xs leading-relaxed">
      
      <div className="space-y-2 border-b border-neutral-800 pb-6">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Legal & Compliance</span>
        <h1 className="text-3xl font-extrabold text-white font-display">Privacy Policy</h1>
        <p className="text-neutral-400">
          Last Updated: March 2026 · Compliant with the Kenya Data Protection Act (KDPA) 2019
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">1. Introduction</h2>
        <p>
          M07 – MSANIFU ZERO SEVEN ("M07", "we", "our", or "us"), located in Nyali, Mombasa, Kenya, operates luxury automotive hire, airport transfer, and tourism logistics services. This policy outlines how we collect, process, safeguard, and disclose personal data gathered through our digital platform and physical rental desks.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">2. Information We Collect</h2>
        <p>In accordance with Kenyan transportation regulations and insurance mandates, we collect:</p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-400">
          <li><strong>Identity Data:</strong> Full legal name, National ID or Passport copy, and valid Driving License details.</li>
          <li><strong>Contact Data:</strong> Mobile phone number (used for WhatsApp dispatch and Safaricom M-Pesa STK push) and email address.</li>
          <li><strong>Travel & Telemetry Data:</strong> Flight numbers, pickup/dropoff points, hotel accommodations, and GPS telemetry data transmitted by onboard vehicle safety trackers.</li>
          <li><strong>Financial Data:</strong> M-Pesa transaction receipts, masked card references, and security deposit records. We never store raw credit card CVVs.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">3. How Your Data Is Utilized</h2>
        <p>We process your data exclusively for:</p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-400">
          <li>Generating verified rental contracts and reservation vouchers.</li>
          <li>Verifying renter eligibility with NTSA and insurance underwriting partners.</li>
          <li>Coordinating flight tracking and punctual chauffeur dispatch at Moi International Airport (MBA).</li>
          <li>Transmitting automated Safaricom Daraja STK push payment prompts.</li>
          <li>Ensuring vehicle safety, geo-fence monitoring, and 24/7 roadside assistance dispatch.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">4. GPS Tracking & Telemetry Disclosure</h2>
        <p>
          All vehicles in the M07 fleet are equipped with real-time GPS tracking systems for anti-theft, speed governance, and breakdown assistance. Telemetry data is monitored strictly by our authorized operations team and is not disclosed to third parties unless required by Kenyan law enforcement under official warrant.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">5. Data Retention & Your Rights</h2>
        <p>
          Under the Kenya Data Protection Act 2019, you hold the right to access, rectify, or request the deletion of your personal contact records upon the conclusion of all active rental obligations and financial reconciliations. Identity copies are retained for the statutory period mandated by Kenyan commercial transport law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">6. Data Controller Contact</h2>
        <p>
          For data access or privacy inquiries, contact our Compliance Officer at:
          <br />
          Email: <a href="mailto:msanifuzeroseven@gmail.com" className="text-[#D4AF37] hover:underline">msanifuzeroseven@gmail.com</a>
          <br />
          Phone: +254 729 255 154
          <br />
          Location: Links Road, Nyali, Mombasa, Kenya
        </p>
      </section>

    </div>
  );
};
