"use client";

import { useEffect, useState } from "react";
import styles from "./NewFileDialog.module.css";
import { handleFileSaveAs } from "@/features/notepad/handlers/saveAs";
import { useSettings } from "@/features/settings/hooks/useSettings";
import { generateAIResponse } from "@/features/notepad/utils/generateResponse";
import { useFileStore } from "@/features/notepad/lib/fileStore";

const FILE_FORMATS = [
    { label: "Text File (.txt)", value: "txt" },
    { label: "Markdown (.md)", value: "md" },
    { label: "JSON (.json)", value: "json" },
    { label: "JavaScript (.js)", value: "js" },
    { label: "TypeScript (.ts)", value: "ts" },
    { label: "HTML (.html)", value: "html" },
    { label: "CSS (.css)", value: "css" },
];

interface NewFileDialogProps {
    onClose: () => void;
}

export function NewFileDialog({ onClose }: NewFileDialogProps) {
    const { general } = useSettings();
    const { fileText, setFileText } = useFileStore();
    const [fileName, setFileName] = useState("");
    const [format, setFormat] = useState("txt");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function generateFileName() {
            const prompt = fileText + `\n\nI want to save this as a file and I will manage the file format myself. Your task is strictly limited to suggesting an appropriate filename. The output must contain only the filename and nothing else. The filename should be one or two words only, written entirely in lowercase, formatted in snake_case, with no spaces and no special characters. Do not include any explanations, comments, or additional text.`;
            const recieved_file_name = await generateAIResponse(
                prompt,
                process.env.PRIMARY_AI_MODEL ?? "llama-3.1-8b-instant"
            );
            if (recieved_file_name) {
                setFileName(recieved_file_name);
            } else {
                setFileName(general.defaultFileName!)
            }
            setFileText(fileText);
        }

        generateFileName();
    }, [fileText, general.defaultFileName, setFileText]);

    useEffect(() => {
        setFormat(general.defaultSaveFormat)
    }, [general.defaultSaveFormat])

    const handleCreate = async () => {
        if (!general.defaultFileName?.trim()) {
            setError("File name is required");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await handleFileSaveAs(fileText, fileName.trim(), format);
            onClose();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Failed to create file");
            } else {
                setError("Failed to create file");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.root}>
            <h2 className={styles.title}>New File</h2>

            <div className={styles.field}>
                <label>File name</label>
                <input
                    autoFocus
                    value={fileName}
                    className={styles.input}
                    placeholder="Untitled"
                    onChange={(e) => setFileName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                    disabled={loading}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>File format</label>
                <select
                    value={format}
                    className={styles.select}
                    onChange={(e) => setFormat(e.target.value)}
                    disabled={loading}
                >
                    {FILE_FORMATS.map((f) => (
                        <option key={f.value} value={f.value}>
                            {f.label}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.footer}>
                <button onClick={onClose} disabled={loading}>
                    Cancel
                </button>
                <button
                    className={styles.primary}
                    onClick={handleCreate}
                    disabled={loading}
                >
                    {loading ? "Creating…" : "Create"}
                </button>
            </div>
        </div>
    );
}
