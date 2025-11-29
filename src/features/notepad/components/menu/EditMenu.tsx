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

const EditMenu: React.FC = () => {
    return (
        <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
                <MenubarItem onClick={() => document.execCommand("undo")}>
                    <span className="flex items-center"><Undo className="mr-2" />Undo</span>
                    <MenubarShortcut>Ctrl + Z</MenubarShortcut>
                </MenubarItem>

                <MenubarItem onClick={() => document.execCommand("redo")}>
                    <span className="flex items-center"><Redo className="mr-2" />Redo</span>
                    <MenubarShortcut>Ctrl + Y</MenubarShortcut>
                </MenubarItem>

                <MenubarSeparator />

                <MenubarItem onClick={() => handleCut()}>
                    <span className="flex items-center"><ScissorsIcon className="mr-2" />Cut</span>
                    <MenubarShortcut>Ctrl + X</MenubarShortcut>
                </MenubarItem>

                <MenubarItem onClick={() => handleCopy()}>
                    <span className="flex items-center"><CopyIcon className="mr-2" />Copy</span>
                    <MenubarShortcut>Ctrl + C</MenubarShortcut>
                </MenubarItem>

                <MenubarItem onClick={() => handlePaste()}>
                    <span className="flex items-center"><ClipboardIcon className="mr-2" />Paste</span>
                    <MenubarShortcut>Ctrl + V</MenubarShortcut>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

export default EditMenu;
