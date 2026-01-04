import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import { FileMetaSchema } from "../interfaces/file-meta.interface"; // adjust path

// derive TypeScript type from zod schema
export type FileMeta = z.infer<typeof FileMetaSchema>;

// Strongly-typed store state + actions
export type FileState = FileMeta & {
    setLastFindQuery: (q: string | null) => void;
    setCurrentFile: (name: string, size: number) => void;
    setSavedStatus: (status: boolean) => void;
    setFileText: (text: string) => void;
    setEditorElement: (el: HTMLTextAreaElement | null) => void;
    setCursorPos: (pos: { start: number; end: number }) => void;
    setFontFamily: (font: string) => void;
    setFileLocation: (location: { collection: string; fileName: string } | null) => void;

    setCreatedAt: (date: Date) => void;
    setLastModified: (date: Date) => void;

};

export const useFileStore = create<FileState>()(
    persist(
        (set) => ({
            // defaults must match schema shape
            currentFileName: "",
            fileLocation: null,
            fileSize: 0,
            isSaved: true,
            fileText: "",
            fontFamily: "monospace",
            editorElement: null,
            cursorPos: { start: 0, end: 0 },
            lastFindQuery: null,
            createdAt: new Date(),
            lastModified: new Date(),

            // setters using pick() from FileMetaSchema
            setLastFindQuery: (q: string | null) => {
                const parsed = FileMetaSchema.pick({ lastFindQuery: true }).safeParse({ lastFindQuery: q });
                if (parsed.success) set({ lastFindQuery: parsed.data.lastFindQuery });
                else {
                    console.warn("Invalid lastFindQuery:", parsed.error);
                }
            },

            setCurrentFile: (name: string, sizeInBytes: number) => {
                const sizeInMB = Math.round((sizeInBytes / (1024)));
                const parsed = FileMetaSchema.pick({
                    currentFileName: true,
                    fileSize: true,
                }).safeParse({
                    currentFileName: name,
                    fileSize: sizeInMB,
                });

                if (parsed.success) {
                    set({
                        currentFileName: parsed.data.currentFileName,
                        fileSize: parsed.data.fileSize, // now in MB
                    });
                } else {
                    console.warn("Invalid current file data:", parsed.error);
                }
            }
            ,
            setFileLocation: (location) => {
                const parsed = FileMetaSchema.pick({ fileLocation: true }).safeParse({
                    fileLocation: location,
                });

                if (parsed.success) {
                    set({ fileLocation: parsed.data.fileLocation });
                } else {
                    console.warn("Invalid fileLocation:", parsed.error);
                }
            },

            setSavedStatus: (status: boolean) => {
                const parsed = FileMetaSchema.pick({ isSaved: true }).safeParse({ isSaved: status });
                if (parsed.success) set({ isSaved: parsed.data.isSaved });
                else console.warn("Invalid isSaved:", parsed.error);
            },

            setFileText: (text: string) => {
                // IMPORTANT: heavy validation on each keystroke may be costly.
                // If text is large, consider validating on save/blur instead.
                const parsed = FileMetaSchema.pick({ fileText: true }).safeParse({ fileText: text });
                if (parsed.success) set({ fileText: parsed.data.fileText });
                else console.warn("Invalid fileText:", parsed.error);
            },

            setEditorElement: (el: HTMLTextAreaElement | null) => {
                // runtime-only value; we still validate shape via the schema
                const parsed = FileMetaSchema.pick({ editorElement: true }).safeParse({ editorElement: el });
                if (parsed.success) set({ editorElement: parsed.data.editorElement });
                else console.warn("Invalid editorElement:", parsed.error);
            },

            setCursorPos: (pos: { start: number; end: number }) => {
                const parsed = FileMetaSchema.pick({ cursorPos: true }).safeParse({ cursorPos: pos });
                if (parsed.success) set({ cursorPos: parsed.data.cursorPos });
                else console.warn("Invalid cursorPos:", parsed.error);
            },

            setFontFamily: (font: string) => {
                const parsed = FileMetaSchema.pick({ fontFamily: true }).safeParse({ fontFamily: font });
                if (parsed.success) set({ fontFamily: parsed.data.fontFamily });
                else console.warn("Invalid fontFamily:", parsed.error);
            },

            setCreatedAt: (date: Date) => {
                const parsed = FileMetaSchema.pick({ createdAt: true }).safeParse({
                    createdAt: date,
                });

                if (parsed.success) {
                    set({ createdAt: parsed.data.createdAt });
                } else {
                    console.warn("Invalid createdAt:", parsed.error);
                }
            },
            setLastModified: (date: Date) => {
                const parsed = FileMetaSchema.pick({ lastModified: true }).safeParse({
                    lastModified: date,
                });

                if (parsed.success) {
                    set({ lastModified: parsed.data.lastModified });
                } else {
                    console.warn("Invalid lastModified:", parsed.error);
                }
            },
        }),
        {
            name: "file-meta-storage",
            // exclude runtime-only fields from persisted snapshot
            partialize: (state) => {
                const rest = typeof state === "object" && state !== null ? { ...state } : {};
                delete (rest as Record<string, unknown>).editorElement;
                return rest;
            },
            // validate persisted snapshot on rehydrate
            onRehydrateStorage:
                () =>
                    (persistedState) => {
                        if (!persistedState) return;
                        const parsed = FileMetaSchema.safeParse(persistedState);
                        if (!parsed.success) {
                            console.warn("Invalid persisted file-meta, ignoring persisted state:", parsed.error);
                            // If you want to clear persisted storage programmatically:
                            // get().setFileText(""); etc. Or return undefined to let defaults remain.
                        } else {
                            // optionally migrate/normalize parsed.data here before it's applied
                        }
                    },
        }
    )
);
