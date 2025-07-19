"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import CoinIcon from "./coin-icon";
import { cn } from "@/lib/utils";
import { api } from "@/api";
import { Drawer } from "@/components/drawer";

type TokenListType = {
  id: number;
  pledgeToken1Logo: string;
  pledgeToken2Logo: string;
  pledgeToken1: string;
  pledgeToken2: string;
  dailyYield: number;
};

const ListBox = () => {
  const t = useTrans();
  const [tabsValue, setTabsValue] = useState(2);
  const [list, setList] = useState<TokenListType[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    { label: "360", value: 360 },
    { label: "180", value: 180 },
    { label: "30", value: 30 },
    { label: "1", value: 1 },
  ];

  const getTokenList = useCallback(async () => {
    const { data } = await api.fundProductConfig.pageUsingGet1({
      pageNo: 1,
      pageSize: 100,
      productType: tabsValue,
      pledgeDays: pledgeDays,
    });
    setList(data.list);
  }, [tabsValue, pledgeDays]);

  useEffect(() => {
    getTokenList();
  }, [getTokenList]);

  return (
    <div className="mt-4">
      <div role="tablist" className="tabs tabs-box">
        {tabs.map((tab) => (
          <a
            role="tab"
            className={cn(
              "tab flex-1",
              tab.value === tabsValue && "tab-active"
            )}
            key={tab.value}
            onClick={() => setTabsValue(tab.value)}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <span className="font-bold text-xs">{t("质押周期")}：</span>
          <div
            className="py-1.5 px-2 rounded-md bg-secondary font-bold text-xs flex items-center gap-1"
            onClick={() => setDrawerOpen(true)}
          >
            {pledgeDays} {t("天")}
            <Icon name="left-arrow" size={12} className="rotate-270" />
          </div>
        </div>
        <span className="flex items-center text-[#8F00FF] text-xs font-510">
          {t("基金规则")} <Icon name="right-arrow" size={12} />
        </span>
      </div>
      {list.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-2 mt-2 font-bold"
        >
          <div className="flex items-center">
            <CoinIcon
              coins={[
                { src: item.pledgeToken1Logo },
                { src: item.pledgeToken2Logo },
              ]}
              size={28}
              overlap={16}
              className="mr-5"
            />

            <div className="flex-1 font-bold text-sm">
              {item.pledgeToken1}/{item.pledgeToken2}
            </div>
          </div>
          <div className="text-text2 text-sm font-[510]">
            {t("日收益率")}：{item.dailyYield}%
          </div>
        </div>
      ))}
      <Drawer
        open={drawerOpen}
        onChange={setDrawerOpen}
        className="h-[40vh] py-4"
      >
        <div className="text-center font-bold">{t("质押周期")}</div>
        {pledgeList.map((item) => (
          <div
            key={item.value}
            className={cn(
              "h-10 flex justify-center items-center rounded-md my-2 font-bold text-[#757575]",
              item.value === pledgeDays && "bg-primary text-white"
            )}
            onClick={() => {
              setPledgeDays(item.value);
              setDrawerOpen(false);
            }}
          >
            {item.label}
            {t("天")}
          </div>
        ))}
      </Drawer>
    </div>
  );
};

export default ListBox;
