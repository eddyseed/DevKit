import React from "react";
import {
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarShortcut,
} from "@/components/ui/menubar";
import { Undo, Redo, ScissorsIcon, CopyIcon, ClipboardIcon } from "lucide-react";
import { handleCopy } from "@/features/notepad/handlers/copy";
import { handleCut } from "@/features/notepad/handlers/cut";
import { handlePaste } from "@/features/notepad/handlers/paste";
import styles from '@/styles/tools/notepad.module.css';
const EditMenu: React.FC = () => {
    return (
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
    );
};

export default EditMenu;
