"use client";

import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import {
    SettingsDialogState,
    SettingsDialogType,
} from "./types/settings.types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import styles from "./styles/SettingsDialogRoot.module.css";
import { useState } from "react";
import { DownloadCloudIcon, UploadCloudIcon } from "lucide-react";
import { useSettingsStore } from "./store/settings.store";
import toast, { Toaster } from "react-hot-toast";
const NotepadSettingsDialog = dynamic(
    () => import("./components/notepad/page").then((m) => m.NotepadSettings),
    { ssr: false }
);
// const CloudKeepSettingsDialog = dynamic(
//     () => import("./components/cloudkeep/page").then((m) => m.CloudKeepSettings),
//     { ssr: false }
// );

export function SettingsDialogRoot({
    dialog,
    onClose,
}: {
    dialog: SettingsDialogState;
    onClose: () => void;
}) {
    const [activeTab, setActiveTab] = useState<SettingsDialogType>(
        dialog.type ?? "notepad"
    );
    const syncEnabled = useSettingsStore(s => s.privacy.syncSettings);
    const hydrateFromCloud = useSettingsStore(s => s.hydrateFromCloud);
    const syncToCloud = useSettingsStore(s => s.syncSettingsToCloud);
    const handleHydrate = () => {
        if (!syncEnabled) return;

        toast.promise(
            hydrateFromCloud(),
            {
                loading: "Hydrating settings from cloud…",
                success: "Settings hydrated successfully",
                error: "Failed to hydrate settings",
            }
        );
    };

    const handleSync = () => {
        if (!syncEnabled) return;

        toast.promise(
            syncToCloud(),
            {
                loading: "Syncing settings to cloud…",
                success: "Settings synced successfully",
                error: "Failed to sync settings",
            }
        );
    };
    if (!dialog.type) return null;


    return (
        <Dialog.Root open onOpenChange={onClose}>
            <Toaster />
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay} />
                <Dialog.Content className={styles.content}>
                    <VisuallyHidden>
                        <Dialog.Title>Application settings</Dialog.Title>
                        <Dialog.Description>
                            Configure application preferences and behavior
                        </Dialog.Description>
                    </VisuallyHidden>
                    <aside>
                        <section className={styles.sidebar} aria-label="Settings sections">
                            <div
                                className={`${styles.sidebarItem} ${activeTab === "notepad" ? styles.sidebarItemActive : ""
                                    }`}
                                onClick={() => setActiveTab("notepad")}
                                aria-selected={activeTab === "notepad"}
                            >
                                Notepad
                            </div>
                            {/* <div
                                className={`${styles.sidebarItem} ${activeTab === "cloudkeep" ? styles.sidebarItemActive : ""
                                    }`}
                                onClick={() => setActiveTab("cloudkeep")}
                                aria-selected={activeTab === "cloudkeep"}
                            >
                                Cloudkeepl1`,op0muniy7jhnbgj
                            </div> */}
                        </section>
                        <section className="flex flex-col justify-end gap-3">
                            <button type="button" className={`${styles.hydrateBtn} mx-auto`} onClick={() => handleHydrate()}>
                                <DownloadCloudIcon className="mx-1" />
                                Hydrate Settings
                            </button>

                            <button type="button" className={`${styles.syncBtn} mx-auto`} onClick={() => handleSync()}>
                                <UploadCloudIcon className="mx-1" />
                                Sync Settings
                            </button>
                        </section>
                    </aside>

                    <section className={styles.panel}>
                        {activeTab === "notepad" && <NotepadSettingsDialog />}
                        {/* {activeTab === "cloudkeep" && <CloudKeepSettingsDialog />} */}
                    </section>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
