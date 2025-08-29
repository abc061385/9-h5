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
import { ApiResponse } from "@/lib/axios";
import { cn, formatBalance, utils } from "@/lib/utils";
import { useVerificationStore } from "@/store/useVerification";
import { AccountType } from "@/lib/const";
import { useTrans } from "@/hooks/useTrans";

interface Info extends UserInfo {
  nickname: string;
  totalInvestment: string;
}

const AccountManage = () => {
  const t = useTrans();
  const { userInfo, setField } = useUserStore();
  const api = createAxiosInstance("/app/");

  const { push } = useRouter();
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [accountsList, setAccountsList] = useState<Info[]>([]);

  const getAccountList = useCallback(async () => {
    try {
      const res: ApiResponse<Info[]> = await api.get(
        `/auth/bind-list/${userInfo?.id}`,
        {
          headers: {
            device: navigator.userAgent,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (res.code === 200) {
        setAccountsList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.id]);

  useEffect(() => {
    getAccountList();
  }, [getAccountList]);

  const switchAccount = useCallback(
    async (item: Info) => {
      let res: ApiResponse<{
        loginInfo: UserInfo;
        status: number;
        message: string;
      }>;
      try {
        if (item.accountType === 2) {
          res = await api.post(
            "/auth/sub-account/login-by-token",
            {
              account: item.nickname,
              motherUserId: userInfo?.id,
            },
            {
              headers: {
                device: navigator.userAgent,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
        } else {
          res = await api.post(
            "/auth/login-by-token",
            {
              account: item.nickname,
              accountType: AccountType.email,
            },
            {
              headers: {
                device: navigator.userAgent,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
        }

        if (res.code === 200) {
          if (res.data.status === 0) {
            setField("userInfo", res.data.loginInfo);
            setField("token", res.data?.loginInfo?.token || "");
            window.localStorage.setItem(
              "token",
              res.data?.loginInfo?.token || ""
            );
            utils.setJwtCookie(res.data?.loginInfo?.token || "");
            useVerificationStore.persist.clearStorage();
            push(routerMap.accounts);
            return;
          }
          setField("subAccount", item.nickname);
          push(routerMap.accountsAdd);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userInfo?.id]
  );

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={
            <div className="flex-1 flex justify-center items-center relative">
              <span></span>
              {t("accountManagement")}
              <Icon
                name="annotation-black"
                className="size-11 absolute right-[-30px]"
                onClick={() => setInfoModalOpen(true)}
              />
            </div>
          }
          algin="center"
          path={routerMap.user}
        />
      }
      heightFull
    >
      <div className="p-content h-full flex flex-col">
        <div className="flex-1">
          {accountsList?.map((v, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "p-4 rounded-lg bg-bg3 flex items-center justify-between mb-4 gap-4",
                  userInfo.id === v.id && "bg-primary text-white"
                )}
                onClick={() => switchAccount(v)}
              >
                <BaseImage
                  src={v.headUrl || "/icons/user-head.svg"}
                  className="size-10"
                />
                <b className="flex-1 truncate">{v?.nickname}</b>
                <b>${formatBalance(v.totalInvestment || 0, 2)}</b>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={() => push(routerMap.accountsRegister)}
        >
          {t("addNewAccount")}
        </button>
      </div>
      <Modal
        open={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        title={t("promptInformation")}
        titleClassName="mt-[-8px]"
      >
        <p className="text-sm leading-4 mt-6">{t("promptInfo")}</p>
      </Modal>
    </ViewLayout>
  );
};

export default AccountManage;
