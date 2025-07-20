"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import { useState } from "react";
import HeaderBox from "./header";
import InfoBox from "./info";
import AwardDetail from "./award-detail";

const UpgradeView = () => {
  const t = useTrans();
  const [tabsValue, setTabsValue] = useState("USDM");
  const tabs = [
    { label: "USDM", value: "USDM" },
    { label: "9MC", value: "9MC" },
  ];
  return (
    <ViewLayout header={<HeaderWithBack title={t("VIP计划")} algin="center" />}>
      <div className="p-content">
        <div role="tablist" className="tabs tabs-box mb-4">
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
        <HeaderBox />
        <InfoBox />
        <AwardDetail />
      </div>
    </ViewLayout>
  );
};
export default UpgradeView;
