import useFileStore from "@/lib/fileStore";

export const handleSearchSelection = async (): Promise<void> => {
    const { editorElement, fileText } = useFileStore.getState();

    let query = "";

    // 1) try selected text from editor (best)
    if (editorElement) {
        const start = editorElement.selectionStart ?? 0;
        const end = editorElement.selectionEnd ?? 0;
        query = fileText.slice(start, end).trim();
    }

    // 2) fallback: try clipboard
    if (!query) {
        try {
            if (navigator.clipboard && navigator.clipboard.readText) {
                const clip = await navigator.clipboard.readText();
                if (clip) query = clip.trim();
            }
        } catch (err) {
            // ignore clipboard errors, we'll ask user next
            console.warn("Could not read clipboard:", err);
        }
    }

    // 3) final fallback: prompt the user
    if (!query) {
        query = prompt("Enter search query:")?.trim() ?? "";
    }

    if (!query) {
        // user cancelled or nothing to search
        return;
    }

    // Build search URL (Google). You can switch to any search engine.
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    // Open in new tab (cannot guarantee exact tab ordering — browser decides)
    window.open(searchUrl, "_blank", "noopener,noreferrer");
};