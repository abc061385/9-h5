'use client'

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

const TeamsView = () => {
  const t = useTrans();
  return (
    <ViewLayout
      header={<HeaderWithBack algin="center" title={t("我的团队")} />}
    ></ViewLayout>
  );
};
export default TeamsView;
