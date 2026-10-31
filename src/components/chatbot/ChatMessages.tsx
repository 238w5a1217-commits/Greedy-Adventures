"use client";

import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import ErrorMessage from "./ErrorMessage";
import WelcomeScreen from "./WelcomeScreen";
import type { SourceCitation, MediaAsset, PackageItem } from "@/lib/validation/chat-schema";

export interface MessageItem {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
  sources?: SourceCitation[];
  media?: MediaAsset[];
  packages?: PackageItem[];
  suggestedQuestions?: string[];
  responseType?: "text" | "pdf" | "video" | "media_bundle" | "packages";
  isError?: boolean;
}

interface ChatMessagesProps {
  messages: MessageItem[];
  isLoading: boolean;
  onSuggestionClick: (query: string) => void;
  onRetry?: () => void;
  hasUserInteracted: boolean;
}

export function ChatMessages({
  messages,
  isLoading,
  onSuggestionClick,
  onRetry,
  hasUserInteracted,
}: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  // When no interaction yet, display WelcomeScreen
  if (!hasUserInteracted && messages.length <= 1 && (!messages[0] || messages[0].role === "assistant")) {
    return (
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden bg-[#FAF9F3] flex flex-col justify-center scrollbar-thin w-full max-w-full"
      >
        <WelcomeScreen
          onSelectSuggestion={onSuggestionClick}
          disabled={isLoading}
        />
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-4 space-y-4 bg-[#FAF9F3] text-[#1E293B] w-full max-w-full"
      role="log"
      aria-label="Conversation history"
    >
      {messages.map((msg) => {
        if (msg.isError) {
          return (
            <ErrorMessage
              key={msg.id}
              message={msg.content}
              onRetry={onRetry}
            />
          );
        }

        return (
          <ChatMessage
            key={msg.id}
            message={msg}
            onSuggestionClick={onSuggestionClick}
          />
        );
      })}

      {/* Typing Indicator */}
      {isLoading && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;
