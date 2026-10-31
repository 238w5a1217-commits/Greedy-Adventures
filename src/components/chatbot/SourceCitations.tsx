"use client";

import React from "react";
import { SourceCitation } from "@/lib/validation/chat-schema";
import { ExternalLink } from "lucide-react";

interface SourceCitationsProps {
  sources?: SourceCitation[];
}

export default function SourceCitations({ sources }: SourceCitationsProps) {
  if (!sources || sources.length === 0) return null;

  // Shorten titles if needed for compact display
  const cleanTitle = (title: string) => {
    return title.split("—")[0].trim().replace("Greedy Adventures - ", "").replace("Greedy Adventures – ", "");
  };

  return (
    <div className="mt-2.5 pt-2 border-t border-[#E5E3D9] flex flex-wrap items-center gap-1.5 text-[11px] text-[#64748B]">
      <span className="font-semibold text-[#0B1422] tracking-wider text-[10px] uppercase mr-0.5">
        Sources:
      </span>
      {sources.map((src, idx) => (
        <React.Fragment key={idx}>
          <a
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${src.title}`}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white hover:bg-[#FAF9F3] text-[#B88E3E] hover:text-[#976d29] border border-[#E5E3D9] shadow-2xs transition-colors"
          >
            <span className="truncate max-w-[160px] sm:max-w-[200px]">{cleanTitle(src.title)}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70 shrink-0" />
          </a>
          {idx < sources.length - 1 && (
            <span className="text-[#E5E3D9] select-none">·</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

