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

type FormData = {
  pswd: string;
  confirmPswd: string;
  code: string;
};

const SettingPasswordView = () => {
  const t = useTrans();
  const reg = useRootReg();

  const Schema = z.object({
    pswd: reg.password,
    confirmPswd: reg.password,
    code: reg.googleVerifyCode,
  });

  const {
    register,
    // getValues,
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
            <legend className="fieldset-legend">
              {t("forgotPassword.newPassword")}
            </legend>
            <InputPassword
              className="grow"
              placeholder={t("forgotPassword.enterNewPassword")}
              err={errors?.pswd?.message}
              {...register("pswd")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
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
              <span className="text-primary font-bold">
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
            console.log(e);
          })}
        >
          {t("editPassword.complete")}
        </button>
      </div>
    </ViewLayout>
  );
};
export default SettingPasswordView;
