import { CloudKeepFile } from '../types/file';
import { getFileIcon, isPreviewable } from '../utils/fileIcons';
import { formatFileSize, formatDate } from '../utils/formatters';
import styles from '../styles/FileGrid.module.css';

interface FileGridProps {
    files: CloudKeepFile[];
    selectedFile: CloudKeepFile | null;
    onFileSelect: (file: CloudKeepFile) => void;
    onFileDelete: (file: CloudKeepFile) => void;
}

export default function FileGrid({
    files,
    selectedFile,
    onFileSelect,
    onFileDelete,
}: FileGridProps) {
    if (files.length === 0) {
        return (
            <div className={styles.empty}>
                <span className={styles.emptyIcon}>📂</span>
                <p className={styles.emptyText}>No files in this folder</p>
                <p className={styles.emptySubtext}>
                    Upload files to get started
                </p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {files.map((file) => (
                <div
                    key={file.id}
                    className={`${styles.card} ${selectedFile?.id === file.id ? styles.selected : ''
                        }`}
                    onClick={() => onFileSelect(file)}
                >
                    <button
                        className={styles.deleteButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            onFileDelete(file);
                        }}
                        title="Delete file"
                    >
                        ✕
                    </button>

                    <div className={styles.iconContainer}>
                        <span className={styles.icon}>{getFileIcon(file.name)}</span>
                        {isPreviewable(file.name) && (
                            <span className={styles.previewBadge}>👁️</span>
                        )}
                    </div>

                    <div className={styles.content}>
                        <h4 className={styles.fileName} title={file.name}>
                            {file.name}
                        </h4>
                        <div className={styles.meta}>
                            <span className={styles.size}>{formatFileSize(file.size)}</span>
                            <span className={styles.date}>{formatDate(file.created_at)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}