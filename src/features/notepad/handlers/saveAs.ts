import toast from "react-hot-toast";
import { db } from "@/firebase/firestore";
import { useFileStore } from "../lib/fileStore";
import { doc, setDoc } from "firebase/firestore";
import { isDev } from "@/lib/dotenv/env";
const currentDate = new Date();
const today = currentDate.toISOString().split("T")[0];
export const handleFileSaveAs = async (
    currentText: string,
    fileName: string,
    fileFormat: string
): Promise<void> => {
    const { setFileText, setCurrentFile, setSavedStatus, setFileLocation, setCreatedAt, setLastModified } =
        useFileStore.getState();

    const collectionName = `notes-${today}`;
    const finalFileName = `${fileName.trim()}.${fileFormat}`;

    if (isDev) {
        console.groupCollapsed('Save As Handler Triggered');
        console.table({
            fileName: finalFileName,
            textLength: currentText.length,
            collection: collectionName,
            createdAt: today.toString(),
        });
        console.groupEnd();
    }
    await setDoc(doc(db, collectionName, finalFileName), {
        text: currentText,
        filename: finalFileName,
        createdAt: new Date(),
        lastModified: new Date(),
    });
    setSavedStatus(true);
    setFileText(currentText)
    setFileLocation({
        collection: collectionName,
        fileName: finalFileName
    })
    setCreatedAt(currentDate);
    setLastModified(currentDate);

    // Redundant Now
    setCurrentFile(finalFileName, currentText?.length || 0);

    console.log(`File saved as "${finalFileName}" successfully.`)
    toast.success(`File saved as "${finalFileName}" successfully.`);
};
