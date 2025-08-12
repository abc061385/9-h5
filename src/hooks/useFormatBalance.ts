import { useAssetStore } from "@/store/useAssetStore";
import { formatBalance as format } from "@/lib/utils";
import { useCallback } from "react";

export function useFormatBalance() {
  const { balanceList, coinList } = useAssetStore();

  const formatBalance = useCallback(
    (value: string | number, coin: string) => {
      const coinItem = coinList.find(
        (v) => v.currencyCode?.toUpperCase() === coin?.toUpperCase()
      );
      return format(value, coinItem?.decimalPlaces || 4);
    },
    [coinList]
  );

  const getBalance = useCallback(
    (coin: string) => {
      const balanceItem = balanceList.find(
        (v) => v.coin?.toUpperCase() === coin?.toUpperCase()
      );
      return balanceItem?.balance || "0";
    },
    [balanceList]
  );

  return { formatBalance, getBalance };
}
