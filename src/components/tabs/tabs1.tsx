import React, { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

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
  /** 是否启用下划线指示器动画 */
  animatedIndicator?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  onChange,
  type = "border",
  activeClassName = "text-primary font-bold",
  inactiveClassName = "text-[#61616E]",
  className = "",
  between = true,
  animatedIndicator = true,
}) => {
  const handleKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    tabValue: string | number,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(tabValue);
    }
  };

  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center text-lg select-none",
        className,
        between ? "justify-between" : "",
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;

        return (
          <div
            key={tab.value}
            role="tab"
            tabIndex={0}
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            onKeyDown={(e) => handleKeyDown(e, tab.value)}
            className={cn(
              "text-center cursor-pointer transition-all p-1.5 leading-[120%] outline-none",
              isActive ? activeClassName : inactiveClassName,
              between ? "flex-1" : "mr-6 last:mr-0",
              type === "text" ? "p-0" : "",
            )}
          >
            {tab.label}

            {type === "border" && (
              <div
                className={cn(
                  "mx-auto h-[3px] w-5",
                  isActive ? "bg-primary" : "bg-transparent",
                  animatedIndicator ? "transition-all duration-300" : "",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
