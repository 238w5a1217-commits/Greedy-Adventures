"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Film,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Bot,
  AlertOctagon,
} from "lucide-react";
import type { VerificationCheckItem } from "@/app/api/knowledge-test/route";

interface InspectionResult {
  originalQuestion: string;
  isAiGenerated?: boolean;
  aiResponse?: string | null;
  fallbackMessage?: string | null;
  message?: string | null;
  modelOutput?: string | null;
  rawModelOutput?: string;
  promptSentToGemini: string;
  selectedMedia: Array<{
    id?: string;
    type: "pdf" | "video";
    title: string;
    description?: string;
    url: string;
    thumbnailUrl?: string;
    isDemo?: boolean;
    fileSize?: string;
  }>;
  responseType: string;
  retrievedSources: Array<{
    id: string;
    title: string;
    url: string;
    section?: string;
    content: string;
    textPassage: string;
  }>;
  modelStatus: string;
  modelUsed?: string;
  error?: string | null;
  checks?: VerificationCheckItem[];
  overallStatus?: "success" | "warning" | "error";
  overallMessage?: string;
}

const SUGGESTED_TEST_QUERIES = [
  "What packages do you offer?",
  "What is included in the ECO package?",
  "Can I get a brochure?",
  "Can I see a video?",
  "Send me the brochure and a video.",
];

export function RetrievalInspector() {
  const [query, setQuery] = useState("Send me the brochure and a video.");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InspectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPromptContext, setShowPromptContext] = useState(false);
  const [expandedPassages, setExpandedPassages] = useState<Record<number, boolean>>({});

  const handleRunVerification = async (testQuery: string) => {
    if (!testQuery.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/knowledge-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: testQuery, question: testQuery }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data: InspectionResult = await res.json();
      setResult(data);
    } catch (err: unknown) {
      console.error("Inspector error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to run concierge verification check."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePassage = (idx: number) => {
    setExpandedPassages((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const renderStatusBadge = (status: "success" | "warning" | "error" | "neutral") => {
    if (status === "success") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00CBA0]/15 text-[#008f70] border border-[#00CBA0]/30">
          <CheckCircle2 className="w-3 h-3 text-[#00CBA0]" />
          <span>PASSED</span>
        </span>
      );
    }
    if (status === "warning") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          <span>WARNING</span>
        </span>
      );
    }
    if (status === "error") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-300">
          <XCircle className="w-3 h-3 text-rose-600" />
          <span>FAILED</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-300">
        <span>PENDING</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="pb-3 border-b border-[#e5e3d9]">
        <h2 className="text-[15px] font-bold uppercase tracking-wider text-[#0B1422] flex items-center gap-2">
          <Search className="w-4 h-4 text-[#D9B36C]" />
          Concierge Response Tester
        </h2>
        <p className="text-[12px] text-[#78899E] mt-0.5">
          Test how the AI retrieves knowledge, generates answers, and selects media.
        </p>
      </div>

      {/* Query Composer Box */}
      <div className="p-5 rounded-2xl bg-white border border-[#e5e3d9] shadow-sm space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunVerification(query);
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type any customer query to evaluate (e.g. Send me the brochure and a video)..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF9F3] border border-[#e5e3d9] text-[12.5px] text-[#202B33] placeholder:text-[#78899E] focus:outline-none focus:border-[#0B1422] focus:bg-white transition-all"
          />

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-5 py-2.5 rounded-xl bg-[#0B1422] hover:bg-[#111D2D] text-[#D9B36C] text-[12px] font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all disabled:opacity-50 border border-[#26384D] shadow-sm shrink-0"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{loading ? "Verifying..." : "Run Verification"}</span>
          </button>
        </form>

        {/* Suggested Test Question Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-[#78899E] mr-1">Suggested prompts:</span>
          {SUGGESTED_TEST_QUERIES.map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setQuery(sq);
                handleRunVerification(sq);
              }}
              disabled={loading}
              className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#FAF9F3] hover:bg-[#111D2D] hover:text-[#D9B36C] text-[#202B33] border border-[#e5e3d9] transition-all disabled:opacity-50"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Network or Execution Error */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[12px] flex items-center gap-2.5 shadow-xs">
          <XCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>Error during evaluation: {error}</span>
        </div>
      )}

      {/* Empty State before testing */}
      {!result && !loading && !error && (
        <div className="p-12 text-center rounded-2xl bg-white border border-[#e5e3d9] shadow-xs space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF9F3] border border-[#e5e3d9] flex items-center justify-center mx-auto text-[#78899E]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-[14px] font-bold text-[#0B1422]">Ready to Verify</h3>
          <p className="text-[12px] text-[#78899E] max-w-[360px] mx-auto">
            Click &quot;Run Verification&quot; above or pick a suggested test query to run the full 6-point verification suite.
          </p>
        </div>
      )}

      {/* Detailed Verification Results */}
      {result && (
        <div className="space-y-6 animate-fade-in-up">
          {/* 1. Verification Summary: 6 Indicators + Overall Status */}
          <div className="p-5 rounded-2xl bg-white border border-[#e5e3d9] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0ede4]">
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#0B1422] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D9B36C]" />
                  Verification Summary & Diagnostics
                </h3>
                <p className="text-[11.5px] text-[#78899E] mt-0.5">
                  Evaluation for query: &quot;{result.originalQuestion}&quot;
                </p>
              </div>
            </div>

            {/* 6 Diagnostic Status Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(result.checks || []).map((chk) => (
                <div
                  key={chk.id}
                  className="p-3.5 rounded-xl bg-[#FAF9F3] border border-[#e5e3d9] flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#0B1422] uppercase tracking-wider">
                      {chk.name}
                    </span>
                    {renderStatusBadge(chk.status)}
                  </div>
                  <div>
                    <span className="text-[12px] font-bold text-[#202B33] block">
                      {chk.label}
                    </span>
                    <p className="text-[10.5px] text-[#78899E] line-clamp-2 mt-0.5 leading-tight">
                      {chk.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Generated Concierge Answer Panel */}
          <div className="p-5 rounded-2xl bg-white border border-[#e5e3d9] shadow-sm space-y-2.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#D9B36C]" />
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#0B1422]">
                  1. Concierge Answer Output
                </span>
              </div>

              {result.isAiGenerated ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00CBA0]/15 text-[#008f70] border border-[#00CBA0]/30">
                  <CheckCircle2 className="w-3 h-3 text-[#00CBA0]" />
                  <span>Real AI Generated ({result.modelUsed})</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                  <AlertOctagon className="w-3 h-3 text-amber-600" />
                  <span>System Fallback Notice (Non-AI)</span>
                </span>
              )}
            </div>

            {/* If AI Generation Succeeded */}
            {result.isAiGenerated && result.aiResponse && (
              <div className="p-4 rounded-xl bg-[#FAF9F3] border border-[#e5e3d9] text-[12.5px] text-[#202B33] leading-relaxed whitespace-pre-wrap font-sans">
                {result.aiResponse}
              </div>
            )}

            {/* If AI Generation Failed, do NOT present fallback text as AI response */}
            {!result.isAiGenerated && (
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Gemini AI Model Did Not Return a Response</span>
                    <span className="text-[11px] text-rose-700 block mt-0.5">
                      Error details: {result.error || "Model unavailable"}
                    </span>
                  </div>
                </div>

                {result.fallbackMessage && (
                  <div className="p-3.5 rounded-xl bg-[#FAF9F3] border border-amber-200 text-[#202B33] text-xs space-y-1">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-amber-800 block">
                      Static System Fallback Message (Non-AI):
                    </span>
                    <p className="italic text-[#78899E]">
                      &quot;{result.fallbackMessage}&quot;
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Selected Attachments Cards */}
          {result.selectedMedia && result.selectedMedia.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-[#e5e3d9] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#0B1422]">
                  2. Selected Attachments ({result.selectedMedia.length})
                </span>
                <span className="text-[10.5px] text-[#008f70] font-bold">
                  Verified In Library
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.selectedMedia.map((m, i) => {
                  const isPdf = m.type === "pdf";
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#FAF9F3] border border-[#e5e3d9] flex flex-col justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#111D2D] text-[#D9B36C] flex items-center justify-center shrink-0">
                            {isPdf ? <FileText className="w-4 h-4" /> : <Film className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="font-bold text-[#0B1422] block text-[13px]">
                              {m.title}
                            </span>
                            <span className="text-[10px] font-mono text-[#78899E] uppercase">
                              {m.type} · {m.url}
                            </span>
                          </div>
                        </div>

                        {m.isDemo && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold uppercase shrink-0">
                            Demo
                          </span>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#e5e3d9] flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#008f70]">
                          Status: Active
                        </span>

                        <div className="flex items-center gap-2">
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B1422] hover:text-[#D9B36C]"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Retrieved Knowledge Passages */}
          <div className="p-5 rounded-2xl bg-white border border-[#e5e3d9] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#0B1422]">
                3. Retrieved Knowledge Passages ({result.retrievedSources?.length || 0})
              </span>
              <span className="text-[10.5px] text-[#78899E]">
                Ground-truth website sources
              </span>
            </div>

            <div className="space-y-2.5">
              {result.retrievedSources?.map((src, i) => {
                const isExpanded = !!expandedPassages[i];
                const contentText = src.content || src.textPassage || "";

                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#FAF9F3] border border-[#e5e3d9] text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#0B1422] text-[12.5px]">{src.title}</span>
                      <span className="text-[10px] text-[#D9B36C] font-extrabold uppercase px-2 py-0.5 rounded bg-[#111D2D]">
                        {src.section || "GROUNDING"}
                      </span>
                    </div>

                    <p className="text-[11.5px] text-[#202B33] leading-relaxed whitespace-pre-wrap">
                      {isExpanded
                        ? contentText
                        : contentText.length > 200
                        ? `${contentText.substring(0, 200)}...`
                        : contentText}
                    </p>

                    {contentText.length > 200 && (
                      <button
                        type="button"
                        onClick={() => togglePassage(i)}
                        className="text-[11px] font-bold text-[#008f70] hover:text-[#0B1422] inline-flex items-center gap-1"
                      >
                        <span>{isExpanded ? "Collapse Passage" : "Expand Full Passage"}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Prompt Context Passed to Gemini (Collapsed by default) */}
          <div className="p-5 rounded-2xl bg-white border border-[#e5e3d9] shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#0B1422]">
                4. Context Sent to Gemini
              </span>
              <button
                type="button"
                onClick={() => setShowPromptContext(!showPromptContext)}
                className="text-[11px] font-bold text-[#008f70] hover:text-[#0B1422] inline-flex items-center gap-1"
              >
                <span>{showPromptContext ? "Hide Context" : "View Context"}</span>
                {showPromptContext ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {showPromptContext && (
              <pre className="p-4 rounded-xl bg-[#111D2D] text-[#A7B4C5] border border-[#26384D] text-[11px] font-mono whitespace-pre-wrap max-h-64 overflow-y-auto mt-2">
                {result.promptSentToGemini}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RetrievalInspector;
