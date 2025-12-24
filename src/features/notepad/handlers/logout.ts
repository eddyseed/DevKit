import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const logoutUser = async (router: ReturnType<typeof useRouter>) => {
    try {
        const res = await fetch("/api/logout", { method: "POST" });
        if (!res.ok) throw new Error("Logout failed");

        toast.success("Logged out successfully");
        router.push("/auth/login");
    } catch (err) {
        console.error(err);
        toast.error("Failed to logout");
    }
};