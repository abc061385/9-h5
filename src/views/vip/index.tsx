"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import VipBannerBox from "./banner";
import PromoteBox from "./promote";
import PrivilegeBox from "./privilege";

const VipView = () => {
  const t = useTrans();
  return (
    <ViewLayout heightFull header={<HeaderWithBack title={t("VIP权益")} algin="center" />}>
      <div className="p-content">
        <VipBannerBox />
        <PromoteBox />
        <PrivilegeBox />
      </div>
    </ViewLayout>
  );
};
export default VipView;
