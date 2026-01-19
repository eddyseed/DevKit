import { GOOGLE_FONTS, loadGoogleFont } from '@/features/notepad/utils/googleFonts';
import { supabase } from '@/lib/supabase/client';
import React from 'react';
import { CURSOR_STYLES, CursorStyle, FontFamily, LineHeight, THEME_MODES, ThemeMode } from '../../config/notepad/settings.schema';
import { clearSettingsTable } from '../../constants/CLEAR_TABLE';
import { seedSettings } from '../../constants/seedSettings';
import { useSettings } from '../../hooks/useSettings';

export const NotepadSettings: React.FC = () => {
  const { general, editor, appearance, behaviour, fileStorage, privacy, } = useSettings();
  const { setGeneral, setEditor, setAppearance, setBehaviour, setFileStorage, setPrivacy } = useSettings();
  const AUTO_SAVE_INTERVALS = {
    "10": 10,
    "30": 30,
    "60": 60,
    "300": 300,
  } as const;
  const applyFont = (font: string) => {
    if (GOOGLE_FONTS.includes(font)) loadGoogleFont(font);
    setEditor({ fontFamily: font as FontFamily });
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-black">
      <div className="max-w-4xl mx-auto px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-100 mb-1">Notepad Settings</h1>
          <p className="text-sm text-stone-200">
            Configure your notepad experience
          </p>
        </div>

        {/* GENERAL SETTINGS */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-stone-100 mb-1">General</h2>
            <p className="text-sm text-stone-200">
              Basic application settings and defaults
            </p>
          </div>

          <div className="space-y-5 bg-gray-950 rounded-lg p-5 border border-neutral-800">
            {/* Default file name */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label htmlFor="defaultFileName" className="block text-sm font-medium text-neutral-300 mb-1">
                  Default new file name
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  Name used when creating new files
                </p>
              </div>
              <input
                id="defaultFileName"
                type="text"
                value={general.defaultFileName}
                onChange={(e) =>
                  setGeneral({ defaultFileName: e.target.value })
                }
                className="w-48 px-3 py-1.5 text-sm border border-neutral-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Open last file on startup */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="openLastFile" className="block text-sm font-medium text-neutral-300 mb-1">
                  Open last file on startup
                </label>
                <p className="text-xs text-neutral-400">
                  Automatically reopen your most recent file
                </p>
              </div>
              <button
                id="openLastFile"
                role="switch"
                aria-checked={general.openLastFile}
                onClick={() => setGeneral({ openLastFile: !general.openLastFile })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${general.openLastFile ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${general.openLastFile ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Confirm before closing unsaved */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="confirmBeforeClose" className="block text-sm font-medium text-neutral-300 mb-1">
                  Confirm before closing unsaved files
                </label>
                <p className="text-xs text-neutral-400">
                  Show warning dialog when closing files with unsaved changes
                </p>
              </div>
              <button
                id="confirmBeforeClose"
                role="switch"
                aria-checked={general.confirmBeforeClosing}
                onClick={() => setGeneral({ confirmBeforeClosing: !general.confirmBeforeClosing })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${general.confirmBeforeClosing ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${general.confirmBeforeClosing ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Auto-save enabled */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="autoSaveEnabled" className="block text-sm font-medium text-neutral-300 mb-1">
                  Auto-save enabled
                </label>
                <p className="text-xs text-neutral-400">
                  Automatically save changes at regular intervals
                </p>
              </div>
              <button
                id="autoSaveEnabled"
                role="switch"
                aria-checked={general.autoSave}
                onClick={() => setGeneral({ autoSave: !general.autoSave })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${general.autoSave ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${general.autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Auto-save interval */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label htmlFor="autoSaveInterval" className="block text-sm font-medium text-neutral-300 mb-1">
                  Auto-save interval
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  Time between automatic saves
                </p>
              </div>
              <select
                id="autoSaveInterval"
                value={general.autoSaveInterval}
                onChange={(e) =>
                  setGeneral({
                    autoSaveInterval:
                      AUTO_SAVE_INTERVALS[
                      e.target.value as keyof typeof AUTO_SAVE_INTERVALS
                      ],
                  })
                }
                disabled={!general.autoSaveInterval}
              >
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
              </select>


            </div>

            {/* Default save format */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Default save format
              </label>
              <p className="text-xs text-neutral-400 mb-3">
                File format used when saving new files
              </p>

              <div className="flex gap-4">
                {(["txt", "md", "docx"] as const).map((format) => (
                  <label
                    key={format}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="defaultSaveFormat"
                      value={format}
                      checked={general.defaultSaveFormat === format}
                      onChange={() =>
                        setGeneral({ defaultSaveFormat: format })
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-neutral-300 uppercase">
                      {format}
                    </span>
                  </label>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* EDITOR SETTINGS */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-stone-100 mb-1">Editor</h2>
            <p className="text-sm text-stone-200">
              Customize the text editing experience
            </p>
          </div>

          <div className="space-y-5 bg-gray-950 rounded-lg p-5 border border-neutral-800">
            {/* Font family */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label htmlFor="fontFamily" className="block text-sm font-medium text-neutral-300 mb-1">
                  Font family
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  Typeface used in the editor
                </p>
              </div>
              <select
                id="fontFamily"
                value={editor.fontFamily}
                onChange={(e) => applyFont(e.target.value as FontFamily)}
                className="w-40 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="monospace">Monospace</option>
                <option value="serif">Serif</option>
                <option value="sans-serif">Sans-serif</option>
              </select>
            </div>

            {/* Font size */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label htmlFor="fontSize" className="block text-sm font-medium text-neutral-300 mb-1">
                  Font size
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  Text size in pixels
                </p>
              </div>
              <div className="w-64 flex items-center gap-3">
                <input
                  id="fontSize"
                  type="range"
                  min="10"
                  max="24"
                  value={editor.fontSize}
                  onChange={(e) => setEditor({ fontSize: Number(e.target.value) })}
                  className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-medium text-neutral-300 w-10 text-right">{editor.fontSize}px</span>
              </div>
            </div>

            {/* Line height */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label htmlFor="lineHeight" className="block text-sm font-medium text-neutral-300 mb-1">
                  Line height
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  Spacing between lines of text
                </p>
              </div>
              <select
                id="lineHeight"
                value={editor.lineHeight}
                onChange={(e) => setEditor({ lineHeight: e.target.value as LineHeight })}
                className="w-32 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1.0">1.0</option>
                <option value="1.15">1.15</option>
                <option value="1.5">1.5</option>
                <option value="1.75">1.75</option>
                <option value="2.0">2.0</option>
              </select>
            </div>

            {/* Word wrap */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="wordWrap" className="block text-sm font-medium text-neutral-300 mb-1">
                  Word wrap
                </label>
                <p className="text-xs text-neutral-400">
                  Automatically wrap long lines to fit editor width
                </p>
              </div>
              <button
                id="wordWrap"
                role="switch"
                aria-checked={editor.wordWrap}
                onClick={() => setEditor({ wordWrap: !editor.wordWrap })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${editor.wordWrap ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editor.wordWrap ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Show line numbers */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="showLineNumbers" className="block text-sm font-medium text-neutral-300 mb-1">
                  Show line numbers
                </label>
                <p className="text-xs text-neutral-400">
                  Display line numbers in the editor gutter
                </p>
              </div>
              <button
                id="showLineNumbers"
                role="switch"
                aria-checked={editor.showLineNumbers}
                onClick={() => setEditor({ showLineNumbers: !!editor.showLineNumbers })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${editor.showLineNumbers ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editor.showLineNumbers ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Highlight active line */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="highlightActiveLine" className="block text-sm font-medium text-neutral-300 mb-1">
                  Highlight active line
                </label>
                <p className="text-xs text-neutral-400">
                  Emphasize the line containing the cursor
                </p>
              </div>
              <button
                id="highlightActiveLine"
                role="switch"
                aria-checked={editor.highlightActiveLine}
                onClick={() => setEditor({ highlightActiveLine: !editor.highlightActiveLine })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${editor.highlightActiveLine ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${editor.highlightActiveLine ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Cursor style */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Cursor style
              </label>
              <p className="text-xs text-neutral-400 mb-3">
                Visual style of the text cursor
              </p>
              <div className="flex gap-4">
                {CURSOR_STYLES.map((style) => (
                  <label key={style} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="cursorStyle"
                      value={style}
                      checked={editor.cursorStyle === style}
                      onChange={(e) => setEditor({ cursorStyle: e.target.value as CursorStyle })}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-neutral-300 capitalize">{style}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* APPEARANCE / THEME */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-stone-100 mb-1">Appearance</h2>
            <p className="text-sm text-stone-200">
              Visual theme and interface customization
            </p>
          </div>

          <div className="space-y-5 bg-gray-950 rounded-lg p-5 border border-neutral-800">
            {/* Theme mode */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Theme mode
              </label>
              <p className="text-xs text-neutral-400 mb-3">
                Choose your preferred color scheme
              </p>
              <div className="flex gap-4">
                {THEME_MODES.map((mode) => (
                  <label key={mode} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="themeMode"
                      value={mode}
                      checked={appearance.themeMode === mode}
                      onChange={(e) => setAppearance({ themeMode: e.target.value as ThemeMode })}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-neutral-300 capitalize">{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Accent color */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label htmlFor="accentColor" className="block text-sm font-medium text-neutral-300 mb-1">
                  Accent color
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  Primary color for UI elements
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="accentColor"
                  type="color"
                  value={appearance.accentColor}
                  onChange={(e) => setAppearance({ accentColor: e.target.value })}
                  className="w-12 h-8 border border-gray-300 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-600 font-mono">{appearance.accentColor}</span>
              </div>
            </div>

            {/* Editor background opacity */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label htmlFor="editorBgOpacity" className="block text-sm font-medium text-neutral-300 mb-1">
                  Editor background opacity
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  Transparency level of the editor background
                </p>
              </div>
              <div className="w-64 flex items-center gap-3">
                <input
                  id="editorBgOpacity"
                  type="range"
                  min="50"
                  max="100"
                  value={appearance.editorBgOpacity}
                  onChange={(e) => setAppearance({ editorBgOpacity: Number(e.target.value) })}
                  className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-medium text-neutral-300 w-10 text-right">{appearance.editorBgOpacity}%</span>
              </div>
            </div>

            {/* Show status bar */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="showStatusBar" className="block text-sm font-medium text-neutral-300 mb-1">
                  Show status bar
                </label>
                <p className="text-xs text-neutral-400">
                  Display information bar at the bottom of the editor
                </p>
              </div>
              <button
                id="showStatusBar"
                role="switch"
                aria-checked={appearance.showStatusBar}
                onClick={() => setAppearance({ showStatusBar: !appearance.showStatusBar })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${appearance.showStatusBar ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${appearance.showStatusBar ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Compact mode */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="compactMode" className="block text-sm font-medium text-neutral-300 mb-1">
                  Compact mode
                </label>
                <p className="text-xs text-neutral-400">
                  Reduce spacing and padding throughout the interface
                </p>
              </div>
              <button
                id="compactMode"
                role="switch"
                aria-checked={appearance.compactMode}
                onClick={() => setAppearance({ compactMode: !appearance.compactMode })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${appearance.compactMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${appearance.compactMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* BEHAVIOR */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-stone-100 mb-1">Behavior</h2>
            <p className="text-sm text-stone-200">
              Fine-tune editor behavior and formatting
            </p>
          </div>

          <div className="space-y-5 bg-gray-950 rounded-lg p-5 border border-neutral-800">
            {/* Tab size */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label htmlFor="tabSize" className="block text-sm font-medium text-neutral-300 mb-1">
                  Tab size
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  Number of spaces per tab character
                </p>
              </div>
              <select
                id="tabSize"
                value={behaviour.tabSize}
                onChange={(e) => setBehaviour({ tabSize: Number(e.target.value) })}
                className="w-24 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
              </select>
            </div>

            {/* Insert spaces instead of tab */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="insertSpaces" className="block text-sm font-medium text-neutral-300 mb-1">
                  Insert spaces instead of tabs
                </label>
                <p className="text-xs text-neutral-400">
                  Use spaces when the Tab key is pressed
                </p>
              </div>
              <button
                id="insertSpaces"
                role="switch"
                aria-checked={behaviour.insertSpaces}
                onClick={() =>
                  setBehaviour({ insertSpaces: !behaviour.insertSpaces })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    ${behaviour.insertSpaces ? "bg-blue-600" : "bg-gray-300"}
  `}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
      ${behaviour.insertSpaces ? "translate-x-6" : "translate-x-1"}
    `}
                />
              </button>

            </div>

            {/* Smart indentation */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="smartIndentation" className="block text-sm font-medium text-neutral-300 mb-1">
                  Smart indentation
                </label>
                <p className="text-xs text-neutral-400">
                  Automatically indent new lines based on context
                </p>
              </div>
              <button
                id="smartIndentation"
                role="switch"
                aria-checked={behaviour.smartIndentation}
                onClick={() =>
                  setBehaviour({
                    smartIndentation: !behaviour.smartIndentation,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    ${behaviour.smartIndentation
                    ? "bg-blue-600"
                    : "bg-gray-300"
                  }
  `}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
      ${behaviour.smartIndentation
                      ? "translate-x-6"
                      : "translate-x-1"
                    }
    `}
                />
              </button>

            </div>

            {/* Trim trailing whitespace */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="trimTrailingWhitespace" className="block text-sm font-medium text-neutral-300 mb-1">
                  Trim trailing whitespace on save
                </label>
                <p className="text-xs text-neutral-400">
                  Remove extra spaces at the end of lines when saving
                </p>
              </div>
              <button
                id="trimTrailingWhitespace"
                role="switch"
                aria-checked={behaviour.trimTrailingWhitespace}
                onClick={() =>
                  setBehaviour({
                    trimTrailingWhitespace: !behaviour.trimTrailingWhitespace,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    ${behaviour.trimTrailingWhitespace
                    ? "bg-blue-600"
                    : "bg-gray-300"
                  }
  `}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
      ${behaviour.trimTrailingWhitespace
                      ? "translate-x-6"
                      : "translate-x-1"
                    }
    `}
                />
              </button>

            </div>

            {/* Restore cursor position */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="restoreCursorPosition" className="block text-sm font-medium text-neutral-300 mb-1">
                  Restore cursor position on reopen
                </label>
                <p className="text-xs text-neutral-400">
                  Remember and restore cursor location when reopening files
                </p>
              </div>
              <button
                id="restoreCursorPosition"
                role="switch"
                aria-checked={behaviour.restoreCursorPosition}
                onClick={() =>
                  setBehaviour({
                    restoreCursorPosition: !behaviour.restoreCursorPosition,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    ${behaviour.restoreCursorPosition
                    ? "bg-blue-600"
                    : "bg-gray-300"
                  }
  `}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
      ${behaviour.restoreCursorPosition
                      ? "translate-x-6"
                      : "translate-x-1"
                    }
    `}
                />
              </button>

            </div>
          </div>
        </section>

        {/* FILE & STORAGE */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-stone-100 mb-1">File & Storage</h2>
            <p className="text-sm text-stone-200">
              Manage file locations and recent file history
            </p>
          </div>
          <div className="space-y-5 bg-gray-950 rounded-lg p-5 border border-stone-800">
            {/* Default save location */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label htmlFor="defaultSaveLocation" className="block text-sm font-medium text-neutral-300 mb-1">
                  Default save location
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  Folder where new files are saved by default
                </p>
              </div>
              <div className="flex gap-2 w-96">
                <input
                  id="defaultSaveLocation"
                  type="text"
                  value={fileStorage.defaultSaveLocation}
                  onChange={(e) => setFileStorage({ defaultSaveLocation: e.target.value })}
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-3 py-1.5 text-sm font-medium text-neutral-300 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Browse
                </button>
              </div>
            </div>
            {/* Ask location before save */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="askLocationBeforeSave" className="block text-sm font-medium text-neutral-300 mb-1">
                  Ask location before saving
                </label>
                <p className="text-xs text-neutral-400">
                  Always prompt for file location when saving new files
                </p>
              </div>
              <button
                id="askLocationBeforeSave"
                role="switch"
                aria-checked={fileStorage.askLocationBeforeSave}
                onClick={() => setFileStorage({ askLocationBeforeSave: !fileStorage.askLocationBeforeSave })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${fileStorage.askLocationBeforeSave ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${fileStorage.askLocationBeforeSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>

            {/* Max recent files */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label htmlFor="maxRecentFiles" className="block text-sm font-medium text-neutral-300 mb-1">
                  Maximum recent files
                </label>
                <p className="text-xs text-neutral-400 mb-2">
                  Number of recent files to remember
                </p>
              </div>
              <input
                id="maxRecentFiles"
                type="number"
                min="0"
                max="50"
                value={fileStorage.maxRecentFiles}
                onChange={(e) => setFileStorage({ maxRecentFiles: Number(e.target.value) })}
                className="w-24 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Clear recent files */}
            <div className="pt-2 border-t border-gray-300">
              <button className="px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500">
                Clear recent files
              </button>
              <p className="text-xs text-neutral-400 mt-2">
                Remove all entries from the recent files list
              </p>
            </div>
          </div>
        </section>

        {/* PRIVACY & DATA */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-stone-100 mb-1">Privacy & Data</h2>
            <p className="text-sm text-stone-200">
              Control how your data is stored and synced
            </p>
          </div>

          <div className="space-y-5 bg-gray-950 rounded-lg p-5 border border-neutral-800">
            {/* Store files locally only */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="storeLocally" className="block text-sm font-medium text-neutral-300 mb-1">
                  Store files locally only
                </label>
                <p className="text-xs text-neutral-400">
                  Keep all files on this device without cloud storage
                </p>
              </div>
              <button
                id="storeLocally"
                role="switch"
                aria-checked={privacy.storeLocally}
                onClick={() =>
                  setPrivacy({
                    storeLocally: !privacy.storeLocally,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    ${privacy.storeLocally
                    ? "bg-blue-600"
                    : "bg-gray-300"
                  }
  `}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
      ${privacy.storeLocally
                      ? "translate-x-6"
                      : "translate-x-1"
                    }
    `}
                />
              </button>

            </div>

            {/* Sync settings across devices */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="syncSettings" className="block text-sm font-medium text-neutral-300 mb-1">
                  Sync settings across devices
                </label>
                <p className="text-xs text-neutral-400">
                  Keep your preferences synchronized on all devices
                </p>
              </div>
              <button
                id="syncSettings"
                role="switch"
                aria-checked={privacy.syncSettings}
                disabled={privacy.storeLocally}
                onClick={() =>
                  setPrivacy({
                    syncSettings: !privacy.syncSettings,
                  })
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${privacy.syncSettings
                    ? "bg-blue-600"
                    : "bg-gray-300"
                  }
  `}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
      ${privacy.syncSettings
                      ? "translate-x-6"
                      : "translate-x-1"
                    }
    `}
                />
              </button>

            </div>

            {/* Danger zone section */}
            <div className="pt-4 border-t-2 border-red-200">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-red-900 mb-1">Danger Zone</h3>
                <p className="text-xs text-red-600">
                  These actions cannot be undone
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-900 border border-neutral-800 rounded">
                  <div>
                    <p className="text-sm font-medium text-stone-100">Clear all application data</p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Remove all files, settings, and cached data
                    </p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" onClick={() => {
                    const confirmation = confirm("Delete ALL settings from cloud?");
                    if (confirmation) {
                      localStorage.removeItem('app-settings');
                      clearSettingsTable(supabase);
                    }
                  }}>
                    Clear Data
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-900 border border-neutral-800 rounded">
                  <div>
                    <p className="text-sm font-medium text-stone-100">Reset settings to default</p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Restore all settings to their original values
                    </p>
                  </div>
                  <button onClick={() => seedSettings(supabase)} className="px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    Reset Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT / INFO */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-stone-100 mb-1">About</h2>
            <p className="text-sm text-stone-200">
              Application information and resources
            </p>
          </div>

          <div className="space-y-5 bg-gray-950 rounded-lg p-5 border border-neutral-800">
            {/* App version */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Application version
                </label>
                <p className="text-xs text-neutral-400">
                  Current installed version
                </p>
              </div>
              <span className="text-sm font-mono text-stone-200">v2.4.1</span>
            </div>

            {/* Build info */}
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-4">
                <label className="block text-sm font-medium text-stone-200 mb-1">
                  Build information
                </label>
                <p className="text-xs text-stone-200">
                  Build number and date
                </p>
              </div>
              <span className="text-sm font-mono text-stone-200">20250106.1542</span>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <button className="w-full px-4 py-2 text-sm font-medium text-neutral-300 bg-gray-900 border border-neutral-800 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left">
                View open-source licenses
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-neutral-300 bg-gray-900 border border-neutral-800 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left">
                Report an issue
              </button>
            </div>
          </div>
        </section>
      </div >
    </div >
  );
};