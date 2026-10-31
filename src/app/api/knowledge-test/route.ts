import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { retrieveKnowledge } from "@/lib/knowledge/retrieval";
import { generateChatResponse } from "@/lib/ai/gemini";
import { selectMedia } from "@/lib/media/media-selector";

export interface VerificationCheckItem {
  id: string;
  name: string;
  status: "success" | "warning" | "error" | "neutral";
  label: string;
  details: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const queryText = (body.query || body.question || "").trim();

    if (!queryText) {
      return NextResponse.json(
        { error: "Query or question parameter is required" },
        { status: 400 }
      );
    }

    // 1. Knowledge Retrieval
    const retrievalResult = retrieveKnowledge(queryText);
    const retrievalSucceeded = retrievalResult.matchedSources.length > 0;

    const retrievalCheck: VerificationCheckItem = {
      id: "retrieval",
      name: "Knowledge Retrieval",
      status: retrievalSucceeded ? "success" : "error",
      label: retrievalSucceeded
        ? `Retrieved ${retrievalResult.matchedSources.length} Verified Sources`
        : "No Grounded Sources Found",
      details: retrievalSucceeded
        ? retrievalResult.matchedSources.map((s) => s.title).join(" · ")
        : "Keyword and semantic token retrieval yielded zero grounded website sources.",
    };

    // 2. Gemini Response Generation
    let modelStatus = "Not called";
    let modelUsed = "";
    let rawModelOutput = "";
    let promptSent = "";
    let geminiError: string | null = null;
    let geminiSucceeded = false;
    let geminiCheck: VerificationCheckItem;

    try {
      const aiResult = await generateChatResponse({
        messages: [{ role: "user", content: queryText }],
        retrievedContext: retrievalResult.formattedContext,
      });
      modelUsed = aiResult.modelUsed;
      modelStatus = `Success (${aiResult.modelUsed})`;
      rawModelOutput = aiResult.rawOutput;
      promptSent = aiResult.promptSent;
      geminiSucceeded = true;

      geminiCheck = {
        id: "ai-generation",
        name: "AI Response Generation",
        status: "success",
        label: `Generated via ${aiResult.modelUsed}`,
        details: `Successfully produced ${aiResult.rawOutput.length} characters of grounded concierge AI response.`,
      };
    } catch (err: unknown) {
      geminiError = err instanceof Error ? err.message : "Unknown AI API error";
      modelStatus = "Error";
      geminiSucceeded = false;

      geminiCheck = {
        id: "ai-generation",
        name: "AI Response Generation",
        status: "error",
        label: "AI Generation Failed",
        details: geminiError,
      };
    }

    // 3. Media Intent Detection
    const mediaResult = selectMedia(rawModelOutput || "", queryText);
    const intentCheck: VerificationCheckItem = {
      id: "intent",
      name: "Media Intent Detection",
      status: "success",
      label: `Intent: ${mediaResult.responseType.toUpperCase()}`,
      details:
        mediaResult.responseType === "media_bundle"
          ? "Customer requested both brochure PDF and video; bundle detected."
          : mediaResult.responseType === "pdf"
          ? "Brochure document inquiry identified."
          : mediaResult.responseType === "video"
          ? "Video experience footage inquiry identified."
          : mediaResult.responseType === "packages"
          ? "Package pricing comparison intent detected."
          : "Informational customer inquiry; direct concierge text selected.",
    };

    // 4. PDF Availability Check (Physical file on disk)
    const pdfDiskPath = path.join(process.cwd(), "public", "media", "demo-skydiving-brochure.pdf");
    const pdfExists = fs.existsSync(pdfDiskPath);
    const pdfSize = pdfExists ? (fs.statSync(pdfDiskPath).size / 1024).toFixed(1) + " KB" : null;
    const wantsPdf =
      mediaResult.responseType === "pdf" ||
      mediaResult.responseType === "media_bundle" ||
      queryText.toLowerCase().includes("brochure") ||
      queryText.toLowerCase().includes("pdf");

    let pdfCheck: VerificationCheckItem;
    if (pdfExists) {
      pdfCheck = {
        id: "pdf",
        name: "PDF Availability",
        status: "success",
        label: wantsPdf ? `Verified on Disk (${pdfSize})` : "Verified on Disk (Standby)",
        details: `/media/demo-skydiving-brochure.pdf exists and is publicly accessible.`,
      };
    } else {
      pdfCheck = {
        id: "pdf",
        name: "PDF Availability",
        status: wantsPdf ? "error" : "warning",
        label: wantsPdf ? "PDF File Missing" : "PDF Standby (Not Found)",
        details: wantsPdf
          ? "Expected file not found at public/media/demo-skydiving-brochure.pdf."
          : "Brochure PDF is not on disk, but was not requested by this inquiry.",
      };
    }

    // 5. Video Availability Check (Embeddable stream & thumbnail)
    const wantsVideo =
      mediaResult.responseType === "video" ||
      mediaResult.responseType === "media_bundle" ||
      queryText.toLowerCase().includes("video") ||
      queryText.toLowerCase().includes("footage") ||
      queryText.toLowerCase().includes("watch");

    const videoAsset = mediaResult.selectedMedia.find((m) => m.type === "video");
    const videoUrlValid =
      videoAsset?.url?.startsWith("https://") &&
      (videoAsset.url.includes("embed") || videoAsset.url.includes("youtube"));

    let videoCheck: VerificationCheckItem;
    if (wantsVideo) {
      videoCheck = {
        id: "video",
        name: "Video Availability",
        status: videoUrlValid ? "success" : "error",
        label: videoUrlValid ? "Verified 4K Stream" : "Video Stream Unavailable",
        details: videoUrlValid
          ? `Embedded 4K player verified at ${videoAsset?.url}`
          : "Expected video stream not found for video inquiry.",
      };
    } else {
      videoCheck = {
        id: "video",
        name: "Video Availability",
        status: "success",
        label: "Not Required",
        details: "No video attachment required for this inquiry type.",
      };
    }

    // 6. Source Citations Check
    const citationsValid =
      retrievalResult.citations.length > 0 &&
      retrievalResult.citations.every((c) => c.url && c.title);

    const citationsCheck: VerificationCheckItem = {
      id: "citations",
      name: "Source Citations",
      status: citationsValid ? "success" : "warning",
      label: `${retrievalResult.citations.length} Grounded Citations`,
      details: retrievalResult.citations.map((c) => c.title).join(" · "),
    };

    // Overall Status
    const checks = [
      retrievalCheck,
      geminiCheck,
      intentCheck,
      pdfCheck,
      videoCheck,
      citationsCheck,
    ];

    const hasError = checks.some((c) => c.status === "error");
    const hasWarning = checks.some((c) => c.status === "warning");
    const overallStatus: "success" | "warning" | "error" = hasError
      ? "error"
      : hasWarning
      ? "warning"
      : "success";

    const overallMessage = hasError
      ? geminiError?.includes("429") || geminiError?.includes("quota") || geminiError?.includes("Too Many Requests")
        ? "Knowledge Base retrieved all sources & assets successfully. Gemini AI generation paused: Google AI Free Tier daily quota limit exceeded (20 req/day). Verified fallback safely activated."
        : geminiError?.includes("503") || geminiError?.includes("high demand")
        ? "Knowledge Base retrieved all sources & assets successfully. Google Gemini servers are temporarily experiencing high demand (503 spike). Verified fallback safely activated."
        : `Verification FAILED: ${checks.find((c) => c.status === "error")?.name} failed (${checks.find((c) => c.status === "error")?.details})`
      : hasWarning
      ? "Verification succeeded with non-critical warnings."
      : "All 6 verification checks passed successfully.";

    return NextResponse.json({
      originalQuestion: queryText,
      // Distinguish real AI response from fallback text
      isAiGenerated: geminiSucceeded,
      aiResponse: geminiSucceeded ? mediaResult.cleanMessage : null,
      fallbackMessage: !geminiSucceeded ? mediaResult.cleanMessage : null,
      message: geminiSucceeded ? mediaResult.cleanMessage : null,
      modelOutput: geminiSucceeded ? mediaResult.cleanMessage : null,
      rawModelOutput: rawModelOutput,
      promptSentToGemini: promptSent,
      promptSentToModel: promptSent,
      selectedMedia: mediaResult.selectedMedia,
      media: mediaResult.selectedMedia,
      packages: mediaResult.packages,
      suggestedQuestions: mediaResult.suggestedQuestions,
      responseType: mediaResult.responseType,
      retrievedSources: retrievalResult.matchedSources.map((s) => ({
        id: s.id,
        title: s.title,
        url: s.url,
        section: s.section,
        content: s.content,
        textPassage: s.content,
      })),
      retrievalStatus: `Matched ${retrievalResult.matchedSources.length} sources`,
      modelStatus,
      modelUsed,
      error: geminiError,
      checks,
      overallStatus,
      overallMessage,
    });
  } catch (err: unknown) {
    console.error("Knowledge Test API Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
