"use client";

import React from "react";
import { Compass } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div
      className="flex items-start gap-2.5 max-w-[85%] animate-fade-in-up"
      role="status"
      aria-live="polite"
    >
      {/* Concierge Avatar */}
      <div className="w-7 h-7 rounded-lg bg-white border border-[#E5E3D9] flex items-center justify-center shrink-0 text-[#B88E3E] shadow-xs">
        <Compass className="w-3.5 h-3.5 animate-spin text-[#B88E3E]" style={{ animationDuration: "3s" }} />
      </div>

      {/* Typing Bubble */}
      <div className="bg-white border border-[#E5E3D9] rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Animated Dots with Champagne Gold & Teal */}
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#B88E3E] rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-[#008F70] rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-[#B88E3E] rounded-full animate-bounce" />
          </div>
          <span className="text-[11px] text-[#64748B] font-medium">
            Preparing your experience...
          </span>
        </div>
      </div>
    </div>
  );
}

