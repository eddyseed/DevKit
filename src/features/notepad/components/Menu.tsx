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
import FileMenu from "./menu/FileMenu";
import EditMenu from "./menu/EditMenu";
import FindMenu from "./menu/FindMenu";
import HelpMenu from "./menu/HelpMenu";
import { handleGlobalKeyDown } from "@/features/notepad/lib/keyboard";
import { ClipboardIcon, CopyIcon, RedoIcon, ScissorsIcon, SearchIcon, UndoIcon } from "lucide-react";
import styles from '../styles/notepad.module.css';
import { useDialog } from "@/hooks/useDialog";
const Menu: React.FC = () => {
    const { openDialog } = useDialog();
    const keyboardActions = useMemo(() => ({
        newFile: () => openDialog("new-file"),
        openFile: () => openDialog("open-file"),
        saveFile: () => handleFileSave(),
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
    }), [openDialog]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;

            // Ignore shortcuts when typing
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

    // Attach listener
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const preventBlur = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    return (
        <Menubar onMouseDown={preventBlur}>
            <div>
                <FileMenu />
                <EditMenu />
                <FindMenu />
                <HelpMenu />
            </div>
            <div>
                <div
                    className={styles.menubar_item}
                    title="Cut Selection (Ctrl+X)"
                    onClick={() => handleCut()}
                >
                    <ScissorsIcon />
                </div>

                <div
                    className={styles.menubar_item}
                    title="Copy Selection (Ctrl+C)"
                    onClick={() => handleCopy()}
                >
                    <CopyIcon />
                </div>

                <div
                    className={styles.menubar_item}
                    title="Paste from Clipboard (Ctrl+V)"
                    onClick={() => handlePaste()}
                >
                    <ClipboardIcon />
                </div>

                <div
                    className={styles.menubar_item}
                    title="Search in Note (Ctrl+F)"
                    onClick={() => handleFind()}
                >
                    <SearchIcon />
                </div>

                <div
                    className={`${styles.menubar_item}`}
                    title="Undo (Ctrl+Z)"
                    onClick={() => document.execCommand("undo")}
                >
                    <UndoIcon />
                </div>

                <div
                    className={`${styles.menubar_item}`}
                    title="Redo (Ctrl+Y)"
                    onClick={() => document.execCommand("redo")}
                >
                    <RedoIcon />
                </div>

            </div>
        </Menubar>
    );
};

export default Menu;