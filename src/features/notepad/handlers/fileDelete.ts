import { db } from "@/firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { useFileStore } from "../lib/fileStore";
import toast from "react-hot-toast";

export async function deleteCurrentFile(): Promise<void> {
    const {
        currentFileName,
        setCurrentFile,
        setFileText,
        setSavedStatus,
    } = useFileStore.getState();

    if (!currentFileName) {
        toast.error("No file is currently open");
        return;
    }

    const today = new Date().toISOString().split("T")[0];
    const collectionName = `notes-${today}`;
    const fileRef = doc(db, collectionName, currentFileName);

    const toastId = toast.loading("Deleting note…");

    try {
        await deleteDoc(fileRef);

        setCurrentFile("", 0);
        setFileText("");
        setSavedStatus(true);

        toast.success(`Deleted "${currentFileName}"`, { id: toastId });
    } catch {
        toast.error("Failed to delete note", { id: toastId });
    }
}
