import { Drawer } from "@/views/studio/select/drawer-long";
import { useTrans } from "@/hooks/useTrans";
import { FC } from "react";

interface IVenueSelectProps {
  open: boolean;
  onClose: () => void;
}

const VenueSelectDrawer: FC<IVenueSelectProps> = ({ open, onClose }) => {
  const t = useTrans();

  const list = [
    {
      label: "Training Hub (Site Area ≥ 50m)",
      value: 0,
    },
    {
      label: "Training Center (Site Area ≥ 100m)",
      value: 1,
    },
  ];

  return (
    <Drawer
      className="h-auto"
      title={"Please select venue type"}
      open={open}
      onChange={() => onClose?.()}
    >
      <div className="max-h-[400px] overflow-auto no-scrollbar">
        {list?.map((v) => {
          return (
            <div
              key={v.value}
              className="flex items-center justify-between py-3.5 border-b border-border2"
              onClick={() => {}}
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
