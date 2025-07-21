"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { cn } from "@/lib/utils";
import { useState } from "react";

const AssetsWalletDetailView = () => {
  const [tabsValue, setTabsValue] = useState("0");

  const tabs = [
    { label: "全部", value: "0" },
    { label: "充币", value: "1" },
    { label: "提币", value: "2" },
  ];
  return (
    <ViewLayout header={<HeaderWithBack title="USDT" algin="center" />}>
      <div className="p-content">
        <div role="tablist" className="tabs tabs-box">
          {tabs.map((tab) => (
            <a
              role="tab"
              className={cn(
                "tab flex-1 leading-[100%]",
                tab.value === tabsValue && "tab-active"
              )}
              key={tab.value}
              onClick={() => setTabsValue(tab.value)}
            >
              {tab.label}
            </a>
          ))}
        </div>
        <div className="flex justify-between my-4 font-bold items-center border-b border-text2 border-dashed pb-2">
          <div className="flex flex-col gap-1">
            <span>-1.00 USDT</span>
            <span className="font-medium">2025-07-12</span>
          </div>
          <div className="flex flex-col gap-1 font-medium">
            <div className="badge badge-soft badge-success rounded-sm">Primary</div>
            <span>闪兑扣款</span>
          </div>
        </div>
      </div>
    </ViewLayout>
  );
};
export default AssetsWalletDetailView;
