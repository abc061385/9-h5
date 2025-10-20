import { Drawer } from "./drawer-long";
import { useTrans } from "@/hooks/useTrans";
import { FC, useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { ShowIf } from "@/components/show-if";
import { CountryListType } from "../type";

interface ICountrySelectProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (v: CountryListType) => void;
}

const CountrySelectDrawer: FC<ICountrySelectProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const t = useTrans();
  const api = createAxiosInstance("/app/");

  const [list, setList] = useState<CountryListType[]>([]);
  const [allList, setAllList] = useState<CountryListType[]>([]);
  const [loading, setLoading] = useState(true);

  const getCountryList = useCallback(async () => {
    setLoading(true);
    try {
      const res: ApiResponse<CountryListType[]> = await api.get(
        "/country/prefix/list"
      );
      if (res.code === 200) {
        setList(res.data);
        setAllList(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCountryList();
  }, [getCountryList]);

  const search = useCallback(
    (search: string) => {
      const newList = allList.filter(
        (value) =>
          value.country.includes(search) || value.phonePrefix.includes(search)
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
        <ShowIf
          condition={!loading}
          elseEl={<div className="loading block mx-auto my-10"></div>}
        >
          {list?.map((v) => {
            return (
              <div
                key={v.id}
                className="flex items-center justify-between py-4"
                onClick={() => {
                  onConfirm?.(v);
                  onClose?.();
                }}
              >
                <span className="font-bold flex-1">{v.country}</span>
                <span>{v.phonePrefix}</span>
              </div>
            );
          })}
        </ShowIf>
      </div>
      <button className="btn btn-outline w-full mt-6" onClick={() => onClose()}>
        {t("common.cancel")}
      </button>
    </Drawer>
  );
};
export default CountrySelectDrawer;
