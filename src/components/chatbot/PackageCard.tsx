"use client";

import React from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { PackageItem } from "@/lib/validation/chat-schema";

interface PackageCardProps {
  pkg: PackageItem;
  onSelectPackage?: (packageName: string) => void;
}

export default function PackageCard({ pkg, onSelectPackage }: PackageCardProps) {
  const isVip = pkg.id === "vip-cinematic" || pkg.name.toLowerCase().includes("vip");
  const isDeluxe = pkg.id === "deluxe-media" || pkg.name.toLowerCase().includes("deluxe");

  // Determine CTA label
  let ctaLabel = pkg.ctaText;
  if (!ctaLabel) {
    if (isVip) ctaLabel = "Inquire About VIP";
    else if (isDeluxe) ctaLabel = "Inquire About DELUXE";
    else ctaLabel = "Inquire About ECO";
  }

  const handleCtaClick = () => {
    if (onSelectPackage) {
      onSelectPackage(`I would like to inquire about the ${pkg.name} package.`);
    }
  };

  return (
    <div
      className={`rounded-2xl p-3.5 sm:p-4 transition-all duration-200 text-left relative overflow-hidden border shadow-xs w-full max-w-full min-w-0 ${
        isVip
          ? "bg-white border-[#B88E3E] shadow-sm ring-1 ring-[#B88E3E]/30"
          : "bg-white border-[#E5E3D9]"
      }`}
    >
      {/* Top Header: Title, Badge, Price */}
      <div className="flex items-start justify-between gap-2.5 min-w-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-[13px] sm:text-[14px] font-extrabold tracking-tight text-[#0B1422] uppercase truncate">
              {pkg.name}
            </h3>
            {pkg.tag && (
              <span className="inline-flex items-center gap-1 text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-[#B88E3E] text-white tracking-wider shrink-0 shadow-xs">
                <Sparkles className="w-2 h-2 fill-current" />
                {pkg.tag}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#64748B] block mt-0.5 truncate">
            13,000 FT Tandem High-Altitude Jump
          </span>
        </div>

        {/* Price Prominently in Champagne Gold */}
        <div className="text-right shrink-0">
          <div className="text-[14px] sm:text-[15.5px] font-black tracking-tight text-[#B88E3E]">
            {pkg.price}
          </div>
          <span className="text-[9px] font-medium text-[#64748B] uppercase tracking-wider block -mt-0.5">
            {pkg.currency} / jumper
          </span>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="my-3 border-t border-[#E5E3D9]" />

      {/* Inclusions List with Teal Check Icons */}
      <ul className="space-y-1.5 text-[11.5px] text-[#1E293B]" role="list">
        {pkg.inclusions.map((inclusion, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <Check
              className="w-3.5 h-3.5 text-[#008F70] shrink-0 mt-0.5 stroke-[2.5]"
              aria-hidden="true"
            />
            <span className="leading-snug text-[#1E293B]">{inclusion}</span>
          </li>
        ))}
      </ul>

      {/* Exclusions or Media Policy Note */}
      {pkg.photoVideoNote && (
        <div className="mt-3 pt-2 border-t border-[#E5E3D9] flex items-center justify-between gap-2">
          <span
            className={`text-[10.5px] leading-tight ${
              pkg.photoVideoNote.includes("NOT")
                ? "text-[#B88E3E] font-medium italic"
                : "text-[#64748B]"
            }`}
          >
            {pkg.photoVideoNote}
          </span>
        </div>
      )}

      {/* Action CTA Button */}
      {onSelectPackage && (
        <div className="mt-3 pt-2">
          <button
            type="button"
            onClick={handleCtaClick}
            className={`w-full py-2 px-3 rounded-xl text-[11.5px] font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#B88E3E] ${
              isVip
                ? "bg-[#B88E3E] text-white hover:bg-[#a67d32] shadow-xs hover:shadow-sm"
                : "bg-[#0B1422] hover:bg-[#1a2d42] text-[#D9B36C] border border-[#0B1422]"
            }`}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

