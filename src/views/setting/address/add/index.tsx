"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import AddressAddItem from "./item";

const SettingAddressAddView = () => {
  const t = useTrans();

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("addressAdd.title")} algin="center" />}
    >
      <div className="p-content">
        <AddressAddItem network="ETH"></AddressAddItem>
        <div className="divider"></div>
        <AddressAddItem network="BTC"></AddressAddItem>
      </div>
    </ViewLayout>
  );
};
export default SettingAddressAddView;
