"use client";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, routerMap, useRouter } from "@/i18n/navigation";
import { InputPassword } from "@/components/input/password";
import { TextError } from "@/components/input/text-error";
import z, { useRootReg } from "@/lib/z";
import { encryptPassword, utils } from "@/lib/utils";
import { useEffect, useState } from "react";
import { HeaderWithBack } from "@/components/header-with-back";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { createAxiosInstance } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { ApiResponse } from "@/lib/axios";
import { useVerificationStore } from "@/store/useVerification";

const RegisterView = () => {
  const api = createAxiosInstance("/app/");

  const { userInfo, setField } = useUserStore();
  const { push } = useRouter();
  const t = useTrans();
  const reg = useRootReg();
  const searchParams = useSearchParams();

  const [isAgreement, setIsAgreement] = useState(false);

  useEffect(() => {
    setField("subAccount", "");
  }, [setField]);

  const Schema = z
    .object({
      account: z.string().nonempty(t("enterAccount")),
      password: reg.password,
      confirmPassword: z.string(),
      invitationCode: z.string().nonempty(t("login.inputInviteCode")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("alerts.passwordMismatch"),
      path: ["confirmPassword"],
    });

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const handleNext = async () => {
    try {
      const data = getValues();
      const res: ApiResponse<{
        loginInfo: UserInfo;
        status: number;
        message: string;
      }> = await api.post(
        "/auth/sub-account/register",
        {
          account: data.account,
          password: encryptPassword(data.password),
          confirmPassword: encryptPassword(data.password),
          invitationCode: data.invitationCode,
          motherUserId: userInfo?.id,
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
          toast.success(t("alerts.registerSuccess"));
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
    } catch {}
  };

  useEffect(() => {
    if (searchParams.get("inviteCode")) {
      setValue("invitationCode", searchParams.get("inviteCode") || "");
    }
  }, [searchParams, setValue]);
  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("login.registerTab")} algin="center" />}
    >
      <div className="p-content size-full flex flex-col">
        <div className="grow">
          <form autoComplete="off">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">{t("account")}</legend>
              <label className="input w-full">
                <input
                  type="text"
                  {...register("account")}
                  placeholder={t("account")}
                  className="grow"
                />
              </label>
              <TextError>{errors?.account?.message}</TextError>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">{t("login.password")}</legend>
              <InputPassword
                className="grow"
                placeholder={t("login.password")}
                err={errors?.password?.message}
                {...register("password")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {t("login.confirmPassword")}
              </legend>
              <InputPassword
                className="grow"
                placeholder={t("login.confirmPassword")}
                err={errors?.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {t("login.inviteCode")}
              </legend>
              <label className="input w-full">
                <input
                  type="text"
                  {...register("invitationCode")}
                  placeholder={t("login.inviteCode")}
                  className="grow"
                />
              </label>
              <TextError>{errors?.invitationCode?.message}</TextError>
            </fieldset>
            <fieldset className="fieldset text-xs flex mt-4 mb-6">
              <label className="label items-start">
                <input
                  type="checkbox"
                  checked={isAgreement}
                  onChange={(e) => setIsAgreement(e.target.checked)}
                  className="checkbox checkbox-neutral size-4"
                />
                <div className="text-text2 text-xs flex flex-wrap">
                  {t("login.agreement")}
                  <a
                    className="text-text1"
                    onClick={() => {
                      push(`${routerMap.protocol}?type=3`);
                    }}
                  >
                    《{t("login.serviceTerms")}》
                  </a>
                  {t("login.and")}
                  <a
                    className="text-text1"
                    onClick={() => push(`${routerMap.protocol}?type=1`)}
                  >
                    《{t("login.privacyPolicy")}》
                  </a>
                </div>
              </label>
            </fieldset>
          </form>
          <button
            type="submit"
            className="btn btn-primary w-full"
            onClick={handleSubmit(() => {
              if (!isAgreement) return toast.error(t("请先同意协议"));
              handleNext();
            })}
          >
            {t("login.registerBtn")}
          </button>
        </div>
        <div className="text-center text-sm pb-6">
          <h3 className="text-text2">
            {t("existingAccount")}
            <Link
              href={routerMap.accountsAdd}
              className="font-bold text-primary mx-1"
            >
              {t("bindMainAccount")}
            </Link>
            ，{t("bindLoginHint")}
          </h3>
        </div>
        {/* <Geetest
          ref={geetestRef}
          onSuccess={(ver) => {
            handleNext(ver);
          }}
        /> */}
      </div>
    </ViewLayout>
  );
};

export default RegisterView;
