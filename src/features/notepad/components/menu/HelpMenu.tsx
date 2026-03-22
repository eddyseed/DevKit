import React from "react";
import {
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
} from "@/components/ui/menubar";
import { HeadsetIcon, Code2Icon, CoffeeIcon } from "lucide-react";
import styles from '../../styles/Menubar.module.css';

const HelpMenu: React.FC = () => {
    return (
        <MenubarMenu>
            <MenubarTrigger className={styles.menubar_item}>
                Help
            </MenubarTrigger>

            <MenubarContent className={styles.menubar_content}>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => window.open("https://forms.gle/aikgsj35Vw6bEpJE7", "_blank")}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><HeadsetIcon size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Contact</span>
                    </span>
                </MenubarItem>

                <MenubarSeparator className={styles.menubar_content_separator} />

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => window.open("https://buymeacoffee.com/rishabhjn1o", "_blank")}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><CoffeeIcon size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Buy Me a Coffee</span>
                    </span>
                </MenubarItem>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => window.open("https://github.com/eddyseed/DevKit/issues", "_blank")}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><Code2Icon size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Report Issue</span>
                    </span>
                </MenubarItem>

            </MenubarContent>
        </MenubarMenu>
    );
};

export default HelpMenu;