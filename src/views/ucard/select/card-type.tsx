import { useTrans } from "@/hooks/useTrans";
import { FC } from "react";
import { DrawerPortal } from "@/components/drawer-portal";
import { Drawer } from "@/components/drawer";
import { useUCardStore } from "@/store/useUCardStore";

interface ISelectProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (v: { label: string; code: string }) => void;
}

const SelectCardType: FC<ISelectProps> = ({ open, onClose, onConfirm }) => {
  const t = useTrans();
  const { cardTypes } = useUCardStore();

  return (
    <DrawerPortal>
      <Drawer
        className="h-auto"
        title={t("cardTypePlaceholder")}
        open={open}
        onChange={() => onClose?.()}
      >
        <div className="max-h-[400px] overflow-auto no-scrollbar">
          {cardTypes?.map((v) => {
            return (
              <div
                key={v.code}
                className="flex items-center justify-between py-3.5 border-b border-border2"
                onClick={() => {
                  onConfirm?.(v);
                  onClose?.();
                }}
              >
                <span className="font-bold flex-1">{v.label}</span>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-outline w-full mt-6"
          onClick={() => onClose()}
        >
          {t("common.cancel")}
        </button>
      </Drawer>
    </DrawerPortal>
  );
};
export default SelectCardType;
