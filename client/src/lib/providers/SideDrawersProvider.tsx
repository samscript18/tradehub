"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";

interface SidebarContextValue {
  showSidebar: (content: ReactNode) => void;
  hideSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider = ({
  children,
}: SidebarProviderProps): React.ReactNode => {
  const [sidebarContent, setSidebarContent] = useState<ReactNode | null>(null);

  const showSidebar = (content: ReactNode) => setSidebarContent(content);

  const hideSidebar = () => setSidebarContent(null);

  return (
    <SidebarContext.Provider value={{ showSidebar, hideSidebar }}>
      {children}
      <AnimatePresence initial={true} mode="wait">
        {sidebarContent}
      </AnimatePresence>
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextValue => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export default SidebarProvider;
