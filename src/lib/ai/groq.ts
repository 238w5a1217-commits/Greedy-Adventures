import { buildPromptWithContext } from "./prompts";
import { ChatMessage } from "../validation/chat-schema";

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
 * Executes an ultra-fast server-side multi-turn conversation with the Groq API.
 * Uses GROQ_MODEL (defaulting to openai/gpt-oss-120b) with instant fallback to qwen/qwen3.8-27b.
 */
export async function generateGroqChatResponse({
  messages,
  retrievedContext,
}: GenerateChatResponseParams): Promise<GenerateChatResponseResult> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not configured on the server. Please add it to .env.local."
    );
  }

  const configuredModel = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
  const systemInstruction = buildPromptWithContext(retrievedContext);

  // Build OpenAI-compatible chat messages
  const apiMessages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }> = [{ role: "system", content: systemInstruction }];

  for (const m of messages) {
    if (m.content && m.content.trim()) {
      apiMessages.push({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content.trim(),
      });
    }
  }

  // Model fallback candidates on Groq
  const candidateModels = Array.from(
    new Set([
      configuredModel,
      "openai/gpt-oss-120b",
      "qwen/qwen3.8-27b",
      "openai/gpt-oss-20b",
    ])
  );

  let lastError: unknown = null;

  for (const modelCandidate of candidateModels) {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: modelCandidate,
            messages: apiMessages,
            temperature: 0.5,
            max_tokens: 800,
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Groq HTTP ${response.status}: ${errorBody}`);
      }

      const data = await response.json();
      const rawOutput =
        data.choices?.[0]?.message?.content ||
        "I am ready to assist with your skydiving experience.";

      return {
        text: rawOutput,
        rawOutput,
        modelUsed: `Groq (${modelCandidate})`,
        promptSent: systemInstruction,
      };
    } catch (err: unknown) {
      lastError = err;
      console.warn(`Groq model ${modelCandidate} failed:`, err);
      // Try next model candidate on Groq
      continue;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to generate response with available Groq models.");
}

