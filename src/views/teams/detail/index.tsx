"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { ReactNode, useCallback } from "react";
import { Icon } from "@/components/icon";

const TeamsDetailView = () => {
  const t = useTrans();
  const { formatBalance } = useFormatBalance();

  const { data } = useRequestQuery(
    api.wallet.inteamInvestmentStatitUsingGet,
    {}
  );
  const info: TeamDetailType = data?.data as TeamDetailType;

  const FieldEL = useCallback(
    (label: string | ReactNode, value: number) => {
      return (
        <div className="flex justify-between items-center mb-2 text-sm last:mb-0">
          <span className="text-text4">{label}</span>
          <span>{`≈ ${formatBalance(value, "USDT")} USDT`}</span>
        </div>
      );
    },
    [formatBalance]
  );

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("团队投资数据")} algin="center" />}
    >
      <div className="p-content">
        <div className="bg-[url('/images/team/team-data-bg.png')] bg-contain bg-no-repeat flex items-center justify-around h-[96px] text-white px-6">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold leading-6">
              {info?.totalTeamMembers || 0}
              <Icon
                name="right-enter-white"
                className="w-1.5 h-2.5 mb-1 ml-2"
              />
            </span>
            <span className="font-medium leading-4">{t("团队总人数")}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold leading-6">
              {info?.newMembersToday || 0}
              <Icon
                name="right-enter-white"
                className="w-1.5 h-2.5 mb-1 ml-2"
              />
            </span>
            <span className="font-medium leading-4">{t("今日新增人数")}</span>
          </div>
        </div>
        <h5 className="text-sm leading-5 mt-6">{t("团队投资总额")}</h5>
        <div className="font-bold leading-6 text-xl">
          {formatBalance(info?.totalTeamInvestment || 0, "USDT")} USDT
        </div>

        <div className="mt-6">
          {FieldEL(t("小区总投资额"), info?.totalCommunityInvestment || 0)}
          {FieldEL(t("团队投资总额"), info?.totalTeamInvestment || 0)}
          <div className="divider"></div>
          {FieldEL(
            t("今日新增小区投资"),
            info?.newCommunityInvestmentToday || 0
          )}
          {FieldEL(t("今日新增团队投资"), info?.newTeamInvestmentToday || 0)}
        </div>
        <div className="divider"></div>

        <div>
          <h3 className="font-medium mb-4">{t("投资总额")}</h3>
          {FieldEL("360 Days Fund", info?.totalInvestment360Days || 0)}
          {FieldEL("180 Days Fund", info?.totalInvestment180Days || 0)}
          {FieldEL("90 Days Fund", info?.totalInvestment90Days || 0)}
          {FieldEL("30 Days Fund", info?.totalInvestment30Days || 0)}
          {FieldEL("7 Days Fund", info?.totalInvestment7Days || 0)}
        </div>
      </div>
    </ViewLayout>
  );
};
export default TeamsDetailView;
