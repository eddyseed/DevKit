import useFileStore from "@/features/notepad/lib/fileStore";

export const handleCut = async (): Promise<void> => {
    const { editorElement, fileText, setFileText } = useFileStore.getState();

    if (!editorElement) {
        console.warn("⚠️ handleCut: no editor element available");
        return;
    }

    editorElement.focus();

    const start = editorElement.selectionStart ?? 0;
    const end = editorElement.selectionEnd ?? 0;

    if (start === end) {
        return;
    }

    const selectedText = fileText.slice(start, end);

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(selectedText);
        } else {
            editorElement.selectionStart = start;
            editorElement.selectionEnd = end;
            document.execCommand("cut");
        }
    } catch (err) {
        console.warn("Clipboard write failed, attempting execCommand fallback", err);
        try {
            editorElement.selectionStart = start;
            editorElement.selectionEnd = end;
            document.execCommand("cut");
        } catch (e) {
            console.error("Both clipboard.writeText and execCommand cut failed", e);
            return;
        }
    }

    // Remove the selection from the text and update store
    const newValue = fileText.slice(0, start) + fileText.slice(end);
    setFileText(newValue);

    // Restore caret to where selection started
    requestAnimationFrame(() => {
        editorElement.focus();
        editorElement.selectionStart = editorElement.selectionEnd = start;
    });

    console.log("handleCut: cut to clipboard");
};