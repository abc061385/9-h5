import { InputPassword } from "@/components/input/password";
import { useTrans } from "@/hooks/useTrans";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { useRootReg } from "@/lib/z";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";
import { FC } from "react";
import { encryptPassword } from "@/lib/utils";
import toast from "react-hot-toast";
import { routerMap, useRouter } from "@/i18n/navigation";

type FormData = {
  pswd: string;
  confirmPswd: string;
};

interface IProps {
  getValues: (name: string) => void;
}

const SetPasswordBox: FC<IProps> = ({ getValues }) => {
  const t = useTrans();
  const reg = useRootReg();
  const { push } = useRouter();

  const { trigger, isMutating } = useRequestMutation(
    api.auth.forgetUpdatePwdUsingPost,
  );

  const Schema = z
    .object({
      pswd: reg.password,
      confirmPswd: reg.password,
    })
    .refine((data) => data.pswd === data.confirmPswd, {
      path: ["confirmPswd"], // 报错显示在哪个字段
      message: t("alerts.passwordMismatch"),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <>
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
      </form>
      <button
        type="submit"
        disabled={isMutating}
        className="btn btn-primary w-full mt-4"
        onClick={handleSubmit((e) => {
          trigger(
            {
              code: getValues("code")!,
              pswd: encryptPassword(e.pswd),
              confirmPswd: encryptPassword(e.confirmPswd),
              tel: getValues("account")!,
            },
            {
              onSuccess: () => {
                toast.success(t("forgotPassword.resetSuccess"));
                setTimeout(() => {
                  push(routerMap.login);
                }, 500);
              },
            },
          );
        })}
      >
        {t("forgotPassword.next")}
      </button>
    </>
  );
};
export default SetPasswordBox;
