"use client";

import React, { useRef, useEffect, KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
  isOpen: boolean;
}

export default function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  isOpen,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-resize textarea up to 100px
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="p-3 bg-white border-t border-[#E5E3D9] shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]"
    >
      <div className="relative flex items-end gap-2 bg-[#FAF9F3] border border-[#E5E3D9] rounded-2xl p-1.5 focus-within:border-[#B88E3E]/70 transition-all duration-200">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about your skydiving experience..."
          disabled={isLoading}
          aria-label="Ask concierge a question"
          className="flex-1 bg-transparent text-[12.5px] text-[#0B1422] placeholder:text-[#94A3B8] resize-none px-2.5 py-1.5 focus:outline-none min-h-[36px] max-h-[100px] leading-relaxed disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          aria-label="Send inquiry"
          className="w-8.5 h-8.5 rounded-xl bg-[#B88E3E] hover:bg-[#a67d32] text-white flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shrink-0 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#B88E3E]"
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      <div className="mt-1 flex items-center justify-between px-1 text-[9.5px] text-[#94A3B8]">
        <span>Greedy Concierge</span>
        <span>Enter to send · Shift + Enter for new line</span>
      </div>
    </form>
  );
}
