import React, { useState, useRef, useEffect } from 'react';
import { Shield, MapPin, ChevronDown, Sun, Moon, AlertTriangle } from 'lucide-react';
import { City } from '../types';

interface HeaderProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onTriggerSOS: () => void;
  userAvatar?: string;
}

const CITIES: City[] = [
  'All Cities',
  'Jaipur',
  'Rishikesh',
  'Munnar',
  'Gokarna',
  'Shillong',
  'Hampi',
];

export const Header: React.FC<HeaderProps> = ({
  selectedCity,
  onCityChange,
  isDark,
  onToggleTheme,
  onTriggerSOS,
  userAvatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF8F6]/95 dark:bg-[#141212]/95 border-b border-[#E8E2DD] dark:border-[#2E2929] transition-colors duration-200">
      <div className="h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand & City Dropdown */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#7A1C32] dark:bg-[#C94A68] flex items-center justify-center text-white shadow-sm">
              <Shield className="w-4 h-4 fill-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#7A1C32] dark:text-[#FFA0B4]">
              HerWay
            </span>
          </div>

          {/* City Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-[#F0ECE8] dark:bg-[#1F1C1C] text-[#1E1B1A] dark:text-[#F3EFEA] border border-[#E0D9D2] dark:border-[#2E2929] hover:bg-[#EAE4DE] dark:hover:bg-[#282323] transition-colors min-h-[36px]"
              aria-label="Select City"
              aria-expanded={dropdownOpen}
            >
              <MapPin className="w-3.5 h-3.5 text-[#276958] dark:text-[#4CAF8E] shrink-0" />
              <span className="max-w-[85px] truncate">
                {selectedCity === 'All Cities' ? 'India' : selectedCity}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#665E5A] dark:text-[#A89F9D] shrink-0" />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-44 rounded-xl bg-white dark:bg-[#1F1C1C] border border-[#E0D9D2] dark:border-[#2E2929] shadow-xl py-1.5 z-50 overflow-hidden">
                <div className="px-3 py-1 text-[11px] font-semibold text-[#827874] dark:text-[#A89F9D] uppercase tracking-wider">
                  Safe Corridors
                </div>
                {CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      onCityChange(city);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                      selectedCity === city
                        ? 'bg-[#F7EBEF] dark:bg-[#331820] text-[#7A1C32] dark:text-[#FFA0B4] font-semibold'
                        : 'text-[#1E1B1A] dark:text-[#F3EFEA] hover:bg-[#F0ECE8] dark:hover:bg-[#282323]'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C32] dark:bg-[#C94A68]"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Controls: Theme Toggle & SOS 112 */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F0ECE8] dark:bg-[#1F1C1C] border border-[#E0D9D2] dark:border-[#2E2929] text-[#1E1B1A] dark:text-[#F3EFEA] hover:bg-[#EAE4DE] dark:hover:bg-[#282323] transition-colors"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-[#D99B52]" />
            ) : (
              <Moon className="w-4 h-4 text-[#7A1C32]" />
            )}
          </button>

          {/* SOS 112 Button */}
          <button
            type="button"
            onClick={onTriggerSOS}
            aria-label="Emergency SOS 112 Beacon (or Shift+S)"
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7A1C32] dark:bg-[#C94A68] hover:bg-[#601526] dark:hover:bg-[#B03A56] text-white font-bold text-xs shadow-md active:scale-95 transition-all min-h-[36px]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="tracking-wide">SOS 112</span>
          </button>

          {/* Avatar thumbnail */}
          <img
            src={userAvatar}
            alt="User Profile"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-[#E0D9D2] dark:ring-[#2E2929]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
            }}
          />
        </div>
      </div>
    </header>
  );
};
