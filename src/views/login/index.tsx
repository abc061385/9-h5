"use client";
import * as z from "zod";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, routerMap, useRouter } from "@/i18n/navigation";
import { TextError } from "@/components/input/text-error";
import { InputPassword } from "@/components/input/password";
import { useRootReg } from "@/lib/z";
import { encryptPassword, utils } from "@/lib/utils";
import { useVerificationStore } from "@/store/useVerification";
import { AccountType, FaBizType } from "@/lib/const";
import { api } from "@/api";
import { Geetest, GeetestRef, GeetestValidateRes } from "@/components/geetest";
import { useRef } from "react";
import { HeaderWithBack } from "@/components/header-with-back";
import { useUserStore } from "@/store/useUserStore";

type FormData = {
  email: string;
  password: string;
};

const LoginView = () => {
  const t = useTrans("login");
  const router = useRouter();
  const setField = useVerificationStore((s) => s.setField);
  const setUserField = useUserStore((s) => s.setField);
  const reg = useRootReg();
  const geetestRef = useRef<GeetestRef | null>(null);

  const Schema = z.object({
    email: z.string(""),
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
      if (res.data.bindEmailFlag === 1) {
        router.push(routerMap["verification"]);
      }
      const userInfo = res.data?.loginInfo || null;
      if (res.data.bindEmailFlag === 0 && userInfo) {
        setUserField("userInfo", userInfo);
        setUserField("token", userInfo?.token);
        window.localStorage.setItem("token", userInfo?.token);
        utils.setJwtCookie(userInfo?.token);
        router.push(routerMap.home);
      }
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
              <legend className="fieldset-legend text-text2 py-0 mb-2">
                {t("email")}/{t("username")}
              </legend>
              <label className="input w-full h-12 !bg-bg1">
                <input
                  type="email"
                  {...register("email")}
                  placeholder={`${t("email")}/${t("username")}`}
                  className="grow rounded-lg"
                />
              </label>
              <TextError>{errors?.email?.message}</TextError>
              {/* <div className="text-xs"> */}
              {/*   {t("old_user_email_hint")}{" "} */}
              {/*   <a */}
              {/*     className="text-primary" */}
              {/*     href="https://old.9mc.org/#/pages/login/login1" */}
              {/*   > */}
              {/*     {t("go_bind")} */}
              {/*   </a> */}
              {/* </div> */}
            </fieldset>
            <fieldset className="fieldset mt-6 py-0">
              <legend className="fieldset-legend text-text2 py-0 mb-2">
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
          <h3 className="text-text2">Don&apos;t have a 9M AI account? </h3>
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
