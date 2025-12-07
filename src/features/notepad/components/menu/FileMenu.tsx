import React from "react";
import {
    MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem,
    MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubTrigger,
    MenubarSubContent
} from "@/components/ui/menubar";
import { ArrowUpFromLine, Save, RotateCcw, Printer, X, CrossIcon } from "lucide-react";
import { handleFileOpen } from "@/features/notepad/handlers/fileOpen";
import { handleFileSave } from "@/features/notepad/handlers/save";
import { handleFileSaveAs } from "@/features/notepad/handlers/saveAs";
import { handleNewFile } from "@/features/notepad/handlers/newFile";
import useFileStore from "@/features/notepad/lib/fileStore";

const FileMenu: React.FC = () => {
    const fileText = useFileStore((s) => s.fileText);

    return (
        <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
                <MenubarItem onClick={() => handleNewFile(fileText)}>
                    <span className="flex items-center"><CrossIcon className="mr-2" /> New File</span>
                    <MenubarShortcut>Alt + N</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => handleFileOpen()}>
                    <span className="flex items-center"><ArrowUpFromLine className="mr-2" /> Open...</span>
                    <MenubarShortcut>Alt + O</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => handleFileSave(fileText)}>
                    <span className="flex items-center"><Save className="mr-2" /> Save</span>
                    <MenubarShortcut>Alt + S</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={() => handleFileSaveAs(fileText)}>Save As</MenubarItem>
                <MenubarItem onClick={() => window.location.reload()}>
                    <span className="flex items-center"><RotateCcw className="mr-2" /> Reload</span>
                    <MenubarShortcut>Alt + R</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => window.print()}>
                    <span className="flex items-center"><Printer className="mr-2" /> Print...</span>
                </MenubarItem>
                <MenubarSub>
                    <MenubarSubTrigger>Download</MenubarSubTrigger>
                    <MenubarSubContent>
                        <MenubarItem>Download as PDF</MenubarItem>
                        <MenubarItem>Download as DOCX</MenubarItem>
                        <MenubarItem>Download as TXT</MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem><span className="flex items-center"><X className="mr-2" /> Close Tab</span></MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

export default FileMenu;