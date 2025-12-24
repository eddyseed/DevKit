"use client";

import { useState } from "react";
import styles from "./NewFileDialog.module.css";
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

interface NewFileDialogProps {
    onClose: () => void;
}

export function NewFileDialog({ onClose }: NewFileDialogProps) {
    const [name, setName] = useState("");
    const [format, setFormat] = useState("txt");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setCurrentFile, setFileText, setSavedStatus } = useFileStore();

    const handleCreate = async () => {
        if (!name.trim()) {
            setError("File name is required");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Create empty content for new file
            const initialText = "";

            await handleFileSaveAs(initialText, name.trim(), format);

            // Update Zustand for editor
            setFileText(initialText);
            setCurrentFile(`${name.trim()}.${format}`, 0);
            setSavedStatus(true);

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
                    value={name}
                    className={styles.input}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="untitled"
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
