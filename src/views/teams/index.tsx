"use client";

import { useState } from "react";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import CardBox from "./card";
import { DataType } from "./type";

const TeamsView = () => {
  const t = useTrans();
  const [tabsValue, setTabsValue] = useState("");
  const tabsList = [
    {
      label: "withdraw.useAll",
      value: "",
    },
    {
      label: "已投资",
      value: "1",
    },
    {
      label: "未投资",
      value: "0",
    },
  ];
  const list: DataType[] = [
    {
      id: 55004,
      parentId: 55001,
      totalInvestment: 0,
      totalInvestmentTeam: 0,
      totalInvestmentYesterday: 0,
      yesterdayReturn: 0,
      totalFundReturn: 0,
      nodeInvestment: 0,
      tel: "Mjfi777",
      nickname: "Mjfi777",
      createTime: "2025-04-30 00:33:47",
      vipLevel: 0,
      generation: 1,
      frozen_ubx: 0,
      emailAccount: "",
      isInvest: 0,
      areaType: 1,
      accountType: 0,
      totalUsersCount: 0,
      yesterdayNewUsersCount: 0,
      area: "A",
    },
    {
      id: 55005,
      parentId: 55001,
      totalInvestment: 0,
      totalInvestmentTeam: 0,
      totalInvestmentYesterday: 0,
      yesterdayReturn: 0,
      totalFundReturn: 0,
      nodeInvestment: 0,
      tel: "Mjfi7777",
      nickname: "Mjfi7777",
      createTime: "2025-04-30 00:37:46",
      vipLevel: 0,
      generation: 1,
      frozen_ubx: 0,
      emailAccount: "",
      isInvest: 0,
      areaType: 1,
      accountType: 0,
      totalUsersCount: 4,
      yesterdayNewUsersCount: 0,
      area: "B",
    },
    {
      id: 55022,
      parentId: 55001,
      totalInvestment: 3000,
      totalInvestmentTeam: 121707,
      totalInvestmentYesterday: 0,
      yesterdayReturn: 0,
      totalFundReturn: 139.41,
      nodeInvestment: 3000,
      tel: "Theconsultant",
      nickname: "Theconsultant",
      createTime: "2025-05-01 16:34:32",
      vipLevel: 6,
      generation: 1,
      frozen_ubx: 0,
      emailAccount: "",
      isInvest: 1,
      areaType: 2,
      accountType: 0,
      totalUsersCount: 881,
      yesterdayNewUsersCount: 0,
      area: "C",
    },
    {
      id: 55319,
      parentId: 55001,
      totalInvestment: 0,
      totalInvestmentTeam: 0,
      totalInvestmentYesterday: 0,
      yesterdayReturn: 0,
      totalFundReturn: 0,
      nodeInvestment: 0,
      tel: "AAA123",
      nickname: "AAA123",
      createTime: "2025-05-17 23:15:40",
      vipLevel: 0,
      generation: 1,
      frozen_ubx: 0,
      emailAccount: "",
      isInvest: 0,
      areaType: 1,
      accountType: 0,
      totalUsersCount: 5,
      yesterdayNewUsersCount: 0,
      area: "D",
    },
  ];
  return (
    <ViewLayout
      header={<HeaderWithBack algin="center" title={t("我的团队")} />}
    >
      <div className="p-content">
        <label className="input w-full mb-2 bg-white">
          <Icon name="search" size={16} />
          <input
            type="search"
            className="grow"
            placeholder={t("查询团队账号")}
          />
        </label>
        <div className="flex justify-between font-bold text-xs gap-2">
          <span>
            {t("团队总人数")}:<span className="text-sm">894</span>
          </span>
          <span className="text-primary flex-1 flex items-center justify-end">
            {t("查看团队投资数据")}
            <Icon name="right-arrow" size={12} />
          </span>
        </div>
        <div role="tablist" className="tabs tabs-box flex my-4">
          {tabsList.map((item) => {
            return (
              <a
                role="tab"
                className={cn(
                  "tab flex-1 leading-[100%]",
                  item.value === tabsValue && "tab-active"
                )}
                key={item.value}
                onClick={() => setTabsValue(item.value)}
              >
                {t(item.label)}
              </a>
            );
          })}
        </div>
        {list.map((item) => {
          return <CardBox key={item.id} data={item} />;
        })}
      </div>
    </ViewLayout>
  );
};
export default TeamsView;
