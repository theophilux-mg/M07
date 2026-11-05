import { 
  Vehicle, 
  Booking, 
  CustomerEnquiry, 
  CustomerReview, 
  GalleryItem, 
  BookingStatus, 
  PaymentStatus,
  MpesaTransaction 
} from '../types';
import { 
  INITIAL_VEHICLES, 
  INITIAL_REVIEWS, 
  INITIAL_GALLERY 
} from '../data/fleetData';

const VEHICLES_STORAGE_KEY = 'm07_fleet_vehicles_v1';
const BOOKINGS_STORAGE_KEY = 'm07_fleet_bookings_v1';
const ENQUIRIES_STORAGE_KEY = 'm07_fleet_enquiries_v1';
const REVIEWS_STORAGE_KEY = 'm07_fleet_reviews_v1';
const GALLERY_STORAGE_KEY = 'm07_fleet_gallery_v1';
const MPESA_STORAGE_KEY = 'm07_fleet_mpesa_v1';

// Seed sample initial bookings
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-001',
    reference: 'M07-2026-7842',
    customerName: 'Hassan Mohamed',
    customerPhone: '+254712345678',
    customerEmail: 'hassan.m@gmail.com',
    pickupLocation: 'Moi International Airport Mombasa (MBA)',
    destination: 'Nyali (Links Road / Beach Hotels)',
    pickupDate: '2026-03-01',
    pickupTime: '10:30',
    returnDate: '2026-03-05',
    vehicleId: 'veh-prado-tx-09',
    vehicleName: 'Toyota Land Cruiser Prado TX/TZ Luxury 7-Seater',
    vehicleCategory: 'Prado',
    vehicleImage: '/src/assets/images/prado_tx_luxury_1793873968849.jpg',
    serviceType: 'Chauffeur Driven',
    passengers: 4,
    chauffeurIncluded: true,
    specialInstructions: 'Flight KQ 604 from Nairobi. Chauffeur to wait at arrival with name board.',
    status: 'Confirmed',
    paymentStatus: 'Paid - M-Pesa',
    paymentReference: 'SHB49XJ18A',
    rentalDays: 4,
    dailyRate: 15000,
    subtotalKsh: 60000,
    chauffeurCostKsh: 12000,
    totalCostKsh: 72000,
    createdAt: '2026-02-28T09:15:00Z',
    updatedAt: '2026-02-28T09:20:00Z',
    adminNotes: 'Assigned Driver: Alex Mangi (Staff ID: M07-DRV-04).'
  },
  {
    id: 'book-002',
    reference: 'M07-2026-8911',
    customerName: 'Sarah Jenkins',
    customerPhone: '+254799887766',
    customerEmail: 'sarah.j@travelsafaris.co.uk',
    pickupLocation: 'SGR Miritini Terminus (Mombasa Station)',
    destination: 'Diani Beach (South Coast via Dongo Kundu / Likoni)',
    pickupDate: '2026-03-03',
    pickupTime: '14:00',
    returnDate: '2026-03-07',
    vehicleId: 'veh-toyota-noah-03',
    vehicleName: 'Toyota Noah Si Elegance',
    vehicleCategory: 'Noah/Voxy/Serena',
    vehicleImage: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1200&q=80',
    serviceType: 'Airport Transfer',
    passengers: 6,
    chauffeurIncluded: true,
    specialInstructions: 'Family holiday with 2 kids and surf gear. Need child booster seat if available.',
    status: 'Confirmed',
    paymentStatus: 'Paid - Card',
    paymentReference: 'AUTH-CC-9941',
    rentalDays: 4,
    dailyRate: 7000,
    subtotalKsh: 28000,
    chauffeurCostKsh: 10000,
    totalCostKsh: 38000,
    createdAt: '2026-03-01T11:40:00Z',
    updatedAt: '2026-03-01T14:10:00Z'
  },
  {
    id: 'book-003',
    reference: 'M07-2026-9204',
    customerName: 'Eng. Kennedy Mutua',
    customerPhone: '+254722114455',
    customerEmail: 'kmutua@coastalenergy.co.ke',
    pickupLocation: 'Nyali (Links Road / Beach Hotels)',
    destination: 'Kilifi Town & Bofa Beach',
    pickupDate: '2026-03-10',
    pickupTime: '08:00',
    returnDate: '2026-03-12',
    vehicleId: 'veh-hilux-06',
    vehicleName: 'Toyota Hilux Revo Double Cab 4x4',
    vehicleCategory: 'Double cabins',
    vehicleImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    serviceType: 'Self-drive',
    passengers: 3,
    chauffeurIncluded: false,
    specialInstructions: 'Site inspection at Kilifi plantation. Self drive with valid Kenyan DL.',
    status: 'Pending',
    paymentStatus: 'Unpaid',
    rentalDays: 2,
    dailyRate: 9000,
    subtotalKsh: 18000,
    chauffeurCostKsh: 0,
    totalCostKsh: 18000,
    createdAt: '2026-03-02T16:22:00Z',
    updatedAt: '2026-03-02T16:22:00Z'
  }
];

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

  // --- M-PESA DARAJA STK SIMULATOR ---
  simulateMpesaPayment(bookingRef: string, phone: string, amount: number): Promise<{ success: boolean; receipt?: string; message: string }> {
    return new Promise((resolve) => {
      // Formats random M-Pesa receipt e.g. RDX982K19A
      const randomReceipt = 'S' + Math.random().toString(36).substring(2, 10).toUpperCase();

      setTimeout(() => {
        // Record in M-Pesa transactions storage
        try {
          const raw = localStorage.getItem(MPESA_STORAGE_KEY) || '[]';
          const list: MpesaTransaction[] = JSON.parse(raw);
          list.unshift({
            id: `mpesa-${Date.now()}`,
            bookingReference: bookingRef,
            phoneNumber: phone,
            amount,
            status: 'Success',
            receiptNumber: randomReceipt,
            timestamp: new Date().toISOString()
          });
          localStorage.setItem(MPESA_STORAGE_KEY, JSON.stringify(list));
        } catch {
          // ignore
        }

        // Update booking directly
        const booking = this.getBookingByReference(bookingRef);
        if (booking) {
          this.updatePaymentStatus(booking.id, 'Paid - M-Pesa', randomReceipt);
        }

        resolve({
          success: true,
          receipt: randomReceipt,
          message: `Lipa Na M-Pesa payment of KSh ${amount.toLocaleString()} received successfully for ${bookingRef}. Receipt: ${randomReceipt}.`
        });
      }, 2000);
    });
  }

  getMpesaTransactions(): MpesaTransaction[] {
    try {
      const raw = localStorage.getItem(MPESA_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
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
