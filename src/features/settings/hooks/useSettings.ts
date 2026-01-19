import { useSettingsStore } from "../store/settings.store";
import {
    GeneralSchema,
    EditorSchema,
    AppearanceSchema,
    BehaviourSchema,
    FileStorageSchema,
    PrivacySchema,
} from "../config/notepad/settings.schema";
import type {
    GeneralSettings,
    EditorSettings,
    AppearanceSettings,
    BehaviourSettings,
    FileStorageSettings,
    PrivacySettings,
} from "../config/notepad/settings.schema";

export function useSettings() {
    const {
        general,
        editor,
        appearance,
        behaviour,
        fileStorage,
        privacy,

        updateGeneral,
        updateEditor,
        updateAppearance,
        updateBehaviour,
        updateFileStorage,
        updatePrivacy,
        resetSettings,
    } = useSettingsStore();

    return {
        // state
        general,
        editor,
        appearance,
        behaviour,
        fileStorage,
        privacy,

        setGeneral: (data: Partial<GeneralSettings>) => {
            const next = { ...general, ...data };

            const parsed = GeneralSchema.safeParse(next);

            if (!parsed.success) {
                if (process.env.NODE_ENV === "development") {
                    console.group("[Settings] General update blocked");
                    console.log("Attempted patch:", data);
                    console.log("Current state:", general);
                    console.log("Next state:", next);
                    console.log("Zod issues:", parsed.error.format());
                    console.groupEnd();
                }
                return;
            }

            if (process.env.NODE_ENV === "development") {
                console.log("[Settings] General updated:", data);
            }

            updateGeneral(data);
        },

        setEditor: (data: Partial<EditorSettings>) => {
            const next = { ...editor, ...data };
            const parsed = EditorSchema.safeParse(next);

            if (!parsed.success) {
                if (process.env.NODE_ENV === "development") {
                    console.group("[Settings] Editor update blocked");
                    console.log("Attempted patch:", data);
                    console.log("Current state:", editor);
                    console.log("Next state:", next);
                    console.log("Zod issues:", parsed.error.format());
                    console.groupEnd();
                }
                return;
            }

            if (process.env.NODE_ENV === "development") {
                console.log("[Settings] Editor updated:", data);
            }

            updateEditor(data);
        },

        setAppearance: (data: Partial<AppearanceSettings>) => {
            const next = { ...appearance, ...data };
            const parsed = AppearanceSchema.safeParse(next);

            if (!parsed.success) return;
            updateAppearance(data);
        },

        setBehaviour: (data: Partial<BehaviourSettings>) => {
            const next = { ...behaviour, ...data };
            const parsed = BehaviourSchema.safeParse(next);

            if (!parsed.success) return;
            updateBehaviour(data);
        },

        setFileStorage: (data: Partial<FileStorageSettings>) => {
            const next = { ...fileStorage, ...data };
            const parsed = FileStorageSchema.safeParse(next);

            if (!parsed.success) return;
            updateFileStorage(data);
        },

        setPrivacy: (data: Partial<PrivacySettings>) => {
            const next = { ...privacy, ...data };
            const parsed = PrivacySchema.safeParse(next);

            if (!parsed.success) return;
            updatePrivacy(data);
        },

        resetAll: resetSettings,
    };
}
