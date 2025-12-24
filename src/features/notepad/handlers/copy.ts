import { useFileStore } from "../lib/fileStore";

export const handleCopy = async (): Promise<void> => {
    const { editorElement } = useFileStore.getState();

    if (!editorElement) return;

    editorElement.focus();

    const selected = editorElement.value.substring(
        editorElement.selectionStart,
        editorElement.selectionEnd
    );

    if (!selected) return;

    await navigator.clipboard.writeText(selected);
}