"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { Modal } from "@/components/modal";
import { routerMap, useRouter } from "@/i18n/navigation";
import { createAxiosInstance } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { useCallback, useEffect, useState } from "react";

const AccountManage = () => {
  const { userInfo } = useUserStore();
  const api = createAxiosInstance("/app/");

  const { push } = useRouter();
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const getAccountList = useCallback(() => {
    const res = api.get("/auth/bind-list/", {
      params: {
        id: userInfo.id,
      },
    });
    console.log(res);
  }, [userInfo, api]);

  useEffect(() => {
    getAccountList();
  }, [getAccountList]);
  
  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={
            <div className="flex-1 flex justify-center items-center relative">
              <span></span>
              Account Management
              <Icon
                name="annotation-black"
                className="size-11 absolute right-[-30px]"
                onClick={() => setInfoModalOpen(true)}
              />
            </div>
          }
          algin="center"
        />
      }
      heightFull
    >
      <div className="p-content h-full flex flex-col">
        <div className="flex-1">
          {[...new Array(3)].map((_, i) => {
            return (
              <div
                key={i}
                className="p-4 rounded-lg bg-bg3 flex items-center justify-between mb-4 gap-4"
              >
                <BaseImage src={"/icons/user-head.svg"} className="size-10" />
                <b className="flex-1">9MAI555621</b>
                <b>$0</b>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={() => push(routerMap.accountsRegister)}
        >
          Add New Account
        </button>
      </div>
      <Modal
        open={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        title="Prompt information"
        titleClassName="mt-[-8px]"
      >
        <p className="text-sm leading-4 mt-6">
          To ensure account security, password verification is not required when
          switching accounts on a new device. The binding relationship is valid
          for 7 days. After the expiration date, you need to re-enter the
          sub-account password for verification.
        </p>
      </Modal>
    </ViewLayout>
  );
};

export default AccountManage;
