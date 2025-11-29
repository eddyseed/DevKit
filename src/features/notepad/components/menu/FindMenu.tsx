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

const FindMenu: React.FC = () => {
    return (
        <MenubarMenu>
            <MenubarTrigger onMouseDown={(e) => e.preventDefault()}>Find</MenubarTrigger>
            <MenubarContent>
                <MenubarItem onClick={() => handleSearchSelection()}>
                    <span className="flex items-center"><Globe className="mr-2" />Search the Web</span>
                    <MenubarShortcut>Ctrl + E</MenubarShortcut>
                </MenubarItem>

                <MenubarSeparator />

                <MenubarItem onClick={() => handleFind()}>
                    <span className="flex items-center"><Search className="mr-2" />Find...</span>
                    <MenubarShortcut>Ctrl + F</MenubarShortcut>
                </MenubarItem>

                <MenubarItem onClick={() => handleFindNext()}>
                    <span className="flex items-center"><ArrowDown className="mr-2" />Find Next</span>
                    <MenubarShortcut>F3</MenubarShortcut>
                </MenubarItem>

                <MenubarItem onClick={() => {/* implement previous find if needed */ }}>
                    <span className="flex items-center"><ArrowUp className="mr-2" />Find Previous</span>
                    <MenubarShortcut>Shift + F3</MenubarShortcut>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

export default FindMenu;
