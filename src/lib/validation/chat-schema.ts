import { z } from "zod";

export const ChatMessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1, "Message content cannot be empty"),
  createdAt: z.string().optional(),
});

export const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1, "At least one message is required"),
  testQuestion: z.string().optional(),
});

export const SourceCitationSchema = z.object({
  title: z.string(),
  url: z.string(),
  snippet: z.string().optional(),
});

export const MediaAssetSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["pdf", "video"]),
  title: z.string(),
  description: z.string().optional(),
  url: z.string(),
  thumbnailUrl: z.string().optional(),
  isDemo: z.boolean().default(true),
  fileSize: z.string().optional(),
});

export const PackageItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  currency: z.string().default("THB"),
  tag: z.string().optional(),
  inclusions: z.array(z.string()),
  photoVideoNote: z.string(),
  ctaText: z.string().optional(),
});

export const ChatResponseSchema = z.object({
  message: z.string(),
  responseType: z.enum(["text", "pdf", "video", "media_bundle", "packages"]),
  packages: z.array(PackageItemSchema).optional(),
  suggestedQuestions: z.array(z.string()).optional(),
  sources: z.array(SourceCitationSchema),
  media: z.array(MediaAssetSchema),
  debugContext: z
    .object({
      question: z.string(),
      retrievedSources: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          url: z.string(),
          textPassage: z.string(),
        })
      ),
      promptSentToModel: z.string(),
      selectedMedia: z.array(z.any()),
      responseType: z.string(),
      retrievalStatus: z.string(),
      modelStatus: z.string(),
      rawModelOutput: z.string().optional(),
    })
    .nullable()
    .optional(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type SourceCitation = z.infer<typeof SourceCitationSchema>;
export type MediaAsset = z.infer<typeof MediaAssetSchema>;
export type PackageItem = z.infer<typeof PackageItemSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
