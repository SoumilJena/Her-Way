import React, { useState, useEffect } from 'react';
import {
  Compass,
  Shield,
  Calendar,
  BadgeCheck,
  AlertTriangle,
  HeartHandshake,
} from 'lucide-react';
import { City, Listing, Guardian, Booking, CheckInRequest, TrustTier, UserProfile } from './types';
import { INITIAL_USER_PROFILE, LISTINGS, GUARDIANS } from './data/mockData';
import { createBookingObject, createCheckInRequestObject } from './utils/safety';
import { Header } from './components/Header';
import { QuickVerificationBanner } from './components/QuickVerificationBanner';
import { ExploreTab } from './components/tabs/ExploreTab';
import { GuardiansTab } from './components/tabs/GuardiansTab';
import { TripsSafetyLogTab } from './components/tabs/TripsSafetyLogTab';
import { TrustProfileTab } from './components/tabs/TrustProfileTab';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { BookingModal } from './components/BookingModal';
import { GuardianChatModal } from './components/GuardianChatModal';
import { Toast, ToastData } from './components/Toast';

type TabType = 'explore' | 'guardians' | 'trips' | 'trust';

export default function App() {
  // Theme state: defaults to Light Mode
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('herway_theme');
    return saved === 'dark';
  });

  // Selected City Filter
  const [selectedCity, setSelectedCity] = useState<City>('All Cities');

  // Active Bottom Navigation Tab
  const [activeTab, setActiveTab] = useState<TabType>('explore');

  // User Profile & Trust Tier
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('herway_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return INITIAL_USER_PROFILE;
  });

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('herway_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    // Seed 1 default confirmed stay for a rich initial state
    return [
      {
        id: 'bk-initial-pink-city',
        listingId: 'listing-1',
        listingTitle: 'Haveli of Pink City Artisans',
        listingType: 'stay',
        city: 'Jaipur',
        price: 1200,
        checkInDate: '2026-11-20',
        guestsCount: 1,
        hostName: 'Sunita Sharma',
        bookedAt: '12 Nov 2026',
        status: 'confirmed',
        contactEmergencyShared: true,
      },
    ];
  });

  // Check-In Requests state
  const [checkIns, setCheckIns] = useState<CheckInRequest[]>(() => {
    const saved = localStorage.getItem('herway_checkins');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        id: 'chk-initial-priya',
        guardianId: 'guardian-1',
        guardianName: 'Priya Sharma',
        city: 'Jaipur',
        area: 'C-Scheme & Civil Lines',
        requestedAt: '06:45 PM',
        status: 'accepted',
        type: 'escort',
        notes: 'Evening heritage safe walk escort from Bapu Bazaar to Haveli',
        pinCode: '7492',
      },
    ];
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('herway_favorites');
    return saved ? JSON.parse(saved) : ['listing-1'];
  });

  // Modals state
  const [sosOpen, setSosOpen] = useState(false);
  const [selectedBookingListing, setSelectedBookingListing] = useState<Listing | null>(null);
  const [selectedChatGuardian, setSelectedChatGuardian] = useState<Guardian | null>(null);
  const [toast, setToast] = useState<ToastData | null>(null);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('herway_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('herway_theme', 'light');
    }
  }, [isDark]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('herway_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('herway_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('herway_checkins', JSON.stringify(checkIns));
  }, [checkIns]);

  useEffect(() => {
    localStorage.setItem('herway_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Keyboard shortcut Shift + S for Emergency SOS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        setSosOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (title: string, message: string) => {
    setToast({
      id: Date.now().toString(),
      title,
      message,
    });
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUpdateTrustTier = (newTier: TrustTier) => {
    setUserProfile((prev) => ({
      ...prev,
      trustTier: newTier,
      aadhaarVerified: newTier !== 'guest',
      policeNocVerified: newTier === 'verified_guardian',
    }));
  };

  const handleConfirmBooking = (listing: Listing, checkInDate: string, guestsCount: number) => {
    const newBooking = createBookingObject(listing, checkInDate, guestsCount);
    setBookings((prev) => [newBooking, ...prev]);
    showToast(
      'Trip Confirmed & Saved!',
      `Your reservation at "${listing.title}" is saved in My Trips with host emergency sync.`
    );
    // Smoothly switch to trips tab so the user sees their booking right away
    setActiveTab('trips');
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b))
    );
    showToast('Booking Cancelled', 'Your reservation status has been marked cancelled.');
  };

  const handleRequestCheckIn = (guardian: Guardian, customNote?: string) => {
    const newRequest = createCheckInRequestObject(
      guardian,
      'coffee_meet',
      customNote || 'Safe transit & local advice check-in'
    );
    setCheckIns((prev) => [newRequest, ...prev]);
    showToast(
      'Check-In Request Sent!',
      `Logged with ${guardian.name}. Your 4-digit verification PIN is #${newRequest.pinCode}.`
    );
  };

  const handleCancelCheckIn = (id: string) => {
    setCheckIns((prev) => prev.filter((item) => item.id !== id));
    showToast('Check-In Closed', 'Guardian check-in log updated.');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F6] dark:bg-[#141212] text-[#1E1B1A] dark:text-[#F3EFEA] transition-colors duration-200">
      {/* Centered Desktop Layout Frame (max-w-lg mx-auto min-h-screen border-x) */}
      <div className="max-w-lg mx-auto min-h-screen flex flex-col bg-[#FAF8F6] dark:bg-[#141212] border-x border-[#E8E2DD] dark:border-[#2E2929] shadow-sm relative">
        {/* Top Header */}
        <Header
          selectedCity={selectedCity}
          onCityChange={(city) => {
            setSelectedCity(city);
            showToast('Safe Corridor Selected', `Active zone updated to ${city}.`);
          }}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          onTriggerSOS={() => setSosOpen(true)}
        />

        {/* Quick Verification Banner */}
        <QuickVerificationBanner
          trustTier={userProfile.trustTier}
          onOpenVerification={() => setActiveTab('trust')}
        />

        {/* Scrollable Main Content Tabs */}
        <main className="flex-1 pb-20">
          {activeTab === 'explore' && (
            <ExploreTab
              listings={LISTINGS}
              selectedCity={selectedCity}
              onSelectListing={(listing) => setSelectedBookingListing(listing)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {activeTab === 'guardians' && (
            <GuardiansTab
              guardians={GUARDIANS}
              selectedCity={selectedCity}
              onRequestCheckIn={(guardian) => handleRequestCheckIn(guardian)}
              onOpenChat={(guardian) => setSelectedChatGuardian(guardian)}
            />
          )}

          {activeTab === 'trips' && (
            <TripsSafetyLogTab
              bookings={bookings}
              checkIns={checkIns}
              onCancelBooking={handleCancelBooking}
              onCancelCheckIn={handleCancelCheckIn}
              onNavigateToExplore={() => setActiveTab('explore')}
              onNavigateToGuardians={() => setActiveTab('guardians')}
            />
          )}

          {activeTab === 'trust' && (
            <TrustProfileTab
              userProfile={userProfile}
              onUpdateTier={handleUpdateTrustTier}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Bottom Navigation Bar (4 Working Tabs) */}
        <nav
          className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto z-40 bg-[#FAF8F6]/95 dark:bg-[#1F1C1C]/95 backdrop-blur-xl border-t border-[#E8E2DD] dark:border-[#2E2929] shadow-[0_-2px_12px_rgba(0,0,0,0.06)]"
          aria-label="Bottom Navigation"
        >
          <div className="grid grid-cols-4 items-center h-16 px-1">
            {/* Tab 1: Explore */}
            <button
              type="button"
              onClick={() => setActiveTab('explore')}
              aria-current={activeTab === 'explore' ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all ${
                activeTab === 'explore'
                  ? 'text-[#7A1C32] dark:text-[#FFA0B4] font-bold'
                  : 'text-[#827874] dark:text-[#A89F9D] hover:text-[#1E1B1A] dark:hover:text-[#F3EFEA]'
              }`}
            >
              <Compass
                className={`w-5 h-5 ${activeTab === 'explore' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`}
              />
              <span className="text-[10px] tracking-tight mt-1">Explore</span>
            </button>

            {/* Tab 2: Guardians */}
            <button
              type="button"
              onClick={() => setActiveTab('guardians')}
              aria-current={activeTab === 'guardians' ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all ${
                activeTab === 'guardians'
                  ? 'text-[#7A1C32] dark:text-[#FFA0B4] font-bold'
                  : 'text-[#827874] dark:text-[#A89F9D] hover:text-[#1E1B1A] dark:hover:text-[#F3EFEA]'
              }`}
            >
              <Shield
                className={`w-5 h-5 ${activeTab === 'guardians' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`}
              />
              <span className="text-[10px] tracking-tight mt-1">Guardians</span>
            </button>

            {/* Tab 3: My Trips */}
            <button
              type="button"
              onClick={() => setActiveTab('trips')}
              aria-current={activeTab === 'trips' ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative ${
                activeTab === 'trips'
                  ? 'text-[#7A1C32] dark:text-[#FFA0B4] font-bold'
                  : 'text-[#827874] dark:text-[#A89F9D] hover:text-[#1E1B1A] dark:hover:text-[#F3EFEA]'
              }`}
            >
              <Calendar
                className={`w-5 h-5 ${activeTab === 'trips' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`}
              />
              <span className="text-[10px] tracking-tight mt-1">My Trips</span>
              {bookings.filter((b) => b.status === 'confirmed').length > 0 && (
                <span className="absolute top-1.5 right-6 w-2 h-2 rounded-full bg-[#276958] dark:bg-[#4CAF8E]"></span>
              )}
            </button>

            {/* Tab 4: Trust Profile */}
            <button
              type="button"
              onClick={() => setActiveTab('trust')}
              aria-current={activeTab === 'trust' ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all ${
                activeTab === 'trust'
                  ? 'text-[#7A1C32] dark:text-[#FFA0B4] font-bold'
                  : 'text-[#827874] dark:text-[#A89F9D] hover:text-[#1E1B1A] dark:hover:text-[#F3EFEA]'
              }`}
            >
              <BadgeCheck
                className={`w-5 h-5 ${activeTab === 'trust' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`}
              />
              <span className="text-[10px] tracking-tight mt-1">Trust ID</span>
            </button>
          </div>
        </nav>

        {/* Modals & Dialogs */}
        <EmergencySOSModal
          isOpen={sosOpen}
          onClose={() => setSosOpen(false)}
          onShowToast={showToast}
        />

        <BookingModal
          listing={selectedBookingListing}
          isOpen={!!selectedBookingListing}
          onClose={() => setSelectedBookingListing(null)}
          onConfirmBooking={handleConfirmBooking}
        />

        <GuardianChatModal
          guardian={selectedChatGuardian}
          isOpen={!!selectedChatGuardian}
          onClose={() => setSelectedChatGuardian(null)}
          onSendCheckInRequest={handleRequestCheckIn}
        />

        {/* Global Toast */}
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    </div>
  );
}
