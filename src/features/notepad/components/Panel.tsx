import React, { useRef } from 'react';
import styles from "@/styles/layout/Panel.module.css";
import { handleGenerate } from '../handlers/generateResponse';
import toast from 'react-hot-toast';
import { AIModel } from '../interfaces/model.types';
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

        handleGenerate({
            prompt: "",
            model,
            minWords,
            maxWords,
            tone,
            creativity,
            language,
        });
    };
    const onResetClick = () => {
        if (minRef.current) minRef.current.value = "50";
        if (maxRef.current) maxRef.current.value = "200";
        if (modelRef.current) modelRef.current.value = AIModel.GROQ;
        if (toneRef.current) toneRef.current.value = "neutral";
        if (creativityRef.current) creativityRef.current.value = "medium";
        if (languageRef.current) languageRef.current.value = "english";

        toast.success("AI panel reset to default values!");
    };
    return (
        <div className={styles.panel}>
            <h3 className={styles.heading}>AI Controls</h3>
            <div className={styles.section}>
                <label htmlFor="model">Model:</label>
                <select ref={modelRef} id="model" defaultValue={AIModel.GROQ}>
                    {Object.values(AIModel).map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.section}>
                <label htmlFor="minWordCount">Min Word Count:</label>
                <input ref={minRef} type="number" id="minWordCount" defaultValue={50} />
            </div>
            <div className={styles.section}>
                <label htmlFor="maxWordCount">Max Word Count:</label>
                <input ref={maxRef} type="number" id="maxWordCount" defaultValue={200} />
            </div>
            <div className={styles.section}>
                <label htmlFor="tone">Tone:</label>
                <select ref={toneRef} id="tone" defaultValue="neutral">
                    <option value="formal">Formal</option>
                    <option value="informal">Informal</option>
                    <option value="neutral">Neutral</option>
                </select>
            </div>
            <div className={styles.section}>
                <label htmlFor="creativity">Creativity:</label>
                <select ref={creativityRef} id="creativity" defaultValue="medium">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div className={styles.section}>
                <label htmlFor="language">Language:</label>
                <select ref={languageRef} id="language" defaultValue="english">
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                </select>
            </div>
            <div className={styles.footer}>
                <button className={styles.primaryBtn} onClick={onGenerateClick}>Generate</button>
                <button className={styles.secondaryBtn} onClick={onResetClick}>Reset</button>
            </div>
        </div>
    );
};

export default Panel;