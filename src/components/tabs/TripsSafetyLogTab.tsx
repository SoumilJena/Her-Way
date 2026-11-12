import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertCircle,
  Navigation,
  Compass,
  ArrowRight,
  UserCheck,
  PhoneCall,
  Key,
} from 'lucide-react';
import { Booking, CheckInRequest } from '../../types';
import { formatINR } from '../../utils/safety';

interface TripsSafetyLogTabProps {
  bookings: Booking[];
  checkIns: CheckInRequest[];
  onCancelBooking: (id: string) => void;
  onCancelCheckIn: (id: string) => void;
  onNavigateToExplore: () => void;
  onNavigateToGuardians: () => void;
}

export const TripsSafetyLogTab: React.FC<TripsSafetyLogTabProps> = ({
  bookings,
  checkIns,
  onCancelBooking,
  onCancelCheckIn,
  onNavigateToExplore,
  onNavigateToGuardians,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'checkIns'>('bookings');

  return (
    <div className="flex flex-col space-y-4 pb-6 px-4 pt-1">
      {/* Top Telemetry Reassurance Strip */}
      <div className="rounded-2xl p-3 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#276958] dark:bg-[#4CAF8E] animate-pulse"></div>
          <div>
            <span className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA] block leading-tight">
              Safety Mesh Active
            </span>
            <span className="text-[10px] text-[#665E5A] dark:text-[#A89F9D]">
              Emergency Contacts Synced • 112 Dispatch Armed
            </span>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] border border-[#C4E8DC] dark:border-[#23473A]">
          Live Monitoring
        </span>
      </div>

      {/* Segmented Sub-Tab Switcher */}
      <div className="p-1 rounded-xl bg-[#F0ECE8] dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => setActiveSubTab('bookings')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            activeSubTab === 'bookings'
              ? 'bg-white dark:bg-[#282323] text-[#7A1C32] dark:text-[#FFA0B4] shadow-xs'
              : 'text-[#665E5A] dark:text-[#A89F9D] hover:text-[#1E1B1A] dark:hover:text-white'
          }`}
        >
          Booked Trips ({bookings.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('checkIns')}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            activeSubTab === 'checkIns'
              ? 'bg-white dark:bg-[#282323] text-[#7A1C32] dark:text-[#FFA0B4] shadow-xs'
              : 'text-[#665E5A] dark:text-[#A89F9D] hover:text-[#1E1B1A] dark:hover:text-white'
          }`}
        >
          Guardian Check-Ins ({checkIns.length})
        </button>
      </div>

      {/* SUB-TAB 1: Bookings */}
      {activeSubTab === 'bookings' && (
        <div className="flex flex-col space-y-3">
          {bookings.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs">
              <Calendar className="w-9 h-9 text-[#827874] dark:text-[#A89F9D] mx-auto mb-2 opacity-50" />
              <h3 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
                No Booked Trips Yet
              </h3>
              <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mt-1 max-w-xs mx-auto leading-relaxed">
                When you reserve a police-verified stay or women's group tour, your confirmed tickets
                and safety telemetry appear here.
              </p>
              <button
                type="button"
                onClick={onNavigateToExplore}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#7A1C32] dark:bg-[#C94A68] text-white shadow-xs active:scale-95 transition-all"
              >
                <span>Browse Safe Stays & Tours</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl p-4 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A1C32] dark:text-[#FFA0B4]">
                      {booking.listingType === 'stay' ? 'Homestay Reservation' : 'Group Tour Pass'}
                    </span>
                    <h3 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA] leading-snug">
                      {booking.listingTitle}
                    </h3>
                    <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#276958] dark:text-[#4CAF8E]" />
                      <span>{booking.city}</span>
                      <span>·</span>
                      <span>Hosted by {booking.hostName}</span>
                    </p>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      booking.status === 'confirmed'
                        ? 'bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] border-[#C4E8DC] dark:border-[#23473A]'
                        : 'bg-[#FAF8F6] dark:bg-[#282323] text-[#827874] dark:text-[#A89F9D] border-[#E8E2DD] dark:border-[#2E2929]'
                    }`}
                  >
                    {booking.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                  </span>
                </div>

                {/* Details Strip */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] text-xs">
                  <div>
                    <span className="text-[10px] text-[#827874] dark:text-[#A89F9D] block">
                      Date / Schedule
                    </span>
                    <span className="font-semibold text-[#1E1B1A] dark:text-[#F3EFEA]">
                      {booking.checkInDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#827874] dark:text-[#A89F9D] block">
                      Amount Paid
                    </span>
                    <span className="font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
                      {formatINR(booking.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#276958] dark:text-[#4CAF8E]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Emergency contacts shared with host</span>
                  </div>

                  {booking.status === 'confirmed' && (
                    <button
                      type="button"
                      onClick={() => onCancelBooking(booking.id)}
                      className="text-xs font-semibold text-[#7A1C32] dark:text-[#FFA0B4] hover:underline"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* SUB-TAB 2: Check-Ins */}
      {activeSubTab === 'checkIns' && (
        <div className="flex flex-col space-y-3">
          {checkIns.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs">
              <UserCheck className="w-9 h-9 text-[#827874] dark:text-[#A89F9D] mx-auto mb-2 opacity-50" />
              <h3 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
                No Active Check-In Requests
              </h3>
              <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mt-1 max-w-xs mx-auto leading-relaxed">
                Need a female guardian walking escort, coffee safety check, or safe transit shelter?
                Request one instantly from our local verified network.
              </p>
              <button
                type="button"
                onClick={onNavigateToGuardians}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#7A1C32] dark:bg-[#C94A68] text-white shadow-xs active:scale-95 transition-all"
              >
                <span>Find Nearby Guardians</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            checkIns.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl p-4 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#276958] dark:text-[#4CAF8E]">
                      Guardian Escort Log
                    </span>
                    <h3 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA] leading-snug">
                      Assigned to {item.guardianName}
                    </h3>
                    <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mt-0.5">
                      {item.area}, {item.city} • Requested at {item.requestedAt}
                    </p>
                  </div>

                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] border border-[#C4E8DC] dark:border-[#23473A]">
                    {item.status === 'accepted' ? 'En Route (Active)' : item.status}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#7A1C32] dark:text-[#FFA0B4]" />
                    <div>
                      <span className="text-[10px] text-[#827874] dark:text-[#A89F9D] block">
                        Verification Handshake PIN
                      </span>
                      <span className="font-mono font-bold text-sm text-[#1E1B1A] dark:text-[#F3EFEA] tracking-widest">
                        {item.pinCode}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#665E5A] dark:text-[#A89F9D] max-w-[130px] text-right">
                    Match PIN with guardian before transit
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] italic">
                    "{item.notes}"
                  </p>

                  <button
                    type="button"
                    onClick={() => onCancelCheckIn(item.id)}
                    className="text-xs font-semibold text-[#827874] dark:text-[#A89F9D] hover:text-[#7A1C32] dark:hover:text-[#FFA0B4]"
                  >
                    Complete / Clear
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
