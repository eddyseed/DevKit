import { z } from "zod";
export const GeneralSchema = z.object({
    defaultFileName: z.string().trim().optional(),
    openLastFile: z.boolean(),
    confirmBeforeClosing: z.boolean(),
    autoSave: z.boolean(),
    autoSaveInterval: z.union([
        z.literal(10),
        z.literal(30),
        z.literal(60),
        z.literal(300),
    ]),
    defaultSaveFormat: z.union([
        z.literal('txt'),
        z.literal('md'),
        z.literal('docx'),
    ]),
})
export type GeneralSettings = z.infer<typeof GeneralSchema>;

export const FONT_FAMILIES = ["monospace", "serif", "sans-serif"] as const;
export const LINE_HEIGHTS = ["1.0", "1.15", "1.5", "1.75", "2.0"] as const;
export const CURSOR_STYLES = ["block", "line", "underline"] as const;


export const EditorSchema = z.object({
    fontFamily: z.enum(FONT_FAMILIES),

    fontSize: z.number().min(10).max(24),

    lineHeight: z.enum(LINE_HEIGHTS),

    wordWrap: z.boolean(),
    showLineNumbers: z.boolean(),
    highlightActiveLine: z.boolean(),

    cursorStyle: z.enum(CURSOR_STYLES),
});
export type EditorSettings = z.infer<typeof EditorSchema>;

export type FontFamily = (typeof FONT_FAMILIES)[number];
export type LineHeight = (typeof LINE_HEIGHTS)[number];
export type CursorStyle = (typeof CURSOR_STYLES)[number];

export const THEME_MODES = ["light", "dark", "system"] as const;
export const AppearanceSchema = z.object({
    // Theme Mode: Based on your radio buttons
    themeMode: z.enum(THEME_MODES),

    // Accent Color: Validates that the string is a proper Hex color code
    accentColor: z
        .string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),

    // Editor Background Opacity: Number between 50 and 100 (from your slider)
    editorBgOpacity: z
        .number()
        .min(50, "Minimum opacity is 50%")
        .max(100, "Maximum opacity is 100%"),

    // Booleans for the switches
    showStatusBar: z.boolean(),
    compactMode: z.boolean()
});
export type AppearanceSettings = z.infer<typeof AppearanceSchema>;

export type ThemeMode = (typeof THEME_MODES)[number];

export const BehaviourSchema = z.object({
    // Tab Size: Handled as a coerced number since <select> returns a string
    tabSize: z.coerce
        .number()
        .refine((v) => [2, 4, 8].includes(v), {
            message: "Tab size must be 2, 4, or 8",
        }),

    // Switches
    insertSpaces: z.boolean(),
    smartIndentation: z.boolean(),
    trimTrailingWhitespace: z.boolean(),
    restoreCursorPosition: z.boolean(),
});
export type BehaviourSettings = z.infer<typeof BehaviourSchema>;

export const FileStorageSchema = z.object({
    // Default Save Location: Ensuring it's a valid string path
    defaultSaveLocation: z
        .string()
        .min(1, "Save location is required")
        .trim(),

    // Switch/Toggle
    askLocationBeforeSave: z.boolean(),

    // Max Recent Files: Number between 0 and 50 (matching your input attributes)
    maxRecentFiles: z
        .number()
        .min(0, "Cannot be less than 0")
        .max(50, "Maximum is 50 files"),
});
export type FileStorageSettings = z.infer<typeof FileStorageSchema>;

export const PrivacySchema = z.object({
    storeLocally: z.boolean(),
    syncSettings: z.boolean(),
}).refine((data) => {
    // Logic: If storing locally only, sync cannot be active
    if (data.storeLocally && data.syncSettings) {
        return false;
    }
    return true;
}, {
    message: "Cannot sync settings while 'Store files locally' is enabled",
    path: ["syncSettings"],
});
export type PrivacySettings = z.infer<typeof PrivacySchema>;
// About section (Read-only values usually don't need validation unless sending to an API)
export const AboutSchema = z.object({
    version: z.string(),
    build: z.string(),
});
export type AboutSettings = z.infer<typeof AboutSchema>;