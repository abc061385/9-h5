"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useTrans } from "@/hooks/useTrans";
import { typeMap } from "@/lib/const";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ListType {
  id: number;
  status: number;
  type: number;
  inOut: string;
  amount: string;
  symbol: string;
  createTime: string;
}

const AssetsWalletDetailView = () => {
  const t = useTrans();
  const [tabsValue, setTabsValue] = useState<string | number>("");
  const searchParams = useSearchParams();

  const { trigger, data } = useRequestMutation(
    api.wallet.pageDetailListUsingPost
  );

  const list: ListType[] = data?.data?.list ?? [];

  const tabs = [
    { label: "全部", value: "" },
    { label: "充币", value: 4 },
    { label: "提币", value: 3 },
  ];

  useEffect(() => {
    trigger({
      pageNo: 1,
      pageSize: 10,
      coinCode: searchParams.get("coin") || "",
      type: tabsValue as number,
    });
  }, [trigger, searchParams, tabsValue]);

  const statusMap: {
    [key: string]: string;
  } = {
    0: t("walletDetail.statusPending"),
    1: t("walletDetail.statusSuccess"),
    2: t("walletDetail.statusFailed"),
  };
  return (
    <ViewLayout header={<HeaderWithBack title="USDT" algin="center" />}>
      <div className="p-content">
        <div role="tablist" className="tabs tabs-box">
          {tabs.map((tab) => (
            <a
              role="tab"
              className={cn(
                "tab flex-1 leading-[100%]",
                tab.value === tabsValue && "tab-active"
              )}
              key={tab.value}
              onClick={() => setTabsValue(tab.value)}
            >
              {tab.label}
            </a>
          ))}
        </div>
        {list.map((item) => {
          return (
            <div
              key={item?.id}
              className="flex justify-between my-4 font-bold items-center border-b border-text2 border-dashed pb-2"
            >
              <div className="flex flex-col gap-1">
                <span
                  className={cn(
                    item.inOut === "ADD_BALANCE" ? "text-rise" : "text-fall"
                  )}
                >
                  {item?.inOut === "ADD_BALANCE" ? "+" : ""}
                  {item?.amount}
                  <span className="text-xs ml-1">{item?.symbol}</span>
                </span>
                <span className="font-bold text-xs">{item?.createTime}</span>
              </div>
              <div className="flex flex-col gap-1 font-medium items-end text-xs">
                <div
                  className={cn(
                    "badge badge-soft rounded-sm py-1 text-xs font-bold",
                    item.status === 1
                      ? "badge-success"
                      : item.status === 0
                      ? "badge-info"
                      : item.status === 2
                      ? "badeg-error"
                      : ""
                  )}
                >
                  {statusMap[item?.status]}
                </div>
                <span>{t(typeMap[item?.type] || "--")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </ViewLayout>
  );
};
export default AssetsWalletDetailView;
