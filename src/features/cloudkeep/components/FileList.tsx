import { CloudKeepFile } from '../types/file';
import { getFileIcon, isPreviewable } from '../utils/fileIcons';
import { formatFileSize, formatDate } from '../utils/formatters';
import styles from '../styles/FileList.module.css';

interface FileListProps {
    files: CloudKeepFile[];
    selectedFile: CloudKeepFile | null;
    onFileSelect: (file: CloudKeepFile) => void;
    onFileDelete: (file: CloudKeepFile) => void;
}

export default function FileList({
    files,
    selectedFile,
    onFileSelect,
    onFileDelete,
}: FileListProps) {
    if (files.length === 0) {
        return (
            <div className={styles.empty}>
                <span className={styles.emptyIcon}>📂</span>
                <p className={styles.emptyText}>No files in this folder</p>
                <p className={styles.emptySubtext}>Upload files to get started</p>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <div className={styles.headerCell} style={{ flex: '2' }}>
                    Name
                </div>
                <div className={styles.headerCell} style={{ flex: '1' }}>
                    Size
                </div>
                <div className={styles.headerCell} style={{ flex: '1' }}>
                    Modified
                </div>
                <div className={styles.headerCell} style={{ width: '80px' }}>
                    Actions
                </div>
            </div>

            <div className={styles.rows}>
                {files.map((file) => (
                    <div
                        key={file.id}
                        className={`${styles.row} ${selectedFile?.id === file.id ? styles.selected : ''
                            }`}
                        onClick={() => onFileSelect(file)}
                    >
                        <div className={styles.cell} style={{ flex: '2' }}>
                            <span className={styles.icon}>{getFileIcon(file.name)}</span>
                            <span className={styles.fileName} title={file.name}>
                                {file.name}
                            </span>
                            {isPreviewable(file.name) && (
                                <span className={styles.previewBadge}>👁️</span>
                            )}
                        </div>

                        <div className={styles.cell} style={{ flex: '1' }}>
                            {formatFileSize(file.size)}
                        </div>

                        <div className={styles.cell} style={{ flex: '1' }}>
                            {formatDate(file.created_at)}
                        </div>

                        <div className={styles.cell} style={{ width: '80px' }}>
                            <button
                                className={styles.deleteButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileDelete(file);
                                }}
                                title="Delete file"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}