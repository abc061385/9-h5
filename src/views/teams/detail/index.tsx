"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import { ReactNode, useCallback, useState } from "react";
import TeamsNumBox from "./teams-num";

const TeamsDetailView = () => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();

  const [tabsValue, setTabsValue] = useState("1");

  const { data } = useRequestQuery(
    api.wallet.inteamInvestmentStatitUsingGet,
    {}
  );
  const info: TeamDetailType = data?.data as TeamDetailType;

  const tabs = [
    { label: t("团队投资额"), value: "1" },
    { label: t("团队人数"), value: "0" },
  ];

  const FieldEL = useCallback(
    (label: string | ReactNode, value: number) => {
      return (
        <div className="flex justify-between items-center mb-4 text-xs last:mb-0">
          <span className="font-medium">{label}</span>
          <span>{`≈ ${formatBalance(value, "USDT")} USDT`}</span>
        </div>
      );
    },
    [formatBalance]
  );

  const daysCard = useCallback(
    (days: number, value: number) => {
      return (
        <div className="flex flex-col flex-1 gap-1 bg-white rounded-md p-2">
          <span>{formatBalance(value || 0, "USDT")} USDT</span>
          <span className="font-normal text-xs">
            {t("多少天投资总额", { n: days })}
          </span>
        </div>
      );
    },
    [formatBalance, t]
  );

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("团队投资数据")} algin="center" />}
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
        {tabsValue === "1" ? (
          <div className="bg-bg1 rounded-md px-3.5 py-4 font-bold">
            <div className="flex justify-around">
              <div className="flex flex-col items-center gap-1">
                <span className="text-primary">
                  {info?.totalTeamMembers}
                  {t("人")}
                </span>
                <span>{t("团队总人数")}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-primary">
                  {info?.newMembersToday}
                  {t("人")}
                </span>
                <span>{t("今日新增人数")}</span>
              </div>
            </div>
            <div className="bg-white rounded-md p-3 my-4">
              {FieldEL(
                t("今日新增小区投资"),
                info?.newCommunityInvestmentToday || 0
              )}
              {FieldEL(
                t("今日新增团队投资"),
                info?.newTeamInvestmentToday || 0
              )}
              {FieldEL(t("小区总投资额"), info?.totalCommunityInvestment || 0)}
              {FieldEL(t("团队投资总额"), info?.totalTeamInvestment || 0)}
            </div>
            <div className="bg-white rounded-md py-4 flex flex-col items-center">
              <span>
                {formatBalance(info?.totalInvestment360Days || 0, "USDT")} USDT
              </span>
              <span className="text-xs">{t("多少天投资总额", { n: 360 })}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {daysCard(180, info?.totalInvestment180Days || 0)}
              {daysCard(90, info?.totalInvestment90Days || 0)}
              {daysCard(30, info?.totalInvestment30Days || 0)}
              {daysCard(7, info?.totalInvestment7Days || 0)}
            </div>
          </div>
        ) : (
          <TeamsNumBox />
        )}
      </div>
    </ViewLayout>
  );
};
export default TeamsDetailView;
