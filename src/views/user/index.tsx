"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import UserInfoBox from "./info";
import ListBox from "./list";
import { routerMap } from "@/i18n/navigation";
import { useUserStore } from "@/store/useUserStore";
import { Modal } from "@/components/modal";
import { Icon } from "@/components/icon";
import { useState } from "react";

const UserView = () => {
  const t = useTrans();
  const logOut = useUserStore((s) => s.logOut);

  const [logoutOpen, setLogoutOpen] = useState(false);
  return (
    <ViewLayout
      heightFull
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
        <button
          className="btn btn-soft w-full text-assist2 bg-bg-assist2 border-none"
          onClick={() => setLogoutOpen(true)}
        >
          {t("user.logout")}
        </button>
      </div>
      <Modal
        open={logoutOpen}
        close={false}
        title={t("user.logout")}
        onClose={() => setLogoutOpen(false)}
      >
        <div className="text-center pt-6">
          <Icon name="warning-red" className="size-10" />
          <p className="text-sm text-assist2 mt-4">{t("logoutConfirm")}</p>
          <button className="btn btn-neutral w-full mt-6 mb-2" onClick={logOut}>
            {t("common.confirm")}
          </button>
          <button
            className="btn btn-outline w-full"
            onClick={() => setLogoutOpen(false)}
          >
            {t("common.cancel")}
          </button>
        </div>
      </Modal>
    </ViewLayout>
  );
};

export default UserView;
