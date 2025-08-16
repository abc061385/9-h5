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
import { useAssetStore } from "@/store/useAssetStore";
import BaseImage from "@/components/base-image";

const UpgradeView = () => {
  const t = useTrans();
  const { coinList } = useAssetStore();

  const [tabsValue, setTabsValue] = useState("USDM");
  const [awardInfo, setAwardInfo] = useState<AwardInfoType>();
  const tabs = [
    { label: "USDM", value: "USDM" },
    { label: "9MC", value: "9MC" },
  ];

  const { trigger } = useRequestMutation(
    api.fundProductConfig.getRewardStatsUsingGet,
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
      },
    );
  }, [tabsValue, trigger]);

  const coinLogo = useCallback(
    (coin: string) => {
      return coinList.find((v) => v.currencyCode === coin)?.logo || "";
    },
    [coinList],
  );

  useEffect(() => {
    getAwaedInfo();
  }, [getAwaedInfo]);
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("VIP计划")} algin="center" />}
    >
      <div className="p-content">
        <div role="tablist" className="tabs mb-4">
          {tabs.map((tab) => (
            <a
              role="tab"
              className={cn(
                "tab flex-1 leading-[100%]",
                tab.value === tabsValue && "tab-active font-bold",
              )}
              key={tab.value}
              onClick={() => setTabsValue(tab.value)}
            >
              <BaseImage
                src={coinLogo(tab.label)}
                className="size-5 rounded-full overflow-hidden mr-2"
              />

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
