"use client";

import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { ReactNode, useCallback } from "react";

const TeamsInformationView = () => {
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
      header={<HeaderWithBack algin="center" title="Personal Information" />}
      heightFull
    >
      <div className="p-content">
        <div className="flex gap-4 items-center justify-between mb-6">
          <BaseImage src="/icons/user-head.svg" className="size-10" />
          <div className="flex-1">
            <b>9M****05</b>
            <div className="flex gap-1">
              <div className="py-1 px-1.5 bg-primary rounded-sm text-white text-xs">
                V5
              </div>
              <div className="badge badge-primary2 h-auto py-1 px-1.5 rounded-sm text-xs">
                Area A
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end text-text4 text-sm gap-1">
            <span>Registration date</span>
            <span>2025.05.13</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm border-y border-border2 py-6">
          <span>Total Team Investment</span>
          <span className="flex gap-2 items-center font-medium">
            ≈ 32,952,238.31 USDT
          </span>
        </div>
        <div className="flex items-center justify-between text-sm border-b border-border2 py-6">
          <span>Total Team Members</span>
          <span className="flex gap-2 items-center font-medium">
            584
            <Icon name="right-enter" className="w-1.5 h-2.5" />
          </span>
        </div>
        <div className="mt-6">
          <h3 className="font-medium mb-4">{t("投资总额")}</h3>
          {FieldEL(`360 ${t("daysFund")}`, info?.totalInvestment360Days || 0)}
          {FieldEL(`180 ${t("daysFund")}`, info?.totalInvestment180Days || 0)}
          {FieldEL(`90 ${t("daysFund")}`, info?.totalInvestment90Days || 0)}
          {FieldEL(`30 ${t("daysFund")}`, info?.totalInvestment30Days || 0)}
          {FieldEL(`7 ${t("daysFund")}`, info?.totalInvestment7Days || 0)}
          {FieldEL(`Total`, info?.totalInvestment7Days || 0)}
        </div>
      </div>
    </ViewLayout>
  );
};
export default TeamsInformationView;
