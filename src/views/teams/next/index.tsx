"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import HorizontalTabs from "@/components/tabs/horizontal-tabs";
import Tabs from "@/components/tabs/tabs";
import { useTrans } from "@/hooks/useTrans";
import { useCallback, useEffect, useState } from "react";
import SubCardBox from "../sub-card";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { ShowIf } from "@/components/show-if";
import { ListNoData } from "@/components/nodata/list-nodata";
import { routerMap, useRouter } from "@/i18n/navigation";

interface AreaStatData {
  count: number;
  star: number;
  vipLevel: number;
}

const TeamsNextView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const baseApi = createAxiosInstance("/app");
  const { userInfo } = useUserStore();

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
  const [isDepositor, setIsDepositor] = useState(false);
  const [tabsCheck, setTabsCheck] = useState<{
    label: string;
    value: string | number;
  }>();
  const [loading, setLoading] = useState(true);
  const [directReferralNum, setDirectReferralNum] = useState(0);

  const [highLoading, setHighLoading] = useState(true);
  const [highestList, setHighestList] =
    useState<TeamDirectReferralAreaType[]>();

  const getAreaList = useCallback(async () => {
    try {
      const res: ApiResponse<TeamDirectReferralAreaType[]> = await baseApi.get(
        "/member/team/direct-referral/area/list",
        {
          params: {
            userId: userInfo?.id || 0,
            account: userInfo.emailAccount || "",
          },
        }
      );
      if (res.code === 200) {
        const arr = res?.data.map((v: TeamDirectReferralAreaType) => {
          return {
            value: v.id,
            label: v.username,
          };
        });
        setAreaList([{ label: t("withdraw.useAll"), value: "" }, ...arr]);
        setDirectReferralNum(res.data?.length || 0);
      }
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAreaList();
  }, [getAreaList]);

  const getAreaStat = useCallback(async () => {
    setLoading(true);
    try {
      const res: ApiResponse<AreaStatData[]> = await baseApi.get(
        "/member/team/page-query/areaStat",
        {
          params: {
            account:
              tabsCheck?.label === "All"
                ? userInfo.emailAccount
                : tabsCheck?.label || userInfo.emailAccount,
            topMemberId: tabsCheck?.value || userInfo.id || undefined,
            isDepositor: isDepositor ? 1 : 0,
          },
        }
      );
      setLoading(false);
      if (res.code === 200) {
        setAreaStatList(
          res.data?.length ? res.data : [{ vipLevel: 0, star: 0, count: 0 }]
        );
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tabsCheck?.label,
    tabsCheck?.value,
    userInfo.emailAccount,
    userInfo.id,
    isDepositor,
  ]);

  useEffect(() => {
    getAreaStat();
  }, [getAreaStat]);

  const userTabs = [
    {
      label: t("highestLevelUser"),
      value: 0,
    },
    {
      label: t("highestPerformingUsers"),
      value: 1,
    },
  ];

  const getHighList = useCallback(async () => {
    setHighLoading(true);
    const params = {
      account: userInfo.emailAccount || "",
      userId: userInfo.id || 0,
    };
    try {
      const res: ApiResponse<TeamDirectReferralAreaType[]> =
        userTabValue === 0
          ? await baseApi.get("/member/team/highest-level-user/list", {
              params,
            })
          : await baseApi.get("/member/team/highest-performing-user/list", {
              params,
            });
      setHighLoading(false);
      if (res.code === 200) {
        setHighestList(res.data);
      }
    } catch (err) {
      setHighLoading(false);
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.emailAccount, userInfo.id, userTabValue]);

  useEffect(() => {
    getHighList();
  }, [getHighList, userTabValue]);
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
            placeholder={t("searchForTeamMemberAccounts")}
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
              value={isDepositor ? 1 : 0}
              type="checkbox"
              className="checkbox checkbox-neutral1 w-4 h-4"
              onChange={(e) => {
                setIsDepositor(e.target.checked);
              }}
            />
          </label>
        </div>

        <HorizontalTabs
          tabs={areaList}
          value={tabsValue!}
          onChange={(e) => {
            setTabsValue(e);
            const checkItem = areaList.find((item) => item.value === e);
            setTabsCheck(checkItem);
          }}
          type="border"
          wrapClassName="gap-4"
        />
        <ShowIf
          condition={!loading}
          elseEl={<div className="loading flex mx-auto mt-4"></div>}
        >
          <div className="mt-4 grid grid-cols-4 gap-2">
            {areaStatList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col h-13.5 rounded-lg items-center justify-center bg-bg3 text-sm"
                  onClick={() => {
                    push(
                      `${routerMap.teamsMembers}?id=${
                        tabsValue || userInfo.id
                      }&type=level&level=${item.vipLevel}`
                    );
                  }}
                >
                  <span className="text-text4">VIP{item.vipLevel}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              );
            })}
          </div>
        </ShowIf>
        <div
          className="flex items-center justify-between text-sm border-y border-border2 py-6 my-6"
          onClick={() => {
            push(
              `${routerMap.teamsMembers}?id=${
                tabsValue || userInfo?.id
              }&type=direct`
            );
          }}
        >
          <span>{t("myDirectReferrals")}</span>
          <span className="flex gap-2 items-center font-medium">
            {directReferralNum}
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
        <ShowIf
          condition={!highLoading}
          elseEl={<div className="loading flex mx-auto mt-40"></div>}
        >
          {highestList?.length ? (
            highestList.map((v) => {
              return <SubCardBox key={v.id} data={v} />;
            })
          ) : (
            <ListNoData />
          )}
        </ShowIf>
      </div>
    </ViewLayout>
  );
};
export default TeamsNextView;
