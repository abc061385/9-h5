import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShowIf } from "../show-if";

export type TabItem = {
  label: string;
  value: string | number;
};

interface HorizontalTabsProps {
  tabs: TabItem[];
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "border" | "box";
  borderClassName?: string;
  activeClassName?: string;
  className?: string;
  wrapClassName?: string;
}


const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  tabs,
  value,
  onChange,
  type = "box",
  borderClassName,
  activeClassName,
  className,
  wrapClassName,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLAnchorElement>(null);

  // ✅ 自动滚动到选中标签
  useEffect(() => {
    const container = scrollRef.current;
    const activeTab = activeTabRef.current;
    if (container && activeTab) {
      const { offsetLeft, offsetWidth } = activeTab;
      const scrollLeft =
        offsetLeft - container.clientWidth / 2 + offsetWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [value]);

  // ✅ 横向滚动优先处理
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return; // 没有溢出不处理

      const atStart = el.scrollLeft === 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth;

      // 当有可滚动空间时，阻止默认纵向滚动
      if ((!atStart && e.deltaY < 0) || (!atEnd && e.deltaY > 0)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "overflow-x-auto whitespace-nowrap no-scrollbar relative w-full",
        "md-pc:w-[110%] pr-12"
      )}
    >
      <div
        className={cn(
          "tabs tabs-boxed inline-flex flex-nowrap gap-2",
          wrapClassName
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === value;

          return (
            <a
              key={tab.value}
              ref={isActive ? activeTabRef : null}
              className={cn(
                "tab leading-[20px] rounded-lg h-8 text-text1 font-normal flex-col transition-all",
                type === "border" ? "bg-transparent px-0 " : "bg-bg1 px-3 text-text1",
                className,
                isActive &&
                  cn(
                    type === "box"
                      ? "tab-active bg-primary text-black font-bold hover:text-black"
                      : "tab-active text-primary font-bold",
                    activeClassName
                  )
              )}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
              <ShowIf condition={type === "border"}>
                <div
                  className={cn(
                    "w-5 h-[3px] mx-auto",
                    isActive && "bg-primary",
                    isActive && borderClassName
                  )}
                />
              </ShowIf>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalTabs;
