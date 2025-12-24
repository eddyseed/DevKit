'use client'
import React, { useEffect } from "react";
import styles from "@/styles/tools/notepad.module.css";
import { Textarea } from "@/components/ui/textarea";
import Menu from "./components/Menu";
import { Toaster } from "react-hot-toast";
import { loadGoogleFont } from "@/utils/googleFonts";
import { useFileStore } from "./lib/fileStore";
import Sidebar from "./components/Sidebar";

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
    useEffect(() => {
        const name = currentFileName || "Untitled";
        document.title = `${name} - Devkit${isSaved ? "" : " • Unsaved"}`;
    }, [currentFileName, isSaved]);

    return (
        <div className={`${styles.notepad}`}>
            <Toaster />
            <div>
                <Menu />
            </div>

            <div>
                <section>
                    <Textarea
                        wrap="hard"
                        placeholder="Start typing..."
                        className=""
                        value={fileText}
                        onChange={handleChange}
                        ref={setEditorElement}
                        style={{ fontFamily: `${fontFamily || 'monospace'}, monospace` }}
                    />
                </section>
                <section>
                    <Sidebar currentFileName={currentFileName}
                        fileSize={fileSize}
                        isSaved={isSaved}
                        fontFamily={fontFamily} />
                </section>
            </div>
        </div>
    );
};

export default Notepad;
