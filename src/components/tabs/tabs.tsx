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
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  onChange,
  type = "text",
  activeClassName = "text-primary font-bold",
  inactiveClassName = "text-[#61616E]",
  className = "",
}) => {
  return (
    <div
      className={cn(
        className,
        "flex items-center justify-between",
        type === "segment" && "rounded-xl p-1"
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <div
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "text-center cursor-pointer transition-all font-bold text-lg mr-0.5 flex-1 p-1.5",
              type === "segment" &&
                cn(
                  "rounded-md px-3",
                  isActive ? "bg-[#8F00FF] text-white" : "text-[#1C1C1E]"
                ),
              type === "text" &&
                (isActive ? activeClassName : inactiveClassName)
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
