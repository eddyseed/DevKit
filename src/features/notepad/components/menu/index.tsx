import React from "react";
import MenuRoot from "./MenuRoot";
import FileMenu from "./FileMenu";
import EditMenu from "./EditMenu";
import FindMenu from "./FindMenu";
import ViewMenu from "./ViewMenu";
import DocumentMenu from "./DocumentMenu";
import HelpMenu from "./HelpMenu";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

const Menu: React.FC = () => {
    useKeyboardShortcuts();
    return (
        <MenuRoot>
            <FileMenu />
            <EditMenu />
            <FindMenu />
            <ViewMenu />
            <DocumentMenu />
            <HelpMenu />
        </MenuRoot>
    );
};

export default Menu;