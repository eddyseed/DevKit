'use client';
import styles from '@/styles/layout/Navbar.module.css';
import { Button } from "@/components/ui/button"
import { Pen, MenuIcon, CoffeeIcon, LockIcon } from 'lucide-react';
import { useTool } from '@/context/ToolContext';
import { logoutUser } from '@/features/notepad/handlers/logout';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
    const router = useRouter();
    const { setTool } = useTool();
    return (
        <main className={`${styles.navigation_bar}`}>
            <div className='px-4 space-x-4'>
                <Button className={`${styles.nav_btn}`} onClick={() => setTool("notepad")}><Pen /> Notepad</Button>
                {/* <Button className={`${styles.nav_btn}`} onClick={() => setTool("vault")}><Vault /> Vault</Button>
                <Button className={`${styles.nav_btn}`} onClick={() => setTool("music")}><Music /> Music Visualizer</Button>
                <Button className={`${styles.nav_btn}`} onClick={() => setTool("tasks")}><Check /> Tasks</Button> */}
            </div>
            <div>
                {/* Make a lock button that logs out from current session */}
                <Button className={`${styles.nav_btn}`} onClick={() => logoutUser(router)} title="Lock my app"><LockIcon /></Button>
                <Button className={`${styles.nav_btn}`}><CoffeeIcon />Buy Me a Coffee</Button>
                <Button className={`${styles.nav_btn}`}><MenuIcon /></Button>
            </div>
        </main>
    );
};
