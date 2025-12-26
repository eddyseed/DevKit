export function getFileIcon(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase() || '';

    // Image files
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext)) {
        return '🖼️';
    }

    // Documents
    if (['pdf'].includes(ext)) {
        return '📄';
    }
    if (['doc', 'docx'].includes(ext)) {
        return '📝';
    }
    if (['xls', 'xlsx', 'csv'].includes(ext)) {
        return '📊';
    }
    if (['ppt', 'pptx'].includes(ext)) {
        return '📽️';
    }

    // Text files
    if (['txt', 'md', 'log'].includes(ext)) {
        return '📃';
    }

    // Code files
    if (['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'html', 'css'].includes(ext)) {
        return '💻';
    }

    // Archives
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
        return '📦';
    }

    // Video
    if (['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(ext)) {
        return '🎬';
    }

    // Audio
    if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(ext)) {
        return '🎵';
    }

    return '📄';
}

export function getFileColor(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase() || '';

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext)) {
        return '#10b981';
    }
    if (['pdf'].includes(ext)) {
        return '#ef4444';
    }
    if (['doc', 'docx'].includes(ext)) {
        return '#3b82f6';
    }
    if (['xls', 'xlsx', 'csv'].includes(ext)) {
        return '#22c55e';
    }
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
        return '#f59e0b';
    }
    if (['mp4', 'avi', 'mov', 'mkv'].includes(ext)) {
        return '#8b5cf6';
    }
    if (['mp3', 'wav', 'ogg', 'flac'].includes(ext)) {
        return '#ec4899';
    }

    return '#6b7280';
}

export function isImageFile(filename: string): boolean {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext);
}

export function isPdfFile(filename: string): boolean {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    return ext === 'pdf';
}

export function isPreviewable(filename: string): boolean {
    return isImageFile(filename) || isPdfFile(filename);
}