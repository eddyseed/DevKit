import { db } from "@/firebase/firestore";
import useFileStore from "@/features/notepad/lib/fileStore";
import { doc, getDoc } from "firebase/firestore";

export const handleFileOpen = async (): Promise<void> => {
    const { setCurrentFile, setFileText, setSavedStatus } = useFileStore.getState();


    const fileName = prompt("Enter file name to open:")?.trim();
    if (!fileName) {
        console.warn("⚠️ No file name entered. Cancelled.");
        return;
    }

    const today = new Date().toISOString().split("T")[0];
    const collectionName = `notes-${today}`;
    const fileRef = doc(db, collectionName, fileName);

    const fileSnap = await getDoc(fileRef);

    if (!fileSnap.exists()) {
        console.warn("⚠️ File not found:", fileName);
        alert(`File "${fileName}" not found!`);
        return;
    }

    const fileData = fileSnap.data();
    const textContent = fileData?.text || "";

    // Update Zustand state
    setCurrentFile(fileName, textContent.length);
    setFileText(textContent);
    setSavedStatus(true);

    console.log(`📖 Successfully opened file: ${fileName}`);
};
