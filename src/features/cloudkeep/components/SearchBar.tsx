import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    value,
    onChange,
    placeholder = 'Search files...',
}: SearchBarProps) {
    return (
        <div className={styles.searchBar}>
            <span className={styles.icon}>🔍</span>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={styles.input}
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className={styles.clearButton}
                    aria-label="Clear search"
                >
                    ✕
                </button>
            )}
        </div>
    );
}