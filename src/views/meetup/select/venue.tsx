import { Drawer } from "@/views/studio/select/drawer-long";
import { useTrans } from "@/hooks/useTrans";
import { FC } from "react";
import { SelectListType } from "../type";

interface IVenueSelectProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: SelectListType) => void;
}

const VenueSelectDrawer: FC<IVenueSelectProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const t = useTrans();

  const list: SelectListType[] = [
    {
      label: `小型（25-50人参与）`,
      value: "1",
    },
    {
      label: `中型（51-100人参与）`,
      value: "2",
    },
  ];

  return (
    <Drawer
      className="h-auto"
      title="Meetup 类型"
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
                onClose?.();
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
export default VenueSelectDrawer;
