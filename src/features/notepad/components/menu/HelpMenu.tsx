import React from "react";
import {
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
} from "@/components/ui/menubar";
import { HeadsetIcon, DollarSignIcon, Code2Icon } from "lucide-react";

const HelpMenu: React.FC = () => {
    return (
        <MenubarMenu>
            <MenubarTrigger>Help</MenubarTrigger>
            <MenubarContent>
                <MenubarItem><span className="flex items-center"><HeadsetIcon className="mr-2" />Contact</span></MenubarItem>
                <MenubarItem><span className="flex items-center"><DollarSignIcon className="mr-2" />Donate</span></MenubarItem>
                <MenubarSeparator />
                <MenubarItem><span className="flex items-center"><Code2Icon className="mr-2" />Contribute</span></MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

export default HelpMenu;
