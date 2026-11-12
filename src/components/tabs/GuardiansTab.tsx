import React, { useState } from 'react';
import {
  ShieldCheck,
  Star,
  MapPin,
  MessageCircle,
  Handshake,
  HeartHandshake,
  CheckCircle,
  Activity,
  Home,
  Award,
  Zap,
} from 'lucide-react';
import { City, Guardian } from '../../types';

interface GuardiansTabProps {
  guardians: Guardian[];
  selectedCity: City;
  onRequestCheckIn: (guardian: Guardian) => void;
  onOpenChat: (guardian: Guardian) => void;
}

export const GuardiansTab: React.FC<GuardiansTabProps> = ({
  guardians,
  selectedCity,
  onRequestCheckIn,
  onOpenChat,
}) => {
  const [selectedTag, setSelectedTag] = useState('All Within 3 km');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Filter guardians if selected city is specific
  const filteredGuardians = guardians.filter((g) => {
    if (selectedCity !== 'All Cities' && g.city !== selectedCity) {
      return false;
    }
    if (selectedTag === 'Superhost' && g.rating < 4.95) {
      return false;
    }
    if (selectedTag === 'Emergency Certified' && !g.badges.some((b) => b.includes('Aid') || b.includes('Corps') || b.includes('Emergency'))) {
      return false;
    }
    return true;
  });

  const handleFocusGuardian = (id: string) => {
    setHighlightedId(id);
    const el = document.getElementById(`guardian-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => setHighlightedId(null), 2000);
  };

  return (
    <div className="flex flex-col space-y-4 pb-6 px-4 pt-1">
      {/* Radar & Live Proximity Status Widget */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#276958] dark:bg-[#4CAF8E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#276958] dark:bg-[#4CAF8E]"></span>
            </span>
            <h2 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
              Active Guardian Watch
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] border border-[#C4E8DC] dark:border-[#23473A] text-[#276958] dark:text-[#4CAF8E] text-[11px] font-semibold">
            <Zap className="w-3 h-3 fill-current" />
            <span>&lt; 3 min response</span>
          </span>
        </div>

        <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mb-3 leading-relaxed">
          <strong className="text-[#1E1B1A] dark:text-[#F3EFEA] font-semibold">
            14 verified female guardians
          </strong>{' '}
          active in safe corridor perimeters around{' '}
          <span className="text-[#276958] dark:text-[#4CAF8E] font-medium">
            {selectedCity === 'All Cities' ? 'All Active Hubs' : `${selectedCity} Central`}
          </span>
          .
        </p>

        {/* Radar Map Interactive Simulation */}
        <div className="relative w-full h-32 rounded-xl bg-[#F0ECE8] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] overflow-hidden flex items-center justify-center">
          {/* Sonar rings */}
          <div className="absolute w-16 h-16 rounded-full bg-[#276958]/10 dark:bg-[#4CAF8E]/10 animate-ping opacity-60"></div>
          <div className="absolute w-24 h-24 rounded-full border border-[#276958]/20 dark:border-[#4CAF8E]/20"></div>
          <div className="absolute w-36 h-36 rounded-full border border-[#276958]/15 dark:border-[#4CAF8E]/15"></div>
          <div className="absolute w-48 h-48 rounded-full border border-[#276958]/10 dark:border-[#4CAF8E]/10"></div>

          {/* Grid lines */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#E0D9D2] dark:bg-[#332D2D]"></div>
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#E0D9D2] dark:bg-[#332D2D]"></div>

          {/* User pin */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#7A1C32] dark:bg-[#C94A68] flex items-center justify-center text-white shadow-md ring-2 ring-white dark:ring-[#1F1C1C]">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] text-[#1E1B1A] dark:text-[#F3EFEA] mt-0.5 shadow-2xs">
              You
            </span>
          </div>

          {/* Guardian Pins */}
          <button
            type="button"
            onClick={() => handleFocusGuardian('guardian-1')}
            className="absolute top-4 left-1/4 z-10 flex items-center gap-1 bg-white dark:bg-[#1F1C1C] border border-[#C4E8DC] dark:border-[#23473A] py-0.5 px-2 rounded-full shadow-xs hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="w-2 h-2 rounded-full bg-[#276958] dark:bg-[#4CAF8E]"></div>
            <span className="text-[10px] font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
              Priya (0.8k)
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleFocusGuardian('guardian-2')}
            className="absolute bottom-4 right-1/4 z-10 flex items-center gap-1 bg-white dark:bg-[#1F1C1C] border border-[#C4E8DC] dark:border-[#23473A] py-0.5 px-2 rounded-full shadow-xs hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="w-2 h-2 rounded-full bg-[#276958] dark:bg-[#4CAF8E]"></div>
            <span className="text-[10px] font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
              Ritu (1.2k)
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleFocusGuardian('guardian-3')}
            className="absolute top-4 right-5 z-10 flex items-center gap-1 bg-white dark:bg-[#1F1C1C] border border-[#FCE6BD] dark:border-[#482900] py-0.5 px-2 rounded-full shadow-xs hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="w-2 h-2 rounded-full bg-[#C27803] dark:bg-[#D99B52]"></div>
            <span className="text-[10px] font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
              Meera (1.6k)
            </span>
          </button>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        {['All Within 3 km', 'Superhost', 'Emergency Certified'].map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs active:scale-95 ${
                isActive
                  ? 'bg-[#7A1C32] dark:bg-[#C94A68] text-white'
                  : 'bg-white dark:bg-[#1F1C1C] text-[#1E1B1A] dark:text-[#F3EFEA] border border-[#E8E2DD] dark:border-[#2E2929] hover:bg-[#F0ECE8] dark:hover:bg-[#282323]'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Full-width clean vertical cards for verified guardians */}
      <div className="flex flex-col space-y-4">
        {filteredGuardians.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929]">
            <p className="text-xs text-[#665E5A] dark:text-[#A89F9D]">
              No guardians matching filter for this location. Select "All Cities" or reset filter.
            </p>
          </div>
        ) : (
          filteredGuardians.map((guardian) => {
            const isTarget = highlightedId === guardian.id;
            return (
              <div
                key={guardian.id}
                id={`guardian-${guardian.id}`}
                className={`w-full rounded-2xl bg-white dark:bg-[#1F1C1C] border p-4 shadow-xs transition-all duration-300 ${
                  isTarget
                    ? 'ring-2 ring-[#7A1C32] dark:ring-[#C94A68] bg-[#F7EBEF]/40 dark:bg-[#282323]'
                    : 'border-[#E8E2DD] dark:border-[#2E2929]'
                }`}
              >
                {/* Header Row: Avatar, Name, Age, Rating */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={guardian.avatar}
                        alt={guardian.name}
                        className="w-13 h-13 rounded-full object-cover ring-2 ring-[#E8E2DD] dark:ring-[#2E2929]"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#276958] dark:bg-[#4CAF8E] border-2 border-white dark:border-[#1F1C1C] flex items-center justify-center text-white">
                        <ShieldCheck className="w-2.5 h-2.5" />
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA] truncate">
                          {guardian.name}
                        </h3>
                        <span className="text-xs text-[#827874] dark:text-[#A89F9D]">
                          {guardian.age}y
                        </span>
                      </div>
                      <p className="text-xs text-[#827874] dark:text-[#A89F9D] truncate">
                        {guardian.profession}
                      </p>
                      <p className="text-xs font-semibold text-[#276958] dark:text-[#4CAF8E] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>
                          {guardian.distanceKm} km away • {guardian.area}, {guardian.city}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF6E7] dark:bg-[#2E2216] border border-[#FCE6BD] dark:border-[#482900]">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold text-[#C27803] dark:text-[#D99B52]">
                        {guardian.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#827874] dark:text-[#A89F9D] mt-0.5">
                      {guardian.reviewCount} ratings
                    </span>
                  </div>
                </div>

                {/* Trust Badges & Certifications */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {guardian.badges.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E8F5F1] dark:bg-[#172B24] border border-[#C4E8DC] dark:border-[#23473A] text-[#276958] dark:text-[#4CAF8E]"
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>{b}</span>
                    </span>
                  ))}
                </div>

                {/* Peer Stats Matrix */}
                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#276958] dark:text-[#4CAF8E]" />
                    <div>
                      <span className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA] block leading-tight">
                        {guardian.checkInCount} Check-Ins
                      </span>
                      <span className="text-[10px] text-[#827874] dark:text-[#A89F9D] block">
                        Peer-monitored
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#7A1C32] dark:text-[#C94A68]" />
                    <div>
                      <span className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA] block leading-tight">
                        {guardian.hostedTripsCount} Hosted Trips
                      </span>
                      <span className="text-[10px] text-[#827874] dark:text-[#A89F9D] block">
                        Safe haven host
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] leading-relaxed mb-3">
                  {guardian.bio}
                </p>

                {/* Safe spot note if any */}
                {guardian.safeSpotNote && (
                  <div className="p-2.5 rounded-xl bg-[#F0ECE8] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] mb-3 flex items-start gap-2">
                    <span className="text-xs text-[#276958] dark:text-[#4CAF8E] font-bold shrink-0">
                      Safe Spot:
                    </span>
                    <p className="text-xs text-[#1E1B1A] dark:text-[#F3EFEA] leading-tight">
                      {guardian.safeSpotNote}
                    </p>
                  </div>
                )}

                {/* Live Status Callout */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#276958] dark:bg-[#4CAF8E] animate-pulse"></span>
                  <p className="text-[11px] text-[#665E5A] dark:text-[#A89F9D]">
                    <strong className="text-[#1E1B1A] dark:text-[#F3EFEA] font-semibold">
                      Active Now
                    </strong>{' '}
                    • Physical walking escort or coffee meet ready
                  </p>
                </div>

                {/* Action Strip: Request Check-In + Chat */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onRequestCheckIn(guardian)}
                    className="flex-1 h-11 px-3 rounded-xl bg-[#7A1C32] dark:bg-[#C94A68] hover:bg-[#601526] dark:hover:bg-[#B33955] text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Handshake className="w-4 h-4" />
                    <span>Request Check-In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenChat(guardian)}
                    aria-label={`Chat with ${guardian.name}`}
                    className="w-11 h-11 rounded-xl bg-[#F0ECE8] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] flex items-center justify-center text-[#1E1B1A] dark:text-[#F3EFEA] hover:bg-[#EAE4DE] dark:hover:bg-[#332D2D] active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-[#7A1C32] dark:text-[#FFA0B4]" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Institutional Guarantee Footer Box */}
      <div className="rounded-2xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] p-4 shadow-xs flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] border border-[#C4E8DC] dark:border-[#23473A] text-[#276958] dark:text-[#4CAF8E] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA] mb-0.5">
            HerWay National Safety Guarantee
          </h4>
          <p className="text-[11px] text-[#665E5A] dark:text-[#A89F9D] leading-relaxed">
            Every HerWay Guardian undergoes government KYC verification, state police NOC
            background screening, and home safety validation before receiving escort credentials.
          </p>
        </div>
      </div>
    </div>
  );
};
