import { useFileStore } from "../lib/fileStore";

export const handlePaste = async (): Promise<void> => {
    const { editorElement, fileText, setFileText } = useFileStore.getState();

    if (!editorElement) {
        console.warn("⚠️ No editor element found");
        return;
    }

    // Re-focus editor so caret is active
    editorElement.focus();

    if (!navigator.clipboard || !navigator.clipboard.readText) {
        alert("Clipboard API not supported. Use Ctrl + V instead.");
        return;
    }

    try {
        const clipboardText = await navigator.clipboard.readText();

        const start = editorElement.selectionStart ?? fileText.length;
        const end = editorElement.selectionEnd ?? fileText.length;

        const before = fileText.slice(0, start);
        const after = fileText.slice(end);
        const newValue = before + clipboardText + after;

        // Update store
        setFileText(newValue);

        // Restore caret after paste
        requestAnimationFrame(() => {
            const caretPos = start + clipboardText.length;
            editorElement.selectionStart = caretPos;
            editorElement.selectionEnd = caretPos;
        });
    } catch (err) {
        console.error("❌ Failed to read clipboard:", err);
        alert("Unable to access clipboard. Please allow clipboard permissions or use Ctrl + V.");
    }
};
