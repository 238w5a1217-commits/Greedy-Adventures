"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FileText, ExternalLink, Download, Play, ShieldCheck, AlertCircle, Film } from "lucide-react";
import { MEDIA_ASSETS } from "@/lib/media/media-selector";
import type { MediaAsset } from "@/lib/validation/chat-schema";

export function MediaLibrary() {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e5e3d9]">
        <div>
          <h2 className="text-[15px] font-bold uppercase tracking-wider text-[#0B1422] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#D9B36C]" />
            Whitelisted Media Assets ({MEDIA_ASSETS.length})
          </h2>
          <p className="text-[12px] text-[#78899E] mt-0.5">
            Verified brochures and jump footage dynamically attached to customer concierge inquiries.
          </p>
        </div>

        <span className="self-start sm:self-auto px-3 py-1 text-[11px] font-bold bg-[#00CBA0]/15 text-[#008f70] border border-[#00CBA0]/30 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00CBA0] animate-pulse" />
          2 Verified Assets Active
        </span>
      </div>

      {/* Media Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MEDIA_ASSETS.map((asset: MediaAsset) => {
          const isPdf = asset.type === "pdf";
          const isPlaying = playingVideoId === asset.id;

          return (
            <div
              key={asset.id}
              className="p-5 rounded-2xl bg-white border border-[#e5e3d9] shadow-sm hover:shadow-md hover:border-[#D9B36C]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Type icon, Title, Status & Demo Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#111D2D] text-[#D9B36C] flex items-center justify-center flex-shrink-0 shadow-sm border border-[#26384D]">
                      {isPdf ? <FileText className="w-5 h-5" /> : <Film className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#111D2D] text-[#D9B36C]">
                          {isPdf ? "PDF Document" : "4K Video Stream"}
                        </span>
                        {asset.isDemo && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            DEMO MATERIAL
                          </span>
                        )}
                      </div>

                      <h3 className="text-[14px] font-bold text-[#0B1422] leading-tight mt-1">
                        {asset.title}
                      </h3>
                    </div>
                  </div>

                  {/* Availability Badge */}
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00CBA0]/15 text-[#008f70] border border-[#00CBA0]/30 shrink-0">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Available</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-[12px] text-[#78899E] mt-3 leading-relaxed">
                  {asset.description}
                </p>

                {/* Path / URL Preview */}
                <div className="mt-2 text-[10.5px] font-mono text-[#78899E] bg-[#FAF9F3] px-2.5 py-1.5 rounded-lg border border-[#e5e3d9] truncate">
                  Path: {asset.url} {asset.fileSize && `· ${asset.fileSize}`}
                </div>

                {/* PDF Document Preview (Embedded Viewer with High-Fidelity Fallback) */}
                {isPdf && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-[#e5e3d9] bg-[#FAF9F3] shadow-inner relative flex flex-col min-h-[200px]">
                    <object
                      data={`${asset.url}#toolbar=0&navpanes=0`}
                      type="application/pdf"
                      className="w-full h-[220px] border-0"
                    >
                      {/* Visual Document Fallback if browser blocks iframe PDF rendering */}
                      <div className="p-4 bg-[#FAF9F3] text-left text-[11.5px] text-[#1E293B] space-y-2 h-full flex flex-col justify-between">
                        <div>
                          <div className="font-extrabold text-[#0B1422] uppercase tracking-wider text-[12px] flex items-center justify-between">
                            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "14px" }} className="text-[#B88E3E]">
                              GREEDY ADVENTURES
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#008F70]/10 text-[#008F70] font-bold">
                              13,000 FT TANDEM
                            </span>
                          </div>
                          <p className="text-[11px] text-[#64748B] mt-1 leading-snug">
                            Official tandem packages, USPA gear regulations & safety policies for Pattaya dropzone.
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10.5px]">
                          <div className="p-2 rounded-lg bg-white border border-[#E5E3D9] shadow-2xs">
                            <div className="font-bold text-[#0B1422]">ECO</div>
                            <div className="text-[#B88E3E] font-extrabold">฿9,500</div>
                          </div>
                          <div className="p-2 rounded-lg bg-white border border-[#E5E3D9] shadow-2xs">
                            <div className="font-bold text-[#0B1422]">DELUXE</div>
                            <div className="text-[#B88E3E] font-extrabold">฿12,500</div>
                          </div>
                          <div className="p-2 rounded-lg bg-white border border-[#B88E3E] shadow-2xs ring-1 ring-[#B88E3E]/30">
                            <div className="font-bold text-[#0B1422]">VIP SUITE</div>
                            <div className="text-[#B88E3E] font-extrabold">฿14,000</div>
                          </div>
                        </div>
                      </div>
                    </object>
                  </div>
                )}

                {/* Responsive Video Preview (If Video) */}
                {!isPdf && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-[#26384D] bg-[#0B1422] shadow-sm">
                    {!isPlaying ? (
                      <div className="relative aspect-video w-full group">
                        {asset.thumbnailUrl ? (
                          <Image
                            src={asset.thumbnailUrl}
                            alt={asset.title}
                            width={640}
                            height={360}
                            unoptimized
                            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#0B1422]">
                            <Film className="w-10 h-10 text-[#78899E]" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setPlayingVideoId(asset.id || "video")}
                            className="w-12 h-12 rounded-full bg-[#D9B36C] text-[#0B1422] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                            aria-label={`Preview ${asset.title}`}
                          >
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-video w-full">
                        <iframe
                          src={`${asset.url}?autoplay=1&rel=0`}
                          allow="autoplay; encrypted-media; fullscreen"
                          allowFullScreen
                          className="w-full h-full border-0"
                          title={asset.title}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3.5 border-t border-[#f0ede4] flex items-center gap-2">
                {isPdf ? (
                  <>
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#0B1422] hover:bg-[#111D2D] text-[#D9B36C] text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors border border-[#26384D] shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open PDF</span>
                    </a>
                    <a
                      href={asset.url}
                      download="Sea-View-Skydiving-Brochure.pdf"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#FAF9F3] hover:bg-[#eae8de] text-[#0B1422] border border-[#e5e3d9] text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </>
                ) : (
                  <a
                    href={asset.url.replace("/embed/", "/watch?v=")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-[#0B1422] hover:bg-[#111D2D] text-[#D9B36C] text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors border border-[#26384D] shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Watch External Stream</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MediaLibrary;
