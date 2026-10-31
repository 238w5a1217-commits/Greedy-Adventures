"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface SuggestedQuestionsProps {
  questions?: string[];
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export default function SuggestedQuestions({
  questions,
  onSelect,
  disabled,
}: SuggestedQuestionsProps) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-3 pt-2 border-t border-[#E5E3D9] flex flex-col gap-1.5 w-full">
      <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-[#B88E3E]" />
        Suggested Follow-ups
      </span>

      <div className="flex flex-wrap gap-1.5">
        {questions.map((question, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(question)}
            disabled={disabled}
            className="text-[11.5px] font-semibold px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF9F3] text-[#0B1422] hover:text-[#B88E3E] border border-[#E5E3D9] hover:border-[#B88E3E]/50 transition-all duration-200 text-left shadow-2xs hover:shadow-xs disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-[#B88E3E]"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
