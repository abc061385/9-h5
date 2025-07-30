"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import HeaderBox from "./header";
import InfoBox from "./info";
import AwardDetail from "./award-detail";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";

const UpgradeView = () => {
  const t = useTrans();
  const [tabsValue, setTabsValue] = useState("USDM");
  const [awardInfo, setAwardInfo] = useState<AwardInfoType>();
  const tabs = [
    { label: "USDM", value: "USDM" },
    { label: "9MC", value: "9MC" },
  ];

  const { trigger } = useRequestMutation(
    api.fundProductConfig.getRewardStatsUsingGet
  );

  const getAwaedInfo = useCallback(() => {
    trigger(
      {
        outputToken: tabsValue,
      },
      {
        onSuccess: ({ data }) => {
          setAwardInfo(data as AwardInfoType);
        },
      }
    );
  }, [tabsValue, trigger]);

  useEffect(() => {
    getAwaedInfo();
  }, [getAwaedInfo]);
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
        {!!awardInfo && (
          <>
            <HeaderBox tabsValue={tabsValue} info={awardInfo} />
            <InfoBox
              tabsValue={tabsValue}
              info={awardInfo}
              initFn={getAwaedInfo}
            />
            <AwardDetail tabsValue={tabsValue} />
          </>
        )}
      </div>
    </ViewLayout>
  );
};
export default UpgradeView;
