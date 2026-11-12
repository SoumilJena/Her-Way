import React, { useState } from 'react';
import { X, Send, ShieldCheck, MapPin, Lock } from 'lucide-react';
import { Guardian } from '../types';

interface GuardianChatModalProps {
  guardian: Guardian | null;
  isOpen: boolean;
  onClose: () => void;
  onSendCheckInRequest: (guardian: Guardian, note: string) => void;
}

export const GuardianChatModal: React.FC<GuardianChatModalProps> = ({
  guardian,
  isOpen,
  onClose,
  onSendCheckInRequest,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'guardian'; text: string; time: string }>>([
    {
      sender: 'guardian',
      text: 'Namaste! I am currently nearby and active on the HerWay safe corridor. Are you arriving at the station or looking for a safe transit escort?',
      time: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  if (!isOpen || !guardian) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newMsg = {
      sender: 'user' as const,
      text: userText,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');

    // Simulated quick guardian response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'guardian',
          text: `Got it! I am just ${guardian.distanceKm} km away. I can meet you at the safe checkpoint in 5 minutes. Feel free to tap 'Request Check-In' to log our handshake PIN.`,
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md h-[520px] rounded-2xl bg-white dark:bg-[#1F1C1C] text-[#1E1B1A] dark:text-[#F3EFEA] border border-[#E8E2DD] dark:border-[#2E2929] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-3.5 border-b border-[#E8E2DD] dark:border-[#2E2929] flex items-center justify-between bg-[#FAF8F6] dark:bg-[#1A1717]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={guardian.avatar}
                alt={guardian.name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-[#E8E2DD] dark:ring-[#2E2929]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#276958] dark:bg-[#4CAF8E] border border-white dark:border-[#1F1C1C]"></span>
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-bold text-[#1E1B1A] dark:text-[#F3EFEA] truncate">
                {guardian.name}
              </h3>
              <p className="text-[10px] text-[#276958] dark:text-[#4CAF8E] flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Guardian • {guardian.distanceKm} km away</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="w-8 h-8 rounded-full bg-white dark:bg-[#282323] flex items-center justify-center text-[#665E5A] dark:text-[#A89F9D] hover:text-[#1E1B1A] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Encryption badge banner */}
        <div className="px-3 py-1.5 bg-[#F0ECE8] dark:bg-[#282323] text-center text-[10px] text-[#665E5A] dark:text-[#A89F9D] flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-[#276958] dark:text-[#4CAF8E]" />
          <span>End-to-end encrypted peer channel with HerWay Control Room bridge</span>
        </div>

        {/* Message feed */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#7A1C32] dark:bg-[#C94A68] text-white rounded-br-xs'
                    : 'bg-[#FAF8F6] dark:bg-[#282323] text-[#1E1B1A] dark:text-[#F3EFEA] border border-[#E8E2DD] dark:border-[#2E2929] rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-[#827874] dark:text-[#A89F9D] mt-0.5 px-1">
                {m.time}
              </span>
            </div>
          ))}
        </div>

        {/* Fast Action: Request Check-In button */}
        <div className="px-3 py-1.5 bg-[#FAF8F6] dark:bg-[#1A1717] border-t border-[#E8E2DD] dark:border-[#2E2929] flex items-center justify-between">
          <span className="text-[11px] text-[#665E5A] dark:text-[#A89F9D]">
            Need physical walking escort?
          </span>
          <button
            type="button"
            onClick={() => {
              onSendCheckInRequest(guardian, 'Requested via live chat');
              onClose();
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#E8F5F1] dark:bg-[#172B24] text-[#276958] dark:text-[#4CAF8E] border border-[#C4E8DC] dark:border-[#23473A] hover:opacity-90 active:scale-95 transition-all"
          >
            Log Check-In
          </button>
        </div>

        {/* Input box */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 border-t border-[#E8E2DD] dark:border-[#2E2929] flex items-center gap-2 bg-white dark:bg-[#1F1C1C]"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Message ${guardian.name}...`}
            className="flex-1 h-10 px-3 rounded-xl bg-[#FAF8F6] dark:bg-[#282323] border border-[#E8E2DD] dark:border-[#2E2929] text-xs text-[#1E1B1A] dark:text-[#F3EFEA] focus:outline-none focus:ring-1 focus:ring-[#7A1C32]"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="w-10 h-10 rounded-xl bg-[#7A1C32] dark:bg-[#C94A68] text-white flex items-center justify-center active:scale-95 transition-transform shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
