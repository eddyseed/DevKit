import toast from "react-hot-toast";
import { db } from "@/firebase/firestore";
import { useFileStore } from "../lib/fileStore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const handleFileSave = async (): Promise<void> => {
    const {
        fileLocation,
        fileText,
        currentFileName,
        setSavedStatus,
        setCurrentFile,
        setLastModified,
    } = useFileStore.getState();

    if (!currentFileName) {
        toast.error("No file open. Create or open a file to continue.");
        return;
    }

    const collectionName = fileLocation?.collection;
    const fileName = currentFileName.trim();
    const fileRef = doc(db, collectionName!, fileName);

    if (process.env.NODE_ENV === "development") {
        console.groupCollapsed("Save Handler Triggered");
        console.table({
            fileName,
            textLength: fileText.length,
            collection: collectionName,
            path: fileRef.path,
            savedAt: new Date().toLocaleTimeString(),
        });
        console.groupEnd();
    }

    const savePromise = (async () => {
        const existingSnap = await getDoc(fileRef);

        if (!existingSnap.exists()) {
            throw new Error("File does not exist");
        }

        await updateDoc(fileRef, {
            text: fileText,
            lastModified: new Date(),
        });
    })();

    await toast.promise(savePromise, {
        loading: "Saving changes...",
        success: "Your work is safely saved.",
        error: "Failed to save changes. Please try again.",
    });

    setLastModified(new Date());
    setSavedStatus(true);
    setCurrentFile(currentFileName, fileText.length);
};
