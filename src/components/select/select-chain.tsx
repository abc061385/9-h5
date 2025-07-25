import { forwardRef, useCallback, useMemo, useState } from "react";
import { Drawer } from "@/components/drawer";
import { useTrans } from "@/hooks/useTrans";
import { InfiniteList } from "@/components/infinite-list";
import { api } from "@/api";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";
import { useRequestQuery } from "@/hooks/useRequestQuery";

interface IChainSelectProps {
  name: string;
  currencyCode: string;
  value?: string;
  onChange?: (item?: CurrencyInfo) => void;
}

export const SelectChain = forwardRef<HTMLDivElement, IChainSelectProps>(
  ({ value, currencyCode, onChange }, ref) => {
    const t = useTrans();
    const [open, setOpen] = useState(false);
    const { data } = useRequestQuery(api.currencySettings.pageUsingGet, {
      currencyCode,
    });
    const chainList = data?.data as CurrencyInfo[];

    const selectChain = useMemo(() => {
      return chainList?.find((t) => t.protocolType === value);
    }, [value, chainList]);

    const getActived = useCallback(
      (_: number, item: CurrencyInfo) => {
        const activedClass = cn("bg-primary text-white rounded-md");
        const isSelected = selectChain?.protocolType === item?.protocolType;
        return isSelected ? activedClass : "";
      },
      [selectChain],
    );
    return (
      <div ref={ref}>
        <button
          type="button"
          className="input w-full flex justify-between items-center"
          onClick={() => setOpen(true)}
        >
          {value ? (
            <span className="text-sm font-bold">
              {selectChain?.protocolType}
            </span>
          ) : (
            <p className="text-text2">{t("deposit.selectChain")}</p>
          )}
          <Icon name="arrow-line-down" />
        </button>
        <Drawer open={open} onChange={setOpen} title={t("address.selectChain")}>
          <div
            className="size-full flex flex-col"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <div className="flex-1">
              <InfiniteList<CurrencyInfo, unknown>
                data={chainList}
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
                        onChange?.(item);
                      }}
                      className={cn([
                        "flex justify-center items-center h-8 space-x-2 mb-2 text-text2",
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
            <div className="flex-none">
              <p className="text-xs font-bold flex items-center mb-2">
                <Icon name="prompt" className="mr-1 size-0.875" />
                Draw attention to sth.
              </p>
              <div className="text-text2 text-xs font-bold">
                When you top up this coin, please only top up through the 9M
                platform support network listed above. Please do not top up
                through other networks or smart contracts to avoid loss of
                funds.
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
);

SelectChain.displayName = "SelectChain";
