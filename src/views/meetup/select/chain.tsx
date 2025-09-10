import { Drawer } from "./drawer-long";
import { useTrans } from "@/hooks/useTrans";
import { FC, useEffect, useMemo } from "react";

interface IChainSelectProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (chain: string) => void;
}

const ChainSelectDrawer: FC<IChainSelectProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const t = useTrans();

  const chainList = useMemo(() => ["TRX", "BSC"], []);

  useEffect(() => {
    onConfirm?.(chainList[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer
      className="h-auto"
      title={t("address.selectChain")}
      open={open}
      onChange={() => onClose?.()}
    >
      <div className="max-h-[400px] overflow-auto no-scrollbar">
        {chainList?.map((v) => {
          return (
            <div
              key={v}
              className="flex items-center justify-between py-3.5 border-b border-border2"
              onClick={() => {
                onConfirm?.(v);
                onClose?.();
              }}
            >
              <span className="font-bold flex-1">{v}</span>
            </div>
          );
        })}
      </div>
      <button className="btn btn-outline w-full mt-6" onClick={() => onClose()}>
        {t("common.cancel")}
      </button>
    </Drawer>
  );
};
export default ChainSelectDrawer;
