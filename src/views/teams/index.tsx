"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import CardBox from "./card";
import { DataType } from "./type";
import { api } from "@/api";
import { useUserStore } from "@/store/useUserStore";
import { routerMap, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import Tabs from "@/components/tabs/tabs";
import { ShowIf } from "@/components/show-if";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

const TeamsView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const userInfo = useUserStore((s) => s.userInfo);
  const [tabsValue, setTabsValue] = useState<number | string>("");
  const [list, setList] = useState<DataType[]>([]);
  const [teamNumbers, setTeamNumbers] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pageSize] = useState(100);

  const tabsList = [
    { label: t("withdraw.useAll"), value: "" },
    { label: t("已投资"), value: 1 },
    { label: t("未投资"), value: 0 },
  ];

  const getList = useCallback(
    async (page = 1) => {
      const { data } = await api.member.memberTeamPageQueryUsingGet1({
        pageNo: page,
        pageSize: pageSize,
        userId: userInfo.id,
        isInvest: tabsValue === "" ? undefined : (tabsValue as number),
        generation: 1,
        tel: searchValue,
      });
      const newData = data?.list || [];
      setList(newData);
      return {
        data: newData,
        hasMore: page < data.total / pageSize,
      };
    },
    [tabsValue, searchValue, userInfo, pageSize],
  );

  const getInfo = useCallback(async () => {
    const { data } = await api.wallet.inteamInvestmentStatitUsingGet();
    setTeamNumbers(data?.totalTeamMembers);
  }, []);
  const deboun = useDebouncedCallback(() => {
    getList();
    getInfo();
  }, 300);

  useEffect(() => {
    deboun();
  }, [tabsValue, searchValue, deboun]);

  const NoDataEl = (
    <div className="text-center mt-20">
      <Icon
        name="Invite"
        className="w-14 h-14 mb-4"
        onClick={() => push(routerMap.invite)}
      />
      <p>{t("noTeamMembers")}</p>
      <p>{t("inviteFriends")}</p>
      <button
        className="btn btn-primary w-[168px] mt-6"
        onClick={() => push(routerMap.invite)}
      >
        {t("user.invite")}
      </button>
    </div>
  );

  return (
    <ViewLayout dock heightFull className="relative flex flex-col">
      <div>
        <Image
          src="/images/team/team-banner.png"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            position: "relative",
            top: "-40px",
            marginBottom: "-78px",
          }}
        />
      </div>
      <header className="p-content absolute top-0 w-full">
        <div className="flex items-center justify-between gap-4">
          <span className="font-bold text-lg">{t("我的团队")}</span>
          <span className="text-sm flex-1 text-right" onClick={() => push(routerMap.teamDetail)}>
            {t("查看团队投资数据")}
            <Icon name="right-enter" className="w-1.5 h-2.5 ml-2" />
          </span>
        </div>
        <div className="mt-1">
          <b className="text-3xl">{teamNumbers || 0}</b>
        </div>
      </header>
      <div className="p-content flex-1 flex flex-col relative pb-4">
        <label className="input w-full mb-4 !bg-bg3 border-none placeholder:text-text5">
          <Icon name="search" className="w-4 h-4" />
          <input
            type="search"
            className="grow"
            placeholder={t("查询团队账号")}
            onInput={(e) => {
              setSearchValue((e.target as HTMLInputElement).value);
              // if (!(e.target as HTMLInputElement).value) {
              //   // 清除按钮被点击时触发
              //   getList();
              //   getInfo();
              // }
            }}
            // onKeyDown={(e) => {
            //   if (e.code === "Enter") {
            //     setSearchValue((e.target as HTMLInputElement).value);
            //   }
            // }}
          />
        </label>
        <Tabs
          tabs={tabsList}
          value={tabsValue!}
          onChange={(e) => setTabsValue(e as number)}
          between={false}
          className="text-base justify-start"
        />
        <ShowIf condition={Boolean(list?.length)} elseEl={NoDataEl}>
          <div className="mt-4.5 flex-1 pb-0">
            <InfiniteVirtuosoList<DataType>
              fetchData={getList}
              columns={1}
              renderItem={(item: DataType) => (
                <CardBox key={item.id} data={item} />
              )}
            />
          </div>
        </ShowIf>
        <ShowIf condition={Boolean(list?.length)}>
          <button
            className="btn btn-primary absolute bottom-4 z-20"
            style={{ width: "calc(100% - 48px)" }}
            onClick={() => push(routerMap.teamsNext)}
          >
            {t("查看下级")}
          </button>
        </ShowIf>
      </div>
    </ViewLayout>
  );
};
export default TeamsView;
