"use client";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, routerMap } from "@/i18n/navigation";
import { TextError } from "@/components/input/text-error";
import { InputPassword } from "@/components/input/password";
import z, { useRootReg } from "@/lib/z";
import { encryptPassword } from "@/lib/utils";
import { HeaderWithBack } from "@/components/header-with-back";
import { createAxiosInstance } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";

type FormData = {
  account: string;
  password: string;
};

const LoginView = () => {
  const t = useTrans("login");
  const reg = useRootReg();

  const api = createAxiosInstance("/app/");

  const { userInfo } = useUserStore();

  const Schema = z.object({
    account: z.string().nonempty("请输入账号"),
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

  const handleNext = async () => {
    try {
      const data = getValues();

      const res = api.post(
        "/auth/sub-account/login",
        {
          account: data.account,
          password: encryptPassword(data.password),
          motherUserId: userInfo.id,
        },
        {
          headers: {
            device: navigator.userAgent,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err, "err");
    }
  };

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("loginTab")} algin="center" />}
    >
      <div className="p-content size-full flex flex-col">
        <div className="grow">
          <form className="grow" autoComplete="off">
            <fieldset className="fieldset py-0">
              <legend className="fieldset-legend text-base py-0 mb-2">
                Account
              </legend>
              <label className="input w-full h-12">
                <input
                  type="text"
                  {...register("account")}
                  placeholder="Account"
                  className="grow rounded-lg"
                />
              </label>
              <TextError>{errors?.account?.message}</TextError>
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
              handleNext();
            })}
            disabled={!Boolean(watch("account")) || !Boolean(watch("password"))}
          >
            绑定
          </button>
        </div>
        {/* <Geetest
          ref={geetestRef}
          onSuccess={(ver) => {
            handleNext(ver);
          }}
        /> */}
      </div>
    </ViewLayout>
  );
};

export default LoginView;
