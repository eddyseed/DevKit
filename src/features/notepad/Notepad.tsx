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
            <div className="bg-white dark:bg-slate-900 m-1 border border-slate-300 dark:border-slate-700">
                <div className="px-3">
                    <Menu />
                </div>
            </div>

            <div>
                <div>
                    <Textarea
                        wrap="off"
                        placeholder="Start typing..."
                        className="bg-white dark:bg-slate-800 text-black dark:text-white border-slate-300 dark:border-slate-700"
                        value={fileText}
                        onChange={handleChange}
                        ref={setEditorElement}
                        style={{ fontFamily: `${fontFamily || 'monospace'}, monospace` }}
                    />
                </div>

                <div className="bg-slate-100 m-1 border border-slate-300">
                    <div className="flex items-end justify-center">
                        <SubMenu />
                    </div>

                    <div className="px-4 py-5">
                        <span>{currentFileName ? `${currentFileName}` : "Untitled.txt"}</span>
                        <br />
                        <span>{fileSize ? `${fileSize} bytes` : "0 bytes"}</span>
                        <br />
                        <span>{isSaved ? "All changes saved" : "Unsaved changes"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notepad;
