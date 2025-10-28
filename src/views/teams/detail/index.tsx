"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useTrans } from "@/hooks/useTrans";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useUserStore } from "@/store/useUserStore";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { Drawer } from "@/components/drawer";
import TimePicker from "@/components/date-picker";
import dayjs from "dayjs";

const TeamsDetailView = () => {
  const t = useTrans();
  const baseApi = createAxiosInstance("/app");
  const { push } = useRouter();
  const { userInfo } = useUserStore();
  const { formatBalance } = useFormatBalance();
  const [info, setInfo] = useState<InvestmentStats>();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [timePickerType, setTimePickerType] = useState<"start" | "end">(
    "start"
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  const FieldEL = useCallback(
    (label: string | ReactNode, value: number) => {
      return (
        <div className="flex justify-between items-center mb-2 text-sm last:mb-0">
          <span className="text-text4 flex-1">{label}</span>
          <span className="text-right">{`≈ ${formatBalance(
            value,
            "USDT"
          )} USDT`}</span>
        </div>
      );
    },
    [formatBalance]
  );

  const getTeamInvesData = useCallback(async (start?: string, end?: string) => {
    try {
      const res: ApiResponse<InvestmentStats> = await baseApi.get(
        "/wallet/team/investmentStat",
        {
          params: {
            start,
            end,
          },
        }
      );
      if (res.code === 200) {
        setInfo(res.data);
      }
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTeamInvesData();
  }, [getTeamInvesData]);

  const header = (
    <div className="flex-1 flex justify-center items-center relative font-bold text-lg max-w-[78vw]">
      <span className="truncate">{t("团队投资数据")}</span>
      <Icon
        name={filterDrawerOpen ? "filter-check" : "filter"}
        className="size-10 absolute right-[-32px]"
        onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
      />
    </div>
  );

  return (
    <ViewLayout header={<HeaderWithBack title={header} algin="center" />}>
      <div className="p-content">
        <div className="bg-[url('/images/team/team-data-bg.png')] bg-contain bg-no-repeat flex items-center justify-around h-[96px] text-white px-4 gap-2">
          <div
            className="flex flex-col gap-2 flex-1"
            onClick={() => {
              push(`${routerMap.teamsMembers}?id=${userInfo.id}&type=total`);
            }}
          >
            <span className="text-2xl font-bold leading-6">
              {info?.totalTeamMembers || 0}
              <Icon
                name="right-enter-white"
                className="w-1.5 h-2.5 mb-1 ml-2"
              />
            </span>
            <span className="font-medium leading-4 text-sm">
              {t("团队总人数")}
            </span>
          </div>
          <div
            className="flex flex-col gap-2 flex-1"
            onClick={() => {
              push(`${routerMap.teamsMembers}?id=${userInfo.id}&type=today`);
            }}
          >
            <span className="text-2xl font-bold leading-6">
              {info?.newMembersToday || 0}
              <Icon
                name="right-enter-white"
                className="w-1.5 h-2.5 mb-1 ml-2"
              />
            </span>
            <span className="font-medium leading-4 text-sm">
              {t("今日新增人数")}
            </span>
          </div>
        </div>
        <h5 className="text-sm leading-5 mt-6">{t("团队投资总额")}</h5>
        <div className="font-bold leading-6 text-xl">
          ≈{formatBalance(info?.totalTeamInvestment || 0, "USDT")} USDT
        </div>

        <div className="mt-6">
          {FieldEL(t("团队投资总额"), info?.totalTeamInvestment || 0)}
          <div className="divider"></div>
          {FieldEL(t("今日新增团队投资"), info?.newTeamInvestmentToday || 0)}
        </div>
        <div className="divider"></div>

        <div>
          <h3 className="font-medium text-sm">{t("投资总额")}</h3>

          <h4 className="my-4 text-sm">{t("9mAIStategyFund")}</h4>
          {FieldEL(
            `360 ${t("daysFund")}`,
            info?.totalInvestmentStrategy360Days || 0
          )}
          {FieldEL(
            `180 ${t("daysFund")}`,
            info?.totalInvestmentStrategy180Days || 0
          )}
          {FieldEL(
            `90 ${t("daysFund")}`,
            info?.totalInvestmentStrategy90Days || 0
          )}
          {FieldEL(
            `30 ${t("daysFund")}`,
            info?.totalInvestmentStrategy30Days || 0
          )}
          {FieldEL(
            `7 ${t("daysFund")}`,
            info?.totalInvestmentStrategy7Days || 0
          )}
          {FieldEL(t("total"), info?.totalInvestmentStrategyAmount || 0)}

          <h4 className="my-4 text-sm">{t("9mAIStableFund")}</h4>

          {FieldEL(
            `360 ${t("daysFund")}`,
            info?.totalInvestmentStable360Days || 0
          )}
          {FieldEL(
            `180 ${t("daysFund")}`,
            info?.totalInvestmentStable180Days || 0
          )}
          {FieldEL(
            `90 ${t("daysFund")}`,
            info?.totalInvestmentStable90Days || 0
          )}
          {FieldEL(
            `30 ${t("daysFund")}`,
            info?.totalInvestmentStable30Days || 0
          )}
          {FieldEL(`7 ${t("daysFund")}`, info?.totalInvestmentStable7Days || 0)}
          {FieldEL(t("total"), info?.totalInvestmentStableAmount || 0)}
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
          <h4 className="font-medium mb-2">{t("statisticsByTime")}</h4>

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
                getTeamInvesData(startTime, endTime);
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
export default TeamsDetailView;
