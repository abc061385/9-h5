"use client";

import { useCallback, useEffect, useState } from "react";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { cn, maskString } from "@/lib/utils";
import CardBox from "../card";
import { DataType } from "../type";
import { api } from "@/api";
import { InfiniteList } from "@/components/infinite-list";
import { useSearchParams } from "next/navigation";
import { routerMap, useRouter } from "@/i18n/navigation";

const TeamsNextView = () => {
  const t = useTrans();
  const { back, push } = useRouter();
  const [tabsValue, setTabsValue] = useState<number>();
  const [list, setList] = useState<DataType[]>([]);
  const [teamNumbers, setTeamNumbers] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const tabsList = [
    { label: "withdraw.useAll", value: undefined },
    { label: "已投资", value: 1 },
    { label: "未投资", value: 0 },
  ];

  const getList = useCallback(async () => {
    if (!searchParams.get("id")) return;
    const { data } = await api.member.memberTeamPageQueryUsingGet({
      userId: Number(searchParams.get("id") || 0),
      isInvest: tabsValue,
      generation: 1,
    });
    setList(data as DataType[]);
  }, [tabsValue, searchParams]);

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
        <div className="badge badge-soft badge-primary flex items-center justify-between h-10 px-4 w-full rounded-md mb-4 font-bold">
          <span>
            {t("邀请人")}:{searchParams.get("name")}
          </span>
          <span className="flex items-center gap-1" onClick={() => back()}>
            {t("返回上级")} <Icon name="right-arrow" className="w-3" />
          </span>
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
export default TeamsNextView;
