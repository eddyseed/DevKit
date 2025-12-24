"use client";

import { useState, useEffect } from "react";
import styles from "./OpenFileDialog.module.css";
import { db } from "@/firebase/firestore";
import { useFileStore } from "@/features/notepad/lib/fileStore";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

interface OpenFileDialogProps {
    onClose: () => void;
}

export function OpenFileDialog({ onClose }: OpenFileDialogProps) {
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );
    const [fileList, setFileList] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { setCurrentFile, setFileText, setSavedStatus } = useFileStore.getState();

    // Fetch files when date changes
    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            setError(null);
            setFileList([]);
            setSelectedFile(null);

            try {
                const collectionName = `notes-${selectedDate}`;
                const collRef = collection(db, collectionName);
                const snapshot = await getDocs(collRef);

                if (snapshot.empty) {
                    toast.error(`No files found for ${selectedDate}`);
                    setFileList([]);
                    return;
                }

                const files: string[] = [];
                snapshot.forEach((doc) => files.push(doc.id));
                setFileList(files);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch files.");
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [selectedDate]);

    const handleOpen = async () => {
        if (!selectedFile) {
            setError("Please select a file to open");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const collectionName = `notes-${selectedDate}`;
            const fileRef = doc(db, collectionName, selectedFile);
            const fileSnap = await getDoc(fileRef);

            if (!fileSnap.exists()) {
                toast.error(`File "${selectedFile}" does not exist.`);
                return;
            }

            const fileData = fileSnap.data();
            const textContent = fileData?.text || "";

            setCurrentFile(selectedFile, textContent.length);
            setFileText(textContent);
            setSavedStatus(true);

            toast.success(`Opened file "${selectedFile}" successfully.`);
            onClose();
        } catch (err) {
            console.error(err);
            setError("Failed to open file.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.root}>
            <h2 className={styles.title}>Open File</h2>

            <label className={styles.label}>Select Date</label>
            <input
                type="date"
                className={styles.input}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                disabled={loading}
            />

            <label className={styles.label}>Select File</label>
            {fileList.length > 0 ? (
                <select
                    className={styles.input}
                    value={selectedFile || ""}
                    onChange={(e) => setSelectedFile(e.target.value)}
                    disabled={loading}
                >
                    <option value="" disabled>
                        -- Choose a file --
                    </option>
                    {fileList.map((file) => (
                        <option key={file} value={file}>
                            {file}
                        </option>
                    ))}
                </select>
            ) : (
                <p className={styles.error}>No files available for this date.</p>
            )}

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
                    disabled={loading || !selectedFile}
                >
                    {loading ? "Opening…" : "Open"}
                </button>
            </div>
        </div>
    );
}
