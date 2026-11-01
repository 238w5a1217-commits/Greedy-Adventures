"use client";

import React from "react";
import { User, Compass } from "lucide-react";
import PackageComparison from "./PackageComparison";
import MediaAttachment from "./MediaAttachment";
import SourceCitations from "./SourceCitations";
import SuggestedQuestions from "./SuggestedQuestions";
import type { MessageItem } from "./ChatMessages";

interface ChatMessageProps {
  message: MessageItem;
  onSuggestionClick?: (query: string) => void;
}

export default function ChatMessage({ message, onSuggestionClick }: ChatMessageProps) {
  const isUser = message.role === "user";

  // Markdown renderer for assistant and user content
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");

    return lines.map((line, lIdx) => {
      // Empty line -> spacing
      if (line.trim() === "") {
        return <div key={lIdx} className="h-2" />;
      }

      // Check for headings (### or ##)
      if (line.startsWith("### ")) {
        return (
          <h4 key={lIdx} className={`text-[13.5px] font-bold mt-2 mb-1 ${isUser ? "text-white" : "text-[#0B1422]"}`}>
            {line.replace("### ", "")}
          </h4>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={lIdx} className={`text-[14px] font-extrabold mt-2.5 mb-1 ${isUser ? "text-[#D9B36C]" : "text-[#B88E3E]"}`}>
            {line.replace("## ", "")}
          </h3>
        );
      }

      // Parse bold **text** and links [text](url)
      const parseInline = (text: string) => {
        // Split by bold (**...**)
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className={`font-bold ${isUser ? "text-white" : "text-[#0B1422]"}`}>
                {part.slice(2, -2)}
              </strong>
            );
          }
          // Split by links [label](url)
          const linkParts = part.split(/(\[[^\]]+\]\([^)]+\))/g);
          return linkParts.map((lPart, lpIdx) => {
            const linkMatch = lPart.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch) {
              return (
                <a
                  key={lpIdx}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline font-semibold ${isUser ? "text-[#D9B36C]" : "text-[#B88E3E]"}`}
                >
                  {linkMatch[1]}
                </a>
              );
            }
            return lPart;
          });
        });
      };

      // Check for bullet list item (- or *)
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ") || line.trim().startsWith("* ")) {
        const itemText = line.trim().replace(/^[-•*]\s+/, "");
        return (
          <li key={lIdx} className={`ml-3.5 list-disc leading-relaxed ${isUser ? "text-white marker:text-[#D9B36C]" : "text-[#1E293B] marker:text-[#008F70]"}`}>
            <span>{parseInline(itemText)}</span>
          </li>
        );
      }

      // Standard paragraph
      return (
        <p key={lIdx} className="leading-relaxed break-words">
          {parseInline(line)}
        </p>
      );
    });
  };

  return (
    <div
      className={`w-full max-w-full min-w-0 flex flex-col ${
        isUser ? "items-end" : "items-start"
      } animate-fade-in-up`}
    >
      <div
        className={`flex items-start gap-2 sm:gap-2.5 min-w-0 ${
          isUser
            ? "flex-row-reverse max-w-[85%] sm:max-w-[80%]"
            : "flex-row w-full max-w-full"
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 overflow-hidden ${
            isUser
              ? "bg-[#0B1422] border-[#0B1422] text-[#D9B36C]"
              : "bg-[#0B1422] border-[#E5E3D9] text-[#B88E3E] shadow-xs"
          }`}
          aria-hidden="true"
        >
          {isUser ? (
            <User className="w-3.5 h-3.5" />
          ) : (
            <img
              src="https://media4.giphy.com/avatars/acetech/RK67baKq9A79.gif"
              alt="AI"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Message Container */}
        <div
          className={`rounded-2xl px-3.5 py-3 sm:px-4 shadow-xs space-y-2 text-[12.5px] border min-w-0 ${
            isUser
              ? "bg-[#0B1422] border-[#0B1422] text-white rounded-tr-xs max-w-fit"
              : "bg-white border-[#E5E3D9] text-[#1E293B] rounded-tl-xs flex-1 w-full"
          }`}
        >
          {/* Text Content */}
          <div className="space-y-1 text-left break-words overflow-hidden leading-relaxed">
            {renderFormattedContent(message.content)}
          </div>

          {/* Structured Package Cards if present */}
          {!isUser && message.packages && message.packages.length > 0 && (
            <PackageComparison
              packages={message.packages}
              onSelectPackage={onSuggestionClick}
            />
          )}

          {/* Media Attachments (Brochure PDF / 4K Video) */}
          {!isUser && message.media && message.media.length > 0 && (
            <div className="pt-1">
              <MediaAttachment media={message.media} />
            </div>
          )}

          {/* Source Citations */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <SourceCitations sources={message.sources} />
          )}

          {/* Suggested Follow-up Questions */}
          {!isUser && message.suggestedQuestions && message.suggestedQuestions.length > 0 && onSuggestionClick && (
            <SuggestedQuestions
              questions={message.suggestedQuestions}
              onSelect={onSuggestionClick}
            />
          )}
        </div>
      </div>

      {/* Timestamp */}
      {message.timestamp && (
        <span
          className={`text-[9.5px] text-[#78899E] mt-1 ${
            isUser ? "mr-10" : "ml-10"
          }`}
        >
          {message.timestamp}
        </span>
      )}
    </div>
  );
}

