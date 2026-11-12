export type TrustTier = 'guest' | 'new_explorer' | 'verified_guardian';

export type City = 'All Cities' | 'Jaipur' | 'Rishikesh' | 'Munnar' | 'Gokarna' | 'Shillong' | 'Hampi';

export type ListingType = 'stay' | 'tour';

export interface Listing {
  id: string;
  title: string;
  type: ListingType;
  city: Exclude<City, 'All Cities'>;
  locationDetails: string;
  price: number;
  priceUnit: string;
  rating: number;
  reviewCount: number;
  vouchedCount: number;
  safetyScore: number; // e.g. 99
  hostName: string;
  hostRole?: string;
  hostAvatar: string;
  imageUrl: string;
  fallbackGradient: string;
  badges: string[]; // e.g. ["Women-Owned", "Police Verified", "CCTV Perimeter"]
  description: string;
  features: string[];
  maxGuests?: number;
}

export interface Guardian {
  id: string;
  name: string;
  age: number;
  city: Exclude<City, 'All Cities'>;
  area: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  checkInCount: number;
  hostedTripsCount: number;
  badges: string[];
  profession: string;
  bio: string;
  safeSpotNote?: string;
  avatar: string;
  isOnline: boolean;
  phone: string;
}

export interface Booking {
  id: string;
  listingId: string;
  listingTitle: string;
  listingType: ListingType;
  city: string;
  price: number;
  checkInDate: string;
  checkOutDate?: string;
  guestsCount: number;
  hostName: string;
  bookedAt: string;
  status: 'confirmed' | 'cancelled';
  contactEmergencyShared: boolean;
}

export interface CheckInRequest {
  id: string;
  guardianId: string;
  guardianName: string;
  city: string;
  area: string;
  requestedAt: string;
  status: 'active' | 'accepted' | 'completed' | 'cancelled';
  type: 'escort' | 'coffee_meet' | 'transit_shelter' | 'virtual_watch';
  notes: string;
  pinCode: string;
}

export interface UserProfile {
  name: string;
  city: string;
  trustTier: TrustTier;
  memberId: string;
  joinedDate: string;
  emergencyContacts: Array<{ name: string; relation: string; phone: string }>;
  aadhaarVerified: boolean;
  livenessVerified: boolean;
  policeNocVerified: boolean;
  socialHandle?: string;
}
