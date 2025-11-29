import React from "react";
import { Menubar } from "@/components/ui/menubar";

const MenuRoot: React.FC<React.PropsWithChildren> = ({ children }) => {
    const preventBlur = (e: React.MouseEvent) => e.preventDefault();

    return (
        <Menubar className="preset-1 border-none w-min" onMouseDown={preventBlur}>
            {children}
        </Menubar>
    );
};

export default MenuRoot;