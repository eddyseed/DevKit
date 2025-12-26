import { ViewMode } from '../types/file';
import styles from '../styles/ViewToggle.module.css';

interface ViewToggleProps {
    viewMode: ViewMode;
    onChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
    return (
        <div className={styles.viewToggle}>
            <button
                className={`${styles.button} ${viewMode === 'grid' ? styles.active : ''
                    }`}
                onClick={() => onChange('grid')}
                aria-label="Grid view"
            >
                <span className={styles.icon}>⊞</span>
            </button>
            <button
                className={`${styles.button} ${viewMode === 'list' ? styles.active : ''
                    }`}
                onClick={() => onChange('list')}
                aria-label="List view"
            >
                <span className={styles.icon}>☰</span>
            </button>
        </div>
    );
}