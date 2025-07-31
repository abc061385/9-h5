"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { useRootReg } from "@/lib/z";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";
import toast from "react-hot-toast";
import { useState } from "react";
import { ShowIf } from "@/components/show-if";
import SetPasswordBox from "./set-password";

type FormData = {
  account: string;
  code: string;
};

const ForgotPasswordView = () => {
  const t = useTrans();
  const reg = useRootReg();

  const [pageStatus, setPageStatus] = useState(0);

  const Schema = z.object({
    account: z.string(),
    code: reg.googleVerifyCode,
  });

  const { trigger, isMutating } = useRequestMutation(
    api.member.googleLoginUsingPost
  );

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <ViewLayout
      header={
        <HeaderWithBack title={t("forgotPassword.title")} algin="center" />
      }
    >
      <div className="p-content">
        <ShowIf condition={pageStatus === 0}>
          <form className="grow" autoComplete="off">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                {t("forgotPassword.account")}
              </legend>
              <label className="input w-full">
                <input
                  type="text"
                  {...register("account")}
                  placeholder={t("forgotPassword.enterAccount")}
                  className="grow rounded-lg"
                />
              </label>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend flex-col items-start gap-0">
                <h3>{t("googleVerify.googleAuth")}</h3>
                <p className="text-xs text-text2">
                  {t("googleVerify.authFromApp")}
                </p>
              </legend>
              <label className="input w-full">
                <Icon name="google-verify" />
                <input
                  type="code"
                  {...register("code")}
                  placeholder={t("googleVerify.enterCode")}
                  className="grow"
                />
                <span
                  className="placeholder:text-xs"
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    setValue("code", text);
                  }}
                >
                  {t("googleVerify.paste")}
                </span>
              </label>
              <TextError>{errors?.code?.message}</TextError>
            </fieldset>
          </form>
          <button
            disabled={isMutating}
            type="submit"
            className="btn btn-primary w-full mt-4"
            onClick={handleSubmit((e) => {
              trigger(
                {
                  code: Number(e.code),
                  tel: e.account,
                },
                {
                  onSuccess: (res) => {
                    const code: number = res?.data as unknown as number;
                    if (code === 1)
                      return toast.error(t("forgotPassword.userDoesnotexist"));
                    if (code === 2)
                      return toast.error(t("forgotPassword.userNoGoogle"));
                    if (code === 3)
                      return toast.error(t("forgotPassword.userGoogleFailure"));
                    if (code === 4) return setPageStatus(1);
                    toast.error(t("forgotPassword.userGoogleFailure"));
                  },
                  throwOnError: false,
                }
              );
            })}
          >
            {t("forgotPassword.next")}
          </button>
        </ShowIf>
        <ShowIf condition={pageStatus === 1}>
          <SetPasswordBox getValues={getValues} />
        </ShowIf>
      </div>
    </ViewLayout>
  );
};
export default ForgotPasswordView;
