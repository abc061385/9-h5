import { Drawer } from "@/views/studio/select/drawer-long";
import { useTrans } from "@/hooks/useTrans";
import { useAssetStore } from "@/store/useAssetStore";
import { FC, useEffect } from "react";

interface IChainSelectProps {
  open: boolean;
  onClose: () => void;
}

const ChainSelectDrawer: FC<IChainSelectProps> = ({ open, onClose }) => {
  const t = useTrans();
  const { getChainList, chainList } = useAssetStore();

  useEffect(() => {
    getChainList();
  }, [getChainList]);

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
              key={v.id}
              className="flex items-center justify-between py-3.5 border-b border-border2"
              onClick={() => {}}
            >
              <span className="font-bold flex-1">{v.protocolType}</span>
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
