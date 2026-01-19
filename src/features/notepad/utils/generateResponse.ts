import { AIResponseSchema } from "../interfaces/response.interface";

export async function generateAIResponse(prompt: string, model: string) {
    const finalPrompt = prompt.trim();
    console.log("Final Prompt:", finalPrompt);
    console.log("Using Model:", model);
    const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt, model: model }),
    });

    if (!response.ok) throw new Error("AI request failed");

    const data = await response.json();
    const parsed = AIResponseSchema.safeParse(data);
    if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error("Invalid AI response format");
    }
    console.log("B", parsed.data.response)
    return parsed.data.response;
}
