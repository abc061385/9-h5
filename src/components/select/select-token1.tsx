import { forwardRef, useEffect, useMemo, useState } from "react";
import { Drawer } from "@/components/drawer";
import { useTrans } from "@/hooks/useTrans";
import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { Skeleton } from "@/components/skeleton";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { ShowIf } from "../show-if";

interface ITokenSelectProps {
  name: string;
  value?: string;
  onChange?: (event: {
    target: { name: string; value?: string };
    coin?: CurrencyInfo;
  }) => void;
  onSelect?: (item: CurrencyInfo) => void;
}
export const SelectToken1 = forwardRef<HTMLInputElement, ITokenSelectProps>(
  ({ name, onChange, onSelect, value }, ref) => {
    const t = useTrans();
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useRequestQuery(
      api.coinTransfer.getCoinListUsingGet,
      {},
    );
    const currencyList = data?.data as CurrencyInfo[];

    useEffect(() => {
      if (currencyList && value === undefined) {
        const defaultToken = currencyList[0];
        if (defaultToken) {
          onChange?.({
            target: { name, value: defaultToken.currencyCode },
            coin: defaultToken,
          });
          onSelect?.(defaultToken);
        }
      }
    }, [currencyList, value, name, onChange, onSelect]);

    const selectCurrency = useMemo(() => {
      return currencyList?.find((t) => t.currencyCode === value);
    }, [value, currencyList]);

    return (
      <div>
        <input type="hidden" name={name} ref={ref} value={value || ""} />
        <button
          type="button"
          className="input w-full flex justify-between items-center  h-12 !bg-bg1"
          onClick={() => setOpen(true)}
        >
          <Skeleton isLoading={isLoading}>
            <div className="flex items-center space-x-2 min-w-14">
              <BaseImage
                src={selectCurrency?.logo || ""}
                alt={selectCurrency?.currencyCode || ""}
                className="size-6 rounded-full overflow-hidden"
              />
              <span className="text-sm">{selectCurrency?.currencyCode}</span>
            </div>
          </Skeleton>
          <Icon name="right-enter" className="rotate-90 w-1.5 h-2.5" color="var(--color-text1)" />
        </button>
        <Drawer
          open={open}
          onChange={setOpen}
          className="h-auto"
          title={t("address.selectToken")}
        >
          <div className="max-h-[400px] overflow-auto no-scrollbar">
            {currencyList?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3.5 border-b border-border2"
                  onClick={() => {
                    setOpen(false);
                    const event = {
                      target: { name, value: item?.currencyCode },
                    };
                    onChange?.(event);
                    onSelect?.(item);
                  }}
                >
                  <BaseImage
                    src={item.logo!}
                    className="w-6 h-6 rounded-full overflow-hidden mr-4"
                  />
                  <span className="font-bold flex-1">{item.currencyCode}</span>
                  <ShowIf
                    condition={
                      selectCurrency?.currencyCode === item.currencyCode
                    }
                  >
                    <Icon name="duigou-primary" className="w-4 h-3" />
                  </ShowIf>
                </div>
              );
            })}
          </div>
          <div
            className="btn btn-outline w-full mt-6"
            onClick={() => setOpen(false)}
          >
            {t("common.cancel")}
          </div>
        </Drawer>
      </div>
    );
  },
);

SelectToken1.displayName = "SelectToken1";
