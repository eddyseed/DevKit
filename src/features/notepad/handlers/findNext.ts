import { useFileStore } from "../lib/fileStore";

export const handleFindNext = (): void => {
    const {
        editorElement,
        fileText,
        cursorPos,
        lastFindQuery,
        setCursorPos,
        setLastFindQuery,
    } = useFileStore.getState();

    // get query: prefer stored lastFindQuery, else prompt
    const query = lastFindQuery ?? prompt("Find:")?.trim() ?? "";
    if (!query) return;

    // save it back (so subsequent Find Next uses it)
    setLastFindQuery(query);

    // if no editor element, try to search but cannot highlight
    if (!editorElement) {
        // fallback: just alert if found or not
        const found = fileText.indexOf(query) !== -1;
        if (found) alert(`Found "${query}" in file (no editor ref to highlight).`);
        else alert("No matches found.");
        return;
    }

    // Ensure editor focused (so selection visible)
    editorElement.focus();

    // Start search position: use current selection end (if selection exists),
    // otherwise use saved cursorPos.end, otherwise 0
    const selEnd = editorElement.selectionEnd ?? (cursorPos ? cursorPos.end : 0) ?? 0;

    // Start searching *after* the current match/caret.
    // If selection currently exactly equals a previous match, start from its end.
    const startPos = Math.max(0, selEnd);

    let index = fileText.indexOf(query, startPos);

    // If nothing found after cursor, wrap and search from start
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

    // Save new cursor for subsequent Find Next
    setCursorPos({ start: index, end: endIndex });

    // Scroll into view: approximate by setting scrollTop relative to position
    // (for large files this is a simple heuristic)
    const approxScroll = Math.max(0, Math.floor((index / Math.max(1, fileText.length)) * editorElement.scrollHeight));
    editorElement.scrollTop = approxScroll;
};