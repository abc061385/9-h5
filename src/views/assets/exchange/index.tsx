"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

const AssetsExchangeView = () => {
  const t = useTrans();
  return (
    <ViewLayout header={<HeaderWithBack title={t("闪兑")} algin="center" />}>
      <div className="p-content">1</div>
    </ViewLayout>
  );
};

export default AssetsExchangeView;
