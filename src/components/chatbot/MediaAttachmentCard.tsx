"use client";

import React from "react";
import { FileText, ExternalLink, Download, FileQuestion } from "lucide-react";
import { MediaAsset } from "@/lib/validation/chat-schema";

interface MediaAttachmentCardProps {
  asset?: MediaAsset;
  onMissingBrochure?: () => void;
}

export default function MediaAttachmentCard({ asset }: MediaAttachmentCardProps) {
  // If no brochure is available or URL is missing
  if (!asset || !asset.url) {
    return (
      <div className="mt-3 rounded-2xl border border-[#26384D] bg-[#17263A] p-4 text-[#A7B4C5] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#111D2D] border border-[#26384D] flex items-center justify-center flex-shrink-0 text-[#78899E]">
            <FileQuestion className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#F5F7FA]">
              Brochure Currently Unavailable
            </p>
            <p className="text-[11px] text-[#A7B4C5] mt-0.5 leading-relaxed">
              I&apos;d be happy to share the brochure, but the PDF is currently unavailable. I can still explain the available packages here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isPdf = asset.type === "pdf";
  const displayTitle = asset.title || "Sea View Skydiving Brochure";
  const formatLabel = isPdf ? "PDF" : "Document";

  return (
    <div className="mt-2.5 rounded-2xl border border-[#E5E3D9] bg-white overflow-hidden shadow-xs text-left w-full max-w-full min-w-0">
      {/* Header Info */}
      <div className="flex items-center gap-3 p-3 bg-[#FAF9F3] border-b border-[#E5E3D9] min-w-0">
        <div className="w-9 h-9 rounded-xl bg-white border border-[#E5E3D9] flex items-center justify-center flex-shrink-0 text-[#B88E3E] shadow-2xs">
          <FileText className="w-4.5 h-4.5 text-[#B88E3E]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[9.5px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#B88E3E]/10 text-[#B88E3E] border border-[#B88E3E]/20 tracking-wider">
              Skydiving Brochure
            </span>
            <span className="text-[9.5px] font-bold text-[#008F70]">
              {formatLabel}
            </span>
            {asset.fileSize && (
              <span className="text-[9.5px] font-medium text-[#64748B]">
                · {asset.fileSize}
              </span>
            )}
          </div>

          <h4 className="text-[12.5px] font-bold text-[#0B1422] truncate leading-tight mt-1">
            {displayTitle}
          </h4>
        </div>
      </div>

      {/* Description */}
      {asset.description && (
        <p className="px-3.5 py-2 text-[11px] text-[#64748B] leading-relaxed border-b border-[#E5E3D9] break-words">
          {asset.description}
        </p>
      )}

      {/* Action Buttons: Open PDF & Download */}
      <div className="flex gap-2 p-2.5 sm:p-3 bg-white min-w-0">
        <a
          href={asset.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#0B1422] text-white text-[10.5px] font-bold tracking-wider uppercase rounded-xl hover:bg-[#1a2d42] transition-all duration-200 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#B88E3E] truncate"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Open PDF</span>
        </a>

        <a
          href={asset.url}
          download="Sea-View-Skydiving-Brochure.pdf"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#FAF9F3] hover:bg-[#F0EDE1] text-[#0B1422] text-[10.5px] font-bold tracking-wider uppercase rounded-xl border border-[#E5E3D9] hover:border-[#B88E3E]/40 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#B88E3E] truncate"
        >
          <Download className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
          <span className="truncate">Download</span>
        </a>
      </div>
    </div>
  );
}

