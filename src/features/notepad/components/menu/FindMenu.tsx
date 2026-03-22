import React from "react";
import {
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarShortcut,
} from "@/components/ui/menubar";
import { Search, ArrowDown, ArrowUp, Globe } from "lucide-react";
import { handleFind } from "@/features/notepad/handlers/find";
import { handleFindNext } from "@/features/notepad/handlers/findNext";
import { handleSearchSelection } from "@/features/notepad/handlers/search";
import styles from '../../styles/Menubar.module.css';

const FindMenu: React.FC = () => {
    return (
        <MenubarMenu>
            <MenubarTrigger
                className={styles.menubar_item}
                onMouseDown={(e) => e.preventDefault()}
            >
                Find
            </MenubarTrigger>

            <MenubarContent className={styles.menubar_content}>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => handleSearchSelection()}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><Globe size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Search the Web</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>⌘E</MenubarShortcut>
                </MenubarItem>

                <MenubarSeparator className={styles.menubar_content_separator} />

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => handleFind()}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><Search size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Find…</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>⌘F</MenubarShortcut>
                </MenubarItem>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => handleFindNext()}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><ArrowDown size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Find Next</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>F3</MenubarShortcut>
                </MenubarItem>

                <MenubarItem className={styles.menubar_content_item}>
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><ArrowUp size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Find Previous</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>⇧F3</MenubarShortcut>
                </MenubarItem>

            </MenubarContent>
        </MenubarMenu>
    );
};

export default FindMenu;