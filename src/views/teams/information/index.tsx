"use client";

import { api } from "@/api";
import BaseImage from "@/components/base-image";
import TimePicker from "@/components/date-picker";
import { Drawer } from "@/components/drawer";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import HorizontalTabs from "@/components/tabs/horizontal-tabs";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { ReactNode, useCallback, useState } from "react";

const TeamsInformationView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const { formatBalance } = useFormatBalance();

  const [tabsValue, setTabsValue] = useState("0");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

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

  const tabsList = [
    { label: "Team", value: "0" },
    { label: "Personal", value: "1" },
  ];

  const header = (
    <div className="flex-1 flex justify-center items-center relative font-bold text-lg">
      <span></span>
      Personal Information
      <Icon
        name={filterDrawerOpen ? "filter-check" : "filter"}
        className="size-10 absolute right-[-32px]"
        onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
      />
    </div>
  );
  return (
    <ViewLayout
      header={<HeaderWithBack algin="center" title={header} />}
      heightFull
      className="h-full overflow-x-hidden no-scrollbar"
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
        <div
          className="flex items-center justify-between text-sm border-b border-border2 py-6"
          onClick={() => {
            push(routerMap.teamsMembers);
          }}
        >
          <span>Total Team Members</span>
          <span className="flex gap-2 items-center font-medium">
            584
            <Icon name="right-enter" className="w-1.5 h-2.5" />
          </span>
        </div>
        <div className="mt-6">
          <h3 className="font-medium mb-4">{t("投资总额")}</h3>
          <HorizontalTabs
            tabs={tabsList}
            value={tabsValue}
            onChange={(e) => setTabsValue(e as string)}
            type="border"
            wrapClassName="gap-4"
            className="text-base!"
          />
          <h4 className="my-4 text-sm">9M AI Stategy Fund</h4>
          {FieldEL(`360 ${t("daysFund")}`, info?.totalInvestment360Days || 0)}
          {FieldEL(`180 ${t("daysFund")}`, info?.totalInvestment180Days || 0)}
          {FieldEL(`90 ${t("daysFund")}`, info?.totalInvestment90Days || 0)}
          {FieldEL(`30 ${t("daysFund")}`, info?.totalInvestment30Days || 0)}
          {FieldEL(`7 ${t("daysFund")}`, info?.totalInvestment7Days || 0)}
          {FieldEL(`Total`, info?.totalInvestment7Days || 0)}

          <h4 className="my-4 text-sm">9M AI Stable Fund</h4>
          {FieldEL(`360 ${t("daysFund")}`, info?.totalInvestment360Days || 0)}
          {FieldEL(`180 ${t("daysFund")}`, info?.totalInvestment180Days || 0)}
          {FieldEL(`90 ${t("daysFund")}`, info?.totalInvestment90Days || 0)}
          {FieldEL(`30 ${t("daysFund")}`, info?.totalInvestment30Days || 0)}
          {FieldEL(`7 ${t("daysFund")}`, info?.totalInvestment7Days || 0)}
          {FieldEL(`Total`, info?.totalInvestment7Days || 0)}
        </div>
      </div>
      <Drawer
        open={filterDrawerOpen}
        onChange={() => setFilterDrawerOpen(false)}
        direction="top"
        className="p-0 h-max"
        title={<HeaderWithBack algin="center" title={header} />}
      >
        <div className="p-content pb-6">
          <h4 className="font-medium mb-2">Statistics by time</h4>

          <label className="input w-full h-12">
            <input
              type="text"
              className="input p-0"
              readOnly
              onClick={() => setTimePickerOpen(true)}
              placeholder={"Start time"}
            />
            <Icon name={"date"} className="size-4" />
          </label>
          <label className="input w-full h-12 mt-2">
            <input
              type="text"
              className="input p-0"
              readOnly
              onClick={() => setTimePickerOpen(true)}
              placeholder={"End time"}
            />
            <Icon name={"date"} className="size-4" />
          </label>
          <div className="mt-6 grid grid-cols-[1fr_2fr] gap-2">
            <button className="btn btn-outline h-12">Reset</button>
            <button className="btn btn-primary h-12">
              {t("common.confirm")}
            </button>
          </div>
        </div>
      </Drawer>
      <TimePicker
        open={timePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        value={{
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDay(),
        }}
        onChange={(e) => console.log(e)}
      />
    </ViewLayout>
  );
};
export default TeamsInformationView;
