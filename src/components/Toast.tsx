import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastData {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'alert';
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="rounded-2xl p-3.5 bg-[#1E1B1A] dark:bg-[#282323] text-white border border-[#2E2929] shadow-2xl flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-[#276958] dark:text-[#4CAF8E] shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white truncate">{toast.title}</p>
          <p className="text-[11px] text-[#A89F9D] mt-0.5 leading-snug">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss toast"
          className="text-[#A89F9D] hover:text-white shrink-0 -mr-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
