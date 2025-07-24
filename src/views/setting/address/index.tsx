"use client";

import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SettingAddressView = () => {
  const t = useTrans();
  const { push } = useRouter();

  const [currentList, setCurrentList] = useState<CurrencyInfo[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [delIds, setDelIds] = useState<number[]>([]);

  const { trigger: getAddressList, data } = useRequestMutation(
    api.member.memberAddressListUsingPost
  );

  const { trigger: delAddress } = useRequestMutation(
    api.member.memberAddressAddUsingPost1
  );

  const addressList: AddressList[] = Array.isArray(data?.data) ? data.data : [];

  const getCurrentList = useCallback(async () => {
    const { data } = await api.currencySettings.pageUsingGet();
    setCurrentList(data as CurrencyInfo[]);
  }, []);

  const getTokenIcon = useCallback(
    (coin: string) => {
      return currentList.find((v) => v.currencyCode === coin)?.logo || coin;
    },
    [currentList]
  );

  useEffect(() => {
    getAddressList();
    getCurrentList();
  }, [getAddressList, getCurrentList]);

  const check = useCallback(
    (item: CurrencyInfo) => {
      const checked = delIds.includes(item.id!);
      return (
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={checked}
          onChange={(e) => {
            const isChecked = e.target.checked;
            if (isChecked) {
              setDelIds((prev) => [...prev, item.id!]);
            } else {
              setDelIds((prev) => prev.filter((v) => v !== item.id));
            }
          }}
        />
      );
    },
    [delIds]
  );

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={
            <div className="flex-1 flex justify-center items-center relative">
              <span></span>
              {t("address.title")}
              <span
                className="text-primary text-xs font-bold absolute right-0"
                onClick={() => setOpenEdit(!openEdit)}
              >
                {t(openEdit ? "common.done" : "address.manage")}
              </span>
            </div>
          }
          algin="center"
        />
      }
      heightFull
    >
      <div className="p-content h-full flex flex-col justify-between">
        <div className="flex-1 font-bold overflow-auto">
          {addressList.map((item) => {
            return (
              <div
                className="bg-bg1 px-3.5 py-4 rounded-md mb-4 w-full"
                key={item.id}
                onClick={() => {}}
              >
                <label className="flex items-center gap-4">
                  {openEdit && check(item)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {item.coin && (
                        <BaseImage
                          src={getTokenIcon(item.coin)}
                          className="w-6 h-6 rounded-full overflow-hidden"
                        />
                      )}
                      <span>{item.coin}</span>
                      <div className="badge badge-soft badge-primary text-xs rounded-sm">
                        {item.protocol}
                      </div>
                    </div>
                    <p className="text-text2 my-2 pb-2 border-b border-text2 border-dashed wrap-break-word">
                      {item.addr}
                    </p>
                    <p className="text-text2 font-medium">
                      {t("address.remark")}:
                    </p>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
        <div className="bg-white py-2 pb-0">
          {openEdit ? (
            <div className="flex justify-between items-center">
              <label className="label font-bold">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      const arr = addressList.map((v) => v.id!);
                      setDelIds(arr);
                    } else {
                      setDelIds(() => []);
                    }
                  }}
                />
                {t("address.selectAll")}
              </label>
              <button
                className="btn btn-error"
                onClick={() => {
                  delAddress(
                    {
                      ids: delIds.toString(),
                    },
                    {
                      onSuccess: async () => {
                        toast.success(t("address.deleteSuccess"));
                        await getAddressList();
                        setDelIds([]);
                      },
                    }
                  );
                }}
              >
                {t("address.delete")}
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary w-full"
              onClick={() => push(routerMap.settingAddressAdd)}
            >
              {t("addressAdd.title")}
            </button>
          )}
        </div>
      </div>
    </ViewLayout>
  );
};
export default SettingAddressView;
