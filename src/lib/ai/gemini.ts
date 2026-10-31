import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPromptWithContext } from "./prompts";
import { ChatMessage } from "../validation/chat-schema";
import { generateGroqChatResponse } from "./groq";

export interface GenerateChatResponseParams {
  messages: ChatMessage[];
  retrievedContext: string;
}

export interface GenerateChatResponseResult {
  text: string;
  rawOutput: string;
  modelUsed: string;
  promptSent: string;
}

/**
 * Executes a server-side multi-turn conversation.
 * Prioritizes Groq for near-instant inference (<1s), with Gemini as backup.
 */
export async function generateChatResponse({
  messages,
  retrievedContext,
}: GenerateChatResponseParams): Promise<GenerateChatResponseResult> {
  // 1. Prefer Groq if key is present in environment
  const groqApiKey = process.env.GROQ_API_KEY;
  if (groqApiKey) {
    try {
      return await generateGroqChatResponse({ messages, retrievedContext });
    } catch (groqError) {
      console.warn("Groq failed, falling back to Gemini:", groqError);
    }
  }

  // 2. Gemini fallback
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Neither GROQ_API_KEY nor GEMINI_API_KEY is configured on the server.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const configuredModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const systemInstruction = buildPromptWithContext(retrievedContext);

  // Extract the latest user query
  const lastUserMessage = messages[messages.length - 1]?.content || "";

  // Gemini multi-turn conversation constraints:
  // 1. History must start with a 'user' message
  // 2. Roles must strictly alternate 'user' -> 'model'
  // 3. History must end with 'model' before chat.sendMessage(lastUserMessage)
  const priorMessages = messages.slice(0, -1);
  const firstUserIdx = priorMessages.findIndex((m) => m.role === "user");

  const history: { role: "user" | "model"; parts: { text: string }[] }[] = [];

  if (firstUserIdx !== -1) {
    let expectedRole: "user" | "model" = "user";
    for (let i = firstUserIdx; i < priorMessages.length; i++) {
      const m = priorMessages[i];
      const role: "user" | "model" = m.role === "user" ? "user" : "model";
      if (role === expectedRole && m.content && m.content.trim()) {
        history.push({
          role,
          parts: [{ text: m.content.trim() }],
        });
        expectedRole = expectedRole === "user" ? "model" : "user";
      }
    }
    // If history ends with 'user', remove it so sendMessage() pairs properly
    if (history.length > 0 && history[history.length - 1].role === "user") {
      history.pop();
    }
  }

  // Model fallback candidate list:
  // Prefer configured model -> gemini-2.5-flash -> gemini-flash-latest -> gemini-3.8-flash
  const candidateModels = Array.from(
    new Set([
      configuredModel,
      "gemini-2.5-flash",
      "gemini-flash-latest",
      "gemini-3.8-flash",
    ])
  );

  let lastError: unknown = null;

  for (const modelCandidate of candidateModels) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelCandidate,
        systemInstruction,
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 800,
        },
      });

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(lastUserMessage);
      const rawOutput = result.response.text();

      return {
        text: rawOutput,
        rawOutput,
        modelUsed: modelCandidate,
        promptSent: systemInstruction,
      };
    } catch (err: unknown) {
      lastError = err;
      const errorMsg = err instanceof Error ? err.message : String(err);
      // If model not found (404), unsupported, high-demand 503, or rate-limited 429, try next candidate
      if (
        errorMsg.includes("not found") ||
        errorMsg.includes("404") ||
        errorMsg.includes("is not supported") ||
        errorMsg.includes("503") ||
        errorMsg.includes("high demand") ||
        errorMsg.includes("429") ||
        errorMsg.includes("Too Many Requests")
      ) {
        if (errorMsg.includes("503") || errorMsg.includes("high demand")) {
          await new Promise((r) => setTimeout(r, 500));
        }
        continue;
      }
      // For auth or configuration errors, rethrow immediately
      throw err;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to generate response with available Gemini models.");
}
