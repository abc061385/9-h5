import { cn } from "@/lib/utils";
import React from "react";

interface TabItem {
  label: string;
  value: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "text" | "segment";
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  between?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  onChange,
  activeClassName = "text-primary font-bold",
  inactiveClassName = "text-[#61616E]",
  className = "",
  between = true,
}) => {
  return (
    <div className={cn("flex items-center justify-between text-lg", className)}>
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <div
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "text-center cursor-pointer transition-all font-bold mr-0.5 p-1.5",
              isActive ? activeClassName : inactiveClassName,
              between ? "flex-1" : "mr-6"
            )}
          >
            {tab.label}
            <div
              className={cn("w-5 h-[3px] mx-auto", isActive && "bg-primary")}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
