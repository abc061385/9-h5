import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { InfiniteList } from "@/components/infinite-list";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useCallback, useEffect, useState } from "react";

const AssetsListBox = () => {
  const { push } = useRouter();
  const { formatBalance } = useFormatBalance();

  const [list, setList] = useState<AssetsList[]>([]);
  const [currentList, setCurrentList] = useState<CurrencyInfo[]>([]);

  const getList = useCallback(async () => {
    const { data } = await api.wallet.listUsingPost();
    setList(data.wallet);
  }, []);

  const getCurrentList = useCallback(async () => {
    const { data } = await api.currencySettings.pageUsingGet();
    setCurrentList(data as CurrencyInfo[]);
  }, []);

  const getTokenIcon = useCallback(
    (coin: string) => {
      return currentList.find((v) => v.currencyCode === coin)?.logo || coin;
    },
    [currentList]
  );

  useEffect(() => {
    getList();
    getCurrentList();
  }, [getList, getCurrentList]);
  return (
    <div className="flex-1">
      <h2>资产</h2>
      <div className="h-[50vh]">
        <InfiniteList<AssetsList, object>
          data={list}
          fetchMore={async (_index) => {
            console.log(_index);
            return [];
          }}
          itemContent={(_, item) => (
            <div
              key={item.id}
              className="flex items-center justify-between pr-2 pb-3 gap-1.5"
              onClick={() =>
                push(`${routerMap.assetsWalletDetail}?coin=${item.coin}`)
              }
            >
              <BaseImage
                src={getTokenIcon(item.coin || "")}
                className="w-7 h-7 rounded-full overflow-hidden"
              />
              <div className="flex-1 flex flex-col">
                <span className="font-bold">{item.coin}</span>
                <span className="font-[510] text-xs text-text2">
                  {item.coin}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold">
                  {formatBalance(item.balance || "0", item.coin || "USDT")}
                </span>
                <span className="font-[510] text-xs text-text2">
                  ≈ {formatBalance(item.usdtValue || "0", "USDT")} USDT
                </span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default AssetsListBox;
