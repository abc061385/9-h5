import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { Drawer } from "@/components/drawer";
import { useTrans } from "@/hooks/useTrans";
import { InfiniteList } from "@/components/infinite-list";
import { api } from "@/api";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { Skeleton } from "@/components/skeleton";

interface ITokenSelectProps {
  name: string;
  value?: string;
  onChange?: (event: { target: { name: string; value: string } }) => void;
}
export const SelectChain = forwardRef<HTMLInputElement, ITokenSelectProps>(
  ({ name, onChange, value }, ref) => {
    const t = useTrans();
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useSWR("protocolListUsingGet", () =>
      api.currencySettings.protocolListUsingGet(),
    );
    const tokenList = data?.data as TokenItem[];

    useEffect(() => {
      if (tokenList && value === undefined) {
        const defaultToken = tokenList[0];
        if (defaultToken) {
          onChange?.({
            target: { name, value: defaultToken.currencyCode },
          } as any);
        }
      }
    }, [tokenList, value, name, onChange]);

    const selectToken = useMemo(() => {
      return tokenList?.find((t) => t.currencyCode === value);
    }, [value, tokenList]);

    const getActived = useCallback(
      (index: number, item: TokenItem) => {
        const activedClass = cn("bg-primary text-white rounded-md");
        const isSelected = selectToken?.currencyCode === item?.currencyCode;
        const isDefaultSelected = !selectToken && index === 0;
        const shouldHighlight = isSelected || isDefaultSelected;
        return shouldHighlight ? activedClass : "";
      },
      [selectToken],
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
          <div className="flex items-center space-x-1">
            <Skeleton isLoading={isLoading} className="size-4">
              <BaseImage
                src={selectToken?.logo || ""}
                alt={selectToken?.currencyCode || ""}
                className="size-4 rounded-full overflow-hidden"
              />
            </Skeleton>
            <Skeleton isLoading={isLoading} className="w-14 h-3 rounded-xs">
              <span className="text-sm font-bold">
                {selectToken?.currencyCode}
              </span>
            </Skeleton>
          </div>
          <Icon name="arrow-line-down" />
        </button>
        <Drawer open={open} onChange={setOpen} title={t("address.selectToken")}>
          <div className="size-full">
            <InfiniteList<TokenItem, {}>
              data={tokenList}
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
                        target: { name, value: item?.currencyCode },
                      };
                      onChange?.(event as any);
                    }}
                    className={cn([
                      "flex justify-center items-center h-8 space-x-2 mb-2",
                      getActived(index, item),
                    ])}
                  >
                    <BaseImage
                      src={item?.logo || ""}
                      alt={item?.currencyCode || ""}
                      className="size-4 rounded-full overflow-hidden mr-0.5"
                    />
                    <span className="text-sm font-bold">
                      {item?.currencyCode}
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
