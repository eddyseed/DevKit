"use client";

import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import { DialogState } from "./dialog.types";
import styles from "./DialogRoot.module.css";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const NewFileDialog = dynamic(
    () => import("../dialogs/NewFileDialog/NewFileDialog").then(m => m.NewFileDialog),
    { ssr: false }
);
const OpenFileDialog = dynamic(
    () => import("../dialogs/OpenFileDialog").then(m => m.OpenFileDialog),
    { ssr: false }
);
const SaveAsDialog = dynamic(
    () => import("../dialogs/SaveAsDialog").then(m => m.SaveAsDialog),
    { ssr: false }
);


export function DialogRoot({
    dialog,
    onClose,
}: {
    dialog: DialogState;
    onClose: () => void;
}) {
    if (!dialog.type) return null;

    return (
        <Dialog.Root open onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay} />
                <Dialog.Content className={styles.content}>

                    <VisuallyHidden>
                        <Dialog.Title>Application dialog</Dialog.Title>
                        <Dialog.Description>
                            Modal dialog for file operations
                        </Dialog.Description>
                    </VisuallyHidden>

                    {dialog.type === "new-file" && (
                        <NewFileDialog {...dialog.props} onClose={onClose} />
                    )}
                    {dialog.type === "open-file" && (
                        <OpenFileDialog onClose={onClose} />
                    )}
                    {dialog.type === "save-as" && (
                        <SaveAsDialog onClose={onClose} />
                    )}

                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    );
}
