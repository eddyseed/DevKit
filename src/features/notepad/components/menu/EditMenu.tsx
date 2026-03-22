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
import styles from '../../styles/Menubar.module.css';

const EditMenu: React.FC = () => {
    return (
        <MenubarMenu>
            <MenubarTrigger className={styles.menubar_item}>
                Edit
            </MenubarTrigger>

            <MenubarContent className={styles.menubar_content}>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => document.execCommand("undo")}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><Undo size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Undo</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>⌘Z</MenubarShortcut>
                </MenubarItem>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => document.execCommand("redo")}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><Redo size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Redo</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>⌘Y</MenubarShortcut>
                </MenubarItem>

                <MenubarSeparator className={styles.menubar_content_separator} />

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => handleCut()}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><ScissorsIcon size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Cut</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>⌘X</MenubarShortcut>
                </MenubarItem>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => handleCopy()}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><CopyIcon size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Copy</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>⌘C</MenubarShortcut>
                </MenubarItem>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => handlePaste()}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><ClipboardIcon size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Paste</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>⌘V</MenubarShortcut>
                </MenubarItem>

            </MenubarContent>
        </MenubarMenu>
    );
};

export default EditMenu;