import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { ArrowUpFromLine, Save, RotateCcw, Printer, EyeClosed, CrossIcon, X, Undo, Redo, CopyIcon, ClipboardIcon, ScissorsIcon, ArrowUp, ArrowDown, Search, Globe, HeadsetIcon, DollarSignIcon, Code2Icon, EyeIcon, ChevronRightIcon, ChevronLeftIcon, ExpandIcon } from 'lucide-react';
import { GOOGLE_FONTS, loadGoogleFont } from "@/utils/googleFonts";
import { useCallback, useEffect } from "react";
import { handleCopy } from "../handlers/copy";
import { handleCut } from "../handlers/cut";
import { handleFileOpen } from "../handlers/fileOpen";
import { handleFind } from "../handlers/find";
import { handleFindNext } from "../handlers/findNext";
import { handleNewFile } from "../handlers/newFile";
import { handlePaste } from "../handlers/paste";
import { handleFileSave } from "../handlers/save";
import { handleFileSaveAs } from "../handlers/saveAs";
import { handleSearchSelection } from "../handlers/search";
import { useFileStore } from "../lib/fileStore";
import styles from '@/styles/tools/notepad.module.css';
const Menu: React.FC = () => {
    const { fileText } = useFileStore();
    const setFontFamily = useFileStore((s) => s.setFontFamily);
    const currentFont = useFileStore((s) => s.fontFamily);
    const SYSTEM_FONTS = ["Arial", "Courier New", "Times New Roman", "Verdana"];
    const applyFont = (font: string) => {
        setFontFamily(font);

        if (GOOGLE_FONTS.includes(font)) {
            loadGoogleFont(font);
        }
    };
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const key = e.key.toLowerCase();

        if (e.altKey) {
            switch (key) {

                case "n": // Alt + N -> New File
                    e.preventDefault();
                    handleNewFile(fileText);
                    return;
                case "o": // Alt + O -> Open
                    e.preventDefault();
                    handleFileOpen();
                    return;
                case "s": // Alt + S -> Save
                    e.preventDefault();
                    handleFileSave(fileText);
                    return;
                case "r": // Alt + R -> Reload
                    e.preventDefault();
                    window.location.reload();
                    return;
            }
        }

        const ctrlOrCmd = e.ctrlKey || e.metaKey;

        if (ctrlOrCmd) {
            if (key === "p") {
                e.preventDefault();
                window.print();
                return;
            }

            if (key === "z") {
                e.preventDefault();
                document.execCommand("undo");
                return;
            }

            if (key === "y") {
                e.preventDefault();
                document.execCommand("redo");
                return;
            }

            if (key === "c") {
                e.preventDefault();
                handleCopy();
                return;
            }

            if (key === "x") {
                e.preventDefault();
                try {
                    handleCut();
                } catch {
                    document.execCommand("cut");
                }
                return;
            }

            if (key === "v") {
                e.preventDefault();
                handlePaste();
                return;
            }
            if (key === "e") {
                e.preventDefault();
                handleSearchSelection();
                return;
            }
            if (key === "f") {
                e.preventDefault();
                handleFind();
                return;
            }
        }

        // F3 key (Find Next)
        if (key === "f3") {
            e.preventDefault();
            handleFindNext();
            return;
        }
    }, [fileText]);

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
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent className={`${styles.menubar_item}`}>
                    <MenubarItem onClick={() => handleNewFile(fileText)} >
                        <span className="flex items-center">
                            <i className="mr-2"> 
                                <CrossIcon />
                            </i>
                            New File
                        </span>
                        <MenubarShortcut>Alt + N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleFileOpen()}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <ArrowUpFromLine />
                            </i>
                            Open...
                        </span>
                        <MenubarShortcut>Alt + O</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2"></i>
                            Open Recent
                        </span>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleFileSave(fileText)}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <Save />
                            </i>
                            Save
                        </span>
                        <MenubarShortcut>Alt + S</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => handleFileSaveAs(fileText)}>
                        <span className="flex items-center">
                            <i className="mr-2"></i>
                            Save As
                        </span>
                    </MenubarItem>
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2"></i>
                            Save All
                        </span>
                    </MenubarItem>
                    <MenubarItem onClick={() => window.location.reload()}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <RotateCcw />
                            </i>
                            Reload
                        </span>
                        <MenubarShortcut>Alt + R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => window.print()}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <Printer />
                            </i>
                            Print...
                        </span>
                    </MenubarItem>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            <span className="flex items-center">Download</span>
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Download as PDF</MenubarItem>
                            <MenubarItem>Download as DOCX</MenubarItem>
                            <MenubarItem>Download as TXT</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <X />
                            </i>
                            Close Tab
                        </span>
                    </MenubarItem>
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <EyeClosed />
                            </i>
                            Save and Quit
                        </span>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent className={`${styles.menubar_item}`}>
                    <MenubarItem onClick={() => document.execCommand("undo")}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <Undo />
                            </i>
                            Undo
                        </span>
                        <MenubarShortcut>Ctrl + Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => document.execCommand("redo")}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <Redo />
                            </i>
                            Redo
                        </span>
                        <MenubarShortcut>Ctrl + Y</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleCut()}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <ScissorsIcon />
                            </i>
                            Cut
                        </span>
                        <MenubarShortcut>Ctrl + X</MenubarShortcut>
                    </MenubarItem>

                    <MenubarItem onClick={() => handleCopy()}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <CopyIcon />
                            </i>
                            Copy
                        </span>
                        <MenubarShortcut>Ctrl + C</MenubarShortcut>
                    </MenubarItem>

                    <MenubarItem onClick={() => handlePaste()}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <ClipboardIcon />
                            </i>
                            Paste
                        </span>
                        <MenubarShortcut>Ctrl + V</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger onMouseDown={(e) => e.preventDefault()}>Find</MenubarTrigger>
                <MenubarContent className={`${styles.menubar_item}`}>
                    <MenubarItem onClick={() => handleSearchSelection()}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <Globe />
                            </i>
                            Search the Web
                        </span>
                        <MenubarShortcut>Ctrl + E</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => handleFind()}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <Search />
                            </i>
                            Find...
                        </span>
                        <MenubarShortcut>Ctrl + F</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => handleFindNext()}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <ArrowDown />
                            </i>
                            Find Next
                        </span>
                        <MenubarShortcut>F3</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <ArrowUp />
                            </i>
                            Find Previous
                        </span>
                        <MenubarShortcut>Shift + F3</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent className={`${styles.menubar_item}`}>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            Select Font
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            {/* system fonts first */}
                            {SYSTEM_FONTS.map((f) => (
                                <MenubarItem
                                    key={f}
                                    onSelect={() => applyFont(f)}
                                // or onClick depending on your menubar API
                                >
                                    {f} {currentFont === f ? "✓" : null}
                                </MenubarItem>
                            ))}

                            <MenubarItem disabled>──────────</MenubarItem>

                            {/* quick Google fonts subset (you can show all or categorize) */}
                            {["Inter", "Poppins", "Fira Code", "JetBrains Mono"].map((f) => (
                                <MenubarItem key={f} onSelect={() => applyFont(f)}>
                                    {f} {currentFont === f ? "✓" : null}
                                </MenubarItem>
                            ))}

                            {/* optional: show full google list in a scrollable group */}
                            <MenubarItem disabled>More Google Fonts</MenubarItem>
                            <div style={{ maxHeight: 220, overflow: "auto" }}>
                                {GOOGLE_FONTS.map((f) => (
                                    <MenubarItem key={f} onSelect={() => applyFont(f)}>
                                        {f} {currentFont === f ? "✓" : null}
                                    </MenubarItem>
                                ))}
                            </div>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            Select Theme
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>System Default</MenubarItem>
                            <MenubarItem>Light</MenubarItem>
                            <MenubarItem>Dark</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Atomic</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarCheckboxItem checked>
                        <span className="flex items-center">
                            Menubar
                        </span>
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>
                        <span className="flex items-center">
                            Toolbar
                        </span>
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>
                        <span className="flex items-center">
                            Sidebar
                        </span>
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => {
                        if (!document.fullscreenElement) {
                            // Enter fullscreen
                            document.documentElement.requestFullscreen();
                        } else {
                            // Exit fullscreen
                            document.exitFullscreen();
                        }
                    }}>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <ExpandIcon />
                            </i>
                            Fullscreen
                        </span>
                        <MenubarShortcut>F11</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Document</MenubarTrigger>
                <MenubarContent className={`${styles.menubar_item}`}>
                    <MenubarCheckboxItem checked>
                        <span className="flex items-center">
                            Word Wrap
                        </span>
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem>
                        <span className="flex items-center">
                            Auto Indent
                        </span>
                    </MenubarCheckboxItem>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            Tab Size
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarRadioGroup value="2">
                                <MenubarRadioItem value="2">2</MenubarRadioItem>
                                <MenubarRadioItem value="4">4</MenubarRadioItem>
                                <MenubarRadioItem value="6">6</MenubarRadioItem>
                                <MenubarRadioItem value="8">8</MenubarRadioItem>
                            </MenubarRadioGroup>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>
                            File Type
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Categories</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            Line Ending
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Unix</MenubarItem>
                            <MenubarItem>Mac</MenubarItem>
                            <MenubarItem>Dos</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                        <span className="flex items-center">
                            Write Unicode BOM
                        </span>
                    </MenubarItem>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            Insert TimeStamp
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Insert Time</MenubarItem>
                            <MenubarItem>Insert Date</MenubarItem>
                            <MenubarItem>Insert Date Unix Key</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <EyeIcon />
                            </i>
                            Viewer Mode
                        </span>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <ChevronLeftIcon />

                            </i>
                            Previous Tab
                        </span>
                    </MenubarItem>
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <ChevronRightIcon />
                            </i>
                            Next Tab
                        </span>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                        <span className="flex items-center">
                            Opened Tab List
                        </span>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Help</MenubarTrigger>
                <MenubarContent className={`${styles.menubar_item}`}>
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <HeadsetIcon />
                            </i>
                            Contact
                        </span>
                    </MenubarItem>
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <DollarSignIcon />
                            </i>
                            Donate
                        </span>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                        <span className="flex items-center">
                            <i className="mr-2">
                                <Code2Icon />
                            </i>
                            Contribute
                        </span>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default Menu;