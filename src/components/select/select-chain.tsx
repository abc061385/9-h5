import { forwardRef, useCallback, useMemo, useState } from "react";
import { Drawer } from "@/components/drawer";
import { useTrans } from "@/hooks/useTrans";
import { InfiniteList } from "@/components/infinite-list";
import { api } from "@/api";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";

interface ITokenSelectProps {
  name: string;
  currencyCode: string;
  value?: string;
  onChange?: (event: { target: { name: string; value: string } }) => void;
}
export const SelectChain = forwardRef<HTMLInputElement, ITokenSelectProps>(
  ({ name, value, currencyCode, onChange }, ref) => {
    const t = useTrans();
    const [open, setOpen] = useState(false);
    const { data } = useSWR(
      currencyCode ? ["protocolListUsingGet", currencyCode] : null,
      ([_, _currencyCode]) =>
        api.currencySettings.pageUsingGet({ currencyCode: _currencyCode }),
    );
    const currencyList = data?.data as CurrencyInfo[];

    const selectCurrency = useMemo(() => {
      return currencyList?.find((t) => t.protocolType === value);
    }, [value, currencyList]);

    const getActived = useCallback(
      (_: number, item: CurrencyInfo) => {
        const activedClass = cn("bg-primary text-white rounded-md");
        const isSelected = selectCurrency?.protocolType === item?.protocolType;
        return isSelected ? activedClass : "";
      },
      [selectCurrency],
    );
    return (
      <div>
        <input
          type="hidden"
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="input w-full flex justify-between items-center"
          onClick={() => setOpen(true)}
        >
          {value ? (
            <span className="text-sm font-bold">
              {selectCurrency?.protocolType}
            </span>
          ) : (
            <p>{t("deposit.selectChain")}</p>
          )}
          <Icon name="arrow-line-down" />
        </button>
        <Drawer open={open} onChange={setOpen} title={t("address.selectChain")}>
          <div className="size-full">
            <InfiniteList<CurrencyInfo, {}>
              data={currencyList}
              hiddenEmpty
              hiddenFooter
              fetchMore={async () => {
                return [];
              }}
              itemContent={(index, item) => {
                return (
                  <div
                    onClick={() => {
                      setOpen(false);
                      const event = {
                        target: { name, value: item?.protocolType },
                      };
                      onChange?.(event as any);
                    }}
                    className={cn([
                      "flex justify-center items-center h-8 space-x-2 mb-2",
                      getActived(index, item),
                    ])}
                  >
                    <span className="text-sm font-bold">
                      {item?.protocolType}
                    </span>
                  </div>
                );
              }}
            />
          </div>
        </Drawer>
      </div>
    );
  },
);
