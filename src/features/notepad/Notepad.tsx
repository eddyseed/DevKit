'use client'
import React, { useEffect } from "react";
import styles from "./styles/notepad.module.css";
import { Textarea } from "@/components/ui/textarea";
import Menu from "./components/Menu";
import { Toaster } from "react-hot-toast";
import { loadGoogleFont } from "@/features/notepad/utils/googleFonts";
import { useFileStore } from "./lib/fileStore";
import Sidebar from "./components/Sidebar";
import Panel from "./components/Panel";

const Notepad: React.FC = () => {
    const {
        isSaved,
        currentFileName,
        fontFamily,
        fileSize,
        fileLocation,
        createdAt,
        lastModified,


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
                    <Panel />
                    <Sidebar
                        currentFileName={currentFileName}
                        fileSize={fileSize}
                        isSaved={isSaved}
                        fontFamily={fontFamily}
                        fileLocation={fileLocation}
                        wordCount={fileText.split(' ').length}
                        lineCount={fileText.split('\n').length}
                        createdAt={createdAt}
                        modifiedAt={lastModified}
                    />
                </section>
            </div>
        </div>
    );
};

export default Notepad;
