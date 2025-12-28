export interface CloudKeepFile {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
}

export interface FolderNode {
  name: string;
  path: string;
  children: FolderNode[];
  files: CloudKeepFile[];
}

export type ViewMode = 'grid' | 'list';

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
}