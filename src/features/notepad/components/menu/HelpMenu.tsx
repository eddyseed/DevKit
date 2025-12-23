import React from "react";
import {
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
} from "@/components/ui/menubar";
import { HeadsetIcon, DollarSignIcon, Code2Icon } from "lucide-react";
import styles from '@/styles/tools/notepad.module.css';
const HelpMenu: React.FC = () => {
    return (
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
    );
};

export default HelpMenu;
