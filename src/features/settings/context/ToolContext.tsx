"use client";

import React, { createContext, useContext, useState } from "react";
import { SettingsDialogType, SettingsDialogState } from "../types/settings.types";
import { SettingsDialogRoot } from "../SettingsDialogRoot";

interface SettingsDialogContextValue {
    openSettingsDialog: (
        type: SettingsDialogType,
        props?: Record<string, unknown>
    ) => void;
    closeSettingsDialog: () => void;
}

const SettingsDialogContext =
    createContext<SettingsDialogContextValue | null>(null);

export function SettingsDialogProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [dialog, setDialog] = useState<SettingsDialogState>({ type: null });

    const openSettingsDialog = (
        type: SettingsDialogType,
        props?: Record<string, unknown>
    ) => {
        setDialog({ type, props });
    };

    const closeSettingsDialog = () => {
        setDialog({ type: null });
    };

    return (
        <SettingsDialogContext.Provider
            value={{ openSettingsDialog, closeSettingsDialog }}
        >
            {children}
            <SettingsDialogRoot dialog={dialog} onClose={closeSettingsDialog} />
        </SettingsDialogContext.Provider>
    );
}

export function useSettingsDialogContext() {
    const ctx = useContext(SettingsDialogContext);
    if (!ctx)
        throw new Error(
            "useSettingsDialogContext must be used inside SettingsDialogProvider"
        );
    return ctx;
}
