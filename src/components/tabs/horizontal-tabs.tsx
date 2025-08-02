import { cn } from "@/lib/utils";
import React from "react";

type TabItem = {
  label: string;
  value: string | number;
};

interface HorizontalTabsProps {
  tabs: TabItem[];
  value: string | number;
  onChange: (value: string | number) => void;
}

const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  tabs,
  value,
  onChange,
}) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap no-scrollbar w-[100vw] left-6">
      <div className="tabs tabs-boxed inline-flex flex-nowrap gap-2">
        {tabs.map((tab) => (
          <a
            key={tab.value}
            className={cn(
              "tab px-3.5 leading-[20px] rounded-lg h-8",
              value === tab.value
                ? "tab-active bg-black text-white font-bold "
                : "bg-bg3 text-text4 font-normal"
            )}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default HorizontalTabs;
