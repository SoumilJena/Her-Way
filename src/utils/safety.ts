import { City, Listing, TrustTier, Booking, CheckInRequest, Guardian } from '../types';

export function filterListings(
  listings: Listing[],
  activeFilter: string,
  selectedCity: City,
  searchQuery: string = ''
): Listing[] {
  return listings.filter((item) => {
    // City filter
    if (selectedCity !== 'All Cities' && item.city !== selectedCity) {
      return false;
    }

    // Category filter pills
    if (activeFilter === 'Women-Owned Stays') {
      if (item.type !== 'stay' || !item.badges.some((b) => b.toLowerCase().includes('women-owned'))) {
        return false;
      }
    } else if (activeFilter === 'Under ₹1,500') {
      if (item.price > 1500) {
        return false;
      }
    } else if (activeFilter === 'Group Tours') {
      if (item.type !== 'tour') {
        return false;
      }
    } else if (activeFilter === 'Police Verified') {
      if (!item.badges.some((b) => b.toLowerCase().includes('police verified'))) {
        return false;
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCity = item.city.toLowerCase().includes(q);
      const matchLocation = item.locationDetails.toLowerCase().includes(q);
      const matchHost = item.hostName.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchTitle && !matchCity && !matchLocation && !matchHost && !matchDesc) {
        return false;
      }
    }

    return true;
  });
}

export function validateInviteCode(code: string): boolean {
  return code.trim().toUpperCase() === 'HERWAY2026';
}

export function getTierDetails(tier: TrustTier): {
  label: string;
  badgeText: string;
  description: string;
  progressPercent: number;
  nextMilestone: string;
} {
  switch (tier) {
    case 'guest':
      return {
        label: 'Guest Explorer',
        badgeText: 'Unverified Guest',
        description: 'Limited access to emergency guardian escort and instant booking.',
        progressPercent: 20,
        nextMilestone: 'Verify sovereign ID or enter invite code to unlock New Explorer tier.',
      };
    case 'new_explorer':
      return {
        label: 'New Explorer — Probation',
        badgeText: 'New Explorer',
        description: 'Government KYC authenticated. Complete 1 monitored solo trip to unlock Guardian Tier.',
        progressPercent: 60,
        nextMilestone: 'Complete 1 safe solo trip with active telemetry to unlock full peer voucher rights.',
      };
    case 'verified_guardian':
      return {
        label: 'Verified Guardian',
        badgeText: 'Verified Guardian',
        description: 'Full sovereign KYC + Sisterhood Trust Chain active. Top 1% Safety Standing.',
        progressPercent: 100,
        nextMilestone: 'Active community guardian authorized for walking escorts and peer vouching.',
      };
  }
}

export function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export function createBookingObject(
  listing: Listing,
  checkInDate: string,
  guestsCount: number = 1
): Booking {
  return {
    id: 'bk-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    listingId: listing.id,
    listingTitle: listing.title,
    listingType: listing.type,
    city: listing.city,
    price: listing.price,
    checkInDate: checkInDate || new Date().toISOString().split('T')[0],
    guestsCount,
    hostName: listing.hostName,
    bookedAt: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    status: 'confirmed',
    contactEmergencyShared: true,
  };
}

export function createCheckInRequestObject(
  guardian: Guardian,
  type: CheckInRequest['type'] = 'coffee_meet',
  notes: string = 'Safe transit & local advice check-in'
): CheckInRequest {
  const pin = Math.floor(1000 + Math.random() * 9000).toString();
  return {
    id: 'chk-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    guardianId: guardian.id,
    guardianName: guardian.name,
    city: guardian.city,
    area: guardian.area,
    requestedAt: new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    status: 'accepted',
    type,
    notes,
    pinCode: pin,
  };
}
