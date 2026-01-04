"use client";

import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { useFileStore } from "../lib/fileStore";

export async function downloadDocx() {
    const { currentFileName, fileText } =
        useFileStore.getState();
    const doc = new Document({
        sections: [
            {
                children: fileText.split("\n").map(
                    line =>
                        new Paragraph({
                            children: [new TextRun(line)],
                        })
                ),
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, currentFileName);
}
