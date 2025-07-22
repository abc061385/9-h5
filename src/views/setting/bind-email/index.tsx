"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { useRootReg } from "@/lib/z";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";

type FormData = {
  googleCode: string;
  email: string;
  emailCode: string;
};

const SettingGoogleVerifyView = () => {
  const t = useTrans();
  const reg = useRootReg();

  const Schema = z.object({
    googleCode: reg.googleVerifyCode,
    email: reg.email,
    emailCode: reg.googleVerifyCode,
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
      header={<HeaderWithBack title={t("绑定邮箱")} algin="center" />}
    >
      <div className="p-content">
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("邮箱账号")}</legend>
            <label className="input w-full">
              <Icon name="email" />
              <input
                type="email"
                {...register("email")}
                placeholder={t("请输入要绑定的邮箱账号")}
                className="grow placeholder:text-xs"
              />
            </label>
            <TextError>{errors?.email?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("邮箱验证码")}</legend>
            <label className="input w-full">
              <input
                type="text"
                {...register("emailCode")}
                placeholder={t("请输入验证码")}
                className="grow placeholder:text-xs"
              />
              <span className="text-primary font-bold text-xs">
                {t("获取验证码")}
              </span>
            </label>
            <TextError>{errors?.emailCode?.message}</TextError>
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
                type="text"
                {...register("googleCode")}
                placeholder={t("googleVerify.enterCode")}
                className="grow placeholder:text-xs"
              />
              <span className="text-primary font-bold placeholder:text-xs">
                {t("googleVerify.paste")}
              </span>
            </label>
            <TextError>{errors?.googleCode?.message}</TextError>
          </fieldset>
        </form>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          onClick={handleSubmit((e) => {
            console.log(e);
          })}
        >
          {t("verify.confirm")}
        </button>
      </div>
    </ViewLayout>
  );
};
export default SettingGoogleVerifyView;
