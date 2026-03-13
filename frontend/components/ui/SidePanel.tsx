import { ReactNode } from "react";

interface SidePanelProps {
  children: ReactNode;
}

export function SidePanel({ children }: SidePanelProps) {
  return (
    <div className="w-[30%] min-w-[280px] p-5 bg-[#444343] rounded-xl">
      {children}
    </div>
  );
}
