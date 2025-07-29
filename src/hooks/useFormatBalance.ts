import { useAssetStore } from "@/store/useAssetStore";
import { useEffect } from "react";
import { formatBalance as format } from "@/lib/utils";

export function useFormatBalance() {
  const { getCoinList, getBalanceList, balanceList, coinList } =
    useAssetStore();

  useEffect(() => {
    getCoinList();
  }, [getCoinList]);

  useEffect(() => {
    getBalanceList();
  }, [getBalanceList]);

  const formatBalance = (value: string | number, coin: string) => {
    const coinItem = coinList.find(
      (v) => v.currencyCode?.toUpperCase() === coin?.toUpperCase()
    );
    return format(value, coinItem?.decimalPlaces || 2);
  };

  const getBalance = (coin: string) => {
    const balanceItem = balanceList.find(
      (v) => v.coin?.toUpperCase() === coin?.toUpperCase()
    );
    return balanceItem?.balance || "0";
  };

  return { formatBalance, getBalance };
}
