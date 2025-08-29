"use client";
import { api } from "@/api";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import CoinIcon from "../fund/coin-icon";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import BaseImage from "@/components/base-image";
import toast from "react-hot-toast";
import { useLocale } from "next-intl";
import { langType } from "../news";
// import ChartBox from "./chart";

const FundBox = () => {
  const t = useTrans();
  const { push } = useRouter();
  const locale = useLocale();
  const [pledgeDays] = useState(180);
  const [newsList, setNewsList] = useState<NewsDataType[]>([]);

  const { data } = useRequestQuery(api.fundProductConfig.pageUsingGet2, {
    pledgeDays: pledgeDays,
    pageNo: 1,
    pageSize: 6,
    productType: 2,
    order: "asc",
  });

  const list: TokenListType[] = data?.data?.list || [];

  const getList = useCallback(async () => {
    const { data } = await api.cms.pageAnnouncementUsingGet({
      pageNo: 1,
      pageSize: 1,
    });
    setNewsList(data?.list || []);
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  const hotList = [
    { label: t("home.database"), icon: "database", path: routerMap.faq },
    {
      label: t("home.invite_friend"),
      icon: "invite-friends",
      path: routerMap.invite,
    },
    { label: t("home.ranking"), icon: "ranking" },
    { label: t("home.challenge"), icon: "challenge" },
  ];

  return (
    <div>
      <div
        className="flex items-center justify-between mt-2"
        onClick={() => push(routerMap.news)}
      >
        <Icon name="trumpet" className="size-6 mr-2" />
        <p className="flex-1 text-left mr-8 truncate text-xs">
          {newsList?.[0]?.["title" + (langType[locale] || "En")]}
        </p>
        <Icon name="right-enter" className="w-1.5 h-2.5" />
      </div>
      <div className="flex justify-between mt-6">
        {hotList.map((v, i) => {
          return (
            <div
              key={i}
              className="text-center"
              onClick={() => {
                if (v.path) return push(v.path);
                toast.error(t("notOpenYet"));
              }}
            >
              <BaseImage
                src={`/images/home/${v.icon}.svg`}
                className="size-14"
              />
              <h4 className="text-xs mt-1">{v.label}</h4>
            </div>
          );
        })}
      </div>

      {/* <ChartBox /> */}
      <h2 className="mb-4 font-medium text-base mt-6">{t("9M基金推荐")}</h2>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {list.map((item) => (
          <div
            key={item.id}
            className="bg-bg2 rounded-2xl p-4"
            onClick={() =>
              push(
                `${routerMap.fundBuy}?id=${item.productId}&pledgeDays=${pledgeDays}`,
              )
            }
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-base font-medium">
                {item.pledgeToken1}/{item.pledgeToken2}
              </span>
              <CoinIcon
                coins={[
                  { src: item.pledgeToken1Logo },
                  { src: item.pledgeToken2Logo },
                ]}
                size={20}
                overlap={16}
                className="pr-2"
              />
            </div>
            <div className="text-text4 text-xs mt-1 flex flex-col">
              {t("日收益率")}
              <span className="text-rise text-base font-bold">
                {" "}
                ≈ {item.dailyYield}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        className="text-sm flex items-center justify-center gap-2 mt-4"
        onClick={() => push(routerMap.fund)}
      >
        {t("common.more")}
        <Icon name="right-enter" className="w-1.5 h-2.5" />
      </div>
    </div>
  );
};

export default FundBox;
