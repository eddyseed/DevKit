import React from "react";
import {
    MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem,
    MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubTrigger,
    MenubarSubContent
} from "@/components/ui/menubar";
import { ArrowUpFromLine, Save, RotateCcw, CrossIcon, Trash2Icon, HardDriveDownload, ChevronRight } from "lucide-react";
import { handleFileSave } from "@/features/notepad/handlers/save";
import { useDialog } from "@/hooks/useDialog";
import { deleteCurrentFile } from "../../handlers/fileDelete";
import { toast } from "react-hot-toast";
import { downloadPDF } from "../../handlers/downloadAsPDF";
import { downloadDocx } from "../../handlers/downloadAsDOCX";
import { saveLocalCopy } from "../../handlers/getLocalCopy";
import styles from '../../styles/Menubar.module.css';
import { useSettings } from "@/features/settings/hooks/useSettings";
const FileMenu: React.FC = () => {
    const { openDialog } = useDialog();
    const { editor } = useSettings();
    const handleDelete = () => {
        toast(
            (t) => (
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span>
                        Delete this note? <br />
                        <small style={{ opacity: 0.7 }}>
                            This action cannot be undone.
                        </small>
                    </span>

                    <button
                        onClick={async () => {
                            try {
                                await deleteCurrentFile();
                                toast.success("Note deleted successfully");
                            } catch (err) {
                                console.error(err);
                                toast.error("Failed to delete note");
                            } finally {
                                toast.dismiss(t.id);
                            }
                        }}
                        style={{
                            background: "var(--btn-danger-bg)",
                            color: "var(--btn-danger-text)",
                            border: "none",
                            borderRadius: 8,
                            padding: "6px 12px",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                    >
                        Delete
                    </button>

                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            opacity: 0.7,
                        }}
                    >
                        Cancel
                    </button>
                </div>
            ),
            {
                duration: Infinity, // wait for user action
            }
        );
    };
    return (
        <MenubarMenu>
            <MenubarTrigger className={styles.menubar_item}>
                File
            </MenubarTrigger>

            <MenubarContent className={styles.menubar_content}>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => openDialog("new-file")}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><CrossIcon size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>New File</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>Alt N</MenubarShortcut>
                </MenubarItem>

                <MenubarSeparator className={styles.menubar_content_separator} />

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => openDialog("open-file")}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><ArrowUpFromLine size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Open…</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>Alt O</MenubarShortcut>
                </MenubarItem>

                <MenubarItem className={styles.menubar_content_item}>
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon} />
                        <span className={styles.menubar_content_item_label}>Open Recent</span>
                    </span>
                </MenubarItem>

                <MenubarSeparator className={styles.menubar_content_separator} />

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => handleFileSave()}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><Save size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Save</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>Alt S</MenubarShortcut>
                </MenubarItem>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => openDialog("save-as")}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon} />
                        <span className={styles.menubar_content_item_label}>Save As</span>
                    </span>
                </MenubarItem>

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => window.location.reload()}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><RotateCcw size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Reload</span>
                    </span>
                    <MenubarShortcut className={styles.menubar_content_shortcut}>Alt R</MenubarShortcut>
                </MenubarItem>

                <MenubarSeparator className={styles.menubar_content_separator} />

                <MenubarItem
                    className={styles.menubar_content_item}
                    onClick={() => saveLocalCopy()}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><HardDriveDownload size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Save a Copy…</span>
                    </span>
                </MenubarItem>

                <MenubarSub>
                    <MenubarSubTrigger className={`${styles.menubar_content_item} ${styles.menubar_content_sub_trigger}`}>
                        <span className={styles.menubar_content_item_left}>
                            <i className={styles.menubar_content_item_icon} />
                            <span className={styles.menubar_content_item_label}>Download</span>
                        </span>
                        <ChevronRight size={12} strokeWidth={1.75} className={styles.menubar_content_sub_trigger_arrow} />
                    </MenubarSubTrigger>
                    <MenubarSubContent className={styles.menubar_content_sub}>
                        <MenubarItem
                            className={styles.menubar_content_item}
                            onClick={() => downloadPDF(editor.fontFamily)}
                        >
                            <span className={styles.menubar_content_item_label}>Download as PDF</span>
                        </MenubarItem>
                        <MenubarItem
                            className={styles.menubar_content_item}
                            onClick={() => downloadDocx()}
                        >
                            <span className={styles.menubar_content_item_label}>Download as DOCX</span>
                        </MenubarItem>
                    </MenubarSubContent>
                </MenubarSub>

                <MenubarSeparator className={styles.menubar_content_separator} />

                <MenubarItem
                    className={`${styles.menubar_content_item} ${styles.menubar_content_item_destructive}`}
                    onClick={() => handleDelete()}
                >
                    <span className={styles.menubar_content_item_left}>
                        <i className={styles.menubar_content_item_icon}><Trash2Icon size={13} strokeWidth={1.75} /></i>
                        <span className={styles.menubar_content_item_label}>Delete Note…</span>
                    </span>
                </MenubarItem>

            </MenubarContent>
        </MenubarMenu>
    );
};

export default FileMenu;