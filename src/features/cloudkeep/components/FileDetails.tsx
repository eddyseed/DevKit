import { useState, useEffect } from 'react';;
import { CloudKeepFile } from '../types/file';
import { getFileIcon, isImageFile, isPdfFile } from '../utils/fileIcons';
import { formatFileSize, formatDate } from '../utils/formatters';
import styles from '../styles/FileDetails.module.css';

interface FileDetailsProps {
    file: CloudKeepFile | null;
    onClose: () => void;
    onDownload: (file: CloudKeepFile) => void;
    getSignedUrl: (path: string) => Promise<string>;
}

export default function FileDetails({
    file,
    onClose,
    onDownload,
    getSignedUrl,
}: FileDetailsProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loadingPreview, setLoadingPreview] = useState(false);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        const canPreview = isImageFile(file.name) || isPdfFile(file.name);
        if (!canPreview) {
            setPreviewUrl(null);
            return;
        }

        setLoadingPreview(true);
        getSignedUrl(file.path)
            .then((url) => {
                setPreviewUrl(url);
            })
            .catch((err) => {
                console.error('Failed to load preview:', err);
                setPreviewUrl(null);
            })
            .finally(() => {
                setLoadingPreview(false);
            });
    }, [file, getSignedUrl]);
    if (!file) {
        return (
            <div className={styles.panel}>
                <div className={styles.emptyState}>
                    <span className={styles.emptyIcon}>📄</span>
                    <p className={styles.emptyText}>Select a file to view details</p>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <h3 className={styles.title}>File Details</h3>
                <button onClick={onClose} className={styles.closeButton}>
                    ✕
                </button>
            </div>
            <div className={styles.content}>
                {/* Preview Section */}
                {loadingPreview && (
                    <div className={styles.previewLoading}>
                        <span className={styles.spinner}>⏳</span>
                        <p>Loading preview...</p>
                    </div>
                )}

                {!loadingPreview && previewUrl && isImageFile(file.name) && (
                    <div className={styles.preview}>
                        <img
                            src={previewUrl}
                            alt={file.name}
                            className={styles.previewImage}
                            style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }}
                        />
                    </div>
                )}

                {previewUrl && isPdfFile(file.name) && !loadingPreview && (
                    <div className={styles.preview}>
                        <iframe
                            src={previewUrl}
                            className={styles.previewPdf}
                            title={file.name}
                        />
                    </div>
                )}

                {!isImageFile(file.name) && !isPdfFile(file.name) && (
                    <div className={styles.iconPreview}>
                        <span className={styles.largeIcon}>{getFileIcon(file.name)}</span>
                    </div>
                )}

                {/* Metadata */}
                <div className={styles.metadata}>
                    <div className={styles.metadataItem}>
                        <span className={styles.label}>Name:</span>
                        <span className={styles.value} title={file.name}>
                            {file.name}
                        </span>
                    </div>

                    <div className={styles.metadataItem}>
                        <span className={styles.label}>Size:</span>
                        <span className={styles.value}>{formatFileSize(file.size)}</span>
                    </div>

                    <div className={styles.metadataItem}>
                        <span className={styles.label}>Type:</span>
                        <span className={styles.value}>{file.type}</span>
                    </div>

                    <div className={styles.metadataItem}>
                        <span className={styles.label}>Path:</span>
                        <span className={styles.value} title={file.path}>
                            /{file.path}
                        </span>
                    </div>

                    <div className={styles.metadataItem}>
                        <span className={styles.label}>Created:</span>
                        <span className={styles.value}>
                            {new Date(file.created_at).toLocaleString()}
                        </span>
                    </div>

                    <div className={styles.metadataItem}>
                        <span className={styles.label}>Modified:</span>
                        <span className={styles.value}>
                            {formatDate(file.updated_at)}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <button
                        onClick={() => onDownload(file)}
                        className={styles.downloadButton}
                    >
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}