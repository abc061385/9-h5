"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import { InfiniteVirtuosoList } from "@/components/infinite-scroll";
import ViewLayout from "@/components/layout";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { typeMap } from "@/lib/const";
import { useAssetStore } from "@/store/useAssetStore";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ListType {
  id: number;
  status: number;
  type: string;
  inOut: string;
  amount: string;
  symbol: string;
  createTime: string;
}

const WalletDetailView = () => {
  const t = useTrans();
  const { push } = useRouter();
  const { formatBalance } = useFormatBalance();
  const searchParams = useSearchParams();
  const { balanceList, getBalanceList } = useAssetStore();

  const [coin, setCoin] = useState("");

  const showDetail = ["RECHARGE", "WITHDRAW"];

  useEffect(() => {
    getBalanceList();
  }, [getBalanceList]);

  useEffect(() => {
    setCoin(searchParams.get("coin") || "");
  }, [searchParams]);

  const getList = useCallback(
    async (page: number) => {
      const { data } = await api.wallet.pageDetailListUsingPost({
        pageNo: page,
        pageSize: 20,
        coinCode: searchParams.get("coin") || "",
      });
      const newData = data?.list || [];
      return {
        data: newData,
        hasMore: data.pageNum < data.pages,
      };
    },
    [searchParams]
  );

  const balance = useCallback(
    (coin: string | undefined) => {
      if (!balanceList?.length) return;
      return formatBalance(
        balanceList.find((v) => v.coin === coin)?.balance || "0",
        coin || ""
      );
    },
    [balanceList, formatBalance]
  );

  const usdtValue = useCallback(
    (coin: string | undefined) => {
      if (!balanceList?.length) return;
      return formatBalance(
        balanceList.find((v) => v.coin === coin)?.usdtValue || "0",
        "USDT"
      );
    },
    [balanceList, formatBalance]
  );

  const statusMap: {
    [key: string]: string;
  } = {
    0: t("walletDetail.statusPending"),
    1: t("walletDetail.statusSuccess"),
    2: t("walletDetail.statusFailed"),
  };
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={coin?.toUpperCase()} algin="center" />}
    >
      <div className="p-content flex flex-col h-full">
        <h2 className="text-[32px] font-bold leading-7.5 mb-2">
          {balance(coin)}
        </h2>
        <p className="text-sm text-text4">≈ {usdtValue(coin)} USDT</p>
        <div className="mt-4 pt-4 border-t border-border2 grow flex flex-col">
          <h3 className="font-medium">{t("history")}</h3>
          <div className="grow">
            <InfiniteVirtuosoList<ListType>
              fetchData={getList}
              renderItem={(item) => (
                <div
                  key={item?.id}
                  className="border-b border-border2 py-4"
                  onClick={() => {
                    if (showDetail.indexOf(item.type) !== -1) {
                      push(`${routerMap.walletTransDetail}?id=${item.id}`);
                    }
                  }}
                >
                  <div className="flex items-center justify-between gap-1 text-sm leading-5 mb-1">
                    <span>{t(typeMap[item?.type] || "--")}</span>
                    <span>
                      {item?.inOut === "ADD_BALANCE" ? "+" : "-"}
                      {formatBalance(item?.amount, coin)}
                      <span className="ml-1">{item?.symbol}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text4">
                    <div className="flex flex-col gap-1 ">
                      <span>{statusMap[item?.status]}</span>
                    </div>
                    <span>
                      <span>{item?.createTime}</span>
                      {showDetail.indexOf(item.type) !== -1 ? (
                        <Icon name="right-enter" className="w-1.5 h-2.5 ml-2" />
                      ) : null}
                    </span>
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
