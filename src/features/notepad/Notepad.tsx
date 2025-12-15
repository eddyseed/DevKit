'use client'
import React, { useEffect } from "react";
import styles from "@/styles/tools/notepad.module.css";
import { Textarea } from "@/components/ui/textarea";
import Menu from "./components/Menu";
import SubMenu from "./components/SubMenu";
import { Toaster } from "react-hot-toast";
import { loadGoogleFont } from "@/utils/googleFonts";
import { useFileStore } from "./lib/fileStore";

const Notepad: React.FC = () => {
    const {
        currentFileName,
        fileSize,
        isSaved,
        fontFamily,
        fileText,
        setFileText,
        setEditorElement
    } = useFileStore();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFileText(e.target.value);
    };

    useEffect(() => {
        loadGoogleFont(fontFamily || '');
    }, [fontFamily]);

    return (
        <div className={`${styles.notepad}`}>
            <Toaster />
            <div>
                <Menu />
            </div>

            <div>
                <section>
                    <Textarea
                        wrap="off"
                        placeholder="Start typing..."
                        className=""
                        value={fileText}
                        onChange={handleChange}
                        ref={setEditorElement}
                        style={{ fontFamily: `${fontFamily || 'monospace'}, monospace` }}
                    />
                </section>

                <section>
                    <div>
                        <SubMenu />
                    </div>

                    <div className="px-4 py-5">
                        <span>{currentFileName ? `${currentFileName}` : "Untitled.txt"}</span>
                        <br />
                        <span>{fileSize ? `${fileSize} bytes` : "0 bytes"}</span>
                        <br />
                        <span>{isSaved ? "All changes saved" : "Unsaved changes"}</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Notepad;
