import useFileStore from "@/lib/fileStore";

export const saveCursor = () => {
    const { editorElement, setCursorPos } = useFileStore.getState();
    if (!editorElement) return;

    setCursorPos({
        start: editorElement.selectionStart,
        end: editorElement.selectionEnd,
    });
};