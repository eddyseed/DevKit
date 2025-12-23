import React from "react";
import {
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
    MenubarShortcut,
} from "@/components/ui/menubar";
import { ExpandIcon } from "lucide-react";
import styles from '@/styles/tools/notepad.module.css';
import { GOOGLE_FONTS, loadGoogleFont } from "@/utils/googleFonts";
import { useFileStore } from "../../lib/fileStore";
const DocumentMenu: React.FC = () => {

    const SYSTEM_FONTS = ["Arial", "Courier New", "Times New Roman", "Verdana"];
    const setFontFamily = useFileStore((s) => s.setFontFamily);
    const currentFont = useFileStore((s) => s.fontFamily);
    const applyFont = (font: string) => {
        setFontFamily(font);

        if (GOOGLE_FONTS.includes(font)) {
            loadGoogleFont(font);
        }
    };
    return (
        <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent className={`${styles.menubar_item}`}>
                <MenubarSub>
                    <MenubarSubTrigger>
                        Select Font
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                        {/* system fonts first */}
                        {SYSTEM_FONTS.map((f) => (
                            <MenubarItem
                                key={f}
                                onSelect={() => applyFont(f)}
                            // or onClick depending on your menubar API
                            >
                                {f} {currentFont === f ? "✓" : null}
                            </MenubarItem>
                        ))}

                        <MenubarItem disabled>──────────</MenubarItem>

                        {/* quick Google fonts subset (you can show all or categorize) */}
                        {["Inter", "Poppins", "Fira Code", "JetBrains Mono"].map((f) => (
                            <MenubarItem key={f} onSelect={() => applyFont(f)}>
                                {f} {currentFont === f ? "✓" : null}
                            </MenubarItem>
                        ))}

                        {/* optional: show full google list in a scrollable group */}
                        <MenubarItem disabled>More Google Fonts</MenubarItem>
                        <div style={{ maxHeight: 220, overflow: "auto" }}>
                            {GOOGLE_FONTS.map((f) => (
                                <MenubarItem key={f} onSelect={() => applyFont(f)}>
                                    {f} {currentFont === f ? "✓" : null}
                                </MenubarItem>
                            ))}
                        </div>
                    </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem onClick={() => {
                    if (!document.fullscreenElement) {
                        // Enter fullscreen
                        document.documentElement.requestFullscreen();
                    } else {
                        // Exit fullscreen
                        document.exitFullscreen();
                    }
                }}>
                    <span className="flex items-center">
                        <i className="mr-2">
                            <ExpandIcon />
                        </i>
                        Fullscreen
                    </span>
                    <MenubarShortcut>F11</MenubarShortcut>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

export default DocumentMenu;
