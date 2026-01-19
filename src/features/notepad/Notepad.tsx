"use client";
import { Textarea } from "@/components/ui/textarea";
import { loadGoogleFont } from "@/features/notepad/utils/googleFonts";
import React, { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useSettings } from "../settings/hooks/useSettings";
import Menu from "./components/Menu";
import Panel from "./components/Panel";
import StatusBar from "./components/StatusBar";
import { handleFileSave } from "./handlers/save";
import { useFileStore } from "./lib/fileStore";
import styles from "./styles/notepad.module.css";

const Notepad: React.FC = () => {
    const {
        isSaved,
        currentFileName,
        fileSize,
        fileLocation,
        createdAt,
        lastModified,

        fileText,
        setFileText,
        setEditorElement,
    } = useFileStore();
    const { general } = useSettings();
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFileText(e.target.value);
    };
    const { editor, appearance } = useSettings();
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            if (process.env.NODE_ENV === "development") {
                console.log("[Autosave] Skipped on first render");
            }
            isFirstRender.current = false;
            return;
        }

        if (!general.autoSave) {
            if (process.env.NODE_ENV === "development") {
                console.log("[Autosave] Disabled — skipping save");
            }
            return;
        }

        if (process.env.NODE_ENV === "development") {
            console.log("[Autosave] Scheduled");
        }

        const timeout = setTimeout(() => {
            if (process.env.NODE_ENV === "development") {
                console.log("[Autosave] Triggered");
            }
            handleFileSave();
        }, general.autoSaveInterval * 1000);

        return () => {
            if (process.env.NODE_ENV === "development") {
                console.log("[Autosave] Cleared (new change detected)");
            }
            clearTimeout(timeout);
        };
    }, [fileText, general.autoSave, general.autoSaveInterval]);

    useEffect(() => {
        loadGoogleFont(editor.fontFamily || "");
    }, [editor.fontFamily]);
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
                        wrap={editor.wordWrap ? "soft" : "off"}
                        placeholder="Start typing..."
                        className=""
                        value={fileText}
                        onChange={handleTextChange}
                        ref={setEditorElement}
                        style={{
                            fontFamily: `${editor.fontFamily || "monospace"}, monospace`,
                            fontSize: editor.fontSize,
                            lineHeight: editor.lineHeight,
                            opacity: appearance.editorBgOpacity + "%"
                        }}
                    />
                </section>
                <section>
                    <Panel />
                    {appearance.showStatusBar && <StatusBar
                        currentFileName={currentFileName}
                        fileSize={fileSize}
                        isSaved={isSaved}
                        fontFamily={editor.fontFamily}
                        fileLocation={fileLocation}
                        wordCount={fileText.split(" ").length}
                        lineCount={fileText.split("\n").length}
                        createdAt={createdAt}
                        modifiedAt={lastModified}
                    />}
                </section>
            </div>
        </div>
    );
};

export default Notepad;
