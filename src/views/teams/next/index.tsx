"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import HorizontalTabs from "@/components/tabs/horizontal-tabs";
import Tabs from "@/components/tabs/tabs";
import { useTrans } from "@/hooks/useTrans";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import SubCardBox from "../sub-card";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { ShowIf } from "@/components/show-if";
import { ListNoData } from "@/components/nodata/list-nodata";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useClickAway } from "@/hooks/useClickOutside";

interface AreaStatData {
  count: number;
  star: number;
  vipLevel: number;
}

const TeamsNextView = () => {
  const searchParams = useSearchParams();
  const t = useTrans();
  const { push } = useRouter();
  const baseApi = createAxiosInstance("/app");
  const { userInfo } = useUserStore();

  const [searchValue, setSearchValue] = useState("");
  const [areaList, setAreaList] = useState<
    {
      label: string;
      value: string | number;
    }[]
  >([]);
  const [tabsValue] = useState<string | number>("");
  const [areaStatList, setAreaStatList] = useState<AreaStatData[]>([]);
  const [userTabValue, setUserTabValue] = useState(0);
  const [isDepositor, setIsDepositor] = useState(false);

  const [loading, setLoading] = useState(true);
  const [directReferralNum, setDirectReferralNum] = useState(0);

  const [highLoading, setHighLoading] = useState(true);
  const [highestList, setHighestList] =
    useState<TeamDirectReferralAreaType[]>();

  const [searchList, setSearchList] = useState<TeamsAllUserSearchList[]>();
  const [searchLoading, setSearchLoading] = useState(true);

  const getAreaList = useCallback(async () => {
    try {
      const res: ApiResponse<TeamDirectReferralAreaType[]> = await baseApi.get(
        "/member/team/direct-referral/area/list",
        {
          params: {
            userId: searchParams.get("id") || userInfo?.id || 0,
            account: searchParams.get("username") || "",
            isDepositor: isDepositor ? 1 : 0,
          },
        }
      );
      if (res.code === 200) {
        const arr = res?.data.map((v: TeamDirectReferralAreaType) => {
          return {
            value: v.id,
            label: v.username || v.tel || v.nickname || v.bindEmail || "",
          };
        });
        setAreaList([{ label: t("withdraw.useAll"), value: "" }, ...arr]);
        setDirectReferralNum(res.data?.length || 0);
      }
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, t, userInfo?.id, isDepositor]);

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
            userId: searchParams.get("id") || userInfo.id || undefined,
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
    searchParams,
    userInfo?.emailAccount,
    userInfo?.bindEmail,
    userInfo?.tel,
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
      account: searchParams.get("username") || "",
      userId: searchParams.get("id") || userInfo.id || 0,
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
  }, [userInfo.id, userTabValue]);

  useEffect(() => {
    getHighList();
  }, [getHighList, userTabValue]);

  const getSearchList = useCallback(async () => {
    setSearchLoading(true);
    if (!searchValue) {
      setSearchLoading(false);
      setSearchList([]);
      return;
    }
    try {
      const res: ApiResponse<TeamsAllUserSearchList[]> = await baseApi.get(
        "/member/team/team-member/list",
        {
          params: {
            userId: userInfo.id,
            account: searchValue || "",
          },
        }
      );
      setSearchLoading(false);
      if (res.code === 200) {
        setSearchList(res.data);
      }
    } catch (error) {
      setSearchLoading(false);
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, userInfo.id]);

  useEffect(() => {
    getSearchList();
  }, [getSearchList]);

  const ref = useRef<HTMLLabelElement>(null);

  useClickAway(() => {
    setSearchValue("");
  }, ref);

  return (
    <ViewLayout
      heightFull
      header={
        <HeaderWithBack
          title={searchParams.get("username") || t("teamMembers")}
          algin="center"
        />
      }
      className="h-max md-pc:h-full overflow-hidden"
    >
      <div className="p-content">
        <ShowIf condition={!searchParams.get("id")}>
          <label
            ref={ref}
            className={cn(
              "input w-full !bg-bg3 border-none placeholder:text-text5 relative",
              Boolean(searchValue) ? "rounded-b-none!" : ""
            )}
          >
            <Icon name="search" className="w-4 h-4" />
            <input
              type="search"
              className={cn("grow")}
              placeholder={t("searchForTeamMemberAccounts")}
              onChange={useDebouncedCallback(
                (e: ChangeEvent<HTMLInputElement>) => {
                  setSearchValue(e.target.value);
                },
                500
              )}
            />
            <ShowIf condition={Boolean(searchValue)}>
              <div className="absolute w-full bg-bg3 top-10 left-0 z-10 rounded-b-lg p-4">
                <ShowIf
                  condition={!searchLoading}
                  elseEl={<div className="loading flex mx-auto my-10"></div>}
                >
                  <div className="bg-white rounded-2xl max-h-80 overflow-auto">
                    {searchList?.length ? (
                      searchList?.map((v, i) => {
                        return (
                          <div
                            key={i}
                            className="flex justify-between items-center text-sm my-2 p-4 rounded-lg border-b border-border2"
                            onClick={() =>
                              push(`${routerMap.teamsInformation}?id=${v.id}`)
                            }
                          >
                            <span className="font-medium text-text3">
                              {v.nickname}
                            </span>
                            <span>{v.levelName}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center">{t("暂无数据")}</div>
                    )}
                  </div>
                </ShowIf>
              </div>
            </ShowIf>
          </label>
        </ShowIf>

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
            push(`${routerMap.teamsInformation}?id=${e}`);
            // setTabsValue(e);
            // const checkItem = areaList.find((item) => item.value === e);
            // setTabsCheck(checkItem);
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
                        searchParams.get("id") || userInfo.id
                      }&type=level&level=${item.vipLevel}&isDepositor=${
                        isDepositor ? 1 : 0
                      }`
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
        <ShowIf
          condition={!searchParams.get("id")}
          elseEl={<div className="my-6 h-[1px] bg-border2"></div>}
        >
          <div
            className="flex items-center justify-between text-sm border-y border-border2 py-6 my-6"
            onClick={() => {
              push(
                `${routerMap.teamsMembers}?id=${
                  searchParams.get("id") || userInfo?.id
                }&type=direct&isDepositor=${isDepositor ? 1 : 0}`
              );
            }}
          >
            <span>{t("myDirectReferrals")}</span>
            <span className="flex gap-2 items-center font-medium">
              {directReferralNum}
              <Icon name="right-enter" className="w-1.5 h-2.5" />
            </span>
          </div>
        </ShowIf>
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
