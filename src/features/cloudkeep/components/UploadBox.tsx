import React, { useRef, useState } from 'react';
import { UploadProgress } from '../types/file';
import styles from '../styles/UploadBox.module.css';

interface UploadBoxProps {
    onUpload: (files: FileList, folderPath: string) => void;
    currentFolder: string;
    uploadProgress: UploadProgress[];
}

export default function UploadBox({
    onUpload,
    currentFolder,
    uploadProgress,
}: UploadBoxProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onUpload(e.dataTransfer.files, currentFolder);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload(e.target.files, currentFolder);
            e.target.value = '';
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.uploadBox} ${isDragging ? styles.dragging : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className={styles.fileInput}
                />
                <div className={styles.uploadContent}>
                    <span className={styles.uploadIcon}>📤</span>
                    <p className={styles.uploadText}>
                        Drop files here or click to upload
                    </p>
                    {currentFolder && (
                        <p className={styles.uploadPath}>
                            Uploading to: /{currentFolder}
                        </p>
                    )}
                </div>
            </div>

            {uploadProgress.length > 0 && (
                <div className={styles.progressContainer}>
                    {uploadProgress.map((progress, idx) => (
                        <div key={idx} className={styles.progressItem}>
                            <div className={styles.progressHeader}>
                                <span className={styles.fileName}>{progress.fileName}</span>
                                <span
                                    className={`${styles.status} ${styles[progress.status]}`}
                                >
                                    {progress.status === 'uploading' && '⏳'}
                                    {progress.status === 'complete' && '✓'}
                                    {progress.status === 'error' && '✕'}
                                </span>
                            </div>
                            {progress.status === 'uploading' && (
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${progress.progress}%` }}
                                    />
                                </div>
                            )}
                            {progress.error && (
                                <p className={styles.error}>{progress.error}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}