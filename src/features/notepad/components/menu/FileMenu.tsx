import React from "react";
import {
    MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem,
    MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubTrigger,
    MenubarSubContent
} from "@/components/ui/menubar";
import { ArrowUpFromLine, Save, RotateCcw, Printer, CrossIcon } from "lucide-react";
import { handleFileSave } from "@/features/notepad/handlers/save";
import { useFileStore } from "../../lib/fileStore";
import { useDialog } from "@/hooks/useDialog";
import styles from '@/styles/tools/notepad.module.css';
const FileMenu: React.FC = () => {
    const fileText = useFileStore((s) => s.fileText);
    const { openDialog } = useDialog();
    return (
        <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent className={`${styles.menubar_item}`}>
                <MenubarItem onClick={() => openDialog("new-file")} >
                    <span className="flex items-center">
                        <i className="mr-2">
                            <CrossIcon />
                        </i>
                        New File
                    </span>
                    <MenubarShortcut>Alt + N</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => openDialog("open-file")}>
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
                <MenubarItem onClick={() => openDialog("save-as")}>
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
            </MenubarContent>
        </MenubarMenu>
    );
};

export default FileMenu;