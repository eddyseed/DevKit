'use client'
import { ToolType } from "@/types/tool.types";
import { createContext, useContext, useState } from "react";

const ToolContext = createContext<{
  tool: ToolType;
  setTool: (tool: ToolType) => void;
}>({
  tool: "scriptorium",
  setTool: () => {},
});

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  const [tool, setTool] = useState<ToolType>("scriptorium");
  return (
    <ToolContext.Provider value={{ tool, setTool }}>
      {children}
    </ToolContext.Provider>
  );
};

export const useTool = () => useContext(ToolContext);
