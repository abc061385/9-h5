import { Drawer } from "@/views/studio/select/drawer-long";
import { useTrans } from "@/hooks/useTrans";
import { FC } from "react";
import { Icon } from "@/components/icon";

interface ICountrySelectProps {
  open: boolean;
  onClose: () => void;
}

const CountrySelectDrawer: FC<ICountrySelectProps> = ({ open, onClose }) => {
  const t = useTrans();

  const list = [
    {
      label: "ZH",
      value: "+86",
    },
    {
      label: "EN",
      value: "+544",
    },
  ];

  return (
    <Drawer
      className="h-auto"
      title="Please select your country"
      open={open}
      onChange={() => onClose?.()}
    >
      <label className="input w-full !bg-bg3 border-none placeholder:text-text5">
        <Icon name="search" className="w-4 h-4" />
        <input
          type="search"
          className="grow"
          placeholder="Search Country"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
            }
          }}
        />
      </label>
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
export default CountrySelectDrawer;
