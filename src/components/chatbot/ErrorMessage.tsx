"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  onRetry?: () => void;
  message?: string;
}

export default function ErrorMessage({
  onRetry,
  message = "I'm having trouble responding right now. Please try again in a moment.",
}: ErrorMessageProps) {
  return (
    <div
      className="flex items-start gap-2.5 max-w-[90%] animate-fade-in-up"
      role="alert"
    >
      <div className="w-7 h-7 rounded-lg bg-white border border-[#E5E3D9] flex items-center justify-center shrink-0 text-[#B88E3E] shadow-2xs">
        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
      </div>

      <div className="bg-white border border-red-200/80 rounded-2xl rounded-tl-xs p-3.5 shadow-xs space-y-2 text-left">
        <p className="text-[12px] text-[#1E293B] leading-relaxed">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1422] hover:bg-[#1a2b42] text-white border border-[#0B1422] text-[11px] font-bold tracking-wider uppercase transition-colors focus:outline-none focus:ring-1 focus:ring-[#B88E3E]"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry</span>
          </button>
        )}
      </div>
    </div>
  );
}

