'use client'
import React, { useEffect } from "react";
import styles from "@/styles/tools/notepad.module.css";
import useFileStore from '@/lib/fileStore';
import { Textarea } from "@/components/ui/textarea";
import Menu from "./components/Menu";
import SubMenu from "./components/SubMenu";
import { Toaster } from "react-hot-toast";
import WebFont from 'webfontloader';

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

    // Lazy-load the selected Google font whenever fontFamily in store changes
    useEffect(() => {
        if (fontFamily && fontFamily !== 'monospace') {
            WebFont.load({
                google: { families: [fontFamily] }
            });
        }
    }, [fontFamily]);

    return (
        <div className={`${styles.notepad}`}>
            <Toaster />
            <div className="bg-secondary border-b border-slate-300 border-solid">
                <div className="px-3">
                    <Menu />
                </div>
            </div>

            <div>
                <div>
                    <Textarea
                        wrap="off"
                        placeholder="Start typing..."
                        className="border-solid px-5 py-4 border border-slate-300"
                        value={fileText}
                        onChange={handleChange}
                        ref={setEditorElement}
                        // apply selected font with monospace fallback
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
