import { useFileStore } from "../lib/fileStore";
import toast from "react-hot-toast";

export const handleNewFile = async (currentText: string) => {
    if (currentText !== "") {
        toast.error("Please save the current file before creating a new one.");
        return;
    }

    const { setFileText, setCurrentFile, setSavedStatus } = useFileStore.getState();

    // Reset editor state
    setFileText("");
    setCurrentFile("", 0);
    setSavedStatus(false);

    try {
        const res = await fetch("/api/notepad", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentText }),
        });

        if (!res.ok) throw new Error("Request failed");

        toast.success("New file created successfully (in Redis).");
        console.log("✅ Saved to Redis via API route");
    } catch (error) {
        console.error("❌ Error:", error);
        toast.error("Failed to create new file.");
    }
};
