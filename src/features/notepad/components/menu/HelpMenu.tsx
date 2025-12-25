import React from "react";
import {
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
} from "@/components/ui/menubar";
import { HeadsetIcon, Code2Icon, CoffeeIcon } from "lucide-react";
import styles from '@/styles/tools/notepad.module.css';
const HelpMenu: React.FC = () => {
    return (
        <MenubarMenu>
            <MenubarTrigger>Help</MenubarTrigger>
            <MenubarContent className={`${styles.menubar_item}`}>
                <MenubarItem>
                    <span className="flex items-center" onClick={() => window.open("https://forms.gle/aikgsj35Vw6bEpJE7", "_blank")}>
                        <i className="mr-2">
                            <HeadsetIcon />
                        </i>
                        Contact
                    </span>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                    <span className="flex items-center" onClick={() => window.open("https://buymeacoffee.com/rishabhjn1o", "_blank")}>
                        <i className="mr-2">
                            <CoffeeIcon />
                        </i>
                        Buy Me a Coffee
                    </span>
                </MenubarItem>
                <MenubarItem>
                    <span className="flex items-center" onClick={() => window.open("https://github.com/eddyseed/DevKit/issues", "_blank")}>
                        <i className="mr-2">
                            <Code2Icon />
                        </i>
                        Report Issue
                    </span>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

export default HelpMenu;
