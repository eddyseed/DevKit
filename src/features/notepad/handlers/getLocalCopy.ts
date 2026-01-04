"use client";

import { useFileStore } from "../lib/fileStore";

export function saveLocalCopy(
) {
    const { currentFileName, fileText } =
        useFileStore.getState();
    const blob = new Blob([fileText]);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = currentFileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}
