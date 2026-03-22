import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { handleGenerate } from '../handlers/generateResponse';
import { AIModel } from '../interfaces/model.types';
import styles from "../styles/Panel.module.css";
import { Sparkles, RotateCcw, ChevronDown } from 'lucide-react';

const Panel: React.FC = () => {
    const minRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<HTMLSelectElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    const toneRef = useRef<HTMLSelectElement>(null);
    const creativityRef = useRef<HTMLSelectElement>(null);
    const languageRef = useRef<HTMLSelectElement>(null);

    const onGenerateClick = () => {
        const minWords = Number(minRef.current?.value) || 50;
        const maxWords = Number(maxRef.current?.value) || 200;
        const model = (modelRef.current?.value as AIModel) || AIModel.GROQ;
        const tone = (toneRef.current?.value as "formal" | "neutral" | "informal") || "neutral";
        const creativity = (creativityRef.current?.value as "low" | "medium" | "high") || "medium";
        const language = languageRef.current?.value || "english";

        handleGenerate({ prompt: "", model, minWords, maxWords, tone, creativity, language });
    };

    const onResetClick = () => {
        if (minRef.current) minRef.current.value = "50";
        if (maxRef.current) maxRef.current.value = "200";
        if (modelRef.current) modelRef.current.value = AIModel.GROQ;
        if (toneRef.current) toneRef.current.value = "neutral";
        if (creativityRef.current) creativityRef.current.value = "medium";
        if (languageRef.current) languageRef.current.value = "english";
        toast.success("Reset to defaults");
    };

    return (
        <aside className={styles.panel}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerIcon}>
                    <Sparkles size={13} strokeWidth={1.75} />
                </div>
                <span className={styles.heading}>AI Controls</span>
            </div>

            <div className={styles.divider} />

            {/* Fields */}
            <div className={styles.fields}>
                <div className={styles.row}>
                    <label htmlFor="model" className={styles.label}>Model</label>
                    <div className={styles.selectWrap}>
                        <select ref={modelRef} id="model" defaultValue={AIModel.GROQ} className={styles.control}>
                            {Object.values(AIModel).map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        <ChevronDown size={11} className={styles.chevron} />
                    </div>
                </div>

                <div className={styles.row}>
                    <label htmlFor="minWordCount" className={styles.label}>Min Words</label>
                    <input ref={minRef} type="number" id="minWordCount" defaultValue={50} className={styles.control} />
                </div>

                <div className={styles.row}>
                    <label htmlFor="maxWordCount" className={styles.label}>Max Words</label>
                    <input ref={maxRef} type="number" id="maxWordCount" defaultValue={200} className={styles.control} />
                </div>

                <div className={styles.divider} />

                <div className={styles.row}>
                    <label htmlFor="tone" className={styles.label}>Tone</label>
                    <div className={styles.selectWrap}>
                        <select ref={toneRef} id="tone" defaultValue="neutral" className={styles.control}>
                            <option value="formal">Formal</option>
                            <option value="informal">Informal</option>
                            <option value="neutral">Neutral</option>
                        </select>
                        <ChevronDown size={11} className={styles.chevron} />
                    </div>
                </div>

                <div className={styles.row}>
                    <label htmlFor="creativity" className={styles.label}>Creativity</label>
                    <div className={styles.selectWrap}>
                        <select ref={creativityRef} id="creativity" defaultValue="medium" className={styles.control}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <ChevronDown size={11} className={styles.chevron} />
                    </div>
                </div>

                <div className={styles.row}>
                    <label htmlFor="language" className={styles.label}>Language</label>
                    <div className={styles.selectWrap}>
                        <select ref={languageRef} id="language" defaultValue="english" className={styles.control}>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                        </select>
                        <ChevronDown size={11} className={styles.chevron} />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <button className={styles.resetBtn} onClick={onResetClick} title="Reset to defaults">
                    <RotateCcw size={12} strokeWidth={2} />
                    Reset
                </button>
                <button className={styles.generateBtn} onClick={onGenerateClick}>
                    <Sparkles size={12} strokeWidth={2} />
                    Generate
                </button>
            </div>
        </aside>
    );
};

export default Panel;