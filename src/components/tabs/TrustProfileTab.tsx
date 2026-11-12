import React, { useState } from 'react';
import {
  ShieldCheck,
  Shield,
  Sparkles,
  CheckCircle2,
  Lock,
  BadgeAlert,
  Download,
  UserPlus,
  Share2,
  ScanFace,
  Award,
  BadgeCheck,
  Check,
  ChevronRight,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { TrustTier, UserProfile } from '../../types';
import { getTierDetails, validateInviteCode } from '../../utils/safety';

interface TrustProfileTabProps {
  userProfile: UserProfile;
  onUpdateTier: (tier: TrustTier) => void;
  onShowToast: (title: string, message: string) => void;
}

export const TrustProfileTab: React.FC<TrustProfileTabProps> = ({
  userProfile,
  onUpdateTier,
  onShowToast,
}) => {
  // Path A state
  const [inviteCode, setInviteCode] = useState('');
  const [inviteError, setInviteError] = useState('');

  // Path B state
  const [formName, setFormName] = useState(userProfile.name);
  const [formCity, setFormCity] = useState(userProfile.city);
  const [formSocial, setFormSocial] = useState(userProfile.socialHandle || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState('');

  const tierDetails = getTierDetails(userProfile.trustTier);

  // Path A: Invite-Only Fast Track
  const handleFastTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInviteCode(inviteCode)) {
      onUpdateTier('verified_guardian');
      setInviteError('');
      setInviteCode('');
      onShowToast(
        'Invite Code Accepted!',
        'You have fast-tracked to Verified Guardian with full sisterhood escort privileges.'
      );
    } else {
      setInviteError('Invalid code. Use HERWAY2026 for the fast-track unlock demo.');
    }
  };

  // Path B: DigiLocker + Liveness Check Simulation (2 seconds)
  const handleRunDigiLockerCheck = () => {
    if (!formName.trim() || !formCity.trim()) {
      onShowToast('Missing Fields', 'Please enter your Name and City to initiate KYC check.');
      return;
    }

    setIsVerifying(true);
    setVerifyStep('Connecting to DigiLocker sovereign UIDAI gate...');

    setTimeout(() => {
      setVerifyStep('3D Liveness mesh depth match in progress...');
    }, 900);

    setTimeout(() => {
      setIsVerifying(false);
      setVerifyStep('');
      onUpdateTier('new_explorer');
      onShowToast(
        'DigiLocker KYC Verified!',
        'Unlocked "New Explorer (1 Trip to Guardian)" status. Your Aadhaar token is masked and safe.'
      );
    }, 2000);
  };

  const handleDownloadCertificate = () => {
    onShowToast(
      'DigiLocker Safety ID Prepared',
      `Certificate for ${userProfile.name} (ID: ${userProfile.memberId}) with encrypted QR code ready.`
    );
  };

  const handleVouchFriend = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://herway.in/vouch/HW-8849-ND');
    }
    onShowToast(
      'Vouch Invite Link Copied',
      'Share your personal cryptographic sisterhood vouch link with a trusted female friend.'
    );
  };

  return (
    <div className="flex flex-col space-y-4 pb-8 px-4 pt-1">
      {/* 1-Click Presentation Mode Switcher (Requested for effortless live demos) */}
      <div className="rounded-2xl p-3 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A1C32] dark:text-[#FFA0B4] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Presentation Mode Switcher
          </span>
          <span className="text-[10px] text-[#827874] dark:text-[#A89F9D]">1-Click Demo</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => {
              onUpdateTier('guest');
              onShowToast('Switched to Guest Explorer', 'Demoing initial unverified first-time experience.');
            }}
            className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all ${
              userProfile.trustTier === 'guest'
                ? 'bg-[#7A1C32] dark:bg-[#C94A68] text-white shadow-xs'
                : 'bg-[#F0ECE8] dark:bg-[#282323] text-[#1E1B1A] dark:text-[#F3EFEA] hover:bg-[#EAE4DE]'
            }`}
          >
            Guest
          </button>
          <button
            type="button"
            onClick={() => {
              onUpdateTier('new_explorer');
              onShowToast('Switched to New Explorer', 'Demoing KYC-passed probation state.');
            }}
            className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all ${
              userProfile.trustTier === 'new_explorer'
                ? 'bg-[#7A1C32] dark:bg-[#C94A68] text-white shadow-xs'
                : 'bg-[#F0ECE8] dark:bg-[#282323] text-[#1E1B1A] dark:text-[#F3EFEA] hover:bg-[#EAE4DE]'
            }`}
          >
            New Explorer
          </button>
          <button
            type="button"
            onClick={() => {
              onUpdateTier('verified_guardian');
              onShowToast('Switched to Verified Guardian', 'Demoing fully accredited trusted guardian.');
            }}
            className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all ${
              userProfile.trustTier === 'verified_guardian'
                ? 'bg-[#7A1C32] dark:bg-[#C94A68] text-white shadow-xs'
                : 'bg-[#F0ECE8] dark:bg-[#282323] text-[#1E1B1A] dark:text-[#F3EFEA] hover:bg-[#EAE4DE]'
            }`}
          >
            Guardian
          </button>
        </div>
      </div>

      {/* Top Greeting & Reassurance Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] p-4 shadow-xs">
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Dual Ring Avatar */}
            <div className="relative shrink-0">
              <div className="p-1 rounded-full bg-[#E8F5F1] dark:bg-[#172B24]">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                  alt="Profile Avatar"
                  className="w-14 h-14 rounded-full object-cover shadow-xs"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#276958] dark:bg-[#4CAF8E] text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base font-bold text-[#1E1B1A] dark:text-[#F3EFEA] truncate">
                  {userProfile.name}
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] border border-[#C4E8DC] dark:border-[#23473A]">
                  {tierDetails.badgeText}
                </span>
              </div>
              <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mt-0.5">
                Member since {userProfile.joinedDate} • ID: {userProfile.memberId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleVouchFriend}
            aria-label="Share Verified Trust Card"
            className="w-9 h-9 rounded-full bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] flex items-center justify-center text-[#665E5A] dark:text-[#A89F9D] hover:text-[#7A1C32] dark:hover:text-[#FFA0B4] transition-colors shrink-0"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Milestone Progress Bar */}
        <div className="mt-3.5 pt-3 border-t border-[#E8E2DD] dark:border-[#2E2929]">
          <div className="flex justify-between items-center mb-1.5 text-xs">
            <span className="font-semibold text-[#1E1B1A] dark:text-[#F3EFEA] flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#C27803] dark:text-[#D99B52]" />
              Milestone Progress
            </span>
            <span className="font-bold text-[#276958] dark:text-[#4CAF8E]">
              {tierDetails.progressPercent}% Active
            </span>
          </div>

          <div className="w-full bg-[#F0ECE8] dark:bg-[#282323] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#276958] dark:bg-[#4CAF8E] h-2 rounded-full transition-all duration-500"
              style={{ width: `${tierDetails.progressPercent}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-[#665E5A] dark:text-[#A89F9D] mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#276958] dark:bg-[#4CAF8E] shrink-0"></span>
            <span>{tierDetails.nextMilestone}</span>
          </p>
        </div>
      </div>

      {/* Trust Score Meter & Passport Snapshot */}
      <div className="rounded-2xl p-4 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] flex items-center justify-center text-[#276958] dark:text-[#4CAF8E]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
              HerWay Trust Score
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] text-[11px] font-semibold border border-[#C4E8DC] dark:border-[#23473A]">
            98/100 High Reliability
          </span>
        </div>

        {/* Dial Card */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929]">
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#E8E2DD] dark:text-[#1F1C1C]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-[#276958] dark:text-[#4CAF8E]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="98, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-base font-bold text-[#1E1B1A] dark:text-[#F3EFEA] leading-none">
                98
              </span>
              <span className="text-[9px] text-[#827874] dark:text-[#A89F9D]">/100</span>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
              Exceptional Safety Standing
            </p>
            <p className="text-[11px] text-[#665E5A] dark:text-[#A89F9D] mt-0.5 leading-snug">
              Calculated from sovereign credential authenticity, verified SOS response telemetry, and
              sisterhood endorsements.
            </p>
          </div>
        </div>

        {/* Safety Passport Checklist */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#276958] dark:text-[#4CAF8E]" />
              <span className="font-semibold text-[#1E1B1A] dark:text-[#F3EFEA]">
                Emergency Contacts Synced
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E]">
              Mom & Sister Active
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#276958] dark:text-[#4CAF8E]" />
              <span className="font-semibold text-[#1E1B1A] dark:text-[#F3EFEA]">
                Live Trip Telemetry
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E]">
              Guardian Beacon ON
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#276958] dark:text-[#4CAF8E]" />
              <span className="font-semibold text-[#1E1B1A] dark:text-[#F3EFEA]">
                State Police Verification NOC
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E]">
              Validated (Raj. State)
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Two-Tier Onboarding Simulator Section */}
      <div className="rounded-2xl p-4 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A1C32] dark:text-[#FFA0B4]">
            Interactive Onboarding Simulator
          </span>
          <h3 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
            Two Verification Paths
          </h3>
          <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] mt-0.5">
            Test the identity verification flow directly in browser state.
          </p>
        </div>

        {/* Path A: Invite-Only Fast Track */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#7A1C32] dark:bg-[#C94A68] text-white flex items-center justify-center text-[10px] font-bold">
                A
              </span>
              <h4 className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
                Invite-Only Fast Track
              </h4>
            </div>
            <span className="text-[10px] font-mono bg-white dark:bg-[#1F1C1C] px-1.5 py-0.5 rounded border border-[#E0D9D2] dark:border-[#2E2929] text-[#7A1C32] dark:text-[#FFA0B4]">
              Code: HERWAY2026
            </span>
          </div>

          <form onSubmit={handleFastTrackSubmit} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter HERWAY2026"
                className="flex-1 h-9 px-3 rounded-lg text-xs bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] text-[#1E1B1A] dark:text-[#F3EFEA] uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#7A1C32]"
              />
              <button
                type="submit"
                className="px-3 h-9 rounded-lg text-xs font-bold bg-[#7A1C32] dark:bg-[#C94A68] hover:bg-[#601526] text-white active:scale-95 transition-all"
              >
                Fast-Track Unlock
              </button>
            </div>
            {inviteError && (
              <p className="text-[11px] text-red-600 dark:text-red-400 font-medium">
                {inviteError}
              </p>
            )}
          </form>
        </div>

        {/* Path B: First-Time Solo Traveler (DigiLocker + 3D Selfie) */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#276958] dark:bg-[#4CAF8E] text-white flex items-center justify-center text-[10px] font-bold">
                B
              </span>
              <h4 className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
                First-Time Solo Traveler (Sovereign KYC)
              </h4>
            </div>
            <span className="text-[10px] text-[#276958] dark:text-[#4CAF8E] font-semibold flex items-center gap-0.5">
              <Lock className="w-3 h-3" />
              <span>Zero-Knowledge UIDAI</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-[#827874] dark:text-[#A89F9D] block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Your Name"
                className="w-full h-8 px-2.5 rounded-lg bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] text-[#1E1B1A] dark:text-[#F3EFEA]"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#827874] dark:text-[#A89F9D] block mb-1">
                Base City
              </label>
              <input
                type="text"
                value={formCity}
                onChange={(e) => setFormCity(e.target.value)}
                placeholder="Jaipur, Delhi, etc."
                className="w-full h-8 px-2.5 rounded-lg bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] text-[#1E1B1A] dark:text-[#F3EFEA]"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-[#827874] dark:text-[#A89F9D] block mb-1">
              Instagram / LinkedIn Profile Handle
            </label>
            <input
              type="text"
              value={formSocial}
              onChange={(e) => setFormSocial(e.target.value)}
              placeholder="@handle or profile URL"
              className="w-full h-8 px-2.5 rounded-lg bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] text-xs text-[#1E1B1A] dark:text-[#F3EFEA]"
            />
          </div>

          {/* 2-Second Verification Animation Container */}
          {isVerifying ? (
            <div className="p-3 rounded-xl bg-white dark:bg-[#1F1C1C] border border-[#276958] dark:border-[#4CAF8E] text-center space-y-2">
              <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#276958] dark:border-[#4CAF8E] border-t-transparent animate-spin"></div>
              <p className="text-xs font-semibold text-[#276958] dark:text-[#4CAF8E] animate-pulse">
                {verifyStep}
              </p>
              <span className="text-[10px] text-[#827874] dark:text-[#A89F9D] block">
                Executing Anti-Spoofing & UIDAI Token Validation
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleRunDigiLockerCheck}
              className="w-full h-10 rounded-xl text-xs font-bold bg-[#276958] dark:bg-[#4CAF8E] hover:bg-[#1f5647] text-white flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <ScanFace className="w-4 h-4" />
              <span>Run DigiLocker + Live Selfie Check</span>
            </button>
          )}
        </div>
      </div>

      {/* Two-Tier Architecture Deep-Dive */}
      <div className="rounded-2xl p-4 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
          Two-Tier Identity Architecture
        </h3>

        {/* Tier 1 Detail Card */}
        <div className="p-3 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
              1. Government Sovereign Identity
            </span>
            <span className="text-[10px] font-bold text-[#276958] dark:text-[#4CAF8E] bg-[#E8F5F1] dark:bg-[#172B24] px-2 py-0.5 rounded-full">
              Authenticated
            </span>
          </div>
          <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] leading-relaxed">
            Cryptographically tokenized via DigiLocker & UIDAI. Original Aadhaar number is masked;
            zero raw personal identity documents reside on public servers.
          </p>
        </div>

        {/* Tier 2 Detail Card */}
        <div className="p-3 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
              2. Sisterhood Trust Chain Vouching
            </span>
            <span className="text-[10px] font-bold text-[#7A1C32] dark:text-[#FFA0B4] bg-[#F7EBEF] dark:bg-[#331820] px-2 py-0.5 rounded-full">
              3 Guardians Linked
            </span>
          </div>
          <p className="text-xs text-[#665E5A] dark:text-[#A89F9D] leading-relaxed">
            Peer endorsements from verified female superhosts and solo travelers build an unforgeable
            reputation chain protecting the sisterhood.
          </p>
        </div>
      </div>

      {/* Community Badges */}
      <div className="rounded-2xl p-4 bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#1E1B1A] dark:text-[#F3EFEA]">
          Community Sisterhood Badges
        </h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929]">
            <div className="w-8 h-8 mx-auto rounded-full bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] flex items-center justify-center mb-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA] block leading-tight">
              Solo Explorer
            </span>
            <span className="text-[10px] text-[#827874] dark:text-[#A89F9D]">5 Safe Cities</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929]">
            <div className="w-8 h-8 mx-auto rounded-full bg-[#F7EBEF] dark:bg-[#331820] text-[#7A1C32] dark:text-[#FFA0B4] flex items-center justify-center mb-1">
              <Award className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA] block leading-tight">
              Haven Reviewer
            </span>
            <span className="text-[10px] text-[#827874] dark:text-[#A89F9D]">12 Reviews</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929]">
            <div className="w-8 h-8 mx-auto rounded-full bg-[#FEF6E7] dark:bg-[#2E2216] text-[#C27803] dark:text-[#D99B52] flex items-center justify-center mb-1">
              <BadgeCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA] block leading-tight">
              Sisterhood Ally
            </span>
            <span className="text-[10px] text-[#827874] dark:text-[#A89F9D]">4 Beacons</span>
          </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col space-y-2 pt-1">
        <button
          type="button"
          onClick={handleDownloadCertificate}
          className="w-full h-11 rounded-xl bg-[#7A1C32] dark:bg-[#C94A68] hover:bg-[#601526] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Download DigiLocker Safety Certificate</span>
        </button>

        <button
          type="button"
          onClick={handleVouchFriend}
          className="w-full h-11 rounded-xl bg-white dark:bg-[#1F1C1C] border border-[#E8E2DD] dark:border-[#2E2929] hover:bg-[#F0ECE8] dark:hover:bg-[#282323] text-[#1E1B1A] dark:text-[#F3EFEA] font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <UserPlus className="w-4 h-4 text-[#276958] dark:text-[#4CAF8E]" />
          <span>Invite & Vouch for a Friend</span>
        </button>
      </div>
    </div>
  );
};
