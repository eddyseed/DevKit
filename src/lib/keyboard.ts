// lib/keyboard.ts

export type KeyboardActions = {
    newFile: () => void;
    openFile: () => void;
    saveFile: () => void;
    reload: () => void;

    print: () => void;
    undo: () => void;
    redo: () => void;

    copy: () => void;
    cut: () => void;
    paste: () => void;

    searchSelection: () => void;
    find: () => void;
    findNext: () => void;
};

export function handleGlobalKeyDown(
    e: KeyboardEvent,
    actions: KeyboardActions
) {
    const key = e.key.toLowerCase();
    const ctrlOrCmd = e.ctrlKey || e.metaKey;

    if (e.altKey) {
        switch (key) {
            case "n":
                e.preventDefault();
                actions.newFile();
                return;

            case "o":
                e.preventDefault();
                actions.openFile();
                return;

            case "s":
                e.preventDefault();
                actions.saveFile();
                return;

            case "r":
                e.preventDefault();
                actions.reload();
                return;
        }
    }

    if (ctrlOrCmd) {
        switch (key) {
            case "p":
                e.preventDefault();
                actions.print();
                return;

            case "z":
                e.preventDefault();
                actions.undo();
                return;

            case "y":
                e.preventDefault();
                actions.redo();
                return;

            case "c":
                e.preventDefault();
                actions.copy();
                return;

            case "x":
                e.preventDefault();
                actions.cut();
                return;

            case "v":
                e.preventDefault();
                actions.paste();
                return;

            case "e":
                e.preventDefault();
                actions.searchSelection();
                return;

            case "f":
                e.preventDefault();
                actions.find();
                return;
        }
    }

    if (key === "f3") {
        e.preventDefault();
        actions.findNext();
    }
}
