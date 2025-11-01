"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import AddressAddItem from "./item";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import { useMemo } from "react";

const SettingAddressAddView = () => {
  const t = useTrans();
  const { data } = useRequestQuery(
    api.withdrawAddress.protocolListUsingGet,
    {},
  );

  const { data: addressRes } = useRequestQuery(
    api.withdrawAddress.memberAddressListUsingGet,
    {},
  );
  const protoList = useMemo(() => {
    const _protoList = (data?.data || []) as string[];
    return _protoList.map((chainName) => {
      return {
        netowrk: chainName,
        address: (addressRes?.data || []).find(
          (item: { protocol: string; addr: string }) =>
            item?.protocol === chainName,
        )?.addr,
      };
    });
  }, [data, addressRes]);

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("addressAdd.title")} algin="center" />}
    >
      <div className="p-content">
        <p className="text-assist2 leading-none mb-6">{t("addressAddTips")}</p>
        {protoList.map(({ netowrk, address }) => {
          return address ? null : (
            <>
              <AddressAddItem network={netowrk} addr={address}></AddressAddItem>
              <div className="divider"></div>
            </>
          );
        })}
      </div>
    </ViewLayout>
  );
};
export default SettingAddressAddView;
