import {
    Menubar,
} from "@/components/ui/menubar"
import { useCallback, useEffect, useMemo } from "react";
import { handleCopy } from "../handlers/copy";
import { handleCut } from "../handlers/cut";
import { handleFind } from "../handlers/find";
import { handleFindNext } from "../handlers/findNext";
import { handlePaste } from "../handlers/paste";
import { handleFileSave } from "../handlers/save";
import { handleSearchSelection } from "../handlers/search";
import { useFileStore } from "../lib/fileStore";
import { useDialog } from "@/hooks/useDialog";
import FileMenu from "./menu/FileMenu";
import EditMenu from "./menu/EditMenu";
import FindMenu from "./menu/FindMenu";
import DocumentMenu from "./menu/DocumentMenu";
import HelpMenu from "./menu/HelpMenu";
import { handleGlobalKeyDown } from "@/lib/keyboard";
const Menu: React.FC = () => {
    const { fileText } = useFileStore();
    const { openDialog } = useDialog();
    const keyboardActions = useMemo(() => ({
        newFile: () => openDialog("new-file"),
        openFile: () => openDialog("open-file"),
        saveFile: () => handleFileSave(fileText),
        reload: () => window.location.reload(),

        print: () => window.print(),
        undo: () => document.execCommand("undo"),
        redo: () => document.execCommand("redo"),

        copy: handleCopy,
        cut: () => {
            try {
                handleCut();
            } catch {
                document.execCommand("cut");
            }
        },
        paste: handlePaste,

        searchSelection: handleSearchSelection,
        find: handleFind,
        findNext: handleFindNext,
    }), [fileText, openDialog]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;

            // 🚫 Ignore shortcuts when typing
            if (
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement ||
                target.isContentEditable
            ) {
                return;
            }

            handleGlobalKeyDown(e, keyboardActions);
        },
        [keyboardActions]
    );

    // attach listener
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const preventBlur = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    return (
        <Menubar onMouseDown={preventBlur}>
            <FileMenu />
            <EditMenu />
            <FindMenu />
            <DocumentMenu />
            <HelpMenu />
        </Menubar>
    );
};

export default Menu;