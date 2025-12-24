import { db } from "@/firebase/firestore";
import { useFileStore } from "../lib/fileStore";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export const handleFileSave = async (currentText: string): Promise<void> => {
    const { currentFileName, setSavedStatus, setCurrentFile } = useFileStore.getState();

    const today = new Date().toISOString().split("T")[0];
    const collectionName = `notes-${today}`;
    const fileRef = doc(db, collectionName, currentFileName);

    const existingSnap = await getDoc(fileRef);

    // If file already exists -> update it
    if (existingSnap.exists()) {
        await updateDoc(fileRef, {
            text: currentText,
            lastModified: new Date(),
        });
        toast.success("File saved successfully.");
    }
    // If it does not exist -> create it
    else {
        await setDoc(fileRef, {
            text: currentText,
            filename: currentFileName,
            createdAt: new Date(),
        });
        toast.success("File created and saved successfully.");
    }

    setSavedStatus(true);
    setCurrentFile(currentFileName, currentText.length);
};