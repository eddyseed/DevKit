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
import styles from '@/styles/tools/notepad.module.css';
const FindMenu: React.FC = () => {
    return (
        <MenubarMenu>
            <MenubarTrigger onMouseDown={(e) => e.preventDefault()}>Find</MenubarTrigger>
            <MenubarContent className={`${styles.menubar_item}`}>
                <MenubarItem onClick={() => handleSearchSelection()}>
                    <span className="flex items-center">
                        <i className="mr-2">
                            <Globe />
                        </i>
                        Search the Web
                    </span>
                    <MenubarShortcut>Ctrl + E</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => handleFind()}>
                    <span className="flex items-center">
                        <i className="mr-2">
                            <Search />
                        </i>
                        Find...
                    </span>
                    <MenubarShortcut>Ctrl + F</MenubarShortcut>
                </MenubarItem>
                <MenubarItem onClick={() => handleFindNext()}>
                    <span className="flex items-center">
                        <i className="mr-2">
                            <ArrowDown />
                        </i>
                        Find Next
                    </span>
                    <MenubarShortcut>F3</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                    <span className="flex items-center">
                        <i className="mr-2">
                            <ArrowUp />
                        </i>
                        Find Previous
                    </span>
                    <MenubarShortcut>Shift + F3</MenubarShortcut>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

export default FindMenu;
