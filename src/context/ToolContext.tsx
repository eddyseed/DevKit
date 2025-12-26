'use client'
import { createContext, useContext, useState } from "react";
type ToolType = "notepad" | "vault" | "music" | "tasks" | "cloudkeep";

const ToolContext = createContext<{
  tool: ToolType;
  setTool: (tool: ToolType) => void;
}>({
  tool: "notepad",
  setTool: () => {},
});

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  const [tool, setTool] = useState<ToolType>("notepad");
  return (
    <ToolContext.Provider value={{ tool, setTool }}>
      {children}
    </ToolContext.Provider>
  );
};

export const useTool = () => useContext(ToolContext);
