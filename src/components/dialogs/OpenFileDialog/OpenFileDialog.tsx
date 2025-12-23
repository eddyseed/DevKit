"use client";

import { useState } from "react";
import styles from "./OpenFileDialog.module.css";
import { openFileByName } from "@/features/notepad/handlers/fileOpen";

interface OpenFileDialogProps {
    onClose: () => void;
}

export function OpenFileDialog({ onClose }: OpenFileDialogProps) {
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOpen = async () => {
        const trimmed = fileName.trim();
        if (!trimmed) {
            setError("File name is required");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await openFileByName(trimmed);
            onClose();
        } catch (err: unknown) {
            setError(err.message || "Failed to open file");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.root}>
            <h2 className={styles.title}>Open File</h2>

            <label className={styles.label}>File name</label>
            <input
                autoFocus
                className={styles.input}
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="example.txt"
                onKeyDown={(e) => e.key === "Enter" && handleOpen()}
                disabled={loading}
            />

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.footer}>
                <button
                    onClick={onClose}
                    className={styles.secondary}
                    disabled={loading}
                >
                    Cancel
                </button>

                <button
                    onClick={handleOpen}
                    className={styles.primary}
                    disabled={loading}
                >
                    {loading ? "Opening…" : "Open"}
                </button>
            </div>
        </div>
    );
}
