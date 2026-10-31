"use client";

import React from "react";
import { Sparkles, CheckCircle2, FileText, Play } from "lucide-react";

interface WelcomeScreenProps {
  onSelectSuggestion: (question: string) => void;
  disabled?: boolean;
}

const WELCOME_SUGGESTIONS = [
  {
    label: "Explore Skydiving Packages",
    query: "Explore Skydiving Packages",
    icon: Sparkles,
  },
  {
    label: "What's Included?",
    query: "What is included in each package?",
    icon: CheckCircle2,
  },
  {
    label: "Show Me the Brochure",
    query: "Can you send me the brochure?",
    icon: FileText,
  },
  {
    label: "Watch the Experience",
    query: "Show me the skydiving experience video",
    icon: Play,
  },
];

export default function WelcomeScreen({ onSelectSuggestion, disabled }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-4 sm:px-5 sm:py-5 my-auto animate-fade-in-up w-full">
      {/* Greeting Title */}
      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#B88E3E] mb-1">
        Greedy Adventures · Concierge
      </span>
      <h2 className="text-[17px] sm:text-[18px] font-extrabold text-[#0B1422] tracking-tight leading-snug max-w-[340px]">
        Luxury Sea View Skydiving
      </h2>

      {/* Welcoming Message */}
      <p className="text-[12.5px] leading-relaxed text-[#64748B] mt-2 max-w-[350px]">
        Welcome to Greedy Adventures! Ready to experience the freedom of skydiving over Pattaya&apos;s beautiful coastline? I&apos;m here to help you explore packages, inclusions, and everything you need to know before your jump.
      </p>

      {/* Suggested Question Chips (Grid / Stack) */}
      <div className="w-full mt-4 sm:mt-5 flex flex-col gap-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] text-left px-1">
          Suggested Inquiries
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
          {WELCOME_SUGGESTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onSelectSuggestion(item.query)}
                disabled={disabled}
                className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#F5F4EE] border border-[#E5E3D9] hover:border-[#B88E3E]/60 text-left transition-all duration-200 shadow-xs hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-[#B88E3E]"
              >
                <div className="w-6 h-6 rounded-lg bg-[#FAF9F3] border border-[#E5E3D9] group-hover:border-[#B88E3E]/50 flex items-center justify-center shrink-0 text-[#B88E3E] transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[12px] font-semibold text-[#0B1422] group-hover:text-[#B88E3E] transition-colors truncate">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

