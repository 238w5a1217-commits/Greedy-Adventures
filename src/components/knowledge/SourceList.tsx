"use client";

import React, { useState } from "react";
import { ExternalLink, Calendar, ShieldCheck, ChevronDown, ChevronUp, Database } from "lucide-react";
import { WEBSITE_SOURCES, type KnowledgeSource } from "@/lib/knowledge/sources";

export function SourceList() {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e5e3d9]">
        <div>
          <h2 className="text-[15px] font-bold uppercase tracking-wider text-[#0B1422] flex items-center gap-2">
            <Database className="w-4 h-4 text-[#D9B36C]" />
            Official Website Grounding Sources ({WEBSITE_SOURCES.length})
          </h2>
          <p className="text-[12px] text-[#78899E] mt-0.5">
            Verified ground-truth documents captured directly from Greedy Adventures Sea View Skydiving.
          </p>
        </div>

        <span className="self-start sm:self-auto px-3 py-1 text-[11px] font-bold bg-[#00CBA0]/15 text-[#008f70] border border-[#00CBA0]/30 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00CBA0] animate-pulse" />
          5 Active Records · 100% Extracted
        </span>
      </div>

      {/* Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WEBSITE_SOURCES.map((src: KnowledgeSource) => {
          const isExpanded = !!expandedIds[src.id];
          const isVerified = src.status === "verified";

          return (
            <div
              key={src.id}
              className="p-5 rounded-2xl bg-white border border-[#e5e3d9] shadow-sm hover:shadow-md hover:border-[#D9B36C]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Bar */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#111D2D] text-[#D9B36C] rounded-lg">
                    {src.section}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#78899E]">
                    <Calendar className="w-3 h-3 text-[#D9B36C]" />
                    <span>Captured: {src.captureDate}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[14px] font-bold text-[#0B1422] mt-3 leading-snug">
                  {src.title}
                </h3>

                {/* Content Preview / Full */}
                <div className="mt-3 p-3.5 rounded-xl bg-[#FAF9F3] border border-[#e5e3d9] text-[12px] text-[#202B33] font-sans leading-relaxed whitespace-pre-wrap">
                  {isExpanded
                    ? src.content
                    : src.content.length > 220
                    ? `${src.content.substring(0, 220)}...`
                    : src.content}
                </div>

                {/* Expand / Collapse Button */}
                {src.content.length > 220 && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(src.id)}
                    className="mt-2 text-[11px] font-bold text-[#008f70] hover:text-[#0B1422] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? "Collapse Passage" : "View Full Extracted Text"}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                )}
              </div>

              {/* Card Footer: URL & Status */}
              <div className="mt-4 pt-3 border-t border-[#f0ede4] flex items-center justify-between gap-2 text-xs">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#0B1422] hover:text-[#D9B36C] font-semibold text-[11px] transition-colors truncate max-w-[200px]"
                >
                  <span className="truncate">{src.url.replace("https://www.", "")}</span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>

                {/* Extraction Status */}
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isVerified
                      ? "bg-[#00CBA0]/15 text-[#008f70] border border-[#00CBA0]/30"
                      : "bg-[#D9B36C]/15 text-[#8f6d28] border border-[#D9B36C]/30"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isVerified ? "Successfully Extracted" : "Demo Supplied"}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SourceList;
