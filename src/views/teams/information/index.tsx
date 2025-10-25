"use client";

import BaseImage from "@/components/base-image";
import TimePicker from "@/components/date-picker";
import { Drawer } from "@/components/drawer";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import HorizontalTabs from "@/components/tabs/horizontal-tabs";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { formatBalance1 } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import StarIcon from "@/views/vip/star-icon";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

const TeamsInformationView = () => {
  const t = useTrans();
  const { userInfo } = useUserStore();
  const searchParams = useSearchParams();
  const baseApi = createAxiosInstance("/app");
  const { push } = useRouter();
  const { formatBalance } = useFormatBalance();

  const [tabsValue, setTabsValue] = useState("0");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  const [information, setInformation] = useState<UserInvestmentData>();
  const [timePickerType, setTimePickerType] = useState<"start" | "end">(
    "start"
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const FieldEL = useCallback(
    (label: string | ReactNode, keyOrValue?: string | number) => {
      const value =
        typeof keyOrValue === "number"
          ? keyOrValue
          : ((): number => {
              const key = `${tabsValue === "0" ? "total" : "personal"}${
                keyOrValue || ""
              }` as keyof UserInvestmentData;
              return (information?.[key] as unknown as number) || 0;
            })();

      return (
        <div className="flex justify-between items-center mb-2 text-sm last:mb-0">
          <span className="text-text4">{label}</span>
          <span>{`≈ ${formatBalance(value, "USDT")} USDT`}</span>
        </div>
      );
    },
    [formatBalance, information, tabsValue]
  );

  const tabsList = [
    { label: t("team"), value: "0" },
    { label: t("personal"), value: "1" },
  ];

  const header = (
    <div className="flex-1 flex justify-center items-center relative font-bold text-lg max-w-[78vw]">
      <span className="truncate">
        {information?.nickname || t("personalInformation")}
      </span>
      <Icon
        name={filterDrawerOpen ? "filter-check" : "filter"}
        className="size-10 absolute right-[-32px]"
        onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
      />
    </div>
  );

  const getInformation = useCallback(
    async (start?: string, end?: string) => {
      try {
        const res: ApiResponse<UserInvestmentData> = await baseApi.get(
          "/member/team/team-member/personal-information",
          {
            params: {
              userId: searchParams.get("id") || userInfo?.id || 0,
              startTime: start || undefined,
              endTime: end || undefined,
            },
          }
        );
        if (res.code === 200) {
          setInformation(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, userInfo?.id]
  );

  useEffect(() => {
    if (searchParams.get("id")) {
      getInformation();
    }
  }, [getInformation, searchParams]);

  return (
    <ViewLayout
      header={<HeaderWithBack algin="center" title={header} />}
      heightFull
      className="h-full overflow-x-hidden no-scrollbar"
    >
      <div className="p-content">
        <div className="flex gap-4 items-center justify-between mb-6">
          <BaseImage src="/icons/user-head.svg" className="size-10" />
          <div className="flex-1 break-words max-w-[45%] leading-4">
            <b>{information?.nickname || "--"}</b>
            <div className="flex gap-1 mt-1">
              <div className="py-1 px-1.5 bg-primary rounded-sm text-white text-xs flex gap-2">
                V{information?.vipLevel || "0"}
                <StarIcon
                  level={information?.vipLevel || 0}
                  star={information?.star || 0}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end text-text4 text-sm gap-1">
            <span>{t("registrationDate")}</span>
            <span>{information?.createTime || "--"}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm border-y border-border2 py-6">
          <span>{t("totalTeamInvestment")}</span>
          <span className="flex gap-2 items-center font-medium">
            ≈ {formatBalance1(information?.totalTeamInvestment || 0, 4)} USDT
          </span>
        </div>
        <div
          className="flex items-center justify-between text-sm border-b border-border2 py-6"
          onClick={() => {
            push(
              `${routerMap.teamsMembers}?id=${searchParams.get(
                "id"
              )}&type=direct`
            );
          }}
        >
          <span>{t("totalTeamMembers")}</span>
          <span className="flex gap-2 items-center font-medium">
            {information?.totalTeamMembers || 0}{" "}
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
          <h4 className="my-4 text-sm">{t("9mAIStategyFund")}</h4>
          {FieldEL(`360 ${t("daysFund")}`, "InvestmentStrategy360Days")}
          {FieldEL(`180 ${t("daysFund")}`, "InvestmentStrategy180Days")}
          {FieldEL(`90 ${t("daysFund")}`, "InvestmentStrategy90Days")}
          {FieldEL(`30 ${t("daysFund")}`, "InvestmentStrategy30Days")}
          {FieldEL(`7 ${t("daysFund")}`, "InvestmentStrategy7Days")}
          {FieldEL(t("total"), "InvestmentStrategyAmount")}

          <h4 className="my-4 text-sm">{t("9mAIStableFund")}</h4>
          {FieldEL(`360 ${t("daysFund")}`, "InvestmentStable360Days")}
          {FieldEL(`180 ${t("daysFund")}`, "InvestmentStable180Days")}
          {FieldEL(`90 ${t("daysFund")}`, "InvestmentStable90Days")}
          {FieldEL(`30 ${t("daysFund")}`, "InvestmentStable30Days")}
          {FieldEL(`7 ${t("daysFund")}`, "InvestmentStable7Days")}
          {FieldEL(t("total"), "InvestmentStrategyAmount")}
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
          <h4 className="font-medium mb-2">{t("registrationDate")}</h4>

          <label className="input w-full h-12">
            <input
              type="text"
              className="input p-0"
              readOnly
              onClick={() => {
                setTimePickerType("start");
                setTimePickerOpen(true);
              }}
              placeholder={t("startTime")}
              value={startTime}
            />
            <Icon name={"date"} className="size-4" />
          </label>
          <label className="input w-full h-12 mt-2">
            <input
              type="text"
              className="input p-0"
              readOnly
              onClick={() => {
                setTimePickerType("end");
                setTimePickerOpen(true);
              }}
              placeholder={t("endTime")}
              value={endTime}
            />
            <Icon name={"date"} className="size-4" />
          </label>
          <div className="mt-6 grid grid-cols-[1fr_2fr] gap-2">
            <button
              className="btn btn-outline h-12"
              onClick={() => {
                setStartTime("");
                setEndTime("");
              }}
            >
              {t("reset")}
            </button>
            <button
              className="btn btn-primary h-12"
              onClick={() => {
                getInformation(startTime, endTime);
                setFilterDrawerOpen(false);
                setStartTime("");
                setEndTime("");
              }}
            >
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
        onChange={(e) => {
          if (timePickerType === "start") {
            setStartTime(dayjs(e).format("YYYY-MM-DD"));
          } else {
            setEndTime(dayjs(e).format("YYYY-MM-DD"));
          }
        }}
      />
    </ViewLayout>
  );
};
export default TeamsInformationView;
