import { useCallback, useEffect } from "react";
import { useFileStore } from "@/features/notepad/lib/fileStore";
import { handleCopy } from "@/features/notepad/handlers/copy";
import { handleCut } from "@/features/notepad/handlers/cut";
import { openFileByName } from "@/features/notepad/handlers/fileOpen";
import { handleFind } from "@/features/notepad/handlers/find";
import { handleFindNext } from "@/features/notepad/handlers/findNext";
import { handleNewFile } from "@/features/notepad/handlers/newFile";
import { handlePaste } from "@/features/notepad/handlers/paste";
import { handleFileSave } from "@/features/notepad/handlers/save";
import { handleSearchSelection } from "@/features/notepad/handlers/search";

export const useKeyboardShortcuts = () => {
    const fileText = useFileStore((s) => s.fileText);
    const fileName = useFileStore((s) => s.currentFileName);
    const handler = useCallback((e: KeyboardEvent) => {
        const key = e.key.toLowerCase();

        if (e.altKey) {
            switch (key) {
                case "n": e.preventDefault(); handleNewFile(fileText); return;
                case "o": e.preventDefault(); openFileByName(fileName); return;
                case "s": e.preventDefault(); handleFileSave(fileText); return;
                case "r": e.preventDefault(); window.location.reload(); return;
            }
        }

        const ctrlOrCmd = e.ctrlKey || e.metaKey;
        if (ctrlOrCmd) {
            if (key === "p") { e.preventDefault(); window.print(); return; }
            if (key === "z") { e.preventDefault(); document.execCommand("undo"); return; }
            if (key === "y") { e.preventDefault(); document.execCommand("redo"); return; }
            if (key === "c") { e.preventDefault(); handleCopy(); return; }
            if (key === "x") { e.preventDefault(); try { handleCut(); } catch { document.execCommand("cut"); } return; }
            if (key === "v") { e.preventDefault(); handlePaste(); return; }
            if (key === "e") { e.preventDefault(); handleSearchSelection(); return; }
            if (key === "f") { e.preventDefault(); handleFind(); return; }
        }

        if (key === "f3") { e.preventDefault(); handleFindNext(); return; }
    }, [fileName, fileText]);

    useEffect(() => {
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [handler]);
};