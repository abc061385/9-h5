import { cn } from "@/lib/utils";
import React from "react";
import { ShowIf } from "../show-if";

interface TabItem {
  label: string | React.ReactNode;
  value: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "text" | "border";
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
  type = "border",
}) => {
  return (
    <div
      className={cn(
        "flex items-center text-lg",
        className,
        between ? "justify-between" : "",
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <div
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "text-center cursor-pointer transition-all mr-0.5 p-1.5 leading-[120%]",
              isActive ? activeClassName : inactiveClassName,
              between ? "flex-1" : "mr-6 last:mr-0",
              type === "text" ? "p-0" : "",
            )}
          >
            {tab.label}
            <ShowIf condition={type === "border"}>
              <div
                className={cn("w-5 h-[3px] mx-auto", isActive && "bg-primary")}
              ></div>
            </ShowIf>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
