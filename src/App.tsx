import React from 'react';
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
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDashboard } from './pages/AdminDashboard';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'fleet':
        return <FleetPage />;
      case 'car-hire':
        return <CarHirePage />;
      case 'transfers':
        return <AirportTransfersPage />;
      case 'tours':
        return <CityToursPage />;
      case 'chauffeur':
        return <ChauffeurPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'corporate':
        return <CorporatePage />;
      case 'contact':
        return <ContactPage />;
      case 'faqs':
        return <FaqPage />;
      case 'booking':
        return <BookingPage />;
      case 'tracking':
        return <TrackingPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080B10] text-[#E2E8F0]">
      <Navbar />
      <main className="flex-1">
        {renderView()}
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
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
