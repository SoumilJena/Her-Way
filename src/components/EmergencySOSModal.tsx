import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Phone,
  PhoneCall,
  Users,
  MapPin,
  Share2,
  BatteryCharging,
  Radio,
  Lock,
  Volume2,
  CheckCircle,
  X,
  EyeOff,
  Navigation,
} from 'lucide-react';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (title: string, message: string) => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  // Phase 1: 3-second cancel countdown; Phase 2: Live Emergency Protocol Active
  const [phase, setPhase] = useState<'countdown' | 'active'>('countdown');
  const [countdown, setCountdown] = useState(3);
  const [audioTimer, setAudioTimer] = useState(0);
  const [stealthActive, setStealthActive] = useState(false);
  const [tripleTapCount, setTripleTapCount] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Hold-to-cancel progress
  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setPhase('countdown');
      setCountdown(3);
      setAudioTimer(0);
      setStealthActive(false);
      setHoldProgress(0);
      return;
    }

    // Start 3-second countdown if in countdown phase
    if (phase === 'countdown') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setPhase('active');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, phase]);

  // Running audio vault timer when active
  useEffect(() => {
    if (isOpen && phase === 'active') {
      const audioInterval = setInterval(() => {
        setAudioTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(audioInterval);
    }
  }, [isOpen, phase]);

  // Handle hold to cancel (false alarm)
  const startHold = () => {
    let current = 0;
    holdIntervalRef.current = setInterval(() => {
      current += 5;
      setHoldProgress(current);
      if (current >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        onShowToast('SOS Cancelled', 'False alarm logged. Telemetry deactivated safely.');
        onClose();
      }
    }, 50);
  };

  const endHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    setHoldProgress(0);
  };

  // Stealth mode triple-tap to wake
  const handleStealthTap = () => {
    setTripleTapCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setStealthActive(false);
        onShowToast('Display Woken', 'Black screen stealth deactivated.');
        return 0;
      }
      return next;
    });
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://herway.in/track/sos-8921-jpr');
    }
    setCopiedLink(true);
    onShowToast('Encrypted Tracking Link Copied', 'Share with trusted contacts via SMS/WhatsApp.');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Stealth Curtain Fullscreen Overlay */}
      {stealthActive && (
        <div
          onClick={handleStealthTap}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-zinc-800 cursor-pointer select-none"
        >
          <Lock className="w-12 h-12 text-zinc-900 mb-2" />
          <p className="text-xs text-zinc-800 font-mono">
            Stealth beacon transmitting • Triple-tap to wake display
          </p>
        </div>
      )}

      {/* Main SOS Dialog Card */}
      <div className="relative w-full max-w-lg min-h-screen sm:min-h-0 sm:rounded-3xl bg-[#141212] text-[#F3EFEA] border-x sm:border border-[#2E2929] shadow-2xl flex flex-col p-4 sm:p-6 overflow-hidden">
        {/* PHASE 1: 3-Second Cancel Countdown Ring */}
        {phase === 'countdown' ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-[#4A1220] border border-[#6b1c31] flex items-center justify-center text-[#ff5252] animate-bounce">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#FFA0B4]">
                EMERGENCY SOS INITIATED
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Dispatching in {countdown}s
              </h2>
              <p className="text-xs text-[#A89F9D] max-w-xs mx-auto mt-1 leading-relaxed">
                To prevent accidental dispatch, tap cancel or hold below. Otherwise, 112 ERSS
                and 4 nearby guardians will be summoned.
              </p>
            </div>

            {/* Tactile Hold/Cancel Module */}
            <div
              onMouseDown={startHold}
              onMouseUp={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              className="relative w-44 h-44 flex items-center justify-center cursor-pointer select-none active:scale-95 transition-transform"
            >
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle
                  className="text-[#282323] fill-none"
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-[#C94A68] fill-none transition-all duration-75"
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="440"
                  strokeDashoffset={440 - (holdProgress / 100) * 440}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-3 rounded-full bg-[#1F1C1C] border border-[#C94A68]/40 flex flex-col items-center justify-center p-3 text-center">
                <span className="text-[#C94A68] font-bold text-xs uppercase leading-tight">
                  HOLD TO CANCEL
                </span>
                <span className="text-[10px] text-[#A89F9D] mt-1 font-mono">
                  {holdProgress > 0 ? `${holdProgress}%` : 'False Alarm'}
                </span>
              </div>
            </div>

            <div className="flex gap-2 w-full pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-12 rounded-xl bg-[#282323] hover:bg-[#322c2c] text-[#F3EFEA] font-bold text-xs active:scale-95 transition-all"
              >
                Cancel SOS Immediately
              </button>
              <button
                type="button"
                onClick={() => setPhase('active')}
                className="flex-1 h-12 rounded-xl bg-[#C94A68] hover:bg-[#B03A56] text-white font-bold text-xs active:scale-95 transition-all"
              >
                Trigger Immediately
              </button>
            </div>
          </div>
        ) : (
          /* PHASE 2: Live Emergency Protocol Active */
          <div className="flex flex-col space-y-3.5 pb-4">
            {/* Urgent Status Header Banner */}
            <div className="w-full bg-[#4A1220] border border-[#6b1c31] text-white rounded-2xl p-3.5 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5252] opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff5252]"></span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#FFA0B4]">
                    HERWAY EMERGENCY PROTOCOL ACTIVE
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#FFA0B4] bg-[#2a0b13] px-2 py-0.5 rounded border border-[#6b1c31]">
                  CONNECTED
                </span>
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <h2 className="text-base font-bold text-white leading-tight">
                    Bridged to India 112 (ERSS)
                  </h2>
                  <p className="text-[11px] text-[#FFA0B4]/80">
                    Rajasthan Police & Medical Dispatch • Incident #RJ-JPR-2024-8841
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    DISPATCHED
                  </span>
                </div>
              </div>
            </div>

            {/* Immediate Action Buttons: Call 112 & Call Mom */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  onShowToast('Dialing 112...', 'Connecting directly to National Emergency Dispatcher.')
                }
                className="h-12 bg-[#C94A68] hover:bg-[#b03f59] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-98 transition-all px-2"
              >
                <PhoneCall className="w-4 h-4 fill-white" />
                <span>Call 112 Now</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onShowToast('Dialing Primary Contact...', 'Calling Mom: +91 98290 44210.')
                }
                className="h-12 bg-[#1F1C1C] border border-[#2E2929] hover:bg-[#282323] text-[#F3EFEA] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all px-2"
              >
                <Phone className="w-4 h-4 text-[#FFA0B4]" />
                <span className="truncate">Call Mom (Emergency)</span>
              </button>
            </div>

            {/* Stealth Mode & Encrypted Audio Stream */}
            <div className="w-full bg-[#1F1C1C] border border-[#2E2929] rounded-2xl p-3 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#282323] border border-[#2E2929] flex items-center justify-center text-[#F3EFEA]">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#F3EFEA]">Black Screen Stealth</h3>
                    <p className="text-[10px] text-[#A89F9D]">
                      Screen turns black; beacon and audio record silently
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stealthActive}
                    onChange={(e) => setStealthActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-[#282323] border border-[#2E2929] rounded-full peer peer-checked:bg-[#C94A68] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#A89F9D] peer-checked:after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
              </div>

              {/* Audio Waveform Vault Bar */}
              <div className="bg-[#282323] border border-[#2E2929] rounded-xl p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#ff5252]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5252] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5252]"></span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider">REC</span>
                  <span className="text-xs font-mono font-bold text-white">
                    {formatTimer(audioTimer)}
                  </span>
                  <span className="text-[10px] text-[#A89F9D] truncate">
                    Encrypted Evidence Vault
                  </span>
                </div>

                {/* Animated Waveform Equalizer */}
                <div className="flex items-center gap-1 h-5">
                  <span className="w-1 bg-[#C94A68] rounded-full animate-pulse h-3"></span>
                  <span className="w-1 bg-[#C94A68] rounded-full animate-pulse h-5"></span>
                  <span className="w-1 bg-[#C94A68] rounded-full animate-pulse h-2"></span>
                  <span className="w-1 bg-[#C94A68] rounded-full animate-pulse h-4"></span>
                  <span className="w-1 bg-[#C94A68] rounded-full animate-pulse h-5"></span>
                </div>
              </div>
            </div>

            {/* Live Location & Telemetry Card */}
            <div className="w-full bg-[#1F1C1C] border border-[#2E2929] rounded-2xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#F3EFEA]">
                  <MapPin className="w-4 h-4 text-[#C94A68]" />
                  <span className="text-xs font-bold">Live Pinpoint Coordinates</span>
                </div>
                <span className="bg-[#172B24] border border-[#4CAF8E]/30 text-[#4CAF8E] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  ±3m GPS Accuracy
                </span>
              </div>

              <div className="bg-[#282323] border border-[#2E2929] rounded-xl p-2.5 space-y-0.5">
                <p className="text-xs font-semibold text-[#F3EFEA] leading-snug">
                  Opposite Rajputana Sheraton, Station Road, Jaipur
                </p>
                <p className="text-[11px] font-mono text-[#A89F9D]">
                  26.9197° N, 75.7878° E • Elevation 431m
                </p>
              </div>

              {/* Map Snippet Mock */}
              <div
                className="w-full h-24 bg-cover bg-center rounded-xl relative overflow-hidden border border-[#2E2929] flex items-center justify-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80')",
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 w-7 h-7 rounded-full bg-[#C94A68] text-white flex items-center justify-center shadow-md animate-bounce ring-4 ring-white/30">
                  <Navigation className="w-4 h-4" />
                </div>
              </div>

              {/* Telemetry info row */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-[#A89F9D]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[#4CAF8E]">
                    <BatteryCharging className="w-3.5 h-3.5" /> 84% Battery
                  </span>
                  <span className="flex items-center gap-1 text-[#4CAF8E]">
                    <Radio className="w-3.5 h-3.5" /> 5G Live
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleShareLink}
                  className="flex items-center gap-1 text-[#FFA0B4] hover:text-[#C94A68] font-bold transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share Live Link'}</span>
                </button>
              </div>
            </div>

            {/* Nearby HerWay Community Guardians Alerted */}
            <div className="w-full bg-[#1F1C1C] border border-[#2E2929] rounded-2xl p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#C94A68]" />
                  <h3 className="text-xs font-bold text-[#F3EFEA]">
                    Community Guardians Alerted (3 km)
                  </h3>
                </div>
                <span className="text-[10px] text-[#A89F9D] font-bold">4 Active</span>
              </div>

              <div className="space-y-1.5">
                <div className="p-2 rounded-xl bg-[#282323] border border-[#2E2929] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                      alt="Sunita V."
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-[#2E2929]"
                    />
                    <div>
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        Sunita V. <CheckCircle className="w-3 h-3 text-[#4CAF8E]" />
                      </span>
                      <p className="text-[10px] font-semibold text-[#4CAF8E]">
                        En Route on Scooter • ETA 2m
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#A89F9D] bg-[#1F1C1C] px-2 py-0.5 rounded">
                    0.6 km
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[#282323] border border-[#2E2929] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                      alt="Priya K."
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-[#2E2929]"
                    />
                    <div>
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        Priya K. <CheckCircle className="w-3 h-3 text-[#4CAF8E]" />
                      </span>
                      <p className="text-[10px] text-[#A89F9D]">Bridged with Control Room</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#A89F9D] bg-[#1F1C1C] px-2 py-0.5 rounded">
                    0.9 km
                  </span>
                </div>
              </div>
            </div>

            {/* Mark Safe / End Emergency Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onShowToast('Emergency Resolved', 'Marked safe. Telemetry stream closed.');
                  onClose();
                }}
                className="w-full h-12 rounded-xl bg-[#276958] hover:bg-[#1f5647] text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark Safe / End Emergency</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
