import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { MpesaModal } from './components/MpesaModal';
import { BookingVoucherModal } from './components/BookingVoucherModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FleetPage } from './pages/FleetPage';
import { CarHirePage } from './pages/CarHirePage';
import { AirportTransfersPage } from './pages/AirportTransfersPage';
import { CityToursPage } from './pages/CityToursPage';
import { ChauffeurPage } from './pages/ChauffeurPage';
import { GalleryPage } from './pages/GalleryPage';
import { CorporatePage } from './pages/CorporatePage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { BookingPage } from './pages/BookingPage';
import { TrackingPage } from './pages/TrackingPage';
import { GroupQuotationPage } from './pages/GroupQuotationPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboard } from './pages/AdminDashboard';

// Auto scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#080B10] text-[#E2E8F0]">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/car-hire" element={<CarHirePage />} />
          <Route path="/airport-transfers" element={<AirportTransfersPage />} />
          <Route path="/transfers" element={<AirportTransfersPage />} />
          <Route path="/city-tours" element={<CityToursPage />} />
          <Route path="/tours" element={<CityToursPage />} />
          <Route path="/chauffeur" element={<ChauffeurPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/quotation" element={<GroupQuotationPage />} />
          <Route path="/group-quotation" element={<GroupQuotationPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Catch-all route returns to Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingContact />
      <MpesaModal />
      <BookingVoucherModal />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
