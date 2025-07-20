"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CardBox from "./card";

const IncomeView = () => {
  const t = useTrans();
  const [tabsValue, setTabsValue] = useState("USDM");

  const tabs = [
    { label: "USDM", value: "USDM" },
    { label: "9MC", value: "9MC" },
  ];
  return (
    <ViewLayout
      header={<HeaderWithBack title={t("投资收益")} algin="center" />}
    >
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
        <h2 className="font-bold">{t("收益明细")}</h2>
        {[...new Array(10)].map((_, i) => (
          <CardBox key={i} />
        ))}
      </div>
    </ViewLayout>
  );
};
export default IncomeView;
