import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchSettings } from "../data/cloud_settings.api";
import {
    DEFAULT_ABOUT_SETTINGS,
    DEFAULT_APPEARANCE_SETTINGS,
    DEFAULT_BEHAVIOUR_SETTINGS,
    DEFAULT_EDITOR_SETTINGS,
    DEFAULT_FILE_STORAGE_SETTINGS,
    DEFAULT_GENERAL_SETTINGS,
    DEFAULT_PRIVACY_SETTINGS,
} from "../constants/defaultSettings";

import type {
    AboutSettings,
    AppearanceSettings,
    EditorSettings,
    BehaviourSettings,
    FileStorageSettings,
    GeneralSettings,
    PrivacySettings,
} from "../config/notepad/settings.schema";
import { supabase } from "@/lib/supabase/client";

export interface SettingsState {
    general: GeneralSettings;
    editor: EditorSettings;
    appearance: AppearanceSettings;
    behaviour: BehaviourSettings;
    fileStorage: FileStorageSettings;
    privacy: PrivacySettings;
    about: AboutSettings;

    // actions
    updateGeneral: (data: Partial<GeneralSettings>) => void;
    updateEditor: (data: Partial<EditorSettings>) => void;
    updateAppearance: (data: Partial<AppearanceSettings>) => void;
    updateBehaviour: (data: Partial<BehaviourSettings>) => void;
    updateFileStorage: (data: Partial<FileStorageSettings>) => void;
    updatePrivacy: (data: Partial<PrivacySettings>) => void;

    hydrateFromCloud: () => Promise<void>;
    syncSettingsToCloud: () => Promise<void>;
    resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            general: DEFAULT_GENERAL_SETTINGS,
            editor: DEFAULT_EDITOR_SETTINGS,
            appearance: DEFAULT_APPEARANCE_SETTINGS,
            behaviour: DEFAULT_BEHAVIOUR_SETTINGS,
            fileStorage: DEFAULT_FILE_STORAGE_SETTINGS,
            privacy: DEFAULT_PRIVACY_SETTINGS,
            about: DEFAULT_ABOUT_SETTINGS,

            updateGeneral: (data) =>
                set((state) => ({
                    general: { ...state.general, ...data },
                })),

            updateEditor: (data) =>
                set((state) => ({
                    editor: { ...state.editor, ...data },
                })),

            updateAppearance: (data) =>
                set((state) => ({
                    appearance: { ...state.appearance, ...data },
                })),
            updateBehaviour: (data) =>
                set((state) => ({
                    behaviour: { ...state.behaviour, ...data },
                })),
            updateFileStorage: (data) =>
                set((state) => ({
                    fileStorage: { ...state.fileStorage, ...data },
                })),

            updatePrivacy: (data) =>
                set((state) => ({
                    privacy: { ...state.privacy, ...data },
                })),

            resetSettings: () =>
                set({
                    general: DEFAULT_GENERAL_SETTINGS,
                    editor: DEFAULT_EDITOR_SETTINGS,
                    appearance: DEFAULT_APPEARANCE_SETTINGS,
                    fileStorage: DEFAULT_FILE_STORAGE_SETTINGS,
                    privacy: DEFAULT_PRIVACY_SETTINGS,
                }),
            hydrateFromCloud: async () => {
                const { privacy } = get();

                if (!privacy.syncSettings) return;

                try {
                    const remoteSettings = await fetchSettings();
                    if (!remoteSettings) {
                        console.error("No settings record found on cloud database...");
                        return;
                    }

                    set({
                        general: remoteSettings.general,
                        editor: remoteSettings.editor,
                        appearance: remoteSettings.appearance,
                        behaviour: remoteSettings.behaviour,
                        fileStorage: remoteSettings.fileStorage,
                        privacy: remoteSettings.privacy,
                    });
                } catch (err) {
                    console.error("Failed to hydrate settings from cloud", err);
                }
            },
            syncSettingsToCloud: async () => {
                const { privacy } = get();

                if (!privacy.syncSettings) return;

                try {
                    const s = get();


                    const { error } = await supabase
                        .from("settings")
                        .update({

                            defaultFileName: s.general.defaultFileName,
                            openLastFile: s.general.openLastFile,
                            confirmBeforeClosing: s.general.confirmBeforeClosing,
                            autoSave: s.general.autoSave,
                            autoSaveInterval: s.general.autoSaveInterval,
                            defaultSaveFormat: s.general.defaultSaveFormat,

                            fontFamily: s.editor.fontFamily,
                            fontSize: s.editor.fontSize,
                            lineHeight: s.editor.lineHeight,
                            wordWrap: s.editor.wordWrap,
                            showLineNumbers: s.editor.showLineNumbers,
                            highlightActiveLine: s.editor.highlightActiveLine,
                            cursorStyle: s.editor.cursorStyle,

                            themeMode: s.appearance.themeMode,
                            accentColor: s.appearance.accentColor,
                            editorBgOpacity: s.appearance.editorBgOpacity,
                            showStatusBar: s.appearance.showStatusBar,
                            compactMode: s.appearance.compactMode,

                            tabSize: s.behaviour.tabSize,
                            insertSpaces: s.behaviour.insertSpaces,
                            smartIndentation: s.behaviour.smartIndentation,
                            trimTrailingWhitespace: s.behaviour.trimTrailingWhitespace,
                            restoreCursorPosition: s.behaviour.restoreCursorPosition,

                            defaultSaveLocation: s.fileStorage.defaultSaveLocation,
                            askLocationBeforeSave: s.fileStorage.askLocationBeforeSave,
                            maxRecentFiles: s.fileStorage.maxRecentFiles,

                            storeLocally: s.privacy.storeLocally,
                            syncSettings: s.privacy.syncSettings,
                        })
                        .eq("user_id", process.env.NEXT_PUBLIC_SUPABASE_SETTINGS_USER_UUID);

                    if (error) {
                        throw error;
                    }

                    console.log("Settings synced to Supabase");
                } catch (err) {
                    console.error("Failed to sync settings to Supabase", err);
                }
            },
        }),

        {
            name: "app-settings",
            version: 1,
        }

    )


);
