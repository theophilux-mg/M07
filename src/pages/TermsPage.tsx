import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-neutral-300 text-xs leading-relaxed">
      
      <div className="space-y-2 border-b border-neutral-800 pb-6">
        <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Contractual Agreement</span>
        <h1 className="text-3xl font-extrabold text-white font-display">Terms and Conditions of Hire</h1>
        <p className="text-neutral-400">
          M07 – MSANIFU ZERO SEVEN · Standard Vehicle Rental & Chauffeur Agreement
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">1. Driver Eligibility & Documentation</h2>
        <p>
          The renter and any authorized secondary drivers must be at least 23 years of age and hold a valid, non-probationary Driving License held for a minimum of 24 months. For non-residents of Kenya, an International Driving Permit or valid home country driving license accompanied by an original passport is mandatory.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">2. Security Deposit & Payment</h2>
        <p>
          For self-drive rentals, a refundable security deposit is payable prior to vehicle handover via Safaricom Lipa Na M-Pesa, debit/credit card, or cash:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-400">
          <li>Small cars & sedans: KSh 10,000</li>
          <li>Noah / Voxy / Serena / RAV4 / Double Cabins: KSh 15,000</li>
          <li>Toyota Prado TX / TZ & Passenger Vans: KSh 20,000</li>
          <li>Toyota Land Cruiser V8 / LC300: KSh 25,000</li>
        </ul>
        <p>
          Deposits are audited and refunded immediately upon the return of the vehicle in the same mechanical, physical, and fuel condition as handed over.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">3. Fuel Policy</h2>
        <p>
          Vehicles operate on a strict "Same-to-Same" fuel level basis. If a vehicle is delivered with a full tank, it must be returned with a full tank. Missing fuel will be deducted from the security deposit at current pump prices plus a KSh 500 refuelling handling charge.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">4. Authorized Operating Boundaries</h2>
        <p>
          M07 vehicles are cleared for operation across the Coastal Kenya region (Mombasa County, Kwale County including Diani Beach, Kilifi County including Malindi and Watamu, and Taita Taveta County including Tsavo National Parks). Travel beyond the coastal corridor into Nairobi or upcountry requires prior written authorization and tracker adjustment.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">5. Insurance & Damage Excess</h2>
        <p>
          All vehicles carry comprehensive commercial insurance. In the event of an accident or accidental damage:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-neutral-400">
          <li>The renter must report the incident immediately to M07 (+254 729 255 154) and the nearest Kenya Police Station to obtain an official Police Abstract.</li>
          <li>The renter's liability is capped at the agreed insurance excess (deductible) amount, provided no breach of contract occurred.</li>
          <li>Damages resulting from driving under the influence of alcohol or narcotics, unauthorized secondary drivers, driving through ocean seawater, or intentional negligence are not covered by insurance and remain the 100% liability of the renter.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">6. Cancellation & Extension Policy</h2>
        <p>
          Reservations cancelled at least 24 hours prior to the scheduled pickup time receive a 100% refund of any prepaid amounts. Rental extensions must be requested at least 12 hours prior to the expiry of the current agreement and are subject to availability and payment of daily extension rates.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-white">7. Governing Law</h2>
        <p>
          This agreement is executed and governed under the laws of the Republic of Kenya. Any legal proceedings arising from this contract shall be adjudicated within the competent courts of Mombasa, Kenya.
        </p>
      </section>

    </div>
  );
};
