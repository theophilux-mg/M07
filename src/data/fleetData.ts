import { Vehicle, TourPackage, CustomerReview, GalleryItem } from '../types';

export const INITIAL_VEHICLES: Vehicle[] = [
  // 1. Small cars: KSh 3,500/day
  {
    id: 'veh-toyota-vitz-01',
    name: 'Toyota Vitz / Yaris Jewela',
    category: 'Small cars',
    modelYear: 2020,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 4,
    luggageCapacity: 2,
    pricePerDay: 3500,
    pricePerDayWeekly: 3200,
    chauffeurDailyRate: 2000,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
    description: 'Agile, ultra fuel-efficient coastal city runner. Ideal for Mombasa CBD navigation, Nyali errands, and Bamburi beach hops.',
    features: ['Air Conditioning', 'Push Start', 'Reverse Camera', 'Bluetooth Audio', 'Eco-Drive Assist'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: false
  },
  {
    id: 'veh-toyota-axio-02',
    name: 'Toyota Corolla Axio / Fielder',
    category: 'Small cars',
    modelYear: 2021,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    luggageCapacity: 3,
    pricePerDay: 3500,
    pricePerDayWeekly: 3200,
    chauffeurDailyRate: 2000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Comfortable family sedan with generous boot space and chilled climate control, smooth on both town roads and coastal highway drives.',
    features: ['Climate Control', 'Power Steering', 'Large Trunk', 'Keyless Entry', 'USB Fast Charging'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },

  // 2. Noah / Voxy / Serena: KSh 6,000–8,000/day
  {
    id: 'veh-toyota-noah-03',
    name: 'Toyota Noah Si Elegance',
    category: 'Noah/Voxy/Serena',
    modelYear: 2021,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 7,
    luggageCapacity: 4,
    pricePerDay: 7000,
    pricePerDayWeekly: 6500,
    chauffeurDailyRate: 2500,
    image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1200&q=80',
    description: 'Spacious 7-seater multi-purpose vehicle featuring dual power sliding doors, low step-in, and individual reclining captain chairs.',
    features: ['Dual Power Sliding Doors', 'Rear AC Vents', 'Fold-flat 3rd Row', 'Tinted Privacy Glass', 'Touchscreen Infotainment'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },
  {
    id: 'veh-toyota-voxy-04',
    name: 'Toyota Voxy ZS Kirameki',
    category: 'Noah/Voxy/Serena',
    modelYear: 2022,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 7,
    luggageCapacity: 5,
    pricePerDay: 8000,
    pricePerDayWeekly: 7500,
    chauffeurDailyRate: 2500,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    description: 'Premium black edition Voxy with aero body kit, ambient interior lighting, and executive seating tailored for coastal group transfers.',
    features: ['Aero Styling', 'Dual Zone Climate', 'Rear Sunshades', 'Captain Chairs', 'Bluetooth & HDMI'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },
  {
    id: 'veh-nissan-serena-05',
    name: 'Nissan Serena Highway Star',
    category: 'Noah/Voxy/Serena',
    modelYear: 2021,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 8,
    luggageCapacity: 4,
    pricePerDay: 6000,
    pricePerDayWeekly: 5500,
    chauffeurDailyRate: 2500,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    description: 'Versatile 8-seater smart hybrid with hands-free sliding doors and high interior headroom, ideal for family airport pickups.',
    features: ['Hands-Free Doors', 'S-Hybrid Efficiency', 'Multi-flexible Seating', '360 Around View Monitor', 'Cruise Control'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: false
  },

  // 3. Double cabins: KSh 9,000/day
  {
    id: 'veh-hilux-06',
    name: 'Toyota Hilux Revo Double Cab 4x4',
    category: 'Double cabins',
    modelYear: 2022,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 5,
    luggageCapacity: 8,
    pricePerDay: 9000,
    pricePerDayWeekly: 8500,
    chauffeurDailyRate: 2500,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Rugged, high-clearance 4WD double cabin pickup truck with heavy-duty canopy bed, ready for coastal terrain, project logistics, and rough tracks.',
    features: ['Selectable 4WD H4/L4', 'Heavy-Duty Cargo Canopy', 'Tow Hitch', 'Hill Descent Control', 'All-Terrain Tyres'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },
  {
    id: 'veh-isuzu-dmax-07',
    name: 'Isuzu D-Max V-Cross 4x4 Double Cab',
    category: 'Double cabins',
    modelYear: 2022,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 5,
    luggageCapacity: 8,
    pricePerDay: 9000,
    pricePerDayWeekly: 8500,
    chauffeurDailyRate: 2500,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    description: 'Torque-rich turbocharged diesel double cabin engineered for durability across coastal sandy roads and regional business operations.',
    features: ['High Ground Clearance', 'Steel Underbody Armor', 'Differential Lock', 'Leather Trim Seats', 'Roof Rails'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: false
  },

  // 4. RAV4: KSh 7,000/day
  {
    id: 'veh-toyota-rav4-08',
    name: 'Toyota RAV4 Dynamic AWD',
    category: 'RAV4',
    modelYear: 2022,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    luggageCapacity: 4,
    pricePerDay: 7000,
    pricePerDayWeekly: 6500,
    chauffeurDailyRate: 2500,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80',
    description: 'Contemporary compact luxury SUV combining stylish coastal road presence with intelligent all-wheel-drive stability and luxury cabin quietness.',
    features: ['All-Wheel Drive (AWD)', 'Panoramic Sunroof', 'Apple CarPlay & Android Auto', 'Blind Spot Monitor', 'Dual Climate AC'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },

  // 5. Prado: KSh 15,000/day
  {
    id: 'veh-prado-tx-09',
    name: 'Toyota Land Cruiser Prado TX/TZ Luxury 7-Seater',
    category: 'Prado',
    modelYear: 2023,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    luggageCapacity: 6,
    pricePerDay: 15000,
    pricePerDayWeekly: 14000,
    chauffeurDailyRate: 3000,
    image: '/src/assets/images/prado_tx_luxury_1793873968849.jpg',
    description: 'The definitive prestige executive SUV in Kenya. Pearl black with champagne interior accents, kinetic dynamic suspension, and commanding coastal presence.',
    features: ['Full-Time 4WD with Low Range', 'Cool Box Center Console', 'Premium Leather Interior', 'Surround Sound Audio', 'Sunroof & Side Steps'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },

  // 6. Land Cruiser: KSh 28,000/day
  {
    id: 'veh-land-cruiser-v8-10',
    name: 'Toyota Land Cruiser V8 / LC300 Executive',
    category: 'Land Cruiser',
    modelYear: 2023,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 7,
    luggageCapacity: 7,
    pricePerDay: 28000,
    pricePerDayWeekly: 26000,
    chauffeurDailyRate: 3500,
    image: '/src/assets/images/safari_land_cruiser_1793873970453.jpg',
    description: 'The pinnacle of luxury travel and safari expeditions. Unrivaled comfort, bullet-tested reliability, and status across Mombasa, Nairobi, and national game reserves.',
    features: ['Crawl Control & Multi-Terrain Select', 'Rear Entertainment Screens', 'Armored Glass Option', 'Executive Captain Seats', 'Chilled Refreshment Compartment'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },

  // 7. Passenger vans: KSh 9,000–18,000/day
  {
    id: 'veh-hiace-van-11',
    name: 'Toyota HiAce Super Custom Shark Van (10-Seater)',
    category: 'Passenger vans',
    modelYear: 2022,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 10,
    luggageCapacity: 8,
    pricePerDay: 12000,
    pricePerDayWeekly: 11000,
    chauffeurDailyRate: 2500,
    image: '/src/assets/images/airport_transfer_vip_1793873970135.jpg',
    description: 'Executive 10-passenger coastal shuttle van with reclining velvet seats, triple air-conditioning units, and panoramic tinted windows.',
    features: ['Triple AC Units', 'Individual Reclining Seats', 'Overhead Luggage Storage', 'PA Microphone System', 'High Roof Walk-in'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  },
  {
    id: 'veh-commuter-van-12',
    name: 'Luxury VIP Executive Commuter (14-Seater)',
    category: 'Passenger vans',
    modelYear: 2023,
    transmission: 'Manual',
    fuelType: 'Diesel',
    seats: 14,
    luggageCapacity: 10,
    pricePerDay: 16000,
    pricePerDayWeekly: 15000,
    chauffeurDailyRate: 3000,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    description: 'Premier large group luxury transport for corporate delegates, VIP airport transfers, weddings, and long-range cross-county tours.',
    features: ['14 Luxury Captain Seats', 'Dedicated Large Luggage Bay', 'USB Ports per Seat', 'High Output AC', 'Front & Rear Dashcams'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: false
  },
  {
    id: 'veh-tour-van-13',
    name: 'Custom Safari Van with Pop-Up Roof (8-Seater)',
    category: 'Passenger vans',
    modelYear: 2022,
    transmission: 'Manual',
    fuelType: 'Diesel',
    seats: 8,
    luggageCapacity: 8,
    pricePerDay: 14000,
    pricePerDayWeekly: 13000,
    chauffeurDailyRate: 3000,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    description: 'Specially converted 4WD safari tour van with pop-up photographic viewing roof, VHF high-frequency safari radio, and onboard cooler.',
    features: ['360° Pop-Up Roof', 'Long-Range Fuel Tank', 'Safari VHF Two-Way Radio', 'Cooler Box & Inverter', 'Heavy Duty Suspension'],
    isAvailable: true,
    minimumDays: 1,
    isPopular: true
  }
];

export const COASTAL_LOCATIONS = [
  'Moi International Airport Mombasa (MBA)',
  'Nyali (Links Road / Beach Hotels)',
  'Diani Beach (South Coast via Dongo Kundu / Likoni)',
  'Bamburi Beach & Shanzu Resorts',
  'Mombasa CBD (Old Town / Fort Jesus / Treasury Square)',
  'SGR Miritini Terminus (Mombasa Station)',
  'Mtwapa Luxury Residences',
  'Kilifi Town & Bofa Beach',
  'Watamu Bay & Turtle Bay Resorts',
  'Malindi International Airport & Town',
  'Tiwi Beach Resorts',
  'Tsavo East National Park Gate (Bachuma)'
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'tour-mombasa-heritage',
    title: 'Mombasa Heritage & Historic Old Town Discovery',
    duration: 'Full Day (8 Hours)',
    pickupLocations: ['Moi Airport', 'Nyali', 'Bamburi', 'Diani', 'Mombasa CBD'],
    destinations: ['Fort Jesus (UNESCO)', 'Old Town Mombasa', 'Spice Market', 'Mombasa Tusks (Moi Avenue)', 'Mama Ngina Waterfront Park'],
    highlights: [
      'Guided historical exploration of 16th-century Fort Jesus fortress',
      'Walk through narrow Swahili-Arab carved doorway alleys in Old Town',
      'Taste traditional Swahili street delicacies (mshikaki, mahamri, coconut water)',
      'Sunset ocean cruise view at Mama Ngina waterfront on the Kilindini Channel'
    ],
    priceKsh: 12500,
    recommendedVehicle: 'Toyota Noah / Voxy / Serena',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    description: 'Immerse yourself in centuries of coastal civilization, Portuguese fortifications, Swahili coastal architecture, and authentic spice trading.'
  },
  {
    id: 'tour-wasini-dolphin',
    title: 'Diani Beach & Wasini Island Marine Dolphin Safari',
    duration: 'Full Day (10 Hours)',
    pickupLocations: ['Diani Hotels', 'Nyali', 'Mombasa CBD', 'Bamburi'],
    destinations: ['Shimoni Slave Caves', 'Kisite Mpunguti Marine National Park', 'Wasini Coral Island'],
    highlights: [
      'Traditional Arab wooden dhow sailing through marine park waters',
      'Snorkeling with wild bottlenose dolphins & vibrant sea turtles',
      'Authentic fresh Swahili crab and seafood feast on Wasini Island',
      'Historic Shimoni colonial and ancient slave holding caves tour'
    ],
    priceKsh: 18500,
    recommendedVehicle: 'Toyota Land Cruiser Prado TX',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'A magical marine day excursion to the crystal turquoise waters of Kisite Mpunguti, spotting dolphins, coral reefs, and tranquil coastal islands.'
  },
  {
    id: 'tour-tsavo-safari',
    title: 'Tsavo East National Park 2-Day Wildlife Expedition',
    duration: '2 Days / 1 Night',
    pickupLocations: ['Moi Airport', 'Nyali', 'Diani', 'SGR Miritini'],
    destinations: ['Bachuma Gate', 'Aruba Dam', 'Mudanda Rock', 'Galana River Yatta Plateau'],
    highlights: [
      'Encounter famous red dust elephants of Tsavo East',
      'Pride of Tsavo lions, leopards, cheetahs, and endangered hirola antelope',
      'Sunset game drive overlooking scenic Mudanda Rock waterhole',
      'Professional KWS certified driver-guide with custom safari vehicle'
    ],
    priceKsh: 38000,
    recommendedVehicle: 'Toyota Land Cruiser Safari Cruiser / Prado TX',
    image: '/src/assets/images/safari_land_cruiser_1793873970453.jpg',
    description: 'Experience Africa’s untamed wilderness just 2.5 hours from Mombasa. Pure wildlife drama against the red earth of Tsavo.'
  },
  {
    id: 'tour-haller-northcoast',
    title: 'Haller Park Eco-Sanctuary & North Coast Sunset',
    duration: 'Half Day (5 Hours)',
    pickupLocations: ['Bamburi', 'Nyali', 'Mtwapa', 'Mombasa CBD'],
    destinations: ['Haller Park Bamburi', 'Butterfly Pavilion', 'Nyali Beach Viewpoint'],
    highlights: [
      'Afternoon feeding of 130-year-old giant Aldabra tortoises and giraffes',
      'Reclaimed limestone quarry ecological success story tour',
      'Reptile park with Nile crocodiles, pythons, and coastal birds',
      'Chilled sundowner stop at Nyali beach ocean lounge'
    ],
    priceKsh: 8500,
    recommendedVehicle: 'Toyota RAV4 / Small cars',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    description: 'A relaxing half-day ecological retreat close to the beach, perfect for families and nature enthusiasts.'
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    author: 'Captain David Kariuki',
    location: 'Nairobi, Kenya',
    rating: 5,
    comment: 'Booked the Toyota Prado TX for 5 days during a high-level coastal maritime conference in Nyali. The car was immaculate, cold AC, and pickup at Moi Airport was right on time. M07 is truly Mombasa’s elite car hire.',
    vehicleHired: 'Toyota Land Cruiser Prado TX',
    date: '2026-02-14',
    approved: true
  },
  {
    id: 'rev-02',
    author: 'Elena & Marcus Weber',
    location: 'Munich, Germany',
    rating: 5,
    comment: 'We hired a Noah 7-seater for our family trip from Moi Airport down to Diani Beach. Our chauffeur, Juma, drove smoothly and safely through the bypass. Reliable, honest pricing with no hidden charges.',
    vehicleHired: 'Toyota Noah Si Elegance',
    date: '2026-01-29',
    approved: true
  },
  {
    id: 'rev-03',
    author: 'Amina Al-Mansoor',
    location: 'Dubai, UAE',
    rating: 5,
    comment: 'The Land Cruiser V8 executive service exceeded our expectations for our VIP delegation. Immaculate condition and top tier professionalism from Msanifu Zero Seven.',
    vehicleHired: 'Toyota Land Cruiser V8 / LC300',
    date: '2026-02-02',
    approved: true
  },
  {
    id: 'rev-04',
    author: 'Brian Omondi',
    location: 'Mombasa, Kenya',
    rating: 5,
    comment: 'Rented the Toyota RAV4 for 3 days to tour Kilifi and Watamu. Straightforward booking, transparent agreement, and deposit returned immediately upon return inspection. Highly recommended!',
    vehicleHired: 'Toyota RAV4 Dynamic AWD',
    date: '2026-02-20',
    approved: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'M07 Executive Fleet at Mombasa Coastline',
    category: 'Fleet',
    imageUrl: '/src/assets/images/hero_m07_fleet_1793873968288.jpg',
    caption: 'Our premium fleet lined up along the scenic coastal road at golden hour.'
  },
  {
    id: 'gal-02',
    title: 'Toyota Prado TX Luxury in Nyali Estate',
    category: 'VIP',
    imageUrl: '/src/assets/images/prado_tx_luxury_1793873968849.jpg',
    caption: 'Executive VIP transport at premier private residences in Nyali and Shanzu.'
  },
  {
    id: 'gal-03',
    title: 'Moi International Airport (MBA) VIP Arrival',
    category: 'Airport Transfer',
    imageUrl: '/src/assets/images/airport_transfer_vip_1793873970135.jpg',
    caption: 'Chauffeured terminal meet & greet service with dedicated luggage handling.'
  },
  {
    id: 'gal-04',
    title: 'Custom Land Cruiser Safari in Tsavo East',
    category: 'Safari',
    imageUrl: '/src/assets/images/safari_land_cruiser_1793873970453.jpg',
    caption: 'Safari-ready 4x4 expedition vehicles equipped for coastal game reserves.'
  },
  {
    id: 'gal-05',
    title: 'Mombasa Fort Jesus & Historic Waterfront',
    category: 'Mombasa',
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    caption: 'UNESCO World Heritage site Fort Jesus at the gateway to Old Town Mombasa.'
  },
  {
    id: 'gal-06',
    title: 'Diani Beach Pristine White Sands',
    category: 'Mombasa',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    caption: 'World-renowned South Coast paradise easily accessible via M07 private transfers.'
  }
];

export const FAQS = [
  {
    q: 'What documents are required to hire a self-drive vehicle in Mombasa?',
    a: 'For Kenyan citizens, you will need a valid Kenyan Driving License (minimum 2 years driving experience) and National ID or Passport. For international visitors, an International Driving Permit or valid Home Country Driving License plus Passport with valid tourist/business entry stamp is required.'
  },
  {
    q: 'How does airport pickup at Moi International Airport (MBA) work?',
    a: 'Our uniformed chauffeur or fleet officer monitors your flight arrival in real time. We meet you at the Terminal 1 or 2 Arrival Hall holding a personalized M07 name board, assist with your luggage, and escort you directly to your chilled vehicle. There are no parking delays or airport hassle.'
  },
  {
    q: 'What is your security deposit and refund policy?',
    a: 'For self-drive hires, a refundable security deposit (KSh 10,000 for small cars/vans to KSh 25,000 for Prado/Land Cruiser) is held via M-Pesa or card. Upon vehicle return inspection with no damage and fuel matched, your deposit is refunded immediately.'
  },
  {
    q: 'Can I drive the vehicle outside Mombasa to Diani, Kilifi, Malindi, or Tsavo?',
    a: 'Yes! All M07 vehicles come with regional coastal clearance covering Mombasa, Kwale (Diani/Ukunda), Kilifi (Watamu/Malindi), and Taita Taveta (Tsavo). If you plan to travel upcountry to Nairobi or Western Kenya, simply notify us during booking so our tracking zone is updated accordingly.'
  },
  {
    q: 'What are your payment options?',
    a: 'We accept Safaricom Lipa Na M-Pesa (Till Number & STK push instant prompt), Bank Wire/EFT, Major Credit/Debit Cards (Visa, Mastercard, Amex), and Cash at our Nyali office.'
  },
  {
    q: 'What happens in case of a mechanical breakdown or roadside issue?',
    a: 'All M07 vehicles are comprehensively insured with AA Kenya 24/7 Roadside Assistance. In the rare event of a mechanical problem, our mobile response team or immediate replacement vehicle is dispatched to your location across coastal Kenya.'
  },
  {
    q: 'Is fuel included in the daily rental rate?',
    a: 'Vehicles are dispatched on a "Same-to-Same" fuel policy (usually full tank to full tank). For airport transfers and tour packages with chauffeur, fuel and driver allowances are included in the package rate.'
  }
];
