export type DialogType =
    | "new-file"
    | "open-file"
    | "save-as"
    | "print"
    | "settings"
    | null;

export interface DialogState {
    type: DialogType;
    props?: Record<string, unknown>;
}