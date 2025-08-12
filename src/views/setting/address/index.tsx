"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { ConfirmModal } from "@/components/modal/confirm-modal";
import { ListNoData } from "@/components/nodata/list-nodata";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";
import { useSettingStore } from "@/store/useSettingStore";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SettingAddressView = () => {
  const t = useTrans();
  const { push, back } = useRouter();
  const { setField, addressPreviousPageType } = useSettingStore();

  const [openEdit, setOpenEdit] = useState(false);
  const [delIds, setDelIds] = useState<number[]>([]);
  const [delConfirmOpen, setDelConfirmOpen] = useState(false);

  const { trigger: getAddressList, data } = useRequestMutation(
    api.member.memberAddressListUsingPost
  );

  const { trigger: delAddress } = useRequestMutation(
    api.member.memberAddressAddUsingPost1
  );

  const addressList: AddressList[] = Array.isArray(data?.data) ? data.data : [];

  useEffect(() => {
    getAddressList();
  }, [getAddressList]);

  const check = useCallback(
    (item: CurrencyInfo) => {
      const checked = delIds.includes(item.id!);
      return (
        <input
          type="checkbox"
          className="checkbox checkbox-neutral1"
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
              <Icon
                name="delete"
                className="w-4 h-4.5 absolute right-[-20px]"
                onClick={() => {
                  setOpenEdit(!openEdit);
                  setDelIds([]);
                }}
              />
            </div>
          }
          algin="center"
          onClick={() => {
            if (openEdit) return setOpenEdit(false);
            back();
          }}
        />
      }
      heightFull
    >
      <div className="p-content h-full flex flex-col justify-between">
        <div className="flex-1 overflow-auto">
          {addressList?.length ? (
            addressList.map((item) => {
              return (
                <div
                  className="bg-bg2 p-4 rounded-lg mb-4 w-full"
                  key={item.id}
                  onClick={() => {
                    if (addressPreviousPageType === "withdraw") {
                      setField("addressInfo", item);
                      push(routerMap.walletWithdraw);
                    }
                  }}
                >
                  <label className="flex items-center">
                    <div className="flex-1">
                      <div className="font-bold flex justify-between items-center">
                        <span>
                          {item.coin}
                          {" - "}
                          {item.protocol}
                        </span>
                        {openEdit && check(item)}
                      </div>
                      <p className="text-text4 text-sm wrap-break-word mt-4 mb-2">
                        {item.addr}
                      </p>
                      <p className="text-text4 text-sm">
                        {t("address.remark")}:
                      </p>
                    </div>
                  </label>
                </div>
              );
            })
          ) : (
            <ListNoData />
          )}
        </div>
        <div className="bg-white py-2 pb-0">
          {openEdit ? (
            <button
              className="btn btn-neutral w-full"
              onClick={() => setDelConfirmOpen(true)}
            >
              {t("address.delete")}
            </button>
          ) : (
            <button
              className="btn btn-primary w-full"
              onClick={() => push(routerMap.settingAddressAdd)}
            >
              {t("addressAdd.title")}
            </button>
          )}
        </div>
        <ConfirmModal
          title={t("deleteAddress")}
          tips={t("deleteAddressConfirm")}
          open={delConfirmOpen}
          onClose={() => setDelConfirmOpen(false)}
          onConfirm={() => {
            delAddress(
              {
                ids: delIds.toString(),
              },
              {
                onSuccess: async () => {
                  toast.success(t("address.deleteSuccess"));
                  setDelConfirmOpen(false);
                  await getAddressList();
                  setDelIds([]);
                },
              }
            );
          }}
        >
          1
        </ConfirmModal>
      </div>
    </ViewLayout>
  );
};
export default SettingAddressView;
