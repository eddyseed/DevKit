'use client';
import styles from '@/styles/layout/Navbar.module.css';
import { Button } from "@/components/ui/button"
import { Mail, Pen, Vault, Music, Check, MenuIcon } from 'lucide-react';
import { useTool } from '@/context/ToolContext';
export const Navbar: React.FC = () => {
    const { setTool } = useTool();
    return (
        <div className='bg-secondary'>
            <main className={`${styles.navigation_bar}`}>
                <div className='px-4 space-x-4'>
                    <Button variant="secondary" className={`preset-1 font-montserrat font-semibold`} onClick={() => setTool("notepad")}><Pen /> Notepad</Button>
                    <Button variant="secondary" className={`preset-1 font-montserrat font-semibold`} onClick={() => setTool("vault")}><Vault /> Vault</Button>
                    <Button variant="secondary" className={`preset-1 font-montserrat font-semibold`} onClick={() => setTool("music")}><Music /> Music Visualizer</Button>
                    <Button variant="secondary" className={`preset-1 font-montserrat font-semibold`} onClick={() => setTool("tasks")}><Check /> Tasks</Button>
                </div>
                <div>
                    <Button variant="secondary" className={`preset-1 font-montserrat font-semibold`}><Mail />Login</Button>
                    <Button variant="secondary" className={`preset-1 font-montserrat font-semibold`}><MenuIcon /></Button>
                </div>
            </main>
        </div>
    );
};
