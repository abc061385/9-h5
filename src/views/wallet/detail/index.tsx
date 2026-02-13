"use client";

import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";
import ViewLayout from "@/components/layout";
import Tabs from "@/components/tabs/tabs";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { typeMap, WalletOrderType } from "@/lib/const";
import { cn } from "@/lib/utils";
import { useAssetStore } from "@/store/useAssetStore";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ListType {
  id: number;
  status: 0 | 1 | 2;
  type: string;
  inOut: string;
  amount: string;
  beforeBalance: string;
  symbol: string;
  createTime: string;
  detail?: string;
}

const WalletDetailView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const { formatBalance } = useFormatBalance();
  const searchParams = useSearchParams();
  const { getCoinList, coinLogoMap } = useAssetStore();
  const [tabsValue, setTabsValue] = useState(-1);

  const [coin, setCoin] = useState("");

  const showDetail = ["RECHARGE", "WITHDRAW"];

  useEffect(() => {
    getCoinList();
  }, [getCoinList]);

  useEffect(() => {
    setCoin(searchParams.get("coin") || "");
  }, [searchParams]);

  const getList = useCallback(
    async (page: number) => {
      const { data } = await api.wallet.pageDetailListUsingPost({
        pageNo: page,
        pageSize: 20,
        coinCode: searchParams.get("coin") || "",
        type: (tabsValue === -1 ? "" : tabsValue) as unknown as number,
      });
      const newData = data?.list || [];
      return {
        data: newData,
        hasMore: data.pageNum < data.pages,
      };
    },
    [searchParams, tabsValue],
  );

  const getStatusText = (status: ListType["status"], type: string) => {
    const statusMap = {
      0: t("处理中"),
      1: t("walletDetail.statusSuccess"),
      2: t("walletDetail.statusFailed"),
    };
    if (WalletOrderType.indexOf(type) > -1) {
      statusMap[2] = t("已提取");
    }
    if (
      type == "INVESTMENT_INCOME" ||
      type == "VIP_REWARD" ||
      type == "EQUAL_LEVEL_REWARD" ||
      type == "CURRENCY_RIGHTS_REWARD"
    ) {
      statusMap[1] = t("已发放");
      statusMap[2] = t("已提取");
    }

    if (type === "CLAIM_SMART_YIELD_WALLET") {
      statusMap[0] = t("处理中");
    }
    return statusMap[status] || t("walletDetail.statusUnknown");
  };
  const tabs = [
    {
      label: t("withdraw.useAll"),
      value: -1,
    },
    {
      label: t("充值"),
      value: 4,
    },
    {
      label: t("transaction_WITHDRAW"),
      value: 3,
    },
    {
      label: t("transaction_TRANSFER"),
      value: 0,
    },
    {
      label: t("internal_transfer"),
      value: 73,
    },
  ];
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={coin?.toUpperCase()} algin="center" />}
    >
      <div className="p-content flex flex-col h-full">
        <Tabs
          tabs={tabs}
          value={tabsValue}
          className="mb-4"
          onChange={(value) => setTabsValue(value as number)}
        />

        <div className="grow flex flex-col">
          <div className="grow">
            <InfiniteVirtuosoList<ListType>
              fetchData={getList}
              renderItem={(item) => (
                <div
                  key={item?.id}
                  className="rounded-lg bg-bg1 p-4 mb-4"
                  onClick={() => {
                    if (showDetail.indexOf(item.type) !== -1) {
                      push(`${routerMap.walletTransDetail}?id=${item.id}`);
                    }
                  }}
                >
                  <div className="flex justify-between">
                    <BaseImage
                      src={coinLogoMap[item?.symbol?.toUpperCase()]}
                      className="size-6 mr-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="mb-2">
                          {item?.inOut === "ADD_BALANCE" ? "+" : "-"}
                          {/* {formatBalance(item?.amount, coin)} */}
                          {formatBalance(Math.abs(Number(item?.amount)), coin)}
                          <span className="ml-1">{item?.symbol}</span>
                        </div>
                        <div>
                          <span
                            className={cn([
                              {
                                "text-[#3491FA]": item.status === 0,
                                "text-[#1DA75C]": item.status === 1,
                                "text-[#6E2AFE]": item.status === 2,
                              },
                            ])}
                          >
                            {getStatusText(item?.status, item?.type)}
                          </span>
                          {showDetail.indexOf(item.type) !== -1 ? (
                            <Icon
                              name="right-enter"
                              className="w-1.5 h-2.5 ml-2"
                              color="var(--color-text1)"
                            />
                          ) : null}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-text2">
                        <span>{item?.createTime}</span>
                        <span className="text-right">
                          {t(typeMap[item?.type] || "--")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </ViewLayout>
  );
};
export default WalletDetailView;
