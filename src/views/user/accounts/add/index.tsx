"use client";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, routerMap, useRouter } from "@/i18n/navigation";
import { TextError } from "@/components/input/text-error";
import { InputPassword } from "@/components/input/password";
import z, { useRootReg } from "@/lib/z";
import { encryptPassword, utils } from "@/lib/utils";
import { HeaderWithBack } from "@/components/header-with-back";
import { createAxiosInstance } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { ApiResponse } from "@/lib/axios";
import { Modal } from "@/components/modal";
import toast from "react-hot-toast";
import { useVerificationStore } from "@/store/useVerification";
import { useCallback, useEffect, useState } from "react";

type FormData = {
  account: string;
  password: string;
};

const LoginView = () => {
  const t = useTrans();
  const reg = useRootReg();
  const { push } = useRouter();

  const api = createAxiosInstance("/app/");

  const { userInfo, setField, subAccount } = useUserStore();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const Schema = z.object({
    account: z.string().nonempty(t("enterAccount")),
    password: reg.password,
  });

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!subAccount) return;
    setValue("account", subAccount);
  }, [subAccount, setValue]);

  const handleNext = async () => {
    setLoading(true);
    try {
      const data = getValues();
      const res: ApiResponse<{
        loginInfo: UserInfo;
        status: number;
        message: string;
      }> = await api.post(
        "/auth/sub-account/login",
        {
          account: data.account,
          password: encryptPassword(data.password),
          motherUserId: userInfo.id,
        },
        {
          headers: {
            device: navigator.userAgent,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setLoading(false);
      if (res.code === 200) {
        if (res.data.status === 0) {
          toast.success(t("address.addSuccess"));
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
        if (res.data.status === 11) {
          setConfirmModalOpen(true);
          return;
        }
        toast.error(t(res?.data?.message));
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      setLoading(false);
      console.log(err, "err");
    }
  };

  const confirmBind = useCallback(async () => {
    const data = getValues();
    try {
      const res: ApiResponse<{
        loginInfo: UserInfo;
        status: number;
        message: string;
      }> = await api.post(
        "/auth/sub-account/email-clean/login",
        {
          account: data.account,
          password: encryptPassword(data.password),
          motherUserId: userInfo.id,
        },
        {
          headers: {
            device: navigator.userAgent,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (res.code === 200) {
        if (res.data.status === 0) {
          setField("subAccount", "");
          toast.success(t("address.addSuccess"));
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
        toast.error(t(res?.data?.message));
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.id, getValues]);

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("login.loginTab")} algin="center" />}
    >
      <div className="p-content size-full flex flex-col">
        <div className="grow">
          <form className="grow" autoComplete="off">
            <fieldset className="fieldset py-0">
              <legend className="fieldset-legend text-base py-0 mb-2">
                {t("account")}
              </legend>
              <label className="input w-full h-12">
                <input
                  type="text"
                  {...register("account")}
                  placeholder={t("account")}
                  className="grow rounded-lg"
                />
              </label>
              <TextError>{errors?.account?.message}</TextError>
            </fieldset>
            <fieldset className="fieldset mt-6 py-0">
              <legend className="fieldset-legend text-base py-0 mb-2">
                {t("login.password")}
              </legend>
              <InputPassword
                className="grow rounded-lg"
                placeholder={t("login.password")}
                err={errors?.password?.message}
                {...register("password")}
              />
            </fieldset>
          </form>
          <div className="text-right mt-4">
            <Link className="text-text3" href={routerMap.forgotPassword}>
              {t("login.forgotPassword")}
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-6 text-lg h-12"
            onClick={handleSubmit(() => {
              handleNext();
            })}
            disabled={
              !Boolean(watch("account")) ||
              !Boolean(watch("password")) ||
              loading
            }
          >
            {t("bind")}
          </button>
        </div>
        {/* <Geetest
          ref={geetestRef}
          onSuccess={(ver) => {
            handleNext(ver);
          }}
        /> */}
        <Modal
          open={confirmModalOpen}
          title={t("alerts.tip")}
          close={false}
          onClose={() => setConfirmModalOpen(false)}
        >
          <p className="text-sm text-text2 mt-4 mb-8">
            {t("bindConfirmation")}
          </p>
          <button
            className="w-full btn btn-primary mb-2"
            onClick={() => confirmBind()}
          >
            {t("common.confirm")}
          </button>
          <button
            className="w-full btn btn-outline"
            onClick={() => setConfirmModalOpen(false)}
          >
            {t("common.cancel")}
          </button>
        </Modal>
      </div>
    </ViewLayout>
  );
};

export default LoginView;
