import { db } from "@/firebase/firestore";
import { useFileStore } from "../lib/fileStore";
import { doc, getDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
export const handleFileSaveAs = async (
    currentText: string,
    baseFileName: string,
    format: string
): Promise<void> => {
    const { currentFileName, fileText, setCurrentFile, setSavedStatus } =
        useFileStore.getState();

    const safeName = baseFileName.trim() || "Untitled";
    const finalFileName = `${safeName}.${format}`;

    const today = new Date().toISOString().split("T")[0];
    const collectionName = `notes-${today}`;

    // If the current file is Untitled.txt → rename that same document
    if (currentFileName === "Untitled.txt") {
        const oldRef = doc(db, collectionName, currentFileName);
        const oldSnap = await getDoc(oldRef);

        if (oldSnap.exists()) {
            const oldData = oldSnap.data();

            // ✅ Create new doc with same content
            await setDoc(doc(db, collectionName, finalFileName), {
                ...oldData,
                text: currentText,
                filename: finalFileName,
                lastModified: new Date(),
            });

            await updateDoc(doc(db, collectionName, finalFileName), {
                renamedFrom: "Untitled.txt",
            });

            // Delete old Untitled.txt
            await deleteDoc(oldRef);

            setCurrentFile(finalFileName, fileText?.length || 0);
            setSavedStatus(true);
        } else {
            // Untitled.txt not found → create new
            await setDoc(doc(db, collectionName, finalFileName), {
                text: currentText,
                filename: finalFileName,
                createdAt: new Date(),
            });

            setCurrentFile(finalFileName, fileText?.length || 0);
            setSavedStatus(true);
        }
    }
    // Regular Save As
    else {
        await setDoc(doc(db, collectionName, finalFileName), {
            text: currentText,
            filename: finalFileName,
            createdAt: new Date(),
        });

        setCurrentFile(finalFileName, fileText?.length || 0);
        setSavedStatus(true);
        toast.success(`File saved as "${finalFileName}" successfully.`);
    }
};
