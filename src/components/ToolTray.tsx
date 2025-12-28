'use client'
import { useTool } from "@/context/ToolContext";
import NotepadPage from "@/app/tools/notepad/page";
import VaultPage from "@/app/tools/vault/page";
import VisualierPage from "@/app/tools/visualiser/page";
import TodoPage from "@/app/tools/todo/page";
import CloudKeepPage from "@/app/tools/cloudkeep/page";

export default function ToolTray() {
  const { tool } = useTool();

  switch (tool) {
    case "notepad":
      return <NotepadPage />;
    case "vault":
      return <VaultPage />;
    case "music":
      return <VisualierPage />;
    case "tasks":
      return <TodoPage />;
    case "cloudkeep":
      return <CloudKeepPage />;
    default:
      return <div>Select a tool</div>;
  }
}
