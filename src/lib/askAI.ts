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
    else if (model.includes("huggingface") || model.includes("flan")) {
        const hfResponse = await fetch(
            `https://api-inference.huggingface.co/v1/chat/completions`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: prompt,
                }),
            }
        );

        if (!hfResponse.ok) {
            throw new Error(`HuggingFace API error: ${hfResponse.status}`);
        }

        const data = await hfResponse.json();
        return data[0]?.generated_text ?? "";
    }

    throw new Error(`Unsupported model: ${model}`);
}