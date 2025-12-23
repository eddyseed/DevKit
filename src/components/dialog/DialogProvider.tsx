"use client";

import React, { createContext, useContext, useState } from "react";
import { DialogType, DialogState } from "./dialog.types";
import { DialogRoot } from "./DialogRoot";

interface DialogContextValue {
  openDialog: (type: DialogType, props?: Record<string, unknown>) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialog, setDialog] = useState<DialogState>({ type: null });

  const openDialog = (type: DialogType, props?: Record<string, unknown>) => {
    setDialog({ type, props });
  };

  const closeDialog = () => {
    setDialog({ type: null });
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <DialogRoot dialog={dialog} onClose={closeDialog} />
    </DialogContext.Provider>
  );
}

export function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used inside DialogProvider");
  return ctx;
}
