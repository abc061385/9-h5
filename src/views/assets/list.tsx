import { api } from "@/api";
import BaseImage from "@/components/base-image";
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
    <div className="flex-1 mt-6 flex flex-col h-full overflow-auto no-scrollbar">
      <h2 className="font-medium leading-6 mb-6">资产</h2>
      <div className="flex-1">
        {list.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between mb-6 gap-2"
              onClick={() =>
                push(`${routerMap.assetsWalletDetail}?coin=${item.coin}`)
              }
            >
              <BaseImage
                src={getTokenIcon(item.coin || "")}
                className="w-10 h-10 rounded-full overflow-hidden"
              />
              <div className="flex-1 flex flex-col">
                <span>{item.coin}</span>
                <span className="text-xs text-text4">{item.coin}</span>
              </div>
              <div className="flex flex-col items-end">
                <span>
                  {formatBalance(item.balance || "0", item.coin || "USDT")}
                </span>
                <span className="text-xs text-text4">
                  ≈ {formatBalance(item.usdtValue || "0", "USDT")} USDT
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AssetsListBox;
