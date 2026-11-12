import React from 'react';
import { ShieldCheck, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import { TrustTier } from '../types';
import { getTierDetails } from '../utils/safety';

interface QuickVerificationBannerProps {
  trustTier: TrustTier;
  onOpenVerification: () => void;
}

export const QuickVerificationBanner: React.FC<QuickVerificationBannerProps> = ({
  trustTier,
  onOpenVerification,
}) => {
  const details = getTierDetails(trustTier);

  const getTierIcon = () => {
    switch (trustTier) {
      case 'verified_guardian':
        return <ShieldCheck className="w-4 h-4 text-[#276958] dark:text-[#4CAF8E] shrink-0" />;
      case 'new_explorer':
        return <Sparkles className="w-4 h-4 text-[#C27803] dark:text-[#D99B52] shrink-0" />;
      case 'guest':
        return <ShieldAlert className="w-4 h-4 text-[#7A1C32] dark:text-[#FFA0B4] shrink-0" />;
    }
  };

  const getBadgeStyle = () => {
    switch (trustTier) {
      case 'verified_guardian':
        return 'bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] border-[#C4E8DC] dark:border-[#23473A]';
      case 'new_explorer':
        return 'bg-[#FEF6E7] dark:bg-[#2E2216] text-[#C27803] dark:text-[#D99B52] border-[#FCE6BD] dark:border-[#482900]';
      case 'guest':
        return 'bg-[#F7EBEF] dark:bg-[#331820] text-[#7A1C32] dark:text-[#FFA0B4] border-[#E8C2CD] dark:border-[#4A1220]';
    }
  };

  return (
    <div className="px-4 py-2.5">
      <div className="rounded-xl p-3 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-sm flex items-center justify-between gap-3 transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] shrink-0">
            {getTierIcon()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xs text-[#1E1B1A] dark:text-[#F3EFEA] truncate">
                {details.label}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeStyle()}`}
              >
                {details.badgeText}
              </span>
            </div>
            <p className="text-[11px] text-[#665E5A] dark:text-[#A89F9D] truncate mt-0.5">
              {trustTier === 'verified_guardian'
                ? 'High Reliability • 98/100 Trust Score'
                : trustTier === 'new_explorer'
                ? '1 trip left to reach Guardian Tier'
                : 'Complete DigiLocker check to unlock full safety benefits'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenVerification}
          className="shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F0ECE8] dark:bg-[#282323] text-[#7A1C32] dark:text-[#FFA0B4] hover:bg-[#EAE4DE] dark:hover:bg-[#332D2D] border border-[#E0D9D2] dark:border-[#2E2929] flex items-center gap-1 active:scale-95 transition-all"
        >
          <span>Verify</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
