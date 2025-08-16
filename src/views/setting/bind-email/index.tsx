"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { useRootReg } from "@/lib/z";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import Countdown from "@/components/countdown";
import { useUserStore } from "@/store/useUserStore";
import { ShowIf } from "@/components/show-if";
import { useRouter } from "@/i18n/navigation";

type FormData = {
  googleCode: string;
  email: string;
  emailCode: string;
  oldEmailCode: string;
};

const SettingGoogleVerifyView = () => {
  const t = useTrans();
  const reg = useRootReg();
  const { userInfo, fetchUserInfo } = useUserStore();
  const [codeCountDown, setCodeCountDown] = useState(false);
  const [oldcodeCountDown, setOldCodeCountDown] = useState(false);
  const [isBind, setIsBind] = useState(false);
  const [btnType, setType] = useState<"new" | "old">("new");
  const { back } = useRouter();

  useEffect(() => {
    if (userInfo?.bindEmail) return setIsBind(true);
    setIsBind(false);
  }, [userInfo]);

  const { trigger: sendCode, isMutating } = useRequestMutation(
    api.member.sendEmailCodeUsingGet,
  );

  const { trigger } = useRequestMutation(api.member.bindEmailUsingPost);

  const { trigger: changeEmail } = useRequestMutation(
    api.member.changeEmailUsingPost,
  );

  const debouncedTrigger = useDebouncedCallback(trigger, 100);

  const Schema = z.object({
    googleCode: reg.googleVerifyCode,
    email: reg.email,
    emailCode: reg.googleVerifyCode,
    oldEmailCode: z.any().nullable(),
  });

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const submit = useCallback(
    (e: FormData | undefined) => {
      if (!e) return;
      if (isBind) {
        if (!e.oldEmailCode) return toast.error(t("请输入已绑定的邮箱验证码"));
        changeEmail(
          {
            googleCode: e.googleCode,
            newEmail: e.email,
            newEmailCode: e.emailCode,
            oldEmailCode: e.oldEmailCode,
          },
          {
            onSuccess: () => {
              toast.success(t("操作成功"));
              fetchUserInfo();
              setTimeout(() => {
                back();
              }, 1000);
            },
            throwOnError: false,
          },
        );
      } else {
        debouncedTrigger(
          {
            email: e?.email,
            emailCode: e?.emailCode,
            googleCode: e?.googleCode,
          },
          {
            onSuccess: () => {
              toast.success(t("操作成功"));
              fetchUserInfo();

              setTimeout(() => {
                back();
              }, 1000);
            },
            throwOnError: false,
          },
        );
      }
    },
    [debouncedTrigger, isBind, changeEmail, t, back, fetchUserInfo],
  );

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("绑定邮箱")} algin="center" />}
    >
      <div className="p-content">
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-base pb-2">
              {t(isBind ? "新邮箱" : "邮箱账号")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="email"
                {...register("email")}
                placeholder={t("请输入要绑定的邮箱账号")}
                className="grow placeholder:text-base"
              />
            </label>
            <TextError>{errors?.email?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <label className="input w-full pr-2 h-12 border-border1">
              <input
                type="text"
                {...register("emailCode")}
                placeholder={t("请输入验证码")}
                className="grow placeholder:text-base"
              />
              {codeCountDown ? (
                <Countdown
                  key="new"
                  seconds={60}
                  onFinish={() => {
                    setCodeCountDown(false);
                  }}
                />
              ) : (
                <span
                  className="btn btn-neutral font-medium text-sm h-8"
                  onClick={() => {
                    setType("new");
                    if (btnType === "new" && isMutating) return;
                    if (getValues("email")) {
                      sendCode(
                        { email: getValues("email") || "", type: "BIND" },
                        {
                          onSuccess: () => setCodeCountDown(true),
                        },
                      );
                      return;
                    }
                    toast.error(t("请输入要绑定的邮箱账号"));
                  }}
                >
                  {btnType === "new" && isMutating ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    t("发送")
                  )}
                </span>
              )}
            </label>
            <TextError>{errors?.emailCode?.message}</TextError>
          </fieldset>
          <ShowIf condition={isBind}>
            <fieldset className="fieldset">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-medium text-base pb-2">
                  {t("已绑定的邮箱验证码")}
                </legend>
                <label className="input w-full pr-2 h-12 border-border1">
                  <input
                    type="text"
                    {...register("oldEmailCode")}
                    placeholder={t("请输入验证码")}
                    className="grow placeholder:text-base"
                  />
                  {oldcodeCountDown ? (
                    <Countdown
                      key="old"
                      seconds={60}
                      onFinish={() => {
                        setOldCodeCountDown(false);
                      }}
                    />
                  ) : (
                    <span
                      className="btn btn-neutral font-medium text-sm h-8"
                      onClick={() => {
                        setType("old");
                        if (btnType === "old" && isMutating) return;
                        if (userInfo?.bindEmail) {
                          sendCode(
                            {
                              email: userInfo?.bindEmail || "",
                              type: "CHANGE",
                            },
                            {
                              onSuccess: () => setOldCodeCountDown(true),
                            },
                          );
                          return;
                        }
                        toast.error(t("请输入正确的邮箱账号"));
                      }}
                    >
                      {btnType === "old" && isMutating ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        t("发送")
                      )}
                    </span>
                  )}
                </label>
              </fieldset>
              <TextError>{errors?.oldEmailCode?.message}</TextError>
            </fieldset>
          </ShowIf>
          <fieldset className="fieldset mt-2">
            <legend className="fieldset-legend flex-col items-start gap-1">
              <h3 className="font-medium text-base">
                {t("googleVerify.googleAuth")}
              </h3>
              <p className="text-sm text-text4 font-normal">
                {t("googleVerify.authFromApp")}
              </p>
            </legend>
            <label className="input w-full h-12 mt-1">
              <Icon name="google-verify" />
              <input
                type="text"
                {...register("googleCode")}
                placeholder={t("googleVerify.enterCode")}
                className="grow placeholder:text-base"
              />
              <span
                className="text-sm"
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setValue("googleCode", text);
                }}
              >
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
            submit(e);
          })}
        >
          {t("verify.confirm")}
        </button>
      </div>
    </ViewLayout>
  );
};
export default SettingGoogleVerifyView;
