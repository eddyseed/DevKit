import { groq } from "./groq";

export async function askAI(prompt: string, model: string): Promise<string> {
    if (model.startsWith("llama") || model.includes("groq")) {
        // Use Groq
        const completion = await groq.chat.completions.create({
            model: model,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        return completion.choices[0]?.message?.content ?? "";
    }

    throw new Error(`Unsupported model: ${model}`);
}