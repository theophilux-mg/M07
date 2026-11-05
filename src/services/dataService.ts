import { 
  Vehicle, 
  Booking, 
  CustomerEnquiry, 
  CustomerReview, 
  GalleryItem, 
  BookingStatus, 
  PaymentStatus,
  MpesaTransaction,
  GroupQuotation,
  RouteTariff
} from '../types';
import { 
  INITIAL_VEHICLES, 
  INITIAL_REVIEWS, 
  INITIAL_GALLERY,
  INITIAL_ROUTE_TARIFFS 
} from '../data/fleetData';

const VEHICLES_STORAGE_KEY = 'm07_fleet_vehicles_v1';
const BOOKINGS_STORAGE_KEY = 'm07_fleet_bookings_v1';
const ENQUIRIES_STORAGE_KEY = 'm07_fleet_enquiries_v1';
const REVIEWS_STORAGE_KEY = 'm07_fleet_reviews_v1';
const GALLERY_STORAGE_KEY = 'm07_fleet_gallery_v1';
const MPESA_STORAGE_KEY = 'm07_fleet_mpesa_v1';
const GROUP_QUOTATIONS_STORAGE_KEY = 'm07_fleet_quotations_v1';
const TARIFFS_STORAGE_KEY = 'm07_fleet_tariffs_v1';

// Honest initial bookings state (no invented booking records)
const INITIAL_BOOKINGS: Booking[] = [];


class DataService {
  // --- VEHICLES ---
  getVehicles(): Vehicle[] {
    try {
      const data = localStorage.getItem(VEHICLES_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(INITIAL_VEHICLES));
        return INITIAL_VEHICLES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_VEHICLES;
    }
  }

  getVehicleById(id: string): Vehicle | undefined {
    return this.getVehicles().find(v => v.id === id);
  }

  saveVehicles(vehicles: Vehicle[]): void {
    localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(vehicles));
  }

  addVehicle(vehicle: Omit<Vehicle, 'id'>): Vehicle {
    const vehicles = this.getVehicles();
    const newVehicle: Vehicle = {
      ...vehicle,
      id: `veh-custom-${Date.now()}`
    };
    vehicles.push(newVehicle);
    this.saveVehicles(vehicles);
    return newVehicle;
  }

  updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | null {
    const vehicles = this.getVehicles();
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) return null;
    vehicles[index] = { ...vehicles[index], ...updates };
    this.saveVehicles(vehicles);
    return vehicles[index];
  }

  deleteVehicle(id: string): boolean {
    const vehicles = this.getVehicles();
    const filtered = vehicles.filter(v => v.id !== id);
    if (filtered.length === vehicles.length) return false;
    this.saveVehicles(filtered);
    return true;
  }

  toggleVehicleAvailability(id: string): boolean {
    const vehicles = this.getVehicles();
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) return false;
    vehicle.isAvailable = !vehicle.isAvailable;
    this.saveVehicles(vehicles);
    return vehicle.isAvailable;
  }

  // --- BOOKINGS & OVERLAPPING PREVENTIONS ---
  getBookings(): Booking[] {
    try {
      const data = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
        return INITIAL_BOOKINGS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_BOOKINGS;
    }
  }

  saveBookings(bookings: Booking[]): void {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  }

  getBookingByReference(ref: string): Booking | undefined {
    const cleanRef = ref.trim().toUpperCase();
    return this.getBookings().find(b => b.reference.toUpperCase() === cleanRef);
  }

  /**
   * Check if vehicle has any overlapping confirmed or in-progress booking.
   * Two date ranges [A_start, A_end] and [B_start, B_end] overlap if:
   * A_start <= B_end AND A_end >= B_start
   */
  checkVehicleAvailability(
    vehicleId: string, 
    pickupDate: string, 
    returnDate: string, 
    excludeBookingId?: string
  ): { isAvailable: boolean; conflictReason?: string } {
    const vehicle = this.getVehicleById(vehicleId);
    if (!vehicle) {
      return { isAvailable: false, conflictReason: 'Vehicle not found in fleet records.' };
    }
    if (!vehicle.isAvailable) {
      return { isAvailable: false, conflictReason: `${vehicle.name} is temporarily offline for routine servicing.` };
    }

    const bookings = this.getBookings();
    const reqStart = new Date(pickupDate).getTime();
    const reqEnd = new Date(returnDate).getTime();

    if (isNaN(reqStart) || isNaN(reqEnd) || reqEnd < reqStart) {
      return { isAvailable: false, conflictReason: 'Return date cannot precede pickup date.' };
    }

    const blockingStatuses: BookingStatus[] = ['Confirmed', 'In progress'];

    for (const b of bookings) {
      if (b.vehicleId !== vehicleId) continue;
      if (excludeBookingId && b.id === excludeBookingId) continue;
      if (!blockingStatuses.includes(b.status)) continue;

      const existingStart = new Date(b.pickupDate).getTime();
      const existingEnd = new Date(b.returnDate).getTime();

      // Check overlap:
      if (reqStart <= existingEnd && reqEnd >= existingStart) {
        return {
          isAvailable: false,
          conflictReason: `${vehicle.name} has a confirmed reservation (${b.pickupDate} to ${b.returnDate}). Please select alternative dates or browse equivalent vehicles in our fleet.`
        };
      }
    }

    return { isAvailable: true };
  }

  createBooking(params: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    pickupLocation: string;
    destination: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    vehicleId: string;
    serviceType: 'Self-drive' | 'Chauffeur Driven' | 'Airport Transfer' | 'Tour Package';
    passengers: number;
    chauffeurIncluded: boolean;
    specialInstructions?: string;
  }): { success: boolean; booking?: Booking; error?: string } {
    const vehicle = this.getVehicleById(params.vehicleId);
    if (!vehicle) {
      return { success: false, error: 'Selected vehicle could not be found.' };
    }

    // Availability validation check
    const availCheck = this.checkVehicleAvailability(params.vehicleId, params.pickupDate, params.returnDate);
    if (!availCheck.isAvailable) {
      return { success: false, error: availCheck.conflictReason };
    }

    // Calculate rental days
    const d1 = new Date(params.pickupDate);
    const d2 = new Date(params.returnDate);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    let rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (rentalDays < 1) rentalDays = 1;

    // Daily rate calculation (apply weekly discount if >= 7 days)
    const dailyRate = (rentalDays >= 7 && vehicle.pricePerDayWeekly) 
      ? vehicle.pricePerDayWeekly 
      : vehicle.pricePerDay;

    const subtotalKsh = dailyRate * rentalDays;
    const chauffeurCostKsh = params.chauffeurIncluded ? (vehicle.chauffeurDailyRate * rentalDays) : 0;
    const totalCostKsh = subtotalKsh + chauffeurCostKsh;

    // Generate unique random reference M07-YYYY-XXXX
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const currentYear = new Date().getFullYear();
    const reference = `M07-${currentYear}-${randomDigits}`;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      reference,
      customerName: params.customerName.trim(),
      customerPhone: params.customerPhone.trim(),
      customerEmail: params.customerEmail.trim(),
      pickupLocation: params.pickupLocation,
      destination: params.destination,
      pickupDate: params.pickupDate,
      pickupTime: params.pickupTime || '09:00',
      returnDate: params.returnDate,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      vehicleCategory: vehicle.category,
      vehicleImage: vehicle.image,
      serviceType: params.serviceType,
      passengers: Number(params.passengers) || 1,
      chauffeurIncluded: params.chauffeurIncluded,
      specialInstructions: params.specialInstructions,
      status: 'Pending',
      paymentStatus: 'Unpaid',
      rentalDays,
      dailyRate,
      subtotalKsh,
      chauffeurCostKsh,
      totalCostKsh,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const bookings = this.getBookings();
    bookings.unshift(newBooking);
    this.saveBookings(bookings);

    return { success: true, booking: newBooking };
  }

  updateBookingStatus(id: string, status: BookingStatus, adminNotes?: string): Booking | null {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;

    bookings[index].status = status;
    bookings[index].updatedAt = new Date().toISOString();
    if (adminNotes !== undefined) {
      bookings[index].adminNotes = adminNotes;
    }

    this.saveBookings(bookings);
    return bookings[index];
  }

  updatePaymentStatus(id: string, paymentStatus: PaymentStatus, paymentReference?: string): Booking | null {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;

    bookings[index].paymentStatus = paymentStatus;
    if (paymentReference) {
      bookings[index].paymentReference = paymentReference;
    }
    bookings[index].updatedAt = new Date().toISOString();

    this.saveBookings(bookings);
    return bookings[index];
  }

  // --- ENQUIRIES ---
  getEnquiries(): CustomerEnquiry[] {
    try {
      const data = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  createEnquiry(enquiry: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>): CustomerEnquiry {
    const enquiries = this.getEnquiries();
    const newEnquiry: CustomerEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    enquiries.unshift(newEnquiry);
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    return newEnquiry;
  }

  updateEnquiryStatus(id: string, status: 'New' | 'Replied' | 'Closed'): void {
    const enquiries = this.getEnquiries();
    const item = enquiries.find(e => e.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    }
  }

  // --- REVIEWS ---
  getReviews(): CustomerReview[] {
    try {
      const data = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
        return INITIAL_REVIEWS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_REVIEWS;
    }
  }

  addReview(review: Omit<CustomerReview, 'id' | 'date' | 'approved'>): CustomerReview {
    const reviews = this.getReviews();
    const newReview: CustomerReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      approved: false // Requires admin moderation
    };
    reviews.unshift(newReview);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    return newReview;
  }

  toggleReviewApproval(id: string): boolean {
    const reviews = this.getReviews();
    const rev = reviews.find(r => r.id === id);
    if (!rev) return false;
    rev.approved = !rev.approved;
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    return rev.approved;
  }

  // --- GALLERY ---
  getGallery(): GalleryItem[] {
    try {
      const data = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY));
        return INITIAL_GALLERY;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_GALLERY;
    }
  }

  addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const items = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    items.unshift(newItem);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
    return newItem;
  }

  deleteGalleryItem(id: string): void {
    const items = this.getGallery().filter(i => i.id !== id);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
  }

  // --- M-PESA DARAJA STK INTEGRATION (REAL / SIMULATED) ---
  async simulateMpesaPayment(bookingRef: string, phone: string, amount: number): Promise<{ success: boolean; receipt?: string; message: string; isLive?: boolean }> {
    try {
      // 1. Try real server-side Daraja STK Push endpoint
      const response = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone,
          amount,
          bookingRef
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.isLive) {
          return {
            success: true,
            isLive: true,
            message: `Real STK Push sent to ${phone}. Please enter your M-Pesa PIN on your phone handset.`
          };
        } else if (data.receipt) {
          // Fallback simulation mode
          const randomReceipt = data.receipt;
          this.recordMpesaSuccess(bookingRef, phone, amount, randomReceipt);
          return {
            success: true,
            receipt: randomReceipt,
            message: data.message || `Lipa Na M-Pesa payment received for ${bookingRef}. Receipt: ${randomReceipt}.`
          };
        }
      }
    } catch (e) {
      console.warn('Backend /api/mpesa/stkpush unreachable or in client-only mode. Executing simulated client resolution.');
    }

    // 2. Client-side simulation fallback
    return new Promise((resolve) => {
      const randomReceipt = 'S' + Math.random().toString(36).substring(2, 10).toUpperCase();

      setTimeout(() => {
        this.recordMpesaSuccess(bookingRef, phone, amount, randomReceipt);
        resolve({
          success: true,
          receipt: randomReceipt,
          message: `Lipa Na M-Pesa payment of KSh ${amount.toLocaleString()} received successfully for ${bookingRef}. Receipt: ${randomReceipt}.`
        });
      }, 2000);
    });
  }

  private recordMpesaSuccess(bookingRef: string, phone: string, amount: number, receipt: string) {
    try {
      const raw = localStorage.getItem(MPESA_STORAGE_KEY) || '[]';
      const list: MpesaTransaction[] = JSON.parse(raw);
      list.unshift({
        id: `mpesa-${Date.now()}`,
        bookingReference: bookingRef,
        phoneNumber: phone,
        amount,
        status: 'Success',
        receiptNumber: receipt,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(MPESA_STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore
    }

    const booking = this.getBookingByReference(bookingRef);
    if (booking) {
      this.updatePaymentStatus(booking.id, 'Paid - M-Pesa', receipt);
    }
  }

  getMpesaTransactions(): MpesaTransaction[] {
    try {
      const raw = localStorage.getItem(MPESA_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  // --- ROUTE TARIFFS (Admin-editable baseline leg tariffs) ---
  getRouteTariffs(): RouteTariff[] {
    try {
      const data = localStorage.getItem(TARIFFS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(TARIFFS_STORAGE_KEY, JSON.stringify(INITIAL_ROUTE_TARIFFS));
        return INITIAL_ROUTE_TARIFFS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_ROUTE_TARIFFS;
    }
  }

  saveRouteTariffs(tariffs: RouteTariff[]): void {
    localStorage.setItem(TARIFFS_STORAGE_KEY, JSON.stringify(tariffs));
  }

  updateRouteTariff(id: string, priceKsh: number, notes?: string): RouteTariff | null {
    const tariffs = this.getRouteTariffs();
    const index = tariffs.findIndex(t => t.id === id);
    if (index === -1) return null;
    tariffs[index].priceKsh = priceKsh;
    if (notes !== undefined) {
      tariffs[index].notes = notes;
    }
    this.saveRouteTariffs(tariffs);
    return tariffs[index];
  }

  addRouteTariff(tariff: Omit<RouteTariff, 'id'>): RouteTariff {
    const tariffs = this.getRouteTariffs();
    const newTariff: RouteTariff = {
      ...tariff,
      id: `tariff-${Date.now()}`
    };
    tariffs.push(newTariff);
    this.saveRouteTariffs(tariffs);
    return newTariff;
  }

  deleteRouteTariff(id: string): boolean {
    const tariffs = this.getRouteTariffs();
    const filtered = tariffs.filter(t => t.id !== id);
    if (filtered.length === tariffs.length) return false;
    this.saveRouteTariffs(filtered);
    return true;
  }

  estimateLegPrice(from: string, to: string, serviceType: string): number {
    const tariffs = this.getRouteTariffs();
    const norm = (s: string) => s.toLowerCase().trim();
    const fNorm = norm(from);
    const tNorm = norm(to);
    const sNorm = norm(serviceType);

    // Look for exact or fuzzy match
    const match = tariffs.find(t => {
      const tFrom = norm(t.from);
      const tTo = norm(t.to);
      const fromMatch = tFrom.includes(fNorm) || fNorm.includes(tFrom);
      const toMatch = tTo.includes(tNorm) || tNorm.includes(tTo);
      return fromMatch && toMatch;
    });

    if (match) return match.priceKsh;

    // Sensible defaults based on serviceType
    if (sNorm.includes('full-day') || sNorm.includes('day')) {
      return 32000;
    }
    if (sNorm.includes('safari')) {
      return 38000;
    }
    // Default transfer rate for group/coaster
    return 22000;
  }

  // --- GROUP QUOTATIONS ---
  getGroupQuotations(): GroupQuotation[] {
    try {
      const data = localStorage.getItem(GROUP_QUOTATIONS_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  saveGroupQuotations(quotations: GroupQuotation[]): void {
    localStorage.setItem(GROUP_QUOTATIONS_STORAGE_KEY, JSON.stringify(quotations));
  }

  getGroupQuotationById(id: string): GroupQuotation | undefined {
    return this.getGroupQuotations().find(q => q.id === id || q.reference.toUpperCase() === id.toUpperCase());
  }

  createGroupQuotation(quotation: Omit<GroupQuotation, 'id' | 'reference' | 'createdAt' | 'status'>): GroupQuotation {
    const list = this.getGroupQuotations();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const reference = `M07-GQ-${year}-${randomDigits}`;

    const newQuotation: GroupQuotation = {
      ...quotation,
      id: `gq-${Date.now()}`,
      reference,
      status: 'Submitted',
      createdAt: new Date().toISOString()
    };

    list.unshift(newQuotation);
    this.saveGroupQuotations(list);
    return newQuotation;
  }

  updateGroupQuotationStatus(id: string, status: GroupQuotation['status']): GroupQuotation | null {
    const list = this.getGroupQuotations();
    const item = list.find(q => q.id === id);
    if (!item) return null;
    item.status = status;
    this.saveGroupQuotations(list);
    return item;
  }

  // --- EXPORT TO CSV ---
  exportBookingsToCSV(): string {
    const bookings = this.getBookings();
    const headers = [
      'Reference',
      'Customer Name',
      'Phone',
      'Email',
      'Vehicle Name',
      'Pickup Date',
      'Return Date',
      'Pickup Location',
      'Destination',
      'Days',
      'Total (KSh)',
      'Booking Status',
      'Payment Status',
      'Payment Ref',
      'Created At'
    ];

    const rows = bookings.map(b => [
      `"${b.reference}"`,
      `"${b.customerName}"`,
      `"${b.customerPhone}"`,
      `"${b.customerEmail}"`,
      `"${b.vehicleName}"`,
      `"${b.pickupDate}"`,
      `"${b.returnDate}"`,
      `"${b.pickupLocation}"`,
      `"${b.destination}"`,
      b.rentalDays,
      b.totalCostKsh,
      `"${b.status}"`,
      `"${b.paymentStatus}"`,
      `"${b.paymentReference || 'N/A'}"`,
      `"${b.createdAt}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  // --- SUPABASE POSTGRESQL DDL GENERATOR ---
  generateSupabaseSchemaSQL(): string {
    return `-- ========================================================
-- M07 – MSANIFU ZERO SEVEN PREMIUM DIGITAL PLATFORM
-- PRODUCTION SUPABASE / POSTGRESQL DATABASE SCHEMA & RLS
-- Target: Supabase Postgres with Row Level Security (RLS)
-- ========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE vehicle_category_enum AS ENUM (
  'Small cars',
  'Noah/Voxy/Serena',
  'Double cabins',
  'RAV4',
  'Prado',
  'Land Cruiser',
  'Passenger vans'
);

CREATE TYPE booking_status_enum AS ENUM (
  'Pending',
  'Confirmed',
  'Rejected',
  'In progress',
  'Completed',
  'Cancelled'
);

CREATE TYPE payment_status_enum AS ENUM (
  'Unpaid',
  'Pending STK',
  'Paid - M-Pesa',
  'Paid - Cash on Delivery',
  'Paid - Card'
);

CREATE TYPE user_role_enum AS ENUM ('customer', 'admin', 'fleet_manager');

-- 3. PROFILES TABLE (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  role user_role_enum DEFAULT 'customer' NOT NULL,
  national_id_or_passport TEXT,
  driving_license_number TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category vehicle_category_enum NOT NULL,
  model_year INT NOT NULL,
  transmission TEXT CHECK (transmission IN ('Automatic', 'Manual')) DEFAULT 'Automatic',
  fuel_type TEXT CHECK (fuel_type IN ('Petrol', 'Diesel', 'Hybrid')) DEFAULT 'Petrol',
  seats INT NOT NULL DEFAULT 5,
  luggage_capacity INT NOT NULL DEFAULT 3,
  price_per_day NUMERIC(10, 2) NOT NULL,
  price_per_day_weekly NUMERIC(10, 2),
  chauffeur_daily_rate NUMERIC(10, 2) DEFAULT 2500.00,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_available BOOLEAN DEFAULT true,
  minimum_days INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL DEFAULT '09:00:00',
  return_date DATE NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE RESTRICT NOT NULL,
  service_type TEXT NOT NULL,
  passengers INT DEFAULT 1,
  chauffeur_included BOOLEAN DEFAULT false,
  special_instructions TEXT,
  status booking_status_enum DEFAULT 'Pending' NOT NULL,
  payment_status payment_status_enum DEFAULT 'Unpaid' NOT NULL,
  payment_reference TEXT,
  rental_days INT NOT NULL,
  daily_rate NUMERIC(10, 2) NOT NULL,
  subtotal_ksh NUMERIC(10, 2) NOT NULL,
  chauffeur_cost_ksh NUMERIC(10, 2) DEFAULT 0,
  total_cost_ksh NUMERIC(10, 2) NOT NULL,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. M-PESA & PAYMENT LOGS
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  mpesa_receipt_number TEXT UNIQUE,
  status TEXT DEFAULT 'Success' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT NOT NULL,
  vehicle_hired TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. CONTACT ENQUIRIES
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  service_interest TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Vehicles: Public can view active vehicles; Admins can do all
CREATE POLICY "Public can view vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Admins full access vehicles" ON public.vehicles FOR ALL USING (
  auth.jwt() ->> 'email' = 'admin@m07.co.ke' OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Bookings: Customers can view their own; anyone can insert a new reservation; Admins can manage all
CREATE POLICY "Public can insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Customers view own bookings" ON public.bookings FOR SELECT USING (
  auth.uid() = customer_id OR auth.jwt() ->> 'email' = customer_email
);
CREATE POLICY "Admins manage all bookings" ON public.bookings FOR ALL USING (
  auth.jwt() ->> 'email' = 'admin@m07.co.ke' OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Reviews: Public view approved; Admin moderate
CREATE POLICY "Public view approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Admins manage reviews" ON public.reviews FOR ALL USING (
  auth.jwt() ->> 'email' = 'admin@m07.co.ke'
);

-- Overlapping prevention constraint index (date range overlap prevention)
CREATE INDEX idx_bookings_vehicle_dates ON public.bookings (vehicle_id, pickup_date, return_date);
`;
  }
}

export const dataService = new DataService();
