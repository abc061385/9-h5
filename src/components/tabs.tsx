import React from "react";
import clsx from "clsx";

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
      className={clsx(
        "flex items-center",
        type === "segment" && "bg-[#F3F1FF] rounded-xl p-1",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        return (
          <div
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={clsx(
              "text-sm text-center cursor-pointer transition-all p-2",
              type === "segment" &&
                clsx(
                  "rounded-lg",
                  isActive ? "bg-primary text-white" : "text-[#1C1C1E]"
                ),
              type === "text" &&
                (isActive ? activeClassName : inactiveClassName)
            )}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
