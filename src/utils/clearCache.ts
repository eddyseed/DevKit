import { toast } from "react-hot-toast";

export const clearCache = async () => {
    try {
        localStorage.clear();
        toast.success("Cleared Cache successfully");
    } catch (err) {
        console.error(err);
        toast.error("Failed to clear cache");
    }
};