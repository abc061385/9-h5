"use client";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Icon } from "@/components/icon";
import { Link, routerMap, useRouter } from "@/i18n/navigation";
import { InputPassword } from "@/components/input/password";
import { TextError } from "@/components/input/text-error";

const Schema = z.object({
  email: z.string().email("请输入有效邮箱"),
  password: z.string().min(6, "至少 6 位"),
  confirmPassword: z.string().min(6, "至少 6 位"),
  inviteCode: z.string(),
});
const RegisterView = () => {
  const t = useTrans("login");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  return (
    <ViewLayout>
      <div className="p-content size-full flex flex-col">
        <h1 className="text-h1 text-center my-8">{t("welcome")}</h1>
        <div className="tabs tabs-box mb-5">
          <Link href={routerMap.login} role="tab" className="tab flex-1 ">
            {t("loginBtn")}
          </Link>
          <a role="tab" className="tab flex-1 tab-active">
            {t("registerBtn")}
          </a>
        </div>
        <form className=" grow">
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
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("confirmPassword")}</legend>
            <InputPassword
              className="grow"
              placeholder={t("confirmPassword")}
              err={errors?.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("inviteCode")}</legend>
            <label className="input w-full">
              <Icon name="write" />
              <input
                type="text"
                {...register("inviteCode")}
                placeholder={t("inviteCode")}
                className="grow"
              />
            </label>
            <TextError>{errors?.inviteCode?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset text-xs flex">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-primary checkbox-xs"
            />
            <div>
              {t("agreement")}
              &nbsp;
              <a className="text-primary">{t("serviceTerms")}</a>
              &nbsp;
              {t("and")}
              &nbsp;
              <a className="text-primary">{t("privacyPolicy")}</a>
            </div>
          </fieldset>
        </form>
        <button
          type="submit"
          className="btn btn-primary w-full"
          onClick={handleSubmit((data) => {
            console.log(data);
            router.push(routerMap["login/verification"]);
          })}
        >
          {t("registerBtn")}
        </button>
      </div>
    </ViewLayout>
  );
};

export default RegisterView;
