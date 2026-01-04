import toast from "react-hot-toast";
import { db } from "@/firebase/firestore";
import { useFileStore } from "../lib/fileStore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const handleFileSave = async (currentText: string): Promise<void> => {
    const { fileLocation, currentFileName, setSavedStatus, setCurrentFile, setLastModified } = useFileStore.getState();
    if (!currentFileName) {
        toast.error("No file open. Create or open a file to continue.");
        return;
    }
    const collectionName = fileLocation?.collection;
    const fileName = currentFileName?.trim() || "Untitled";
    const fileRef = doc(db, collectionName!, fileName);

    const existingSnap = await getDoc(fileRef);

    if (process.env.NODE_ENV === 'development') {
        console.groupCollapsed('Save Handler Triggered');
        console.table({
            fileName: currentFileName,
            textLength: currentText.length,
            collection: collectionName,
            path: fileRef.path,
            savedAt: new Date().toLocaleTimeString(),
        });
        console.groupEnd();
    }
    if (existingSnap.exists()) {
        await updateDoc(fileRef, {
            text: currentText,
            lastModified: new Date(),
        });
        setLastModified(new Date());
        setSavedStatus(true);
        setCurrentFile(currentFileName, currentText.length);
        toast.success("Your work is safely saved.");
    }
};