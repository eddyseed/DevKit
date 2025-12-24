import React from "react";
import {
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
    MenubarSeparator,
    MenubarShortcut,
} from "@/components/ui/menubar";
import { CheckIcon, ExpandIcon } from "lucide-react";
import {useFileStore} from "@/features/notepad/lib/fileStore";
import { SYSTEM_FONTS } from "../../../../utils/constants";
import { GOOGLE_FONTS, loadGoogleFont } from "@/utils/googleFonts";
import styles from '@/styles/tools/notepad.module.css';
const ViewMenu: React.FC = () => {
    const currentFont = useFileStore((s) => s.fontFamily);
    const setFontFamily = useFileStore((s) => s.setFontFamily);

    const applyFont = (font: string) => {
        setFontFamily(font);
        if (GOOGLE_FONTS.includes(font)) loadGoogleFont(font);
    };

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    };

    return (
        <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent className={styles.menubar_item}>
                <MenubarSub>
                    <MenubarSubTrigger>Select Font</MenubarSubTrigger>
                    <MenubarSubContent className={styles.menubar_item}>
                        {SYSTEM_FONTS.map((f) => (
                            <MenubarItem key={f} onSelect={() => applyFont(f)}>
                                {f} {currentFont === f ? <CheckIcon /> : null}
                            </MenubarItem>
                        ))}

                        <MenubarItem disabled>──────────</MenubarItem>

                        {["Inter", "Poppins", "Fira Code", "JetBrains Mono"].map((f) => (
                            <MenubarItem key={f} onSelect={() => applyFont(f)}>
                                {f} {currentFont === f ? <CheckIcon /> : null}
                            </MenubarItem>
                        ))}

                        <MenubarItem disabled>More Google Fonts</MenubarItem>
                        <div style={{ maxHeight: 220, overflow: "auto" }}>
                            {GOOGLE_FONTS.map((f) => (
                                <MenubarItem key={f} onSelect={() => applyFont(f)}>
                                    {f} {currentFont === f ? <CheckIcon /> : null}
                                </MenubarItem>
                            ))}
                        </div>
                    </MenubarSubContent>
                </MenubarSub>

                <MenubarSeparator />

                <MenubarItem onClick={toggleFullscreen}>
                    <span className="flex items-center"><ExpandIcon className="mr-2" />Fullscreen</span>
                    <MenubarShortcut>F11</MenubarShortcut>
                </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
    );
};

export default ViewMenu;
