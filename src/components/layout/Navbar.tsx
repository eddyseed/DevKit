'use client';
import styles from '@/styles/layout/Navbar.module.css';
import { Button } from "@/components/ui/button"
import { Mail, Pen, MenuIcon } from 'lucide-react';
import { useTool } from '@/context/ToolContext';
export const Navbar: React.FC = () => {
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
                <Button className={`${styles.nav_btn}`}><Mail />Login</Button>
                <Button className={`${styles.nav_btn}`}><MenuIcon /></Button>
            </div>
        </main>
    );
};
