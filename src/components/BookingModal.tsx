import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Calendar,
  Users,
  MapPin,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Listing } from '../types';
import { formatINR } from '../utils/safety';

interface BookingModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (listing: Listing, checkInDate: string, guestsCount: number) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  listing,
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  const [checkInDate, setCheckInDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [guestsCount, setGuestsCount] = useState(1);
  const [shareEmergencyContact, setShareEmergencyContact] = useState(true);

  if (!isOpen || !listing) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBooking(listing, checkInDate, guestsCount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#1F1C1C] text-[#1E1B1A] dark:text-[#F3EFEA] border border-[#E8E2DD] dark:border-[#2E2929] shadow-2xl p-5 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F0ECE8] dark:bg-[#282323] flex items-center justify-center text-[#665E5A] dark:text-[#A89F9D] hover:text-[#1E1B1A] dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div className="pr-8">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A1C32] dark:text-[#FFA0B4]">
            {listing.type === 'stay' ? "Women's Homestay Booking" : "Women's Group Tour Reservation"}
          </span>
          <h2 className="text-base font-bold text-[#1E1B1A] dark:text-[#F3EFEA] mt-0.5 leading-snug">
            {listing.title}
          </h2>
          <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#276958] dark:text-[#4CAF8E]" />
            <span>{listing.city} • Hosted by {listing.hostName}</span>
          </p>
        </div>

        {/* Mini Preview Card */}
        <div className="mt-3.5 p-3 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-[#827874] dark:text-[#A89F9D] block">Total Amount</span>
            <span className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
              {formatINR(listing.price)}
            </span>
            <span className="text-[10px] text-[#665E5A] dark:text-[#A89F9D] block">
              Inclusive of taxes & safety escort fee
            </span>
          </div>

          <div className="text-right">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] border border-[#C4E8DC] dark:border-[#23473A]">
              {listing.safetyScore}% Safety Score
            </span>
            <span className="text-[10px] text-[#827874] dark:text-[#A89F9D] block mt-1">
              Vouched by {listing.vouchedCount} women
            </span>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleConfirm} className="mt-3.5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-[#1E1B1A] dark:text-[#F3EFEA] block mb-1">
                Travel Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] text-xs text-[#1E1B1A] dark:text-[#F3EFEA] focus:outline-none focus:ring-1 focus:ring-[#7A1C32]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#1E1B1A] dark:text-[#F3EFEA] block mb-1">
                Female Guests
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full h-9 px-2.5 rounded-xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] text-xs text-[#1E1B1A] dark:text-[#F3EFEA] focus:outline-none focus:ring-1 focus:ring-[#7A1C32]"
              >
                <option value={1}>1 Solo Female</option>
                <option value={2}>2 Women</option>
              </select>
            </div>
          </div>

          {/* Emergency telemetry checkbox */}
          <label className="flex items-start gap-2 p-2.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] cursor-pointer">
            <input
              type="checkbox"
              checked={shareEmergencyContact}
              onChange={(e) => setShareEmergencyContact(e.target.checked)}
              className="mt-0.5 rounded text-[#7A1C32] focus:ring-[#7A1C32]"
            />
            <div className="text-[11px] leading-snug">
              <span className="font-semibold text-[#1E1B1A] dark:text-[#F3EFEA] block">
                Share Emergency Telemetry with Verified Host
              </span>
              <span className="text-[#665E5A] dark:text-[#A89F9D]">
                Automatically shares arrival confirmation and primary emergency contacts with{' '}
                {listing.hostName}.
              </span>
            </div>
          </label>

          {/* Confirm Button */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl bg-[#F0ECE8] dark:bg-[#282323] text-[#1E1B1A] dark:text-[#F3EFEA] font-bold text-xs hover:bg-[#EAE4DE] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-[#7A1C32] dark:bg-[#C94A68] hover:bg-[#601526] text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm & Save to Trips</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
