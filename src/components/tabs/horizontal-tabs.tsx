import { cn } from "@/lib/utils";
import React from "react";
import { ShowIf } from "../show-if";

type TabItem = {
  label: string;
  value: string | number;
};

interface HorizontalTabsProps {
  tabs: TabItem[];
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "border" | "box";
}

const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  tabs,
  value,
  onChange,
  type = "box",
}) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap no-scrollbar w-[100vw] left-6 pr-12">
      <div className="tabs tabs-boxed inline-flex flex-nowrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.value === value;
          return (
            <a
              key={tab.value}
              className={cn(
                "tab leading-[20px] rounded-lg h-8 text-text4 font-normal",
                type === "border" ? "bg-none px-0" : "bg-bg3 px-3",
                isActive && type === "box"
                  ? "tab-active bg-black text-white font-bold"
                  : "",
                isActive && type === "border"
                  ? "tab-active text-primary font-bold"
                  : ""
              )}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
              <ShowIf condition={type === "border"}>
                <div
                  className={cn(
                    "w-5 h-[3px] mx-auto",
                    isActive && "bg-primary"
                  )}
                ></div>
              </ShowIf>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalTabs;
