"use client";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, routerMap, useRouter } from "@/i18n/navigation";
import { TextError } from "@/components/input/text-error";
import { InputPassword } from "@/components/input/password";
import z, { useRootReg } from "@/lib/z";
import { encryptPassword } from "@/lib/utils";
import { useVerificationStore } from "@/store/useVerification";
import { AccountType, FaBizType } from "@/lib/const";
import { api } from "@/api";
import { Geetest, GeetestRef, GeetestValidateRes } from "@/components/geetest";
import { useRef } from "react";
import { HeaderWithBack } from "@/components/header-with-back";

type FormData = {
  email: string;
  password: string;
};

const LoginView = () => {
  const t = useTrans("login");
  const router = useRouter();
  const setField = useVerificationStore((s) => s.setField);
  const reg = useRootReg();
  const geetestRef = useRef<GeetestRef | null>(null);

  const Schema = z.object({
    email: reg.email,
    password: reg.password,
  });

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleNext = async (verData: GeetestValidateRes) => {
    try {
      const data = getValues();
      const res = await api.auth.loginByFaBeforeCheckUsingPost({
        account: data.email,
        accountType: AccountType.email,
        password: encryptPassword(data.password),
        certificate: verData?.certificate || "",
      });
      setField("faCheckId", res?.data?.faCheckId);
      setField("account", data.email);
      setField("accountType", AccountType.email);
      setField("faBizType", FaBizType.login);
      router.push(routerMap["verification"]);
    } catch (err) {
      console.log(err, "err");
    }
  };
  return (
    <ViewLayout
      heightFull
      header={
        <HeaderWithBack
          title={t("loginTab")}
          algin="center"
          path={routerMap.home}
        />
      }
    >
      <div className="p-content size-full flex flex-col">
        <div className="grow">
          <form className="grow" autoComplete="off">
            <fieldset className="fieldset py-0">
              <legend className="fieldset-legend text-base py-0 mb-2">
                {t("email")}
              </legend>
              <label className="input w-full h-12">
                <input
                  type="email"
                  {...register("email")}
                  placeholder={t("email")}
                  className="grow rounded-lg"
                />
              </label>
              <TextError>{errors?.email?.message}</TextError>
            </fieldset>
            <fieldset className="fieldset mt-6 py-0">
              <legend className="fieldset-legend text-base py-0 mb-2">
                {t("password")}
              </legend>
              <InputPassword
                className="grow rounded-lg"
                placeholder={t("password")}
                err={errors?.password?.message}
                {...register("password")}
              />
            </fieldset>
          </form>
          <div className="text-right mt-4">
            <Link className="text-text3" href={routerMap.forgotPassword}>
              {t("forgotPassword")}
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-6 text-lg h-12"
            onClick={handleSubmit(() => {
              geetestRef.current?.showCaptcha();
            })}
            disabled={!Boolean(watch("email")) || !Boolean(watch("password"))}
          >
            {t("loginBtn")}
          </button>
        </div>
        <div className="text-center text-sm pb-6">
          <h3 className="text-text4">Don&apos;t have a Tiger AI account? </h3>
          <Link href={routerMap.register}>Register now</Link>
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

export default LoginView;
