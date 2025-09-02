"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import HorizontalTabs from "@/components/tabs/horizontal-tabs";
import Tabs from "@/components/tabs/tabs";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { useEffect, useState } from "react";
import SubCardBox from "../sub-card";

interface AreaData {
  area: string;
  topMemberId: number;
}

interface AreaStatData {
  count: number;
  star: number;
  vipLevel: number;
}

const TeamsNextView = () => {
  const t = useTrans();

  const [, setSearchValue] = useState("");
  const [areaList, setAreaList] = useState<
    {
      label: string;
      value: string | number;
    }[]
  >([]);
  const [tabsValue, setTabsValue] = useState<string | number>("");
  const [areaStatList, setAreaStatList] = useState<AreaStatData[]>([]);
  const [userTabValue, setUserTabValue] = useState(0);

  const { data } = useRequestQuery(api.member.memberTeamAreaUsingGet, {});
  const { trigger } = useRequestMutation(api.member.memberTeamAreaStatUsingGet);

  useEffect(() => {
    if (!data?.data?.length) return;
    const arr = data?.data.map((v: AreaData) => {
      return {
        value: v.topMemberId,
        label: v.area + t("区"),
      };
    });
    setAreaList([{ label: t("withdraw.useAll"), value: "" }, ...arr]);
  }, [data, t]);

  useEffect(() => {
    trigger(
      {
        topMemberId: (tabsValue as number) || undefined,
      },
      {
        onSuccess: ({ data }) => {
          setAreaStatList((data as AreaStatData[]) || []);
        },
      }
    );
  }, [tabsValue, trigger]);

  const userTabs = [
    {
      label: "Highest level user",
      value: 0,
    },
    {
      label: "Highest performing users",
      value: 1,
    },
  ];

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("teamMembers")} algin="center" />}
      className="h-max md-pc:h-full overflow-hidden"
    >
      <div className="p-content">
        <label className="input w-full !bg-bg3 border-none placeholder:text-text5">
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

        <div className="flex items-center text-sm my-4">
          <label className="label">
            {t("onlyShowDepositors")}
            <input
              type="checkbox"
              className="checkbox checkbox-neutral w-4 h-4"
            />
          </label>
        </div>

        <HorizontalTabs
          tabs={areaList}
          value={tabsValue!}
          onChange={(e) => setTabsValue(e)}
          type="border"
          gap="4"
        />
        <div className="mt-4 grid grid-cols-4 gap-2">
          {areaStatList.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col h-13.5 rounded-lg items-center justify-center bg-bg3 text-sm"
              >
                <span className="text-text4">VIP{item.vipLevel}</span>
                <span className="font-medium">{item.count}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between text-sm border-y border-border2 py-6 my-6">
          <span>My direct referrals</span>
          <span className="flex gap-2 items-center font-medium">
            584
            <Icon name="right-enter" className="w-1.5 h-2.5" />
          </span>
        </div>
        <Tabs
          tabs={userTabs}
          value={userTabValue}
          onChange={(e) => setUserTabValue(Number(e))}
          type="text"
          className="text-base mb-4"
          activeClassName="text-text1 font-medium"
          between={false}
        />
        <SubCardBox />
      </div>
    </ViewLayout>
  );
};
export default TeamsNextView;
