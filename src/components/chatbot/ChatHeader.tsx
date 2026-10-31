"use client";

import React from "react";
import { RotateCcw, X, Compass } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
  onReset: () => void;
}

export default function ChatHeader({ onClose, onReset }: ChatHeaderProps) {
  return (
    <header
      className="flex flex-col bg-white border-b border-[#E5E3D9] flex-shrink-0 select-none shadow-xs"
      role="banner"
    >
      {/* Mobile drag handle indicator */}
      <div className="w-10 h-1 rounded-full bg-[#E5E3D9] mx-auto mt-2 -mb-0.5 sm:hidden" />

      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3">
        {/* Brand & Concierge Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="relative w-9 h-9 rounded-xl bg-[#FAF9F3] border border-[#E5E3D9] flex items-center justify-center flex-shrink-0 text-[#B88E3E] shadow-inner"
            aria-hidden="true"
          >
            <Compass className="w-5 h-5 text-[#B88E3E]" />
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#008F70] border-2 border-white"
              title="Online"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span
                className="text-[10px] font-extrabold tracking-[0.18em] text-[#B88E3E] uppercase truncate"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "11px" }}
              >
                GREEDY ADVENTURES
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-[#FAF9F3] text-[#64748B] border border-[#E5E3D9]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008F70] animate-pulse" />
                Online
              </span>
            </div>

            <h1 className="text-[13px] font-bold text-[#0B1422] tracking-tight leading-none truncate mt-0.5">
              AI Experience Concierge
            </h1>
            <p className="text-[10.5px] text-[#64748B] truncate mt-0.5">
              Your personal skydiving assistant
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-1">
          {/* New Chat Reset Button */}
          <button
            type="button"
            onClick={onReset}
            title="Start New Chat"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FAF9F3] hover:bg-[#F0EDE1] text-[#64748B] hover:text-[#0B1422] border border-[#E5E3D9] flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#B88E3E]"
            aria-label="Start a new chat session"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            title="Close Concierge"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FAF9F3] hover:bg-[#F0EDE1] text-[#64748B] hover:text-[#0B1422] border border-[#E5E3D9] flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#B88E3E]"
            aria-label="Close concierge chat window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
