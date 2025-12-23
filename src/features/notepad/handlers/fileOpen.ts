import { db } from "@/firebase/firestore";
import { useFileStore } from "../lib/fileStore";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
export async function openFileByName(fileName: string): Promise<void> {
    const { setCurrentFile, setFileText, setSavedStatus } = useFileStore.getState();

    if (!fileName) {
        toast.error("Please provide a valid file name to open.");
        return;
    }

    const today = new Date().toISOString().split("T")[0];
    const collectionName = `notes-${today}`;
    const fileRef = doc(db, collectionName, fileName);

    const fileSnap = await getDoc(fileRef);

    if (!fileSnap.exists()) {
        console.warn("⚠️ File not found:", fileName);
        toast.error(`File "${fileName}" does not exist.`);
        return;
    }

    const fileData = fileSnap.data();
    const textContent = fileData?.text || "";

    // Update Zustand state
    setCurrentFile(fileName, textContent.length);
    setFileText(textContent);
    setSavedStatus(true);

    console.log(`📖 Successfully opened file: ${fileName}`);
    toast.success(`Opened file "${fileName}" successfully.`);
};
