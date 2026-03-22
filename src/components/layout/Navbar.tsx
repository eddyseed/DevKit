'use client';
import { Pen, LockIcon, CloudUploadIcon, Trash2, Settings2, Maximize2 } from 'lucide-react';
import { useTool } from '@/context/ToolContext';
import { logoutUser } from '@/utils/lockApp';
import { useRouter } from 'next/navigation';
import { clearCache } from '@/utils/clearCache';
import { useSettingsDialogContext } from '@/features/settings/context/ToolContext';
import { Toaster } from 'react-hot-toast';
import { toggleFullscreen } from '@/utils/toggleFS';

import styles from '@/styles/layout/Navbar.module.css';

export const Navbar: React.FC = () => {
    const router = useRouter();
    const { setTool } = useTool();
    const { openSettingsDialog } = useSettingsDialogContext();

    return (
        <header className={styles.navbar}>
            <Toaster />

            <div className={styles.left}>
                <div className={styles.trafficLights}>
                    <span className={`${styles.dot} ${styles.dotRed}`} />
                    <span className={`${styles.dot} ${styles.dotYellow}`} />
                    <span className={`${styles.dot} ${styles.dotGreen}`} />
                </div>
                <span className={styles.appTitle}>{process.env.NEXT_PUBLIC_APP_NAME}</span>
            </div>

            <nav className={styles.segmented}>
                <button
                    className={styles.segment}
                    onClick={() => setTool('scriptorium')}
                    aria-label="scriptorium"
                >
                    <Pen size={13} strokeWidth={2} />
                    <span>Scriptorium</span>
                </button>
                <div className={styles.segDivider} />
                <button
                    className={styles.segment}
                    onClick={() => setTool('sanctum')}
                    aria-label="sanctum"
                >
                    <CloudUploadIcon size={13} strokeWidth={2} />
                    <span>Sanctum</span>
                </button>
            </nav>

            <div className={styles.right}>
                <button
                    className={styles.iconBtn}
                    onClick={() => clearCache()}
                    aria-label="Clear Cache"
                    title="Clear Cache"
                >
                    <Trash2 size={14} strokeWidth={1.75} />
                </button>
                <button
                    className={styles.iconBtn}
                    onClick={() => logoutUser(router)}
                    aria-label="Lock"
                    title="Lock App"
                >
                    <LockIcon size={14} strokeWidth={1.75} />
                </button>
                <button
                    className={styles.iconBtn}
                    onClick={() => openSettingsDialog('notepad')}
                    aria-label="Settings"
                    title="Settings"
                >
                    <Settings2 size={14} strokeWidth={1.75} />
                </button>
                <button
                    className={styles.iconBtn}
                    onClick={() => toggleFullscreen()}
                    aria-label="Fullscreen"
                    title="Toggle Fullscreen"
                >
                    <Maximize2 size={14} strokeWidth={1.75} />
                </button>
            </div>
        </header>
    );
};