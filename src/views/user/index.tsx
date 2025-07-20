"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import UserInfoBox from "./info";
import ListBox from "./list";
import { routerMap } from "@/i18n/navigation";

const UserView = () => {
  const t = useTrans();
  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={t("user.title")}
          algin="center"
          path={routerMap.home}
        />
      }
    >
      <div className="p-content">
        <UserInfoBox />
        <ListBox />
        <div className="btn btn-primary w-[92%] fixed bottom-10">
          {t("user.logout")}
        </div>
      </div>
    </ViewLayout>
  );
};

export default UserView;
