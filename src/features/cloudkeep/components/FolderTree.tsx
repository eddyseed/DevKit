import React, { useMemo } from 'react';
import { CloudKeepFile } from '../types/file';
import styles from '../styles/FolderTree.module.css';

interface FolderTreeProps {
    files: CloudKeepFile[];
    currentFolder: string;
    onFolderSelect: (path: string) => void;
    onCreateFolder: () => void;
}

interface FolderNode {
    name: string;
    path: string;
    children: Map<string, FolderNode>;
}

export default function FolderTree({
    files,
    currentFolder,
    onFolderSelect,
    onCreateFolder,
}: FolderTreeProps) {
    const folderTree = useMemo(() => {
        const root: FolderNode = {
            name: 'Root',
            path: '',
            children: new Map(),
        };

        files.forEach((file) => {
            const parts = file.path.split('/');
            parts.pop(); // Remove filename

            let current = root;
            let currentPath = '';

            parts.forEach((part) => {
                currentPath = currentPath ? `${currentPath}/${part}` : part;

                if (!current.children.has(part)) {
                    current.children.set(part, {
                        name: part,
                        path: currentPath,
                        children: new Map(),
                    });
                }

                current = current.children.get(part)!;
            });
        });

        return root;
    }, [files]);

    const renderFolder = (node: FolderNode, level: number = 0) => {
        const isSelected = node.path === currentFolder;
        const hasChildren = node.children.size > 0;

        return (
            <div key={node.path || 'root'} className={styles.folderNode}>
                <div
                    className={`${styles.folderItem} ${isSelected ? styles.selected : ''
                        }`}
                    style={{ paddingLeft: `${level * 16 + 8}px` }}
                    onClick={() => onFolderSelect(node.path)}
                >
                    <span className={styles.folderIcon}>
                        {hasChildren ? '📁' : '📂'}
                    </span>
                    <span className={styles.folderName}>{node.name}</span>
                </div>

                {hasChildren && (
                    <div className={styles.children}>
                        {Array.from(node.children.values()).map((child) =>
                            renderFolder(child, level + 1)
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={styles.folderTree}>
            <div className={styles.header}>
                <h3 className={styles.title}>Folders</h3>
                <button
                    onClick={onCreateFolder}
                    className={styles.createButton}
                    title="Create new folder"
                >
                    +
                </button>
            </div>

            <div className={styles.tree}>{renderFolder(folderTree)}</div>
        </div>
    );
}