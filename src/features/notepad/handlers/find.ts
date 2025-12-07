import useFileStore from "@/features/notepad/lib/fileStore";

export const handleFind = (): void => {
    const { editorElement, fileText } = useFileStore.getState();

    if (!editorElement) {
        console.warn("⚠️ No editor element found");
        return;
    }

    // Ask query from user
    const query = prompt("Find:")?.trim();
    if (!query) return;

    editorElement.focus();

    // Current cursor position
    const cursorPos = editorElement.selectionEnd ?? 0;

    // 1️⃣ Try to find AFTER cursor
    let index = fileText.indexOf(query, cursorPos);

    // 2️⃣ If not found, wrap and search from start
    if (index === -1) {
        index = fileText.indexOf(query, 0);
    }

    if (index === -1) {
        alert("No matches found.");
        return;
    }

    const endIndex = index + query.length;

    // Highlight the found text
    editorElement.selectionStart = index;
    editorElement.selectionEnd = endIndex;

    // Optional: scroll into view smoothly
    editorElement.scrollTop = editorElement.scrollHeight * (index / fileText.length);
};
