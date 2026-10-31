import { NextRequest, NextResponse } from "next/server";
import { ChatRequestSchema, ChatResponse } from "@/lib/validation/chat-schema";
import { retrieveKnowledge } from "@/lib/knowledge/retrieval";
import { generateChatResponse } from "@/lib/ai/gemini";
import { selectMedia } from "@/lib/media/media-selector";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    // Validate request structure with Zod
    const validationResult = ChatRequestSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { messages, testQuestion } = validationResult.data;
    const latestUserMessage = messages[messages.length - 1]?.content || "";

    // 1. Retrieve relevant website knowledge
    const priorUserQueries = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content);

    const retrievalResult = retrieveKnowledge(latestUserMessage, priorUserQueries);

    // 2. Call real Gemini AI backend
    const aiResult = await generateChatResponse({
      messages,
      retrievedContext: retrievalResult.formattedContext,
    });

    // 3. Intent-based media selection (PDF / Video / Media Bundle / Text)
    const mediaResult = selectMedia(aiResult.rawOutput, latestUserMessage);

    // 4. Construct validated structured response
    const responsePayload: ChatResponse = {
      message: mediaResult.cleanMessage,
      responseType: mediaResult.responseType,
      packages: mediaResult.packages,
      suggestedQuestions: mediaResult.suggestedQuestions,
      sources: retrievalResult.citations,
      media: mediaResult.selectedMedia,
      debugContext: testQuestion
        ? {
            question: testQuestion,
            retrievedSources: retrievalResult.matchedSources.map((s) => ({
              id: s.id,
              title: s.title,
              url: s.url,
              textPassage: s.content.substring(0, 300) + "...",
            })),
            promptSentToModel: aiResult.promptSent,
            selectedMedia: mediaResult.selectedMedia,
            responseType: mediaResult.responseType,
            retrievalStatus: `Successfully retrieved ${retrievalResult.matchedSources.length} sources`,
            modelStatus: `Generated using ${aiResult.modelUsed}`,
            rawModelOutput: aiResult.rawOutput,
          }
        : null,
    };

    return NextResponse.json(responsePayload);
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "An unexpected server error occurred";

    return NextResponse.json(
      {
        error: message,
        message: "I encountered a connection error. Please try again or reach our WhatsApp concierge directly at +66800948586.",
        responseType: "text",
        sources: [],
        media: [],
      },
      { status: 500 }
    );
  }
}
