import { AboutSettings, AppearanceSettings, BehaviourSettings, EditorSettings, FileStorageSettings, GeneralSettings, PrivacySettings } from '../config/notepad/settings.schema';

export const DEFAULT_GENERAL_SETTINGS: GeneralSettings = {
    defaultFileName: "Untitled",
    openLastFile: false,
    confirmBeforeClosing: true,
    autoSave: false,
    autoSaveInterval: 60,
    defaultSaveFormat: "txt",
};
export const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
    fontFamily: "sans-serif",
    fontSize: 18,
    lineHeight: "1.15",
    wordWrap: true,
    showLineNumbers: false,
    highlightActiveLine: true,
    cursorStyle: "line",
};
export const DEFAULT_APPEARANCE_SETTINGS: AppearanceSettings = {
    themeMode: "system",
    accentColor: "#3B82F6", // calm blue, safe default
    editorBgOpacity: 90,
    showStatusBar: false,
    compactMode: false,
};
export const DEFAULT_BEHAVIOUR_SETTINGS: BehaviourSettings = {
    tabSize: 4,
    insertSpaces: true,
    smartIndentation: true,
    trimTrailingWhitespace: true,
    restoreCursorPosition: false,
}
export const DEFAULT_FILE_STORAGE_SETTINGS: FileStorageSettings = {
    defaultSaveLocation: "Downloads",
    askLocationBeforeSave: true,
    maxRecentFiles: 10,
};
export const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
    storeLocally: false,
    syncSettings: true, // must be false to satisfy refine rule
};
export const DEFAULT_ABOUT_SETTINGS: AboutSettings = {
    version: "1.0.0",
    build: "stable",
};
