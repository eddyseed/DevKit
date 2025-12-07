import { db } from "@/firebase/firestore";
import useFileStore from "@/features/notepad/lib/fileStore";
import { doc, getDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
export const handleFileSaveAs = async (currentText: string): Promise<void> => {
    const { currentFileName, fileText, setCurrentFile, setSavedStatus } = useFileStore.getState();

    const finalFileName = prompt("Enter your file name:")?.trim() || "Untitled.txt";
    const today = new Date().toISOString().split("T")[0];
    const collectionName = `notes-${today}`;

    // If the current file is Untitled.txt → rename that same document
    if (currentFileName === "Untitled.txt") {
        const oldRef = doc(db, collectionName, currentFileName);
        const oldSnap = await getDoc(oldRef);

        if (oldSnap.exists()) {
            // ✅ Rename by creating new doc with same content and deleting old one
            const oldData = oldSnap.data();

            await setDoc(doc(db, collectionName, finalFileName), {
                ...oldData,
                text: currentText,
                filename: finalFileName,
                lastModified: new Date(),
            });

            await updateDoc(doc(db, collectionName, finalFileName), {
                renamedFrom: "Untitled.txt",
            });

            // Delete the old Untitled.txt document
            await deleteDoc(oldRef);

            // Update Zustand
            setCurrentFile(finalFileName, fileText?.length || 0);
            setSavedStatus(true);

            console.log(`✅ Renamed Untitled.txt → ${finalFileName}`);
        } else {
            // Untitled.txt not found, creating new file instead...
            await setDoc(doc(db, collectionName, finalFileName), {
                text: currentText,
                filename: finalFileName,
                createdAt: new Date(),
            });
            setCurrentFile(finalFileName, fileText?.length || 0);
            setSavedStatus(true);
        }
    }
    // If the current file already has a custom name → perform regular "Save As"
    else {
        await setDoc(doc(db, collectionName, finalFileName), {
            text: currentText,
            filename: finalFileName,
            createdAt: new Date(),
        });

        setCurrentFile(finalFileName, fileText?.length || 0);
        setSavedStatus(true);

        console.log(`🆕 Created new file: ${finalFileName}`);
    }
};
