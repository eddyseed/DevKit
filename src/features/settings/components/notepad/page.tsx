import { GOOGLE_FONTS, loadGoogleFont } from '@/features/notepad/utils/googleFonts';
import { supabase } from '@/lib/supabase/client';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { CURSOR_STYLES, CursorStyle, FontFamily, LineHeight, THEME_MODES, ThemeMode } from '../../config/notepad/settings.schema';
import { clearSettingsTable } from '../../constants/CLEAR_TABLE';
import { seedSettings } from '../../constants/seedSettings';
import { useSettings } from '../../hooks/useSettings';
import styles from './page.module.css';

const Toggle = ({ id, checked, onChange, disabled }: { id: string; checked: boolean; onChange: () => void; disabled?: boolean }) => (
    <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        disabled={disabled}
        className={styles.toggle}
    >
        <span className={styles.toggleThumb} />
    </button>
);

export const NotepadSettings: React.FC = () => {
    const { general, editor, appearance, behaviour, fileStorage, privacy } = useSettings();
    const { setGeneral, setEditor, setAppearance, setBehaviour, setFileStorage, setPrivacy } = useSettings();

    const AUTO_SAVE_INTERVALS = { "10": 10, "30": 30, "60": 60, "300": 300 } as const;

    const applyFont = (font: string) => {
        if (GOOGLE_FONTS.includes(font)) loadGoogleFont(font);
        setEditor({ fontFamily: font as FontFamily });
    };

    return (
        <div className={styles.root}>
            <div className={styles.inner}>

                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Notepad Settings</h1>
                    <p className={styles.pageSubtitle}>Configure your notepad experience</p>
                </div>

                {/* GENERAL */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>General</h2>
                        <p className={styles.sectionDesc}>Basic application settings and defaults</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="defaultFileName" className={styles.label}>Default new file name</label>
                                <p className={styles.desc}>Name used when creating new files</p>
                            </div>
                            <input
                                id="defaultFileName"
                                type="text"
                                value={general.defaultFileName}
                                onChange={(e) => setGeneral({ defaultFileName: e.target.value })}
                                className={styles.textInput}
                                style={{ width: 140 }}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="openLastFile" className={styles.label}>Open last file on startup</label>
                                <p className={styles.desc}>Automatically reopen your most recent file</p>
                            </div>
                            <Toggle id="openLastFile" checked={general.openLastFile} onChange={() => setGeneral({ openLastFile: !general.openLastFile })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="confirmBeforeClose" className={styles.label}>Confirm before closing unsaved</label>
                                <p className={styles.desc}>Show warning when closing files with unsaved changes</p>
                            </div>
                            <Toggle id="confirmBeforeClose" checked={general.confirmBeforeClosing} onChange={() => setGeneral({ confirmBeforeClosing: !general.confirmBeforeClosing })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="autoSaveEnabled" className={styles.label}>Auto-save</label>
                                <p className={styles.desc}>Automatically save changes at regular intervals</p>
                            </div>
                            <Toggle id="autoSaveEnabled" checked={general.autoSave} onChange={() => setGeneral({ autoSave: !general.autoSave })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="autoSaveInterval" className={styles.label}>Auto-save interval</label>
                                <p className={styles.desc}>Time between automatic saves</p>
                            </div>
                            <div className={styles.selectWrap}>
                                <select
                                    id="autoSaveInterval"
                                    value={general.autoSaveInterval}
                                    onChange={(e) => setGeneral({ autoSaveInterval: AUTO_SAVE_INTERVALS[e.target.value as keyof typeof AUTO_SAVE_INTERVALS] })}
                                    disabled={!general.autoSave}
                                    className={styles.control}
                                >
                                    <option value="10">10 seconds</option>
                                    <option value="30">30 seconds</option>
                                    <option value="60">1 minute</option>
                                    <option value="300">5 minutes</option>
                                </select>
                                <ChevronDown size={11} className={styles.selectChevron} />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label className={styles.label}>Default save format</label>
                                <p className={styles.desc}>File format used when saving new files</p>
                            </div>
                            <div className={styles.radioGroup}>
                                {(["txt", "md", "docx"] as const).map((format) => (
                                    <label key={format} className={styles.radioItem}>
                                        <input
                                            type="radio"
                                            name="defaultSaveFormat"
                                            value={format}
                                            checked={general.defaultSaveFormat === format}
                                            onChange={() => setGeneral({ defaultSaveFormat: format })}
                                        />
                                        {format.toUpperCase()}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* EDITOR */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Editor</h2>
                        <p className={styles.sectionDesc}>Customize the text editing experience</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="fontFamily" className={styles.label}>Font family</label>
                                <p className={styles.desc}>Typeface used in the editor</p>
                            </div>
                            <div className={styles.selectWrap}>
                                <select id="fontFamily" value={editor.fontFamily} onChange={(e) => applyFont(e.target.value)} className={styles.control}>
                                    <option value="monospace">Monospace</option>
                                    <option value="serif">Serif</option>
                                    <option value="sans-serif">Sans-serif</option>
                                </select>
                                <ChevronDown size={11} className={styles.selectChevron} />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="fontSize" className={styles.label}>Font size</label>
                                <p className={styles.desc}>Text size in pixels</p>
                            </div>
                            <div className={styles.sliderWrap}>
                                <input id="fontSize" type="range" min="10" max="24" step="1" value={editor.fontSize} onChange={(e) => setEditor({ fontSize: Number(e.target.value) })} className={styles.slider} />
                                <span className={styles.sliderValue}>{editor.fontSize}px</span>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="lineHeight" className={styles.label}>Line height</label>
                                <p className={styles.desc}>Spacing between lines of text</p>
                            </div>
                            <div className={styles.selectWrap}>
                                <select id="lineHeight" value={editor.lineHeight} onChange={(e) => setEditor({ lineHeight: e.target.value as LineHeight })} className={styles.control}>
                                    <option value="1.0">1.0</option>
                                    <option value="1.15">1.15</option>
                                    <option value="1.5">1.5</option>
                                    <option value="1.75">1.75</option>
                                    <option value="2.0">2.0</option>
                                </select>
                                <ChevronDown size={11} className={styles.selectChevron} />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="wordWrap" className={styles.label}>Word wrap</label>
                                <p className={styles.desc}>Automatically wrap long lines</p>
                            </div>
                            <Toggle id="wordWrap" checked={editor.wordWrap} onChange={() => setEditor({ wordWrap: !editor.wordWrap })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="showLineNumbers" className={styles.label}>Show line numbers</label>
                                <p className={styles.desc}>Display line numbers in the editor gutter</p>
                            </div>
                            <Toggle id="showLineNumbers" checked={!!editor.showLineNumbers} onChange={() => setEditor({ showLineNumbers: !editor.showLineNumbers })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="highlightActiveLine" className={styles.label}>Highlight active line</label>
                                <p className={styles.desc}>Emphasize the line containing the cursor</p>
                            </div>
                            <Toggle id="highlightActiveLine" checked={editor.highlightActiveLine} onChange={() => setEditor({ highlightActiveLine: !editor.highlightActiveLine })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label className={styles.label}>Cursor style</label>
                                <p className={styles.desc}>Visual style of the text cursor</p>
                            </div>
                            <div className={styles.radioGroup}>
                                {CURSOR_STYLES.map((style) => (
                                    <label key={style} className={styles.radioItem}>
                                        <input type="radio" name="cursorStyle" value={style} checked={editor.cursorStyle === style} onChange={(e) => setEditor({ cursorStyle: e.target.value as CursorStyle })} />
                                        {style}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* APPEARANCE */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Appearance</h2>
                        <p className={styles.sectionDesc}>Visual theme and interface customization</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label className={styles.label}>Theme mode</label>
                                <p className={styles.desc}>Choose your preferred color scheme</p>
                            </div>
                            <div className={styles.radioGroup}>
                                {THEME_MODES.map((mode) => (
                                    <label key={mode} className={styles.radioItem}>
                                        <input type="radio" name="themeMode" value={mode} checked={appearance.themeMode === mode} onChange={(e) => setAppearance({ themeMode: e.target.value as ThemeMode })} />
                                        {mode}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="accentColor" className={styles.label}>Accent color</label>
                                <p className={styles.desc}>Primary color for UI elements</p>
                            </div>
                            <div className={styles.colorRow}>
                                <input id="accentColor" type="color" value={appearance.accentColor} onChange={(e) => setAppearance({ accentColor: e.target.value })} className={styles.colorInput} />
                                <span className={styles.colorHex}>{appearance.accentColor}</span>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="editorBgOpacity" className={styles.label}>Editor background opacity</label>
                                <p className={styles.desc}>Transparency level of the editor background</p>
                            </div>
                            <div className={styles.sliderWrap}>
                                <input id="editorBgOpacity" type="range" min="50" max="100" step="1" value={appearance.editorBgOpacity} onChange={(e) => setAppearance({ editorBgOpacity: Number(e.target.value) })} className={styles.slider} />
                                <span className={styles.sliderValue}>{appearance.editorBgOpacity}%</span>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="showStatusBar" className={styles.label}>Show status bar</label>
                                <p className={styles.desc}>Display information bar at the bottom</p>
                            </div>
                            <Toggle id="showStatusBar" checked={appearance.showStatusBar} onChange={() => setAppearance({ showStatusBar: !appearance.showStatusBar })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="compactMode" className={styles.label}>Compact mode</label>
                                <p className={styles.desc}>Reduce spacing and padding throughout</p>
                            </div>
                            <Toggle id="compactMode" checked={appearance.compactMode} onChange={() => setAppearance({ compactMode: !appearance.compactMode })} />
                        </div>
                    </div>
                </section>

                {/* BEHAVIOUR */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Behavior</h2>
                        <p className={styles.sectionDesc}>Fine-tune editor behavior and formatting</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="tabSize" className={styles.label}>Tab size</label>
                                <p className={styles.desc}>Number of spaces per tab character</p>
                            </div>
                            <div className={styles.selectWrap}>
                                <select id="tabSize" value={behaviour.tabSize} onChange={(e) => setBehaviour({ tabSize: Number(e.target.value) })} className={styles.control}>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                </select>
                                <ChevronDown size={11} className={styles.selectChevron} />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="insertSpaces" className={styles.label}>Insert spaces instead of tabs</label>
                                <p className={styles.desc}>Use spaces when Tab key is pressed</p>
                            </div>
                            <Toggle id="insertSpaces" checked={behaviour.insertSpaces} onChange={() => setBehaviour({ insertSpaces: !behaviour.insertSpaces })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="smartIndentation" className={styles.label}>Smart indentation</label>
                                <p className={styles.desc}>Automatically indent new lines based on context</p>
                            </div>
                            <Toggle id="smartIndentation" checked={behaviour.smartIndentation} onChange={() => setBehaviour({ smartIndentation: !behaviour.smartIndentation })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="trimTrailingWhitespace" className={styles.label}>Trim trailing whitespace on save</label>
                                <p className={styles.desc}>Remove extra spaces at end of lines</p>
                            </div>
                            <Toggle id="trimTrailingWhitespace" checked={behaviour.trimTrailingWhitespace} onChange={() => setBehaviour({ trimTrailingWhitespace: !behaviour.trimTrailingWhitespace })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="restoreCursorPosition" className={styles.label}>Restore cursor position on reopen</label>
                                <p className={styles.desc}>Remember cursor location when reopening files</p>
                            </div>
                            <Toggle id="restoreCursorPosition" checked={behaviour.restoreCursorPosition} onChange={() => setBehaviour({ restoreCursorPosition: !behaviour.restoreCursorPosition })} />
                        </div>
                    </div>
                </section>

                {/* FILE & STORAGE */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>File & Storage</h2>
                        <p className={styles.sectionDesc}>Manage file locations and recent file history</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="defaultSaveLocation" className={styles.label}>Default save location</label>
                                <p className={styles.desc}>Folder where new files are saved by default</p>
                            </div>
                            <div className={styles.inputRow}>
                                <input id="defaultSaveLocation" type="text" value={fileStorage.defaultSaveLocation} onChange={(e) => setFileStorage({ defaultSaveLocation: e.target.value })} className={styles.textInput} style={{ width: 140 }} />
                                <button className={styles.btn}>Browse</button>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="askLocationBeforeSave" className={styles.label}>Ask location before saving</label>
                                <p className={styles.desc}>Always prompt for file location on save</p>
                            </div>
                            <Toggle id="askLocationBeforeSave" checked={fileStorage.askLocationBeforeSave} onChange={() => setFileStorage({ askLocationBeforeSave: !fileStorage.askLocationBeforeSave })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="maxRecentFiles" className={styles.label}>Maximum recent files</label>
                                <p className={styles.desc}>Number of recent files to remember</p>
                            </div>
                            <input id="maxRecentFiles" type="number" min="0" max="50" value={fileStorage.maxRecentFiles} onChange={(e) => setFileStorage({ maxRecentFiles: Number(e.target.value) })} className={styles.control} style={{ width: 64, textAlign: 'center' }} />
                        </div>

                        <div className={styles.dangerZone}>
                            <p className={styles.dangerTitle}>Danger</p>
                            <div className={styles.row}>
                                <div className={styles.rowLabel}>
                                    <label className={styles.label}>Clear recent files</label>
                                    <p className={styles.desc}>Remove all entries from the recent files list</p>
                                </div>
                                <button className={`${styles.btn} ${styles.btnDestructive}`}>Clear</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRIVACY */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Privacy & Data</h2>
                        <p className={styles.sectionDesc}>Control how your data is stored and synced</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="storeLocally" className={styles.label}>Store files locally only</label>
                                <p className={styles.desc}>Keep all files on this device without cloud storage</p>
                            </div>
                            <Toggle id="storeLocally" checked={privacy.storeLocally} onChange={() => setPrivacy({ storeLocally: !privacy.storeLocally })} />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label htmlFor="syncSettings" className={styles.label}>Sync settings across devices</label>
                                <p className={styles.desc}>Keep preferences synchronized on all devices</p>
                            </div>
                            <Toggle id="syncSettings" checked={privacy.syncSettings} disabled={privacy.storeLocally} onChange={() => setPrivacy({ syncSettings: !privacy.syncSettings })} />
                        </div>

                        <div className={styles.dangerZone}>
                            <p className={styles.dangerTitle}>Danger Zone</p>
                            <div className={styles.row}>
                                <div className={styles.rowLabel}>
                                    <label className={styles.label}>Clear all application data</label>
                                    <p className={styles.desc}>Remove all files, settings, and cached data</p>
                                </div>
                                <button className={`${styles.btn} ${styles.btnDestructive}`} onClick={() => { if (confirm("Delete ALL settings from cloud?")) { localStorage.removeItem('app-settings'); clearSettingsTable(supabase); } }}>Clear</button>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.rowLabel}>
                                    <label className={styles.label}>Reset settings to default</label>
                                    <p className={styles.desc}>Restore all settings to their original values</p>
                                </div>
                                <button className={`${styles.btn} ${styles.btnDestructive}`} onClick={() => seedSettings(supabase)}>Reset</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>About</h2>
                        <p className={styles.sectionDesc}>Application information and resources</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label className={styles.label}>Application version</label>
                                <p className={styles.desc}>Current installed version</p>
                            </div>
                            <span className={styles.monoValue}>v2.4.1</span>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.rowLabel}>
                                <label className={styles.label}>Build information</label>
                                <p className={styles.desc}>Build number and date</p>
                            </div>
                            <span className={styles.monoValue}>20250106.1542</span>
                        </div>
                        <button className={styles.fullBtn}>View open-source licenses</button>
                        <button className={styles.fullBtn}>Report an issue</button>
                    </div>
                </section>

            </div>
        </div>
    );
};