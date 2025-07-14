"use client";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
// import { useLoginStore } from "@/store/useLoginStore";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const Schema = z.object({
  email: z.string().email("请输入有效邮箱"),
  password: z.string().min(6, "至少 6 位"),
});
const LoginView = () => {
  const t = useTrans("login");
  // const email = useLoginStore((s) => s.email);
  // const setEmail = useLoginStore((s) => s.setEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  });
  return (
    <ViewLayout>
      <div className="p-content">
        <HeaderWithBack title={t("loginTab")} algin="right"></HeaderWithBack>
        <h1 className="text-h1 text-center my-8">{t("welcome")}</h1>
        <div className="tabs tabs-box mb-5">
          <a role="tab" className="tab flex-1 tab-active">
            {t("email")}
          </a>
          <a role="tab" className="tab flex-1">
            Mobile Number
          </a>
        </div>

        <form
          onSubmit={handleSubmit((data) => console.log(data))}
          className="space-y-4"
        >
          <div>
            <label className="input w-full">
              E-
              <input
                type="email"
                {...register("email")}
                placeholder="邮箱"
                className="grow"
              />
            </label>
            {errors.email && (
              <p className="text-error">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="input w-full">
              P-
              <input
                type="password"
                {...register("password")}
                placeholder="密码"
                className="grow"
              />
            </label>
            {errors.password && (
              <p className="text-error">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            提交
          </button>
        </form>
      </div>
    </ViewLayout>
  );
};

export default LoginView;
