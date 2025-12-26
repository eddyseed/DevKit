import { useState, useEffect, useCallback } from 'react';
import { supabase, BUCKET_NAME } from '@/lib/supabase/supabaseClient';
import { CloudKeepFile, UploadProgress } from '../types/file';

export function useCloudKeep() {
    const [files, setFiles] = useState<CloudKeepFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);

    // Fetch all files from bucket
    const fetchFiles = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const { error: listError } = await supabase.storage
                .from(BUCKET_NAME)
                .list('', {
                    limit: 1000,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

            if (listError) throw listError;

            // Recursively list all files in all folders
            const allFiles: CloudKeepFile[] = [];

            const listRecursively = async (path: string = '') => {
                const { data: items, error: err } = await supabase.storage
                    .from(BUCKET_NAME)
                    .list(path, {
                        limit: 1000,
                        sortBy: { column: 'created_at', order: 'desc' },
                    });

                if (err) throw err;
                if (!items) return;

                for (const item of items) {
                    const fullPath = path ? `${path}/${item.name}` : item.name;

                    if (item.id === null) {
                        // It's a folder, recurse into it
                        await listRecursively(fullPath);
                    } else {
                        // It's a file
                        allFiles.push({
                            id: item.id,
                            name: item.name,
                            path: fullPath,
                            size: item.metadata?.size || 0,
                            type: item.metadata?.mimetype || 'application/octet-stream',
                            created_at: item.created_at,
                            updated_at: item.updated_at,
                            metadata: item.metadata,
                        });
                    }
                }
            };

            await listRecursively();
            setFiles(allFiles);
        } catch (err) {
            console.error('Error fetching files:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch files');
        } finally {
            setLoading(false);
        }
    }, []);

    // Upload files to specific folder path
    const uploadFiles = useCallback(
        async (fileList: FileList, folderPath: string = '') => {
            const filesArray = Array.from(fileList);
            const newProgress: UploadProgress[] = filesArray.map((file) => ({
                fileName: file.name,
                progress: 0,
                status: 'uploading',
            }));

            setUploadProgress(newProgress);

            for (let i = 0; i < filesArray.length; i++) {
                const file = filesArray[i];
                const filePath = folderPath
                    ? `${folderPath}/${file.name}`
                    : file.name;

                try {
                    const { error: uploadError } = await supabase.storage
                        .from(BUCKET_NAME)
                        .upload(filePath, file, {
                            cacheControl: '3600',
                            upsert: false,
                        });

                    if (uploadError) throw uploadError;

                    setUploadProgress((prev) =>
                        prev.map((p, idx) =>
                            idx === i ? { ...p, progress: 100, status: 'complete' } : p
                        )
                    );
                } catch (err) {
                    console.error(`Error uploading ${file.name}:`, err);
                    setUploadProgress((prev) =>
                        prev.map((p, idx) =>
                            idx === i
                                ? {
                                    ...p,
                                    status: 'error',
                                    error:
                                        err instanceof Error ? err.message : 'Upload failed',
                                }
                                : p
                        )
                    );
                }
            }

            // Refresh file list after uploads
            await fetchFiles();

            // Clear progress after 3 seconds
            setTimeout(() => {
                setUploadProgress([]);
            }, 3000);
        },
        [fetchFiles]
    );

    // Delete a file
    const deleteFile = useCallback(
        async (filePath: string) => {
            try {
                const { error: deleteError } = await supabase.storage
                    .from(BUCKET_NAME)
                    .remove([filePath]);

                if (deleteError) throw deleteError;

                setFiles((prev) => prev.filter((f) => f.path !== filePath));
            } catch (err) {
                console.error('Error deleting file:', err);
                throw err;
            }
        },
        []
    );

    // Get signed URL for file preview/download
    const getSignedUrl = useCallback(async (filePath: string) => {
        try {
            const { data, error: urlError } = await supabase.storage
                .from(BUCKET_NAME)
                .createSignedUrl(filePath, 3600); // 1 hour expiry

            if (urlError) throw urlError;
            return data.signedUrl;
        } catch (err) {
            console.error('Error getting signed URL:', err);
            throw err;
        }
    }, []);

    // Download a file
    const downloadFile = useCallback(
        async (file: CloudKeepFile) => {
            try {
                const signedUrl = await getSignedUrl(file.path);

                // Create a temporary link and trigger download
                const link = document.createElement('a');
                link.href = signedUrl;
                link.download = file.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (err) {
                console.error('Error downloading file:', err);
                throw err;
            }
        },
        [getSignedUrl]
    );

    // Create a folder (by uploading a .keep file)
    const createFolder = useCallback(
        async (folderPath: string) => {
            try {
                const keepPath = `${folderPath}/.keep`;
                const emptyFile = new File([''], '.keep', { type: 'text/plain' });

                const { error: uploadError } = await supabase.storage
                    .from(BUCKET_NAME)
                    .upload(keepPath, emptyFile);

                if (uploadError) throw uploadError;

                await fetchFiles();
            } catch (err) {
                console.error('Error creating folder:', err);
                throw err;
            }
        },
        [fetchFiles]
    );

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    return {
        files,
        loading,
        error,
        uploadProgress,
        uploadFiles,
        deleteFile,
        getSignedUrl,
        downloadFile,
        createFolder,
        refreshFiles: fetchFiles,
    };
}