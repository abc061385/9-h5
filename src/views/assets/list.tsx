import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { useFormatBalance } from "@/hooks/useFormatBalance";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useCallback, useEffect, useState } from "react";
import { useTrans } from "@/hooks/useTrans";

const AssetsListBox = () => {
  const { push } = useRouter();
  const { formatBalance } = useFormatBalance();
  const t = useTrans();

  const [list, setList] = useState<AssetsList[]>([]);
  const [currentList, setCurrentList] = useState<CurrencyInfo[]>([]);

  const getList = useCallback(async () => {
    const { data } = await api.wallet.listUsingPost();
    setList(data.wallet);
  }, []);

  const getCurrentList = useCallback(async () => {
    const { data } = await api.currencySettings.pageUsingGet1();
    setCurrentList(data as CurrencyInfo[]);
  }, []);

  const getTokenIcon = useCallback(
    (coin: string) => {
      return currentList.find((v) => v.currencyCode === coin)?.logo || "";
    },
    [currentList],
  );

  useEffect(() => {
    getList();
    getCurrentList();
  }, [getList, getCurrentList]);
  return (
    <div className="flex-1 flex flex-col h-full">
      <h2 className="font-medium leading-6 mb-6">{t("tabbar.assets")}</h2>
      <div className="flex-1 pb-14">
        {list.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center justify-between mb-6 gap-2"
              onClick={() =>
                push(`${routerMap.assetsWalletDetail}?coin=${item.coin}`)
              }
            >
              {item.coin ? (
                <BaseImage
                  src={getTokenIcon(item.coin || "")}
                  className="w-10 h-10 rounded-full overflow-hidden"
                />
              ) : null}

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
