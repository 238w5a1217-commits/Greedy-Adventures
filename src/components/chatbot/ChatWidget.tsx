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
      {/* Floating Chat Launcher Button (AI Concierge) */}
      <aside aria-label="Skydiving AI Experience Concierge">
        {!isOpen && (
          <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 md:bottom-9 md:right-9 z-50 flex items-center pointer-events-none">
            {/* Direct Floating AI Launcher Button - Lifted gracefully on desktop */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open AI Concierge"
              className="pointer-events-auto group relative w-13 h-13 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-2xl p-0.5 bg-[#0B1422] border-2 border-[#D9B36C]/80 hover:border-[#D9B36C] shadow-[0_10px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer overflow-visible hover:-translate-y-1"
            >
              <img
                src="https://media4.giphy.com/avatars/acetech/RK67baKq9A79.gif"
                alt="AI Concierge"
                className="w-full h-full object-cover rounded-[14px]"
              />
              {/* Compact AI Badge (Minimal Letters) */}
              <span className="absolute -top-1.5 -left-1.5 px-1.5 py-0.5 rounded-md bg-[#0B1422] text-[#ffdea6] text-[10px] font-black tracking-widest border border-[#ffdea6]/70 shadow-md">
                AI
              </span>
              {/* Online indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00CBA0] border-2 border-white rounded-full animate-pulse" />
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
            className="fixed inset-x-3 bottom-3 z-50 h-[85dvh] max-h-[700px] sm:inset-auto sm:bottom-7 sm:right-7 md:bottom-9 md:right-9 sm:w-[410px] sm:h-[min(640px,calc(100vh-48px))] bg-[#FAF9F3] border border-[#E5E3D9] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up"
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
