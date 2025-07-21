"use client";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@/components/icon";
import { Link, routerMap, useRouter } from "@/i18n/navigation";
import { InputPassword } from "@/components/input/password";
import { TextError } from "@/components/input/text-error";
import z, { useRootReg } from "@/lib/z";
import { encryptPassword } from "@/lib/utils";
import { useVerificationStore } from "@/store/useVerification";
import { AccountType, FaBizType } from "@/lib/const";
import { api } from "@/api";
import { useRef } from "react";
import { Geetest, GeetestRef, GeetestValidateRes } from "@/components/geetest";

const RegisterView = () => {
  const t = useTrans();
  const router = useRouter();
  const reg = useRootReg();
  const setField = useVerificationStore((s) => s.setField);

  const geetestRef = useRef<GeetestRef | null>(null);
  const Schema = z
    .object({
      email: reg.email,
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const handleNext = async (ver: GeetestValidateRes) => {
    try {
      const data = getValues();
      const res = await api.auth.regByFaBeforeCheckUsingPost({
        account: data.email,
        accountType: AccountType.email,
        password: encryptPassword(data.password),
        invitationCode: data.invitationCode,
        certificate: ver.certificate || "",
      });
      if (res.code === 200) {
        setField("faCheckId", res.data?.faCheckId);
        setField("account", data.email);
        setField("accountType", AccountType.email);
        setField("faBizType", FaBizType.register);
        router.push(routerMap["verification"]);
      } else {
      }
    } catch {}
  };
  return (
    <ViewLayout>
      <div className="p-content size-full flex flex-col">
        <h1 className="text-h1 text-center my-8">{t("login.welcome")}</h1>
        <div className="tabs tabs-box mb-5">
          <Link href={routerMap.login} role="tab" className="tab flex-1 ">
            {t("login.loginBtn")}
          </Link>
          <a role="tab" className="tab flex-1 tab-active">
            {t("login.registerBtn")}
          </a>
        </div>
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("login.email")}</legend>
            <label className="input w-full">
              <Icon name="email" />
              <input
                type="email"
                {...register("email")}
                placeholder={t("login.email")}
                className="grow"
              />
            </label>
            <TextError>{errors?.email?.message}</TextError>
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
            <legend className="fieldset-legend">{t("login.inviteCode")}</legend>
            <label className="input w-full">
              <Icon name="write" />
              <input
                type="text"
                {...register("invitationCode")}
                placeholder={t("login.inviteCode")}
                className="grow"
              />
            </label>
            <TextError>{errors?.invitationCode?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset text-xs flex">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-primary checkbox-xs"
            />
            <div>
              {t("login.agreement")}
              &nbsp;
              <a className="text-primary">{t("login.serviceTerms")}</a>
              &nbsp;
              {t("login.and")}
              &nbsp;
              <a className="text-primary">{t("login.privacyPolicy")}</a>
            </div>
          </fieldset>
        </form>
        <button
          type="submit"
          className="btn btn-primary w-full"
          onClick={handleSubmit(() => {
            geetestRef.current?.showCaptcha();
          })}
        >
          {t("login.registerBtn")}
        </button>
        <Geetest
          ref={geetestRef}
          onSuccess={(ver) => {
            handleNext(ver);
          }}
        />
      </div>
    </ViewLayout>
  );
};

export default RegisterView;
