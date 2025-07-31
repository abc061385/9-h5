"use client";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { HeaderWithBack } from "@/components/header-with-back";

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
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("login.registerTab")} algin="center" />}
    >
      <div className="p-content size-full flex flex-col">
        <div className="grow">
          <form autoComplete="off">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">{t("login.email")}</legend>
              <label className="input w-full">
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
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-primary checkbox-xs mt-0.5"
              />
              <div className="text-text4 text-xs">
                {t("login.agreement")}
                <a className="text-text1">《{t("login.serviceTerms")}》</a>
                {t("login.and")}
                <a className="text-text1">《{t("login.privacyPolicy")}》</a>
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
        </div>
        <div className="text-center text-sm pb-6">
          <h3 className="text-text4">Already have an Account?</h3>
          <Link href={routerMap.register}>Back to Login</Link>
        </div>
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
