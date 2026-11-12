import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Star,
  ShieldCheck,
  Heart,
  ChevronRight,
  Home,
  Users,
  Compass,
  Radio,
  X,
} from 'lucide-react';
import { City, Listing } from '../../types';
import { filterListings, formatINR } from '../../utils/safety';

interface ExploreTabProps {
  listings: Listing[];
  selectedCity: City;
  onSelectListing: (listing: Listing) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const FILTER_PILLS = [
  'All',
  'Women-Owned Stays',
  'Under ₹1,500',
  'Group Tours',
  'Police Verified',
];

export const ExploreTab: React.FC<ExploreTabProps> = ({
  listings,
  selectedCity,
  onSelectListing,
  favorites,
  onToggleFavorite,
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = filterListings(listings, activeFilter, selectedCity, searchQuery);

  return (
    <div className="flex flex-col space-y-4 pb-6">
      {/* Search Input Bar */}
      <div className="px-4 pt-1">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#827874] dark:text-[#A89F9D] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verified stays, female guides, safe corridors..."
            className="w-full h-11 pl-10 pr-9 rounded-xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] text-xs text-[#1E1B1A] dark:text-[#F3EFEA] placeholder:text-[#827874] dark:placeholder:text-[#A89F9D] shadow-xs focus:outline-none focus:ring-1 focus:ring-[#7A1C32] dark:focus:ring-[#C94A68] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#827874] hover:text-[#1E1B1A] dark:text-[#A89F9D] dark:hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Scroll Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 pb-0.5">
        {FILTER_PILLS.map((pill) => {
          const isActive = activeFilter === pill;
          return (
            <button
              key={pill}
              type="button"
              onClick={() => setActiveFilter(pill)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs active:scale-95 ${
                isActive
                  ? 'bg-[#7A1C32] dark:bg-[#C94A68] text-white shadow-sm'
                  : 'bg-white dark:bg-[#1F1C1C] text-[#1E1B1A] dark:text-[#F3EFEA] border border-[#E8E2DD] dark:border-[#2E2929] hover:bg-[#F0ECE8] dark:hover:bg-[#282323]'
              }`}
            >
              {pill}
            </button>
          );
        })}
      </div>

      {/* Live Corridor Watch Banner */}
      <div className="px-4">
        <div className="w-full rounded-xl p-3 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#276958] dark:bg-[#4CAF8E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#276958] dark:bg-[#4CAF8E]"></span>
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA] truncate">
                  {selectedCity === 'All Cities' ? 'National Safe Corridors' : `${selectedCity} Safe Corridor`}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-[#665E5A] dark:text-[#A89F9D] truncate mt-0.5">
                Verified safe transit • Monitored by 14 local HerWay Guardians
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-[10px] font-semibold text-[#276958] dark:text-[#4CAF8E] bg-[#E8F5F1] dark:bg-[#172B24] px-2 py-0.5 rounded-full border border-[#C4E8DC] dark:border-[#23473A]">
              99% Safe Index
            </span>
          </div>
        </div>
      </div>

      {/* Listings Count & Context Header */}
      <div className="px-4 flex items-center justify-between pt-1">
        <h2 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
          {activeFilter === 'All' ? 'Protected Stays & Group Tours' : activeFilter}
          <span className="ml-1.5 text-xs font-normal text-[#827874] dark:text-[#A89F9D]">
            ({filteredListings.length})
          </span>
        </h2>
        {selectedCity !== 'All Cities' && (
          <span className="text-[11px] font-medium text-[#7A1C32] dark:text-[#FFA0B4]">
            Filtering: {selectedCity}
          </span>
        )}
      </div>

      {/* Listings List */}
      <div className="px-4 flex flex-col space-y-4">
        {filteredListings.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929]">
            <Compass className="w-8 h-8 text-[#827874] dark:text-[#A89F9D] mx-auto mb-2 opacity-50" />
            <h3 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
              No listings match this filter
            </h3>
            <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mt-1 max-w-xs mx-auto">
              Try selecting "All Cities" or switching the category filter pill above.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#7A1C32] dark:bg-[#C94A68] text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredListings.map((listing) => {
            const isFav = favorites.includes(listing.id);
            return (
              <div
                key={listing.id}
                className="w-full rounded-2xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] overflow-hidden shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Visual Header / Cover Image */}
                <div className="relative w-full h-44 bg-[#E8E2DD] dark:bg-[#282323] overflow-hidden">
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to elegant gradient if Unsplash block
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Absolute fallback container with gradient & icon if image fails */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${listing.fallbackGradient} -z-10 flex items-center justify-center p-4 text-white/40`}
                  >
                    <Home className="w-12 h-12" />
                  </div>

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Top Bar Badges on Image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white/95 dark:bg-[#1F1C1C]/95 text-[#1E1B1A] dark:text-[#F3EFEA] backdrop-blur-md shadow-xs flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{listing.rating.toFixed(2)}</span>
                        <span className="text-[#827874] dark:text-[#A89F9D] font-normal">
                          ({listing.reviewCount})
                        </span>
                      </span>

                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#276958]/90 text-white backdrop-blur-md shadow-xs flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{listing.safetyScore}% Safety</span>
                      </span>
                    </div>

                    {/* Heart button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(listing.id);
                      }}
                      className="w-8 h-8 rounded-full bg-white/90 dark:bg-[#1F1C1C]/90 backdrop-blur-md flex items-center justify-center text-[#7A1C32] dark:text-[#FFA0B4] shadow-sm hover:scale-105 active:scale-95 transition-transform"
                      aria-label={isFav ? 'Remove from favorites' : 'Save listing to favorites'}
                    >
                      <Heart
                        className={`w-4 h-4 ${isFav ? 'fill-[#7A1C32] dark:fill-[#C94A68]' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Bottom Image Badges: Police Verified & City */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4CAF8E]" />
                      <span>Police Verified • {listing.city}</span>
                    </span>

                    <span className="text-[11px] font-medium text-white/90 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-md">
                      Vouched by {listing.vouchedCount} women
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-3.5 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#1E1B1A] dark:text-[#F3EFEA] leading-snug">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mt-0.5 flex items-center gap-1">
                      <span>Hosted by {listing.hostName}</span>
                      <span className="text-[#827874] dark:text-[#2E2929]">·</span>
                      <span className="text-[#276958] dark:text-[#4CAF8E] font-medium">
                        {listing.locationDetails}
                      </span>
                    </p>

                    {/* Badge Chips Strip */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {listing.badges.map((b) => (
                        <span
                          key={b}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F0ECE8] dark:bg-[#282323] text-[#1E1B1A] dark:text-[#F3EFEA] border border-[#E0D9D2] dark:border-[#2E2929]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mt-2 line-clamp-2 leading-relaxed">
                      {listing.description}
                    </p>
                  </div>

                  {/* Pricing & Booking CTA Strip */}
                  <div className="pt-2 border-t border-[#E8E2DD] dark:border-[#2E2929] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#827874] dark:text-[#A89F9D] uppercase tracking-wide block">
                        Per {listing.priceUnit}
                      </span>
                      <span className="text-base font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
                        {formatINR(listing.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectListing(listing)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#7A1C32] dark:bg-[#C94A68] hover:bg-[#631427] dark:hover:bg-[#B33955] text-white shadow-xs active:scale-95 transition-all flex items-center gap-1"
                    >
                      <span>View & Book</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pink Line Safe Transit Map Callout (Consistent with prompt attachment) */}
      <div className="px-4 pt-2">
        <div className="w-full rounded-2xl p-3.5 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs flex flex-col space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#276958] dark:text-[#4CAF8E]" />
              <h3 className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
                Pink Line Safe Transit Network
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] border border-[#C4E8DC] dark:border-[#23473A]">
              Active 24/7
            </span>
          </div>

          <div
            className="w-full h-24 rounded-xl bg-cover bg-center relative overflow-hidden flex items-end p-2.5 shadow-inner"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 px-2 py-1 rounded-md text-[11px] font-medium bg-black/75 text-white backdrop-blur-md flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#4CAF8E] animate-pulse"></span>
              <span>Fully lit, CCTV-guarded female police corridors active in major transit zones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
