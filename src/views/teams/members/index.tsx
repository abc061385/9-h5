"use client";

import { useCallback, useEffect, useState, ChangeEvent } from "react";
import ViewLayout from "@/components/layout";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import SubCardBox from "../sub-card";
import { useSearchParams } from "next/navigation";
import { ShowIf } from "@/components/show-if";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";
import { ListNoData } from "@/components/nodata/list-nodata";
import { createAxiosInstance } from "@/lib/axios";
import { useTrans } from "@/hooks/useTrans";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

const TeamsMembersView = () => {
  const t = useTrans();
  const searchParams = useSearchParams();
  const baseApi = createAxiosInstance("/app");

  const [searchValue, setSearchValue] = useState("");
  const [pageSize] = useState(10);
  const [list, setList] = useState<TeamDirectReferralAreaType[]>();

  const getList = useCallback(
    async (
      page = 1
    ): Promise<{ data: TeamDirectReferralAreaType[]; hasMore: boolean }> => {
      const requestParams: Record<string, unknown> = {
        pageNo: page,
        pageSize: pageSize,
        account: searchValue,
      };

      const rawQueryType = searchParams.get("type");
      const queryType = rawQueryType as
        | "level"
        | "direct"
        | "today"
        | "total"
        | null;
      const userId = searchParams.get("id") || 0;

      if (!queryType) {
        return {
          data: [],
          hasMore: false,
        };
      }

      const apiEndpoints: Record<
        "level" | "direct" | "today" | "total",
        { url: string; params: Record<string, unknown> }
      > = {
        level: {
          url: "/member/team/vip-level/page-list",
          params: {
            ...requestParams,
            level: searchParams.get("level"),
            userId,
            isDepositor: searchParams.get("isDepositor"),
            star: searchParams.get("star") || undefined,
          },
        },
        direct: {
          url: "/member/team/direct-referral/page-list",
          params: {
            ...requestParams,
            userId,
            isDepositor: searchParams.get("isDepositor"),
          },
        },
        today: {
          url: "/member/team/team-member/today/page-list",
          params: requestParams,
        },
        total: {
          url: "/member/team/team-member/total/page-list",
          params: requestParams,
        },
      };

      let response;
      {
        const { url, params } = apiEndpoints[queryType];
        response = await baseApi.get(url, { params });
      }

      const newData = response?.data?.list || [];
      const totalPages = Math.ceil(response?.data?.total / pageSize);
      const hasMorePages = page < totalPages;

      setList(newData);

      return {
        data: newData,
        hasMore: hasMorePages,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchValue, pageSize, searchParams]
  );

  useEffect(() => {
    getList();
  }, [searchValue, getList]);

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("members")} algin="center" />}
      heightFull
    >
      <div className="p-content h-full flex-col flex">
        <label className="input w-full !bg-bg3 border-none placeholder:text-text5 mb-4">
          <Icon name="search" className="w-4 h-4" />
          <input
            type="search"
            className="grow"
            placeholder={t("searchForTeamMemberAccounts")}
            onChange={useDebouncedCallback(
              (e: ChangeEvent<HTMLInputElement>) => {
                setSearchValue(e.target.value);
              },
              1000
            )}
          />
        </label>
        <div className="flex-1">
          {list === undefined ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="p-4 text-center text-text4">
                {t("common.loading")}
              </div>
            </div>
          ) : (
            <ShowIf condition={Boolean(list?.length)} elseEl={<ListNoData />}>
              <div className="flex-1 pb-0 h-full">
                <InfiniteVirtuosoList<TeamDirectReferralAreaType>
                  fetchData={getList}
                  columns={1}
                  renderItem={(item: TeamDirectReferralAreaType) => (
                    <div className="mb-2">
                      <SubCardBox key={item.id} data={item} />
                    </div>
                  )}
                />
              </div>
            </ShowIf>
          )}
        </div>
      </div>
    </ViewLayout>
  );
};

export default TeamsMembersView;
