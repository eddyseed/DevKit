import { z } from "zod";
export const CursorPosSchema = z.object({
    start: z.number().int().nonnegative(),
    end: z.number().int().nonnegative(),
}).refine(r => r.start <= r.end, {
    message: "start must be <= end",
});
export const FileLocationSchema = z.object({
    collection: z.string().min(1),
    fileName: z.string().min(1),
});
export const FileMetaSchema = z.object({
    currentFileName: z.string().min(0),
    fileLocation: FileLocationSchema.nullable(),
    fileSize: z.number().int().nonnegative(),
    isSaved: z.boolean().default(false),
    fileText: z.string(),
    fontFamily: z.string().optional().default("monospace"),
    editorElement: z.custom<HTMLTextAreaElement | null>((v) =>
        v === null || (typeof v === "object" && v instanceof HTMLTextAreaElement)
    ).nullable(),
    cursorPos: CursorPosSchema,
    lastFindQuery: z.string().nullable(),
    createdAt: z.date(),
    lastModified: z.date(),
});

export type FileMeta = z.infer<typeof FileMetaSchema>;