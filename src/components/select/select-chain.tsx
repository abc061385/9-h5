import { forwardRef, useMemo, useState } from "react";
import { Drawer } from "@/components/drawer";
import { useTrans } from "@/hooks/useTrans";
import { api } from "@/api";
import { Icon } from "@/components/icon";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { ShowIf } from "../show-if";

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
    const { data } = useRequestQuery(api.currencySettings.pageUsingGet1, {
      currencyCode,
    });
    const chainList = data?.data as CurrencyInfo[];

    const selectChain = useMemo(() => {
      return chainList?.find((t) => t.protocolType === value);
    }, [value, chainList]);

    return (
      <div ref={ref}>
        <button
          type="button"
          className="input w-full flex justify-between items-center h-12"
          onClick={() => setOpen(true)}
        >
          {value ? (
            <span className="text-sm font-bold">
              {selectChain?.protocolType}
            </span>
          ) : (
            <p className="text-text2">{t("deposit.selectChain")}</p>
          )}
          <Icon name="right-enter" className="rotate-90 w-1.5 h-2.5" />
        </button>
        <Drawer
          open={open}
          onChange={setOpen}
          className="h-auto"
          title={t("address.selectChain")}
        >
          <div className="max-h-[400px] overflow-auto no-scrollbar">
            {chainList?.map((v) => {
              return (
                <div
                  key={v.id}
                  className="flex items-center justify-between py-3.5 border-b border-border2"
                  onClick={() => {
                    setOpen(false);
                    onChange?.(v);
                  }}
                >
                  <span className="font-bold flex-1">{v.protocolType}</span>
                  <ShowIf
                    condition={selectChain?.protocolType === v.protocolType}
                  >
                    <Icon name="duigou-primary" className="w-4 h-3" />
                  </ShowIf>
                </div>
              );
            })}
          </div>
          <div
            className="btn btn-outline w-full mt-6"
            onClick={() => {
              setOpen(false);
            }}
          >
            {t("common.cancel")}
          </div>
        </Drawer>
      </div>
    );
  },
);

SelectChain.displayName = "SelectChain";
