import { Drawer } from "./drawer-long";
import { useTrans } from "@/hooks/useTrans";
import { FC } from "react";
import { SelectListType } from "../type";

interface IContactSelectProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (v: SelectListType) => void;
}

const ContactSelectDrawer: FC<IContactSelectProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const t = useTrans();

  const list = [
    {
      label: "Whatsapp",
      value: "1",
    },
    {
      label: "Telegram",
      value: "2",
    },
  ];

  return (
    <Drawer
      className="h-auto"
      title={t("selectContactMethod")}
      open={open}
      onChange={() => onClose?.()}
    >
      <div className="max-h-[400px] overflow-auto no-scrollbar">
        {list?.map((v) => {
          return (
            <div
              key={v.value}
              className="flex items-center justify-between py-3.5 border-b border-border2"
              onClick={() => {
                onConfirm?.(v);
                onClose();
              }}
            >
              <span className="font-bold flex-1">{v.label}</span>
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
export default ContactSelectDrawer;
