import { Menubar } from "@/components/ui/menubar"
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
import styles from '../styles/Menu.module.css';
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
        cut: () => { try { handleCut(); } catch { document.execCommand("cut"); } },
        paste: handlePaste,
        searchSelection: handleSearchSelection,
        find: handleFind,
        findNext: handleFindNext,
    }), [openDialog]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const target = e.target as HTMLElement;
        if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target.isContentEditable
        ) return;
        handleGlobalKeyDown(e, keyboardActions);
    }, [keyboardActions]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const preventBlur = (e: React.MouseEvent) => e.preventDefault();

    return (
        <Menubar onMouseDown={preventBlur} className={styles.menubar}>
            {/* Left — dropdown menus */}
            <div className={styles.menubar_left}>
                <FileMenu />
                <EditMenu />
                <FindMenu />
                <HelpMenu />
            </div>

            <div className={styles.menubar_sep} />

            {/* Right — icon action strip */}
            <div className={styles.menubar_actions}>
                <button className={styles.menubar_item} title="Cut (Ctrl+X)" onClick={() => handleCut()}>
                    <ScissorsIcon size={13} strokeWidth={1.75} />
                </button>
                <button className={styles.menubar_item} title="Copy (Ctrl+C)" onClick={() => handleCopy()}>
                    <CopyIcon size={13} strokeWidth={1.75} />
                </button>
                <button className={styles.menubar_item} title="Paste (Ctrl+V)" onClick={() => handlePaste()}>
                    <ClipboardIcon size={13} strokeWidth={1.75} />
                </button>

                <div className={styles.menubar_item_sep} />

                <button className={styles.menubar_item} title="Find (Ctrl+F)" onClick={() => handleFind()}>
                    <SearchIcon size={13} strokeWidth={1.75} />
                </button>

                <div className={styles.menubar_item_sep} />

                <button className={styles.menubar_item} title="Undo (Ctrl+Z)" onClick={() => document.execCommand("undo")}>
                    <UndoIcon size={13} strokeWidth={1.75} />
                </button>
                <button className={styles.menubar_item} title="Redo (Ctrl+Y)" onClick={() => document.execCommand("redo")}>
                    <RedoIcon size={13} strokeWidth={1.75} />
                </button>
            </div>
        </Menubar>
    );
};

export default Menu;