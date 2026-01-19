'use client'
import { useTool } from "@/context/ToolContext";
import NotepadPage from "@/app/tools/notepad/page";
import CloudKeepPage from "@/app/tools/cloudkeep/page";

export default function ToolTray() {
  const { tool } = useTool();

  switch (tool) {
    case "notepad":
      return <NotepadPage />;
    case "cloudkeep":
      return <CloudKeepPage />;
    default:
      return <div>Select a tool</div>;
  }
}
