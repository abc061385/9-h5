"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

const FundRuleView = () => {
  const t = useTrans();
  return (
    <ViewLayout
      header={<HeaderWithBack title={t("基金规则")} algin="center" />}
    >
      <div className="p-content">1</div>
    </ViewLayout>
  );
};
export default FundRuleView;
