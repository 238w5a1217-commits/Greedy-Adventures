"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Film, AlertCircle, VideoOff } from "lucide-react";
import { MediaAsset } from "@/lib/validation/chat-schema";

interface VideoPlayerProps {
  asset?: MediaAsset;
}

export default function VideoPlayer({ asset }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // If no video asset or URL
  if (!asset || !asset.url) {
    return (
      <div className="mt-3 rounded-2xl border border-[#26384D] bg-[#17263A] p-4 text-[#A7B4C5] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#111D2D] border border-[#26384D] flex items-center justify-center flex-shrink-0 text-[#78899E]">
            <VideoOff className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#F5F7FA]">
              Video Currently Unavailable
            </p>
            <p className="text-[11px] text-[#A7B4C5] mt-0.5 leading-relaxed">
              We&apos;re currently updating our jump footage library. Please check back shortly or explore our package options.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isEmbeddable = asset.url.includes("embed") || asset.url.includes("youtube.com") || asset.url.endsWith(".mp4");
  const watchUrl = asset.url.includes("/embed/")
    ? asset.url.replace("/embed/", "/watch?v=")
    : asset.url;

  return (
    <div className="mt-2.5 rounded-2xl border border-[#E5E3D9] bg-white overflow-hidden shadow-xs text-left w-full max-w-full min-w-0">
      {/* Video Viewport / Poster */}
      {!isPlaying ? (
        <div className="relative aspect-video w-full overflow-hidden bg-[#0B1422] group">
          {asset.thumbnailUrl ? (
            <Image
              src={asset.thumbnailUrl}
              alt={asset.title}
              fill
              sizes="(max-width: 640px) 100vw, 420px"
              unoptimized
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0B1422]">
              <Film className="w-10 h-10 text-[#7388A0]" />
            </div>
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Centered Play Button (Champagne Gold Accent) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="w-12 h-12 rounded-full bg-[#B88E3E] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 hover:bg-[#a67d32] focus:outline-none focus:ring-2 focus:ring-[#B88E3E]"
              aria-label={`Play ${asset.title}`}
            >
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </button>
          </div>

          {/* Bottom Title Bar */}
          <div className="absolute bottom-2.5 left-3 right-3 text-white min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#008F70]/80 text-white tracking-wider backdrop-blur-xs">
                4K Freefall
              </span>
            </div>
            <h4 className="text-[12.5px] font-bold text-white truncate drop-shadow-sm">
              {asset.title}
            </h4>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video w-full bg-black">
          {asset.url.endsWith(".mp4") ? (
            <video
              suppressHydrationWarning
              src={asset.url}
              controls
              playsInline
              className="w-full h-full"
            />
          ) : (
            <iframe
              src={`${asset.url}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="w-full h-full border-0"
              title={asset.title}
            />
          )}
        </div>
      )}

      {/* Description & External Watch Link */}
      <div className="p-2.5 sm:p-3 bg-white border-t border-[#E5E3D9] flex items-center justify-between gap-2.5 min-w-0 w-full">
        <p className="text-[11px] text-[#64748B] truncate flex-1 min-w-0">
          {asset.description || "4K cinematic footage over Pattaya's coastline"}
        </p>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B1422] hover:bg-[#1a2d42] text-white hover:text-[#D9B36C] text-[10.5px] font-bold tracking-wider uppercase border border-[#0B1422] transition-colors shrink-0"
        >
          <span>Watch Video</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
