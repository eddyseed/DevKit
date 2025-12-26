import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ViewMode, CloudKeepFile } from './types/file';
import { useCloudKeep } from './hooks/useCloudKeep';
import UploadBox from './components/UploadBox';
import FolderTree from './components/FolderTree';
import FileGrid from './components/FileGrid';
import FileList from './components/FileList';
import FileDetails from './components/FileDetails';
import SearchBar from './components/SearchBar';
import ViewToggle from './components/ViewToggle';
import styles from './styles/CloudKeep.module.css';

export default function CloudKeep() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentFolder, setCurrentFolder] = useState('');
    const [selectedFile, setSelectedFile] = useState<CloudKeepFile | null>(null);

    const {
        files,
        loading,
        error,
        uploadProgress,
        uploadFiles,
        deleteFile,
        downloadFile,
        getSignedUrl,
        createFolder,
    } = useCloudKeep();


    useEffect(() => {
        const isAuthenticated = localStorage.getItem('cloudkeep_auth');
        if (isAuthenticated !== 'true') {
            router.push('/');
        }
    }, [router]);

    // Filter files by current folder and search query
    const filteredFiles = useMemo(() => {
        let result = files;

        // Filter by folder
        if (currentFolder) {
            result = result.filter((file: { path: string; }) => {
                const fileFolder = file.path.substring(
                    0,
                    file.path.lastIndexOf('/')
                );
                return fileFolder === currentFolder;
            });
        } else {
            // Root level - files with no folder path
            result = result.filter((file: { path: string | string[]; }) => !file.path.includes('/'));
        }

        // Filter by search query
        if (searchQuery) {
            result = result.filter((file: { name: string; }) =>
                file.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return result;
    }, [files, currentFolder, searchQuery]);

    const handleFileDelete = async (file: CloudKeepFile) => {
        if (
            window.confirm(`Are you sure you want to delete "${file.name}"?`)
        ) {
            try {
                await deleteFile(file.path);
                if (selectedFile?.id === file.id) {
                    setSelectedFile(null);
                }
            } catch {
                alert('Failed to delete file');
            }
        }
    };

    const handleCreateFolder = () => {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            const folderPath = currentFolder
                ? `${currentFolder}/${folderName}`
                : folderName;
            createFolder(folderPath);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('cloudkeep_auth');
        router.push('/');
    };

    if (loading && files.length === 0) {
        return (
            <div className={styles.loading}>
                <span className={styles.spinner}>⏳</span>
                <p>Loading your files...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h1 className={styles.logo}>🔐 CloudKeep</h1>
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                </div>

                <FolderTree
                    files={files}
                    currentFolder={currentFolder}
                    onFolderSelect={setCurrentFolder}
                    onCreateFolder={handleCreateFolder}
                />
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h2 className={styles.currentPath}>
                            📁 {currentFolder || 'Root'}
                        </h2>
                    </div>

                    <div className={styles.headerRight}>
                        <SearchBar value={searchQuery} onChange={setSearchQuery} />
                        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
                    </div>
                </header>

                {/* Upload Box */}
                <UploadBox
                    onUpload={uploadFiles}
                    currentFolder={currentFolder}
                    uploadProgress={uploadProgress}
                />

                {/* Error Display */}
                {error && <div className={styles.error}>{error}</div>}

                {/* File Display */}
                <div className={styles.content}>
                    {viewMode === 'grid' ? (
                        <FileGrid
                            files={filteredFiles}
                            selectedFile={selectedFile}
                            onFileSelect={setSelectedFile}
                            onFileDelete={handleFileDelete}
                        />
                    ) : (
                        <FileList
                            files={filteredFiles}
                            selectedFile={selectedFile}
                            onFileSelect={setSelectedFile}
                            onFileDelete={handleFileDelete}
                        />
                    )}
                </div>
            </main>

            {/* Details Panel */}
            <aside className={styles.detailsPanel}>
                <FileDetails
                    file={selectedFile}
                    onClose={() => setSelectedFile(null)}
                    onDownload={downloadFile}
                    getSignedUrl={getSignedUrl}
                />
            </aside>
        </div>
    );
}