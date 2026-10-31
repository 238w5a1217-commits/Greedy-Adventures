"use client";

import React, { useState, useEffect } from "react";
import { Compass, Sparkles } from "lucide-react";
import ChatHeader from "./ChatHeader";
import { ChatMessages, type MessageItem } from "./ChatMessages";
import ChatInput from "./ChatInput";
import type { ChatResponse } from "@/lib/validation/chat-schema";

const INITIAL_WELCOME_CONTENT =
  "Welcome to Greedy Adventures! Ready to experience the freedom of skydiving over Pattaya's beautiful coastline? I'm here to help you explore packages, inclusions, and everything you need to know before your jump.";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [lastUserPrompt, setLastUserPrompt] = useState<string>("");

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isLoading) return;

    setHasInteracted(true);
    setLastUserPrompt(trimmed);

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: getCurrentTime(),
    };

    // Filter out previous errors when continuing
    const cleanedHistory = messages.filter((m) => !m.isError);
    const updatedMessages = [...cleanedHistory, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Build conversation history for the backend
      const payloadMessages = updatedMessages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data: ChatResponse = await res.json();

      const assistantMsg: MessageItem = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.message,
        timestamp: getCurrentTime(),
        sources: data.sources,
        media: data.media,
        packages: data.packages,
        suggestedQuestions: data.suggestedQuestions,
        responseType: data.responseType,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Concierge Chat Error:", err);
      const errorMsg: MessageItem = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "I'm having trouble responding right now. Please try again in a moment.",
        timestamp: getCurrentTime(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastUserPrompt && !isLoading) {
      handleSendMessage(lastUserPrompt);
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setHasInteracted(false);
    setLastUserPrompt("");
  };

  // Prevent background scroll on mobile when chat is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Chat Launcher Button & Assist Pill */}
      <aside aria-label="Skydiving AI Experience Concierge">
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none">
            {/* Assistive Callout Pill - Positioned directly on TOP of the launcher button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="pointer-events-auto cursor-pointer flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0B1422] border border-[#E5E3D9] shadow-lg hover:border-[#B88E3E]/70 hover:shadow-xl transition-all duration-300 text-[12px] font-semibold group hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="w-2 h-2 rounded-full bg-[#008F70] animate-pulse shrink-0" />
              <span className="group-hover:text-[#B88E3E] transition-colors whitespace-nowrap">
                How can I assist you?
              </span>
            </button>

            {/* Circular/Rounded Luxury Launcher Button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open Greedy Adventures Concierge"
              className="pointer-events-auto group relative w-14 h-14 rounded-2xl bg-[#0B1422] hover:bg-[#152338] text-[#D9B36C] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-[#E5E3D9]/40 hover:border-[#D9B36C]"
            >
              <Compass className="w-6 h-6 text-[#D9B36C] group-hover:rotate-45 transition-transform duration-500" />
              {/* Online indicator */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#00CBA0] border-2 border-white rounded-full animate-pulse" />
            </button>
          </div>
        )}

        {/* Mobile Backdrop Overlay - Click outside to dismiss */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 sm:hidden transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Floating Concierge Chat Window - Natural Warm Ivory Theme */}
        {isOpen && (
          <div
            className="fixed inset-x-3 bottom-3 z-50 h-[82dvh] max-h-[680px] sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[410px] sm:h-[min(640px,calc(100vh-32px))] bg-[#FAF9F3] border border-[#E5E3D9] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up"
            role="dialog"
            aria-modal="true"
            aria-label="AI Experience Concierge Chat"
          >
            {/* Concierge Header */}
            <ChatHeader
              onClose={() => setIsOpen(false)}
              onReset={handleResetChat}
            />

            {/* Scrollable Message List / Welcome Screen */}
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              onSuggestionClick={handleSendMessage}
              onRetry={handleRetry}
              hasUserInteracted={hasInteracted}
            />

            {/* Bottom Input Composer */}
            <ChatInput
              input={input}
              setInput={setInput}
              onSubmit={() => {
                if (input.trim() && !isLoading) {
                  handleSendMessage(input);
                  setInput("");
                }
              }}
              isLoading={isLoading}
              isOpen={isOpen}
            />
          </div>
        )}
      </aside>
    </>
  );
}

export { ChatWidget };
