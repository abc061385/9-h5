"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import UserInfoBox from "./info";
import ListBox from "./list";
import { routerMap } from "@/i18n/navigation";
import { useUserStore } from "@/store/useUserStore";

const UserView = () => {
  const t = useTrans();
  const logOut = useUserStore((s) => s.logOut);
  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={t("user.title")}
          algin="center"
          path={routerMap.home}
        />
      }
      footer={
        <div className="px-content w-full">
          <button className="btn btn-primary w-full" onClick={logOut}>
            {t("user.logout")}
          </button>
        </div>
      }
    >
      <div className="p-content">
        <UserInfoBox />
        <ListBox />
      </div>
    </ViewLayout>
  );
};

export default UserView;
