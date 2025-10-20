import { Drawer } from "@/components/drawer";
import { useTrans } from "@/hooks/useTrans";
import { FC, useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { SelectListType, useUCardStore } from "@/store/useUCardStore";

interface ICountrySelectProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (v: SelectListType) => void;
}

const CountrySelectDrawer: FC<ICountrySelectProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const t = useTrans();
  const { countries } = useUCardStore();

  const [list, setList] = useState<SelectListType[]>([]);
  const [allList, setAllList] = useState<SelectListType[]>([]);

  useEffect(() => {
    setList(countries);
    setAllList(countries);
  }, [countries]);

  const search = useCallback(
    (search: string) => {
      const newList = allList.filter(
        (value) =>
          value?.label?.toLowerCase()?.includes(search?.toLowerCase()) ||
          value?.code?.toUpperCase()?.includes(search?.toUpperCase())
      );
      setList(newList);
    },
    [allList]
  );

  return (
    <Drawer
      className="h-auto"
      title={t("selectCountry")}
      open={open}
      onChange={() => onClose?.()}
    >
      <label className="input w-full !bg-bg3 border-none placeholder:text-text5">
        <Icon name="search" className="w-4 h-4" />
        <input
          type="search"
          className="grow"
          placeholder={t("searchCountry")}
          onChange={(e) => {
            search(e.target.value);
          }}
        />
      </label>
      <div className="max-h-[400px] overflow-auto no-scrollbar">
        {list?.map((v) => {
          return (
            <div
              key={v.code}
              className="flex items-center justify-between py-4"
              onClick={() => {
                onConfirm?.(v);
                onClose?.();
              }}
            >
              <span className="font-bold flex-1">{v.label}</span>
              {/* <span>{v.phonePrefix}</span> */}
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
