"use client";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
// import { useLoginStore } from "@/store/useLoginStore";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@/components/icon";
import { Link, routerMap, useRouter } from "@/i18n/navigation";
import { TextError } from "@/components/input/text-error";
import { InputPassword } from "@/components/input/password";
import z, { useRootReg } from "@/lib/z";
import { useLoginStore } from "@/store/useLoginStore";

const LoginView = () => {
  const t = useTrans("login");
  const router = useRouter();
  // const email = useLoginStore((s) => s.email);
  const setField = useLoginStore((s) => s.setField);
  const reg = useRootReg();

  const Schema = z.object({
    email: reg.email,
    password: reg.password,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <ViewLayout>
      <div className="p-content size-full flex flex-col">
        <h1 className="text-h1 text-center my-8">{t("welcome")}</h1>
        <div className="tabs tabs-box mb-5">
          <a role="tab" className="tab flex-1 tab-active">
            {t("loginBtn")}
          </a>
          <Link href={routerMap.register} role="tab" className="tab flex-1">
            {t("registerBtn")}
          </Link>
        </div>
        <form className="grow">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("email")}</legend>
            <label className="input w-full">
              <Icon name="email" />
              <input
                type="email"
                {...register("email")}
                placeholder={t("email")}
                className="grow"
              />
            </label>
            <TextError>{errors?.email?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("password")}</legend>
            <InputPassword
              className="grow"
              placeholder={t("password")}
              err={errors?.password?.message}
              {...register("password")}
            />
          </fieldset>
        </form>
        <button
          type="submit"
          className="btn btn-primary w-full"
          onClick={handleSubmit((data) => {
            console.log(data);
            setField("email", data.email);
            setField("password", data.password);
            router.push(routerMap["login/verification"]);
          })}
        >
          {t("loginBtn")}
        </button>
      </div>
    </ViewLayout>
  );
};

export default LoginView;
