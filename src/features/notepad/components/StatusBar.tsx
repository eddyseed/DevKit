import styles from "../styles/Sidebar.module.css";
interface FileLoc {
    collection: string;
    fileName: string;
}
type FileStatusProps = {
    currentFileName: string;
    fileSize: number;
    isSaved: boolean;
    fontFamily?: string;
    fileLocation?: FileLoc | null;
    wordCount?: number;
    lineCount?: number;
    createdAt: Date | string | null | undefined;
    modifiedAt: Date | string | null | undefined;
};

export default function StatusBar({
    currentFileName,
    fileSize,
    fontFamily,
    isSaved,
    fileLocation,
    wordCount = 0,
    lineCount = 0,
    createdAt,
    modifiedAt,
}: FileStatusProps) {
    function formatDate(
        date: Date | string | null | undefined
    ) {
        if (!date) return "—";

        const d = date instanceof Date ? date : new Date(date);

        if (Number.isNaN(d.getTime())) return "—";

        return new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(d);
    }



    const collection = fileLocation?.collection;

    return (
        <aside className={styles.root}>
            <div className={styles.header}>
                <span className={styles.title}>File Details</span>
                <div className={styles.statusBadge}>
                    <span
                        className={`${styles.statusDot} ${isSaved ? styles.saved : styles.dirty}`}
                    />
                    <span className={styles.statusText}>
                        {isSaved ? "Saved" : "Unsaved"}
                    </span>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.label}>File Name</div>
                <div className={styles.value}>
                    {currentFileName || "Untitled"}
                </div>
            </div>

            {collection && (
                <div className={styles.section}>
                    <div className={styles.label}>Collection</div>
                    <div className={styles.collectionBadge}>{collection}</div>
                </div>
            )}

            <div className={styles.grid}>
                <div className={styles.section}>
                    <div className={styles.label}>Size</div>
                    <div className={styles.value}>{fileSize} KB</div>
                </div>

                <div className={styles.section}>
                    <div className={styles.label}>Words</div>
                    <div className={styles.value}>{wordCount.toLocaleString()}</div>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.section}>
                    <div className={styles.label}>Lines</div>
                    <div className={styles.value}>{lineCount.toLocaleString()}</div>
                </div>

                <div className={styles.section}>
                    <div className={styles.label}>Font</div>
                    <div className={styles.value}>{fontFamily || "Mono"}</div>
                </div>
            </div>

            <div className={styles.section}>
                <div className={styles.label}>Created</div>
                <div className={styles.value}>{formatDate(createdAt)}</div>
            </div>

            <div className={styles.section}>
                <div className={styles.label}>Last Modified</div>
                <div className={styles.value}>{formatDate(modifiedAt)}</div>
            </div>

            <div className={styles.footerHint}>
                {isSaved ? "All changes saved" : "Unsaved changes"}
            </div>
        </aside>
    );
}