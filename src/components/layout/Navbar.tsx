'use client';
import styles from '@/styles/layout/Navbar.module.css';
import { Button } from "@/components/ui/button"
import { Pen, LockIcon, CloudUploadIcon, BrushCleaningIcon, Settings2Icon, MoonIcon, ExpandIcon } from 'lucide-react';
import { useTool } from '@/context/ToolContext';
import { logoutUser } from '@/utils/lockApp';
import { useRouter } from 'next/navigation';
import { clearCache } from '@/utils/clearCache';
import { useSettingsDialogContext } from '@/features/settings/context/ToolContext';
import { Toaster } from 'react-hot-toast';
import { toggleFullscreen } from '@/utils/toggleFS';
export const Navbar: React.FC = () => {
    const router = useRouter();
    const { setTool } = useTool();
    const {
        openSettingsDialog
    } = useSettingsDialogContext();
    return (
        <main className={`${styles.navigation_bar}`}>
            <Toaster />
            <div className='px-4 space-x-4'>
                <Button className={`${styles.nav_btn}`} onClick={() => setTool("notepad")}><Pen /> Notepad</Button>
                {/* <Button className={`${styles.nav_btn}`} onClick={() => setTool("vault")}><Vault /> Vault</Button>
                <Button className={`${styles.nav_btn}`} onClick={() => setTool("music")}><Music /> Music Visualizer</Button>
                <Button className={`${styles.nav_btn}`} onClick={() => setTool("tasks")}><Check /> Tasks</Button> */}
                <Button className={`${styles.nav_btn}`} onClick={() => setTool("cloudkeep")}><CloudUploadIcon /> Cloud Keep</Button>
            </div>
            <div>
                <Button className={`${styles.nav_btn}`} onClick={() => clearCache()} title="Clear Cache"><BrushCleaningIcon /></Button>
                {/* Make a lock button that logs out from current session */}
                <Button className={`${styles.nav_btn}`} onClick={() => logoutUser(router)} title="Lock my app"><LockIcon /></Button>
                {/* <Button className={`${styles.nav_btn}`}><CoffeeIcon />Buy Me a Coffee</Button> */}
                <Button className={`${styles.nav_btn}`} onClick={() => openSettingsDialog("notepad")}><Settings2Icon /></Button>
                {/* <Button className={`${styles.nav_btn}`} onClick={() => toast.error('Feature not functional yet!')}><MoonIcon /></Button> */}
                <Button className={`${styles.nav_btn}`} onClick={() => toggleFullscreen()}><ExpandIcon /></Button>

            </div>
        </main>
    );
};
