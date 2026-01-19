export type SettingsDialogType =
    | "notepad"
    | "cloudkeep"
    | null;

export interface SettingsDialogState {
    type: SettingsDialogType;
    props?: Record<string, unknown>;
}