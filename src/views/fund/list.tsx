"use client";

import { useCallback, useState } from "react";
import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import CoinIcon from "./coin-icon";
import { api } from "@/api";
import { routerMap, useRouter } from "@/i18n/navigation";
import Tabs from "@/components/tabs/tabs";
import HorizontalTabs from "@/components/tabs/horizontal-tabs";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";

const ListBox = () => {
  const t = useTrans();
  const { push } = useRouter();
  const [tabsValue, setTabsValue] = useState(2);
  const [pledgeDays, setPledgeDays] = useState(360);

  const tabs = [
    {
      label: t("策略基金"),
      value: 2,
    },
    {
      label: t("稳健基金"),
      value: 1,
    },
  ];
  const pledgeList = [
    { label: "360" + t("天"), value: 360 },
    { label: "180" + t("天"), value: 180 },
    { label: "90" + t("天"), value: 90 },
    { label: "30" + t("天"), value: 30 },
    { label: "7" + t("天"), value: 7 },
  ];

  const getTokenList = useCallback(
    async (page: number) => {
      const { data } = await api.fundProductConfig.pageUsingGet1({
        pageNo: page,
        pageSize: 100,
        productType: tabsValue,
        pledgeDays: pledgeDays,
      });
      const newData = data?.list || [];
      return {
        data: newData,
        hasMore: data.pageNum < data.pages,
      };
    },
    [tabsValue, pledgeDays],
  );

  return (
    <>
      <Tabs
        tabs={tabs}
        value={tabsValue}
        onChange={(value) => setTabsValue(value as number)}
      />

      <div className="flex items-center justify-between mt-4 font-medium mb-2">
        <span className="text-base">{t("质押周期")}：</span>
        <span
          className="flex items-center text-sm"
          onClick={() => {
            push(routerMap.rule);
          }}
        >
          {t("基金规则")} <Icon name="right-enter" className="w-2 h-2.5 ml-2" />
        </span>
      </div>
      <HorizontalTabs
        tabs={pledgeList}
        value={pledgeDays}
        onChange={(value) => setPledgeDays(value as number)}
      />
      <div className="mt-4 grow flex flex-col">
        <InfiniteVirtuosoList<TokenListType>
          fetchData={getTokenList}
          className="!flex-1"
          columns={2}
          renderItem={(item: TokenListType) => (
            <div
              key={item.id}
              className="bg-bg2 rounded-2xl p-4"
              onClick={() =>
                push(
                  `${routerMap.fundBuy}?id=${item.productId}&pledgeDays=${pledgeDays}`,
                )
              }
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-base font-medium">
                  {item.pledgeToken1}/{item.pledgeToken2}
                </span>
                <CoinIcon
                  coins={[
                    { src: item.pledgeToken1Logo },
                    { src: item.pledgeToken2Logo },
                  ]}
                  size={20}
                  overlap={16}
                  className="pr-2"
                />
              </div>
              <div className="text-text4 text-xs mt-1 flex flex-col">
                {t("日收益率")}
                <span className="text-rise text-base font-bold">
                  {" "}
                  ≈ {item.dailyYield}%
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default ListBox;
