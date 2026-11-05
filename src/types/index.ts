export type VehicleCategory = 
  | 'Small cars'
  | 'Noah/Voxy/Serena'
  | 'Double cabins'
  | 'RAV4'
  | 'Prado'
  | 'Land Cruiser'
  | 'Passenger vans';

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  modelYear: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid';
  seats: number;
  luggageCapacity: number; // in bags
  pricePerDay: number; // in KSh
  pricePerDayWeekly?: number; // discounted rate for 7+ days
  chauffeurDailyRate: number; // in KSh (typically 2,000 - 3,500)
  image: string;
  description: string;
  features: string[];
  isAvailable: boolean;
  minimumDays: number;
  isPopular?: boolean;
}

export type BookingStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Rejected'
  | 'In progress'
  | 'Completed'
  | 'Cancelled';

export type PaymentStatus = 
  | 'Unpaid'
  | 'Pending STK'
  | 'Paid - M-Pesa'
  | 'Paid - Cash on Delivery'
  | 'Paid - Card';

export interface Booking {
  id: string;
  reference: string; // e.g. M07-2026-8492
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string; // YYYY-MM-DD
  pickupTime: string; // HH:mm
  returnDate: string; // YYYY-MM-DD
  vehicleId: string;
  vehicleName: string;
  vehicleCategory: VehicleCategory;
  vehicleImage: string;
  serviceType: 'Self-drive' | 'Chauffeur Driven' | 'Airport Transfer' | 'Tour Package';
  passengers: number;
  chauffeurIncluded: boolean;
  specialInstructions?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  rentalDays: number;
  dailyRate: number;
  subtotalKsh: number;
  chauffeurCostKsh: number;
  totalCostKsh: number;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export interface CustomerEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  serviceInterest: string;
  message: string;
  status: 'New' | 'Replied' | 'Closed';
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string; // e.g. "Nairobi, Kenya" or "London, UK"
  rating: number; // 1-5
  comment: string;
  vehicleHired: string;
  date: string;
  approved: boolean;
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  pickupLocations: string[];
  destinations: string[];
  highlights: string[];
  priceKsh: number;
  recommendedVehicle: string;
  image: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Fleet' | 'Mombasa' | 'Airport Transfer' | 'Safari' | 'VIP';
  imageUrl: string;
  caption: string;
}

export interface MpesaTransaction {
  id: string;
  bookingReference: string;
  phoneNumber: string;
  amount: number;
  status: 'Success' | 'Failed' | 'Pending';
  receiptNumber: string;
  timestamp: string;
}
