import React from "react";
import {
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarCheckboxItem,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
    MenubarRadioGroup,
    MenubarRadioItem,
} from "@/components/ui/menubar";
import { EyeIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const DocumentMenu: React.FC = () => {
    return (
        <MenubarMenu>
            <MenubarTrigger>Document</MenubarTrigger>
            <MenubarContent>
                <MenubarCheckboxItem checked><span>Word Wrap</span></MenubarCheckboxItem>
                <MenubarCheckboxItem><span>Auto Indent</span></MenubarCheckboxItem>

                <MenubarSub>
                    <MenubarSubTrigger>Tab Size</MenubarSubTrigger>
                    <MenubarSubContent>
                        <MenubarRadioGroup value="2">
                            <MenubarRadioItem value="2">2</MenubarRadioItem>
                            <MenubarRadioItem value="4">4</MenubarRadioItem>
                            <MenubarRadioItem value="6">6</MenubarRadioItem>
                            <MenubarRadioItem value="8">8</MenubarRadioItem>
                        </MenubarRadioGroup>
                    </MenubarSubContent>
                </MenubarSub>

                <MenubarSeparator />

                <MenubarSub>
                    <MenubarSubTrigger>Line Ending</MenubarSubTrigger>
                    <MenubarSubContent>
                        <MenubarItem>Unix</MenubarItem>
                        <MenubarItem>Mac</MenubarItem>
                        <MenubarItem>Dos</MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>

                <MenubarSeparator />

                <MenubarItem><span className="flex items-center"><EyeIcon className="mr-2" />Viewer Mode</span></MenubarItem>

                <MenubarSeparator />

                <MenubarItem><span className="flex items-center"><ChevronLeftIcon className="mr-2" />Previous Tab</span></MenubarItem>
                <MenubarItem><span className="flex items-center"><ChevronRightIcon className="mr-2" />Next Tab</span></MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

export default DocumentMenu;
