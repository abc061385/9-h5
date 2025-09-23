import { useTrans } from "@/hooks/useTrans";
import { FC } from "react";
import { DrawerPortal } from "@/components/drawer-portal";
import { Drawer } from "@/components/drawer";

interface ISelectProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (v: { label: string; value: string }) => void;
}

const SelectDocumentType: FC<ISelectProps> = ({ open, onClose, onConfirm }) => {
  const t = useTrans();
  const selectList = [
    { label: "身份证", value: "0" },
    { label: "护照", value: "1" },
    { label: "驾照", value: "2" },
  ];
  return (
    <DrawerPortal>
      <Drawer
        className="h-auto"
        title="Please select the document type"
        open={open}
        onChange={() => onClose?.()}
      >
        <div className="max-h-[400px] overflow-auto no-scrollbar">
          {selectList?.map((v) => {
            return (
              <div
                key={v.value}
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
export default SelectDocumentType;
