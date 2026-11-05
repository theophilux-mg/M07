import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, Booking } from '../types';
import { dataService } from '../services/dataService';

export type PageView = 
  | 'home'
  | 'about'
  | 'fleet'
  | 'car-hire'
  | 'transfers'
  | 'tours'
  | 'chauffeur'
  | 'gallery'
  | 'corporate'
  | 'contact'
  | 'faqs'
  | 'booking'
  | 'tracking'
  | 'privacy'
  | 'terms'
  | 'admin';

interface MpesaModalState {
  isOpen: boolean;
  bookingRef: string;
  amount: number;
  phone: string;
}

interface AppContextType {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  navigateTo: (view: PageView, extra?: { vehicleId?: string; bookingRef?: string }) => void;
  selectedVehicleId: string | null;
  setSelectedVehicleId: (id: string | null) => void;
  trackingRef: string;
  setTrackingRef: (ref: string) => void;
  isAdmin: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  mpesaModal: MpesaModalState;
  openMpesaModal: (bookingRef: string, amount: number, phone?: string) => void;
  closeMpesaModal: () => void;
  activeVoucher: Booking | null;
  openVoucherModal: (booking: Booking) => void;
  closeVoucherModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [trackingRef, setTrackingRef] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('m07_admin_auth') === 'true';
  });

  const [mpesaModal, setMpesaModal] = useState<MpesaModalState>({
    isOpen: false,
    bookingRef: '',
    amount: 0,
    phone: ''
  });

  const [activeVoucher, setActiveVoucher] = useState<Booking | null>(null);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const navigateTo = (view: PageView, extra?: { vehicleId?: string; bookingRef?: string }) => {
    if (extra?.vehicleId) {
      setSelectedVehicleId(extra.vehicleId);
    }
    if (extra?.bookingRef) {
      setTrackingRef(extra.bookingRef);
    }
    setCurrentView(view);
  };

  const adminLogin = (email: string, pass: string): boolean => {
    // Official admin demo credentials: admin@m07.co.ke / M07Admin2026!
    if ((email.trim().toLowerCase() === 'admin@m07.co.ke' || email.trim().toLowerCase() === 'msanifuzeroseven@gmail.com') && pass === 'M07Admin2026!') {
      setIsAdmin(true);
      localStorage.setItem('m07_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('m07_admin_auth');
    setCurrentView('home');
  };

  const openMpesaModal = (bookingRef: string, amount: number, phone: string = '+254729255154') => {
    setMpesaModal({
      isOpen: true,
      bookingRef,
      amount,
      phone
    });
  };

  const closeMpesaModal = () => {
    setMpesaModal(prev => ({ ...prev, isOpen: false }));
  };

  const openVoucherModal = (booking: Booking) => {
    setActiveVoucher(booking);
  };

  const closeVoucherModal = () => {
    setActiveVoucher(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateTo,
        selectedVehicleId,
        setSelectedVehicleId,
        trackingRef,
        setTrackingRef,
        isAdmin,
        adminLogin,
        adminLogout,
        mpesaModal,
        openMpesaModal,
        closeMpesaModal,
        activeVoucher,
        openVoucherModal,
        closeVoucherModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
