import { z } from "zod";
import { AIModel } from "./model.types";
export const GenerateParamsSchema = z.object({
    prompt: z.string().optional(),
    model: z.nativeEnum(AIModel),
    minWords: z.number().min(1).max(1000).default(50),
    maxWords: z.number().min(1).max(2000).default(200),
    tone: z.enum(["formal", "neutral", "informal"]).default("neutral"),
    creativity: z.enum(["low", "medium", "high"]).default("medium"),
    language: z.string().default("english"),
});
export const AIResponseSchema = z.object({
    response: z.string(),
});

export type GenerateParams = z.infer<typeof GenerateParamsSchema>;
export type AIResponse = z.infer<typeof AIResponseSchema>;
