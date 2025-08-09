"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import { InputPassword } from "@/components/input/password";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { useRootReg } from "@/lib/z";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useUserStore } from "@/store/useUserStore";
import { encryptPassword } from "@/lib/utils";
import toast from "react-hot-toast";

type FormData = {
  pswd: string;
  confirmPswd: string;
  code: string;
};

const SettingPasswordView = () => {
  const t = useTrans();
  const reg = useRootReg();
  const { userInfo, logOut } = useUserStore();

  const Schema = z.object({
    pswd: reg.password,
    confirmPswd: reg.password,
    code: reg.googleVerifyCode,
  });

  const { trigger } = useRequestMutation(api.auth.updatePwdUsingPost);
  const debouncedTrigger = useDebouncedCallback(trigger, 100);

  const {
    register,
    // getValues,
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
      header={<HeaderWithBack title={t("editPassword.title")} algin="center" />}
    >
      <div className="p-content">
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-base">
              {t("forgotPassword.newPassword")}
            </legend>
            <InputPassword
              className="grow"
              placeholder={t("forgotPassword.enterNewPassword")}
              err={errors?.pswd?.message}
              {...register("pswd")}
            />
          </fieldset>
          <fieldset className="fieldset my-3">
            <legend className="fieldset-legend font-medium text-base">
              {t("forgotPassword.confirmPassword")}
            </legend>
            <InputPassword
              className="grow"
              placeholder={t("forgotPassword.confirmNewPassword")}
              err={errors?.confirmPswd?.message}
              {...register("confirmPswd")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex-col items-start gap-1">
              <h3 className="font-medium text-base">
                {t("googleVerify.googleAuth")}
              </h3>
              <p className="text-sm text-text4 font-normal">
                {t("googleVerify.authFromApp")}
              </p>
            </legend>
            <label className="input w-full h-12 mt-2">
              <Icon name="google-verify" />
              <input
                type="code"
                {...register("code")}
                placeholder={t("googleVerify.enterCode")}
                className="grow"
              />
              <span
                className="text-sm"
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
          type="submit"
          className="btn btn-primary w-full mt-4"
          onClick={handleSubmit((e) => {
            debouncedTrigger(
              {
                code: Number(e.code),
                tel: userInfo.tel,
                pswd: encryptPassword(e.pswd),
                confirmPswd: encryptPassword(e.confirmPswd),
              },
              {
                onSuccess: () => {
                  toast.success(t("common.doSuccess"));
                  logOut();
                },
                throwOnError: false,
              }
            );
          })}
        >
          {t("editPassword.complete")}
        </button>
      </div>
    </ViewLayout>
  );
};
export default SettingPasswordView;
