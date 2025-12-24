import styles from "@/styles/layout/Sidebar.module.css";
import toast from "react-hot-toast";
import { deleteCurrentFile } from "../handlers/fileDelete";
import { TrashIcon } from "lucide-react";

type FileStatusProps = {
    currentFileName: string;
    fileSize: number;
    isSaved: boolean;
    fontFamily?: string;
};

export default function Sidebar({
    currentFileName,
    fileSize,
    isSaved,
    fontFamily,
}: FileStatusProps) {

    return (
        <aside className={styles.root}>
            <div className={styles.header}>
                <span className={styles.title}>File Details</span>
                {/* <span
                    className={`${styles.statusDot} ${isSaved ? styles.saved : styles.dirty
                        }`}
                /> */}
            </div>

            <div className={styles.section}>
                <div className={styles.label}>Name</div>
                <div className={styles.value}>
                    {currentFileName || "Untitled"}
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.label}>Size</div>
                <div className={styles.value}>{fileSize} kb</div>
            </div>

            <div className={styles.section}>
                <div className={styles.label}>Font</div>
                <div className={styles.value}>
                    {fontFamily || "monospace"}
                </div>
            </div>
            {/* <div className={styles.footerHint}>
                {isSaved ? "All changes saved" : "Unsaved changes"}
            </div> */}
        </aside>
    );
}
