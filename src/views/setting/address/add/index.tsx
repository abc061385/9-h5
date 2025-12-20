"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import AddressAddItem from "./item";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { api } from "@/api";
import { useEffect, useMemo } from "react";
// import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useWithdrawalStore } from "@/store/useWithdrawal";
import { ListNoData } from "@/components/nodata/list-nodata";
// import { ListNoData } from "@/components/nodata/list-nodata";

const SettingAddressAddView = () => {
  const t = useTrans();
  const addressMap = useWithdrawalStore((s) => s.addressMap);
  const getAddrMap = useWithdrawalStore((s) => s.getAddrMap);
  const { data } = useRequestQuery(
    api.withdrawAddress.protocolListUsingGet,
    {},
  );

  // const { data: addressRes, trigger } = useRequestMutation(
  //   api.withdrawAddress.memberAddressListUsingGet,
  // );

  useEffect(() => {
    getAddrMap();
  }, [getAddrMap]);
  const protoList = useMemo(() => {
    const _protoList = (data?.data || []) as string[];
    return _protoList.map((chainName) => {
      return {
        netowrk: chainName,
        address: addressMap[chainName]?.addr || "",
      };
    });
  }, [data, addressMap]);

  const isEmpty = useMemo(() => {
    return protoList.length ? true : protoList.every(({ address }) => address);
  }, [protoList]);

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("addressAdd.title")} algin="center" />}
    >
      <div className="p-content">
        <p className="text-assist2 leading-none mb-6">{t("addressAddTips")}</p>
        {isEmpty ? (
          <ListNoData />
        ) : (
          protoList.map(({ netowrk, address }) => {
            return address ? null : (
              <>
                <AddressAddItem
                  network={netowrk}
                  addr={address}
                ></AddressAddItem>
                <div className="divider"></div>
              </>
            );
          })
        )}
      </div>
    </ViewLayout>
  );
};
export default SettingAddressAddView;
