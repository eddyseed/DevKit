"use client";

import { useState } from "react";
import styles from "./SaveAsDialog.module.css";
import { handleFileSaveAs } from "@/features/notepad/handlers/saveAs";
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

interface SaveAsDialogProps {
    onClose: () => void;
}

export function SaveAsDialog({ onClose }: SaveAsDialogProps) {
    const [name, setName] = useState("");
    const [format, setFormat] = useState("txt");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { fileText } = useFileStore();
    const handleSave = async () => {
        if (!name.trim()) {
            setError("File name is required");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await handleFileSaveAs(fileText ?? "", name.trim(), format);
            onClose();
        } catch (err: any) {
            setError(err.message || "Failed to save file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.root}>
            <h2 className={styles.title}>Save As</h2>

            <div className={styles.field}>
                <label className={styles.label}>File name</label>
                <input
                    autoFocus
                    value={name}
                    className={styles.input}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="my-notes"
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    disabled={loading}
                />
            </div>

            <div className={styles.field}>
                <label>File format</label>
                <select
                    className={styles.select}
                    value={format}
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
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? "Saving…" : "Save"}
                </button>
            </div>
        </div>
    );
}
