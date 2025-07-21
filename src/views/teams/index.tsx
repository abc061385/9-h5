"use client";

import { useCallback, useEffect, useState } from "react";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { cn, maskString } from "@/lib/utils";
import CardBox from "./card";
import { DataType } from "./type";
import { api } from "@/api";
import { InfiniteList } from "@/components/infinite-list";
import { useUserStore } from "@/store/useUserStore";
import { routerMap, useRouter } from "@/i18n/navigation";

const TeamsView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const userInfo = useUserStore((s) => s.userInfo);
  const [tabsValue, setTabsValue] = useState<number>();
  const [list, setList] = useState<DataType[]>([]);
  const [teamNumbers, setTeamNumbers] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const tabsList = [
    { label: "withdraw.useAll", value: undefined },
    { label: "已投资", value: 1 },
    { label: "未投资", value: 0 },
  ];

  const getList = useCallback(async () => {
    const { data } = await api.member.memberTeamPageQueryUsingGet1({
      pageNo: 1,
      pageSize: 15,
      userId: userInfo.id,
      isInvest: tabsValue,
      generation: 1,
      tel: searchValue,
    });
    setList(
      data?.list || [
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
          totalInvestmentTeam: 114707,
          totalInvestmentYesterday: 0,
          yesterdayReturn: 0,
          totalFundReturn: 317.18,
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
        {
          id: 61702,
          parentId: 55001,
          totalInvestment: 0,
          totalInvestmentTeam: 0,
          totalInvestmentYesterday: 0,
          yesterdayReturn: 0,
          totalFundReturn: 0,
          nodeInvestment: 0,
          tel: "o0n5msi00p@iwatermail.com",
          nickname: "o0n5msi00p@iwatermail.com",
          createTime: "2025-07-21 14:38:36",
          vipLevel: 1,
          generation: 1,
          frozen_ubx: 0,
          emailAccount: "o0n5msi00p@iwatermail.com",
          isInvest: 0,
          areaType: 1,
          accountType: 1,
          totalUsersCount: 0,
          yesterdayNewUsersCount: 0,
          area: "E",
        },
      ]
    );
  }, [tabsValue, searchValue, userInfo]);

  const getInfo = useCallback(async () => {
    const { data } = await api.wallet.inteamInvestmentStatitUsingGet();
    setTeamNumbers(data?.totalTeamMembers);
  }, []);

  useEffect(() => {
    getList();
    getInfo();
  }, [tabsValue, searchValue, getList, getInfo]);

  return (
    <ViewLayout
      header={<HeaderWithBack algin="center" title={t("我的团队")} />}
    >
      <div className="p-content">
        <label className="input w-full mb-2 bg-white">
          <Icon name="search" className="w-4 h-4" />
          <input
            type="search"
            className="grow"
            placeholder={t("查询团队账号")}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                setSearchValue((e.target as HTMLInputElement).value);
              }
            }}
          />
        </label>
        <div className="flex justify-between font-bold text-xs gap-2">
          <span>
            {t("团队总人数")}:
            <span className="text-sm">{teamNumbers || 0}</span>
          </span>
          <span className="text-primary flex-1 flex items-center justify-end">
            {t("查看团队投资数据")}
            <Icon name="right-arrow" className="w-3 h-3" />
          </span>
        </div>
        <div role="tablist" className="tabs tabs-box flex my-4">
          {tabsList.map((item, index) => {
            return (
              <a
                role="tab"
                className={cn(
                  "tab flex-1 leading-[100%]",
                  item.value === tabsValue && "tab-active"
                )}
                key={index}
                onClick={() => setTabsValue(item.value)}
              >
                {t(item.label)}
              </a>
            );
          })}
        </div>
        <div className="h-[75vh]">
          <InfiniteList<DataType, object>
            data={list}
            fetchMore={async (_index) => {
              console.log(_index);
              return [];
            }}
            itemContent={(_, item) => (
              <CardBox
                key={item.id}
                data={item}
                onClick={() =>
                  push(
                    `${routerMap.teamsNext}?id=${item.id}&name=${maskString(
                      item.nickname
                    )}`
                  )
                }
              />
            )}
          />
        </div>
      </div>
    </ViewLayout>
  );
};
export default TeamsView;
