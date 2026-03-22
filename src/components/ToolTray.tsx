'use client'
import { useTool } from "@/context/ToolContext";

import NotepadPage from "@/app/tools/notepad/page";
import CloudKeepPage from "@/app/tools/cloudkeep/page";

export const ToolTray = () => {
  const { tool } = useTool();

  switch (tool) {
    case "scriptorium":
      return <NotepadPage />;
    case "sanctum":
      return <CloudKeepPage />;
    default:
      return <div>Select a tool</div>;
  }
}
