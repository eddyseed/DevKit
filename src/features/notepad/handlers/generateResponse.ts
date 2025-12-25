import toast from "react-hot-toast";
import { AIResponseSchema, GenerateParams } from "../interfaces/response.interface";
import { useFileStore } from "../lib/fileStore";

export async function handleGenerate(params: GenerateParams) {
    const { editorElement, fileText, setFileText } = useFileStore.getState();
    if (!editorElement) {
        toast.error("Editor not ready yet!");
        return;
    }

    const start = editorElement.selectionStart ?? 0;
    const end = editorElement.selectionEnd ?? 0;

    const selectedText = fileText.slice(start, end);

    if (!params.prompt) {
        params.prompt = selectedText;
    }

    const finalPrompt = `Please generate a response in ${params.language} with a ${params.tone} tone and ${params.creativity} creativity level. The response should be between ${params.minWords} and ${params.maxWords} words. Here is the prompt: ${params.prompt}.`
    console.log("Final Prompt:", finalPrompt);
    console.log("Using Model:", params.model);
    const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt, model: params.model }),
    });

    if (!response.ok) throw new Error("AI request failed");

    const data = await response.json();
    const parsed = AIResponseSchema.safeParse(data);
    if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error("Invalid AI response format");
    }

    const aiContent = parsed.data.response;
    const newText = fileText.slice(0, end) + "\n" + aiContent + fileText.slice(end);
    setFileText(newText);
}
