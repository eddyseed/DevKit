import { create } from "zustand";

interface FileMetaState {
    currentFileName: string;
    fileSize: number;
    isSaved: boolean;
    fileText: string;
    fontFamily: string;
    editorElement: HTMLTextAreaElement | null;
    cursorPos: { start: number; end: number };
    lastFindQuery: string | null;

    setLastFindQuery: (q: string | null) => void;
    setCurrentFile: (name: string, size: number) => void;
    setSavedStatus: (status: boolean) => void;
    setFileText: (text: string) => void;
    setEditorElement: (el: HTMLTextAreaElement | null) => void;
    setCursorPos: (pos: { start: number; end: number }) => void;
    setFontFamily: (fontFamily: string) => void;
}

const useFileStore = create<FileMetaState>((set) => ({
    currentFileName: "Untitled.txt",
    fileSize: 0,
    isSaved: false,
    fileText: "",
    fontFamily: "monospace",
    editorElement: null,
    cursorPos: { start: 0, end: 0 },
    lastFindQuery: null,

    setLastFindQuery: (q) => set({ lastFindQuery: q }),

    setCurrentFile: (name, size) =>
        set({
            currentFileName: name || "Untitled.txt",
            fileSize: size || 0,
        }),

    setSavedStatus: (status) => set({ isSaved: status }),

    setFileText: (text) =>
        set({
            fileText: text ?? "",
            isSaved: false,
        }),

    setEditorElement: (el) => set({ editorElement: el }),

    setCursorPos: (pos) =>
        set({
            cursorPos: { start: pos.start, end: pos.end },
        }),

    setFontFamily: (fontFamily: string) => set({ fontFamily }),
}));

export default useFileStore;
