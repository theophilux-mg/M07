import { Vehicle, TourPackage, CustomerReview, GalleryItem, RouteTariff } from '../types';

export const INITIAL_VEHICLES: Vehicle[] = [
  // 1. Toyota Coaster (Group Transport, 20 Pax) - BRAND NEW FROM FLYER
  {
    id: 'veh-toyota-coaster-20pax',
    name: 'Toyota Coaster (20-Passenger Luxury Bus)',
    category: 'Toyota Coaster (20-seater)',
    modelYear: 2022,
    transmission: 'Manual',
    fuelType: 'Diesel',
    seats: 20,
    luggageCapacity: 16,
    pricePerDay: 22000,
    pricePerDayWeekly: 20000,
    chauffeurDailyRate: 3500,
    image: '/images/airport_transfer_vip_1793873970135.jpg',
    description: 'Premier executive group transport for 20 passengers. High roof walk-in cabin, heavy-duty coastal air conditioning, reclining seats, overhead luggage racks, and public address microphone. Ideal for group tours, corporate conferences, SGR Miritini pickups, and wedding parties.',
    features: ['20 Passenger Capacity', 'Dual Heavy-Duty AC', 'Reclining High-Back Seats', 'Overhead Luggage Racks', 'PA Sound System', 'Wide Panoramic Windows'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },

  // 2. Toyota Noah / Voxy 7-Seater - EXACT FLYER SPEC
  {
    id: 'veh-toyota-noah-voxy-01',
    name: 'Toyota Noah / Voxy 7-Seater',
    category: 'Noah/Voxy/Serena',
    modelYear: 2021,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 7,
    luggageCapacity: 5,
    pricePerDay: 6000, // Flyer: "from KSh 6,000 per day, daily hire within Mombasa"
    pricePerDayWeekly: 5500,
    chauffeurDailyRate: 2500,
    image: '/images/hero_m07_fleet_1793873968288.jpg',
    description: 'From KSh 6,000 per day, daily hire within Mombasa. Spacious 7-passenger multi-purpose vehicle with dual power sliding doors, chilled air conditioning, and individual reclining seats. Ideal for family tours, SGR transfers, and Diani Beach excursions.',
    features: ['From KSh 6,000/day in Mombasa', 'Dual Power Sliding Doors', 'Spacious & Air Conditioned', 'Ideal for Tours & Transfers', 'Fold-flat 3rd Row Luggage'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },

  // 3. Small Cars: KSh 3,500/day
  {
    id: 'veh-toyota-axio-vitz-02',
    name: 'Toyota Vitz / Axio / Demio',
    category: 'Small cars',
    modelYear: 2021,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    luggageCapacity: 3,
    pricePerDay: 3500,
    pricePerDayWeekly: 3200,
    chauffeurDailyRate: 2000,
    image: '/images/hero_m07_fleet_1793873968288.jpg',
    description: 'Fuel-efficient, compact city runner for daily hire in Mombasa. Easy parking, chilled air conditioning, and smooth automatic transmission for quick coastal trips.',
    features: ['Air Conditioning', 'Push Start', 'Reverse Camera', 'Bluetooth Audio', 'Eco-Drive Assist'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: false
  },

  // 4. Toyota RAV4 AWD
  {
    id: 'veh-toyota-rav4-03',
    name: 'Toyota RAV4 AWD',
    category: 'RAV4',
    modelYear: 2022,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    luggageCapacity: 4,
    pricePerDay: 7000,
    pricePerDayWeekly: 6500,
    chauffeurDailyRate: 2500,
    image: '/images/prado_tx_luxury_1793873968849.jpg',
    description: 'Contemporary compact luxury SUV combining stylish coastal road presence with intelligent all-wheel-drive stability for trips between Mombasa, Diani, and Kwale.',
    features: ['All-Wheel Drive (AWD)', 'Air Conditioning', 'Comfortable 5-Seater', 'High Ground Clearance'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },

  // 5. Double Cabins 4x4
  {
    id: 'veh-hilux-double-cab-04',
    name: 'Toyota Hilux Revo / Isuzu D-Max 4x4 Double Cab',
    category: 'Double cabins',
    modelYear: 2022,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 5,
    luggageCapacity: 8,
    pricePerDay: 9000,
    pricePerDayWeekly: 8500,
    chauffeurDailyRate: 2500,
    image: '/images/safari_land_cruiser_1793873970453.jpg',
    description: 'Rugged, high-clearance 4WD double cabin with heavy-duty canopy bed, engineered for coastal terrain, rough roads, Kwale rural travel, and project logistics.',
    features: ['Selectable 4WD H4/L4', 'High Ground Clearance', 'Heavy-Duty Cargo Canopy', 'All-Terrain Capability'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: false
  },

  // 6. Prado TX/TZ Executive
  {
    id: 'veh-prado-tx-05',
    name: 'Toyota Land Cruiser Prado TX/TZ',
    category: 'Prado',
    modelYear: 2022,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    luggageCapacity: 6,
    pricePerDay: 15000,
    pricePerDayWeekly: 14000,
    chauffeurDailyRate: 3000,
    image: '/images/prado_tx_luxury_1793873968849.jpg',
    description: 'Commanding executive 7-seater SUV with cool box, plush interior, and powerful coastal presence. The premier choice for executive business and VIP transfers.',
    features: ['Full-Time 4WD', 'Center Console Cool Box', 'Leather Trim 7-Seater', 'Kinetic Dynamic Suspension'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },

  // 7. Land Cruiser V8 / Safari Cruiser
  {
    id: 'veh-land-cruiser-safari-06',
    name: 'Toyota Land Cruiser Safari Cruiser / V8',
    category: 'Land Cruiser',
    modelYear: 2023,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    luggageCapacity: 7,
    pricePerDay: 28000,
    pricePerDayWeekly: 26000,
    chauffeurDailyRate: 3500,
    image: '/images/safari_land_cruiser_1793873970453.jpg',
    description: 'The pinnacle of African travel, safari exploration, and VIP delegations across coastal reserves, Shimba Hills, and Tsavo.',
    features: ['Pop-Up Viewing Roof Option', 'Heavy Duty Suspension', 'Long Range Tank', 'High Ground Clearance'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },

  // 8. Passenger Vans
  {
    id: 'veh-passenger-van-07',
    name: 'Toyota HiAce Executive Van (10-14 Seater)',
    category: 'Passenger vans',
    modelYear: 2022,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 14,
    luggageCapacity: 10,
    pricePerDay: 14000,
    pricePerDayWeekly: 13000,
    chauffeurDailyRate: 2500,
    image: '/images/airport_transfer_vip_1793873970135.jpg',
    description: 'Spacious 14-passenger van with high roof and multi-zone air conditioning for group transfers, airport runs, and coastal tours.',
    features: ['High Roof Walk-In', 'Multi-Zone Air Conditioning', 'Spacious Seating', 'Luggage Compartment'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: false
  }
];

export const COASTAL_LOCATIONS = [
  'SGR Miritini Terminus (Mombasa Station)',
  'Moi International Airport Mombasa (MBA)',
  'Diani Beach (South Coast)',
  'Kwale Town & Shimba Hills',
  'Mombasa Island (CBD)',
  'Nyali',
  'Bamburi Beach & Shanzu',
  'Mtwapa',
  'Kilifi Town & Bofa Beach',
  'Watamu Bay',
  'Malindi Town & Airport',
  'Tsavo East National Park Gate'
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'tour-diani-kwale-day',
    title: 'Diani Beach & Kwale Town Cultural & Scenic Day Hire',
    duration: 'Full Day (8–10 Hours)',
    pickupLocations: ['Diani Beach', 'Mombasa', 'SGR Miritini', 'Nyali'],
    destinations: ['Diani Beach', 'Kwale Town', 'Shimba Hills National Reserve', 'Sheldrick Falls'],
    highlights: [
      'Scenic drive through lush coastal coconut palm plantations to Kwale Town',
      'Guided game drive in Shimba Hills spotting the rare Sable Antelope and coastal elephants',
      'Hike down to the refreshing waters of Sheldrick Falls',
      'Afternoon relaxation along Diani’s world-famous white powder sand beach'
    ],
    priceKsh: 32000,
    recommendedVehicle: 'Toyota Coaster (20-seater) / Toyota Noah / Prado',
    image: '/images/hero_m07_fleet_1793873968288.jpg',
    description: 'Experience the best of coastal hills, indigenous forests, and Indian Ocean relaxation in a dedicated private day hire.'
  },
  {
    id: 'tour-mombasa-sgr-heritage',
    title: 'SGR Miritini & Mombasa City Historic Heritage Tour',
    duration: 'Full Day (8 Hours)',
    pickupLocations: ['SGR Miritini Station', 'Moi Airport', 'Mombasa CBD', 'Nyali'],
    destinations: ['Fort Jesus (UNESCO)', 'Old Town Swahili Alleys', 'Mombasa Tusks', 'Mama Ngina Waterfront'],
    highlights: [
      'Seamless pickup directly from SGR Miritini arrival platform',
      'Guided exploration of 16th-century Fort Jesus fortress and Old Town',
      'Taste traditional coastal Swahili street snacks and coconut water',
      'Oceanfront breeze and sunset cruise viewing at Mama Ngina waterfront'
    ],
    priceKsh: 12500,
    recommendedVehicle: 'Toyota Noah / Voxy 7-Seater',
    image: '/images/airport_transfer_vip_1793873970135.jpg',
    description: 'Perfect for travelers arriving on the Madaraka Express at SGR Miritini looking for an authentic Mombasa day experience.'
  },
  {
    id: 'tour-wasini-dolphin-safari',
    title: 'Diani Beach & Wasini Island Marine Dolphin Excursion',
    duration: 'Full Day (10 Hours)',
    pickupLocations: ['Diani Beach Hotels', 'Kwale', 'Mombasa', 'SGR Miritini'],
    destinations: ['Shimoni Caves', 'Kisite Mpunguti Marine Park', 'Wasini Coral Island'],
    highlights: [
      'Traditional wooden dhow sailing through marine park waters',
      'Snorkeling with wild bottlenose dolphins and vibrant sea turtles',
      'Authentic fresh Swahili seafood feast on Wasini Island',
      'Historical Shimoni caves tour'
    ],
    priceKsh: 18500,
    recommendedVehicle: 'Toyota Coaster / Noah 7-Seater',
    image: '/images/hero_m07_fleet_1793873968288.jpg',
    description: 'A magical marine day tour to the crystal turquoise waters of Kisite Mpunguti, spotting dolphins, coral reefs, and tranquil coastal islands.'
  },
  {
    id: 'tour-tsavo-wildlife',
    title: 'Tsavo East 2-Day Wildlife Safari Expedition',
    duration: '2 Days / 1 Night',
    pickupLocations: ['Mombasa', 'SGR Miritini', 'Diani Beach'],
    destinations: ['Bachuma Gate', 'Aruba Dam', 'Galana River', 'Mudanda Rock'],
    highlights: [
      'Encounter the famous red dust elephants and lions of Tsavo East',
      'Scenic savannah game drives in custom safari-adapted Land Cruiser',
      'Sunset over Mudanda Rock watering hole'
    ],
    priceKsh: 38000,
    recommendedVehicle: 'Toyota Land Cruiser Safari Cruiser',
    image: '/images/safari_land_cruiser_1793873970453.jpg',
    description: 'Experience Africa’s untamed wilderness just 2.5 hours from Mombasa in our safari-ready vehicles.'
  }
];

// Honest empty state: NO fake customer records or seeded reviews
export const INITIAL_REVIEWS: CustomerReview[] = [];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'M07 Executive Coastal Fleet',
    category: 'Fleet',
    imageUrl: '/images/hero_m07_fleet_1793873968288.jpg',
    caption: 'Our clean, air-conditioned fleet prepared for coastal journeys.'
  },
  {
    id: 'gal-02',
    title: 'Executive Prado at Coastal Villa',
    category: 'VIP',
    imageUrl: '/images/prado_tx_luxury_1793873968849.jpg',
    caption: 'Executive VIP transport for conferences, weddings, and private travel.'
  },
  {
    id: 'gal-03',
    title: 'Moi Airport & SGR Arrival Meet & Greet',
    category: 'Airport Transfer',
    imageUrl: '/images/airport_transfer_vip_1793873970135.jpg',
    caption: 'Punctual meet & greet with luggage assistance at arrival terminals.'
  },
  {
    id: 'gal-04',
    title: 'Land Cruiser Safari Expedition',
    category: 'Safari',
    imageUrl: '/images/safari_land_cruiser_1793873970453.jpg',
    caption: 'Safari-ready 4x4 expedition vehicles equipped for game reserves.'
  }
];

// Baseline admin-editable route tariffs for group quotations
export const INITIAL_ROUTE_TARIFFS: RouteTariff[] = [
  {
    id: 'tariff-sgr-diani',
    from: 'SGR Miritini Terminus',
    to: 'Diani Beach',
    serviceType: 'Transfer',
    vehicleType: 'Toyota Coaster (20-seater)',
    priceKsh: 21000,
    notes: 'Direct group transfer via Dongo Kundu bypass / ferry to Diani'
  },
  {
    id: 'tariff-diani-kwale-day',
    from: 'Diani Beach',
    to: 'Kwale Town / Shimba Hills',
    serviceType: 'Full-Day Hire',
    vehicleType: 'Toyota Coaster (20-seater)',
    priceKsh: 32000,
    notes: 'Full-day dedicated hire (up to 10 hours) including fuel and driver allowance'
  },
  {
    id: 'tariff-diani-sgr',
    from: 'Diani Beach',
    to: 'SGR Miritini Terminus',
    serviceType: 'Transfer',
    vehicleType: 'Toyota Coaster (20-seater)',
    priceKsh: 26000,
    notes: 'Punctual group return transfer scheduled for Madaraka Express train departure'
  },
  {
    id: 'tariff-mba-diani',
    from: 'Moi International Airport (MBA)',
    to: 'Diani Beach',
    serviceType: 'Transfer',
    vehicleType: 'Toyota Noah/Voxy 7-seater',
    priceKsh: 6500,
    notes: 'Flight tracking and terminal pickup for up to 6 passengers'
  },
  {
    id: 'tariff-mombasa-dayhire-noah',
    from: 'Mombasa Island',
    to: 'Within Mombasa',
    serviceType: 'Full-Day Hire',
    vehicleType: 'Toyota Noah/Voxy 7-seater',
    priceKsh: 6000,
    notes: 'Daily hire within Mombasa from KSh 6,000 per day'
  }
];

export const FAQS = [
  {
    q: 'How do I book a vehicle or transfer with Msanifu Zero Seven?',
    a: 'You can book directly on this website, call or WhatsApp our dispatch desk on 0729 255154 (+254 729 255 154), or request a tailored group quotation for multi-leg itineraries.'
  },
  {
    q: 'Do you provide SGR Miritini and Moi Airport pickups?',
    a: 'Yes! We specialize in punctual SGR Miritini pickups/drop-offs and Moi International Airport (MBA) transfers directly to Diani Beach, Kwale Town, Nyali, Bamburi, Kilifi, and Malindi.'
  },
  {
    q: 'What is included in the Noah/Voxy KSh 6,000 daily rate?',
    a: 'The Toyota Noah/Voxy is available from KSh 6,000 per day for daily hire within Mombasa. It is spacious, fully air-conditioned, and ideal for family tours, business meetings, and local transfers.'
  },
  {
    q: 'Can you handle large group transport (e.g. 20 passengers)?',
    a: 'Yes! We operate the 20-passenger Toyota Coaster bus equipped with dual heavy-duty air conditioning, luggage storage, and PA sound system. Use our "Request a Group Quotation" tool to calculate your per-person estimate.'
  },
  {
    q: 'What are your core service standards?',
    a: 'We pride ourselves on four core pillars: Safe & Comfortable Transport, Professional Drivers, Reliable & On-Time Performance, and Tailored Tours & Travel Packages.'
  },
  {
    q: 'What payment options do you support?',
    a: 'We accept Safaricom Lipa Na M-Pesa (Till/STK Push), Bank Wire/EFT, Major Credit/Debit Cards, and Cash at vehicle handover.'
  }
];
