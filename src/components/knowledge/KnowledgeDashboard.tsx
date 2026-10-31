"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Database, FileText, Search, ArrowLeft, ShieldCheck, Clock, Compass } from "lucide-react";
import { SourceList } from "./SourceList";
import { MediaLibrary } from "./MediaLibrary";
import { RetrievalInspector } from "./RetrievalInspector";

export function KnowledgeDashboard() {
  const [activeTab, setActiveTab] = useState<"sources" | "media" | "inspector">("sources");

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202B33] font-sans antialiased flex flex-col">
      {/* Top Header */}
      <header className="border-b border-[#26384D]/15 bg-[#111D2D] text-[#F5F7FA] sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Brand & Title */}
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="w-9 h-9 rounded-xl bg-[#17263A] hover:bg-[#1f334e] text-[#A7B4C5] hover:text-[#D9B36C] border border-[#26384D] flex items-center justify-center transition-all duration-200 shadow-sm"
              title="Return to Greedy Adventures Website"
              aria-label="Back to chatbot"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D9B36C]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "11px" }}
                >
                  GREEDY ADVENTURES
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17263A] text-[#00CBA0] border border-[#26384D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00CBA0] inline-block mr-1 animate-pulse" />
                  Verified & Grounded
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-white/10 text-[#A7B4C5] border border-white/10">
                  Read Only
                </span>
              </div>

              <h1 className="text-[18px] sm:text-[20px] font-extrabold text-[#F5F7FA] tracking-tight leading-tight mt-0.5">
                Knowledge Base
              </h1>
              <p className="text-[11.5px] sm:text-[12px] text-[#A7B4C5] leading-snug">
                Explore the verified content and media powering the AI Experience Concierge.
              </p>
            </div>
          </div>

          {/* Metadata pill */}
          <div className="hidden md:flex flex-col items-end text-right text-[11px] text-[#A7B4C5]">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#D9B36C]" />
              <span>Last Captured: Jan 15, 2025</span>
            </div>
            <span className="text-[10px] text-[#78899E] mt-0.5">
              Dropzone Thailand · Pattaya Coast
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav
          className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 border-t border-[#26384D]/40 bg-[#0B1422] overflow-x-auto scrollbar-none py-1.5"
          role="tablist"
          aria-label="Knowledge Base Navigation"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "inspector"}
            onClick={() => setActiveTab("inspector")}
            className={`px-4 py-2 rounded-xl text-[11.5px] font-bold tracking-wider uppercase flex items-center gap-2 transition-all whitespace-nowrap focus:outline-none ${
              activeTab === "inspector"
                ? "bg-[#D9B36C] text-[#0B1422] shadow-sm font-extrabold"
                : "text-[#A7B4C5] hover:text-[#F5F7FA] hover:bg-[#17263A]"
            }`}
          >
            <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Concierge Response Tester</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "sources"}
            onClick={() => setActiveTab("sources")}
            className={`px-4 py-2 rounded-xl text-[11.5px] font-bold tracking-wider uppercase flex items-center gap-2 transition-all whitespace-nowrap focus:outline-none ${
              activeTab === "sources"
                ? "bg-[#D9B36C] text-[#0B1422] shadow-sm font-extrabold"
                : "text-[#A7B4C5] hover:text-[#F5F7FA] hover:bg-[#17263A]"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Knowledge Sources (5)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "media"}
            onClick={() => setActiveTab("media")}
            className={`px-4 py-2 rounded-xl text-[11.5px] font-bold tracking-wider uppercase flex items-center gap-2 transition-all whitespace-nowrap focus:outline-none ${
              activeTab === "media"
                ? "bg-[#D9B36C] text-[#0B1422] shadow-sm font-extrabold"
                : "text-[#A7B4C5] hover:text-[#F5F7FA] hover:bg-[#17263A]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Media Library (2)</span>
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {activeTab === "inspector" && <RetrievalInspector />}
        {activeTab === "sources" && <SourceList />}
        {activeTab === "media" && <MediaLibrary />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e3d9] py-4 bg-[#f0eee4] text-center text-[11px] text-[#78899E]">
        Greedy Adventures · AI Experience Concierge Knowledge Verification Engine · Read-Only Evaluator
      </footer>
    </div>
  );
}

export default KnowledgeDashboard;
