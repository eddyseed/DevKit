import clsx from "clsx";
import styles from "@/styles/layout/Footer.module.css";

type FooterProps = {
    variant?: "default" | "compact";
};

export default function Footer({ variant = "default" }: FooterProps) {
    const year = new Date().getFullYear();
    return (
        <footer
            className={clsx(
                styles.root,
                variant === "compact" && styles.compact
            )}
        >
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

                    <div className={styles.section}>
                        <h4 className={styles.title}>Product</h4>
                        <ul className={styles.list}>
                            <li>Editor</li>
                            <li>Inspector</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.title}>
                            <a href="https://github.com/eddyseed/DevKit/blob/master/README.md" target="_blank">Resources</a>
                        </h4>
                        <ul className={styles.list}>
                            <li>
                                <a href="https://github.com/eddyseed/DevKit/blob/master/README.md" target="_blank">Docs</a>
                            </li>
                            <li>Roadmap</li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.title}>About</h4>
                        <ul className={styles.list}>
                            <li>
                                <a href="https://forms.gle/aikgsj35Vw6bEpJE7" target="_blank">Contact</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-10 flex flex-col items-center gap-3 text-sm md:flex-row md:justify-between">
                    <span className={styles.muted}>
                        © {year} DevKit. All rights reserved.
                    </span>
                    <span className={styles.muted}>
                        Calm tools for focused minds
                    </span>
                </div>
            </div>
        </footer>
    );
}
