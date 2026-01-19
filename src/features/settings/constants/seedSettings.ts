import { SupabaseClient } from "@supabase/supabase-js";
import {
    DEFAULT_GENERAL_SETTINGS,
    DEFAULT_EDITOR_SETTINGS,
    DEFAULT_APPEARANCE_SETTINGS,
    DEFAULT_BEHAVIOUR_SETTINGS,
    DEFAULT_FILE_STORAGE_SETTINGS,
    DEFAULT_PRIVACY_SETTINGS,
    DEFAULT_ABOUT_SETTINGS,
} from "./defaultSettings";

export function buildSettingsRow(userId: string) {
    return {
        user_id: userId,

        // General
        defaultFileName: DEFAULT_GENERAL_SETTINGS.defaultFileName ?? "Untitled",
        openLastFile: DEFAULT_GENERAL_SETTINGS.openLastFile,
        confirmBeforeClosing: DEFAULT_GENERAL_SETTINGS.confirmBeforeClosing,
        autoSave: DEFAULT_GENERAL_SETTINGS.autoSave,
        autoSaveInterval: DEFAULT_GENERAL_SETTINGS.autoSaveInterval,
        defaultSaveFormat: DEFAULT_GENERAL_SETTINGS.defaultSaveFormat,

        // Editor
        fontFamily: DEFAULT_EDITOR_SETTINGS.fontFamily,
        fontSize: DEFAULT_EDITOR_SETTINGS.fontSize,
        lineHeight: DEFAULT_EDITOR_SETTINGS.lineHeight,
        wordWrap: DEFAULT_EDITOR_SETTINGS.wordWrap,
        showLineNumbers: DEFAULT_EDITOR_SETTINGS.showLineNumbers,
        highlightActiveLine: DEFAULT_EDITOR_SETTINGS.highlightActiveLine,
        cursorStyle: DEFAULT_EDITOR_SETTINGS.cursorStyle,

        // Appearance
        themeMode: DEFAULT_APPEARANCE_SETTINGS.themeMode,
        accentColor: DEFAULT_APPEARANCE_SETTINGS.accentColor,
        editorBgOpacity: DEFAULT_APPEARANCE_SETTINGS.editorBgOpacity,
        showStatusBar: DEFAULT_APPEARANCE_SETTINGS.showStatusBar,
        compactMode: DEFAULT_APPEARANCE_SETTINGS.compactMode,

        // Behaviour
        tabSize: DEFAULT_BEHAVIOUR_SETTINGS.tabSize,
        insertSpaces: DEFAULT_BEHAVIOUR_SETTINGS.insertSpaces,
        smartIndentation: DEFAULT_BEHAVIOUR_SETTINGS.smartIndentation,
        trimTrailingWhitespace: DEFAULT_BEHAVIOUR_SETTINGS.trimTrailingWhitespace,
        restoreCursorPosition: DEFAULT_BEHAVIOUR_SETTINGS.restoreCursorPosition,

        // File storage
        defaultSaveLocation: DEFAULT_FILE_STORAGE_SETTINGS.defaultSaveLocation,
        askLocationBeforeSave: DEFAULT_FILE_STORAGE_SETTINGS.askLocationBeforeSave,
        maxRecentFiles: DEFAULT_FILE_STORAGE_SETTINGS.maxRecentFiles,

        // Privacy
        storeLocally: DEFAULT_PRIVACY_SETTINGS.storeLocally,
        syncSettings: DEFAULT_PRIVACY_SETTINGS.syncSettings,

        // About
        version: DEFAULT_ABOUT_SETTINGS.version,
        build: DEFAULT_ABOUT_SETTINGS.build,
    };
}
export async function seedSettings(
    supabase: SupabaseClient,
) {
    const userId = process.env.NEXT_PUBLIC_SUPABASE_SETTINGS_USER_UUID;
    const row = buildSettingsRow(userId!);

    const { error } = await supabase
        .from("settings")
        .update(row).eq("user_id", userId);

    if (error) throw error;
}
