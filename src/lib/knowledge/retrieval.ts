import { websiteSources, KnowledgeSource } from "./sources";
import { SourceCitation } from "../validation/chat-schema";

export interface RetrievalResult {
  matchedSources: KnowledgeSource[];
  citations: SourceCitation[];
  formattedContext: string;
}

/**
 * Lightweight keyword & semantic token retrieval over website sources.
 * Matches keywords and extracts relevant context without vector database overhead.
 */
export function retrieveKnowledge(query: string, conversationHistory: string[] = []): RetrievalResult {
  const combinedText = [query, ...conversationHistory.slice(-2)].join(" ").toLowerCase();
  const scoredSources: { source: KnowledgeSource; score: number }[] = [];

  for (const source of websiteSources) {
    let score = 0;
    const contentLower = source.content.toLowerCase();
    const titleLower = source.title.toLowerCase();

    // Check key adventure & package terms
    if (combinedText.includes("package") || combinedText.includes("tier") || combinedText.includes("cost") || combinedText.includes("price")) {
      if (source.id === "packages") score += 10;
    }
    if (combinedText.includes("eco") && source.content.includes("ECO")) score += 8;
    if (combinedText.includes("deluxe") && source.content.includes("DELUXE")) score += 8;
    if (combinedText.includes("vip") && source.content.includes("VIP")) score += 8;
    if (combinedText.includes("cheapest") || combinedText.includes("lowest")) {
      if (source.id === "packages") score += 10;
    }
    if (combinedText.includes("included") || combinedText.includes("inclusion")) {
      if (source.id === "packages" || source.id === "experience-inclusions") score += 8;
    }
    if (combinedText.includes("altitude") || combinedText.includes("feet") || combinedText.includes("13,000") || combinedText.includes("freefall") || combinedText.includes("canopy") || combinedText.includes("speed")) {
      if (source.id === "business-overview" || source.id === "stats") score += 8;
    }
    if (combinedText.includes("step") || combinedText.includes("journey") || combinedText.includes("briefing") || combinedText.includes("what happens") || combinedText.includes("process")) {
      if (source.id === "journey") score += 8;
    }
    if (combinedText.includes("where") || combinedText.includes("location") || combinedText.includes("address") || combinedText.includes("phone") || combinedText.includes("whatsapp") || combinedText.includes("contact") || combinedText.includes("book")) {
      if (source.id === "location-concierge") score += 8;
    }
    if (combinedText.includes("brochure") || combinedText.includes("pdf")) {
      if (source.id === "packages" || source.id === "location-concierge") score += 6;
    }
    if (combinedText.includes("video") || combinedText.includes("handcam") || combinedText.includes("camera") || combinedText.includes("photo")) {
      if (source.id === "packages") score += 8;
    }

    // Token frequency matching
    const tokens = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
    for (const token of tokens) {
      if (titleLower.includes(token)) score += 3;
      if (contentLower.includes(token)) score += 1;
    }

    if (score > 0) {
      scoredSources.push({ source, score });
    }
  }

  // Sort by score descending
  scoredSources.sort((a, b) => b.score - a.score);

  // If matches found, take top sources; otherwise provide primary overview & packages
  const matchedSources = scoredSources.length > 0
    ? scoredSources.slice(0, 3).map((s) => s.source)
    : [
        websiteSources.find((s) => s.id === "packages")!,
        websiteSources.find((s) => s.id === "business-overview")!,
      ].filter(Boolean);

  // Build citations
  const citations: SourceCitation[] = matchedSources.map((s) => ({
    title: s.title,
    url: s.url,
    snippet: s.content.substring(0, 160) + "...",
  }));

  // Build context string to inject into Gemini prompt
  const formattedContext = matchedSources
    .map((s) => `### Source: ${s.title} (${s.url})\n${s.content}`)
    .join("\n\n");

  return {
    matchedSources,
    citations,
    formattedContext,
  };
}
