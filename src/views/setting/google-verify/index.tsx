"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { useRootReg } from "@/lib/z";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import { useUserStore } from "@/store/useUserStore";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/api";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { Qrcode } from "@/components/qrcode";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

type FormData = {
  code: string;
};

const SettingGoogleVerifyView = () => {
  const t = useTrans();
  const reg = useRootReg();
  const { userInfo, fetchUserInfo } = useUserStore();

  const [isVerify, setVerify] = useState(true);

  const { trigger, data } = useRequestMutation(
    api.member.generateGoogleSecretUsingPost
  );

  const { trigger: bindGoogle } = useRequestMutation(
    api.member.bindGoogleUsingPost
  );

  const { trigger: postGoogleVerify } = useRequestMutation(
    api.member.googleLoginUsingPost1
  );

  const debouncedBindGoogle = useDebouncedCallback(bindGoogle, 100);
  const debouncedPostGoogleVerify = useDebouncedCallback(postGoogleVerify, 100);

  const Schema = z.object({
    code: reg.googleVerifyCode,
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const submit = useCallback(
    (e: { code: string }) => {
      if (isVerify) {
        debouncedPostGoogleVerify(
          { code: Number(e.code) },
          {
            onSuccess: () => {
              setVerify(false);
              setValue("code", "");
            },
            throwOnError: false,
          }
        );
        return;
      }
      debouncedBindGoogle(
        { code: Number(e.code), secret: data?.data?.secret },
        {
          onSuccess: () => {
            toast.success(t("googleVerify.bindComplete"));
            setValue("code", "");
            fetchUserInfo();
          },
          throwOnError: false,
        }
      );
    },
    [
      debouncedBindGoogle,
      debouncedPostGoogleVerify,
      data,
      t,
      fetchUserInfo,
      isVerify,
      setValue,
    ]
  );

  useEffect(() => {
    setVerify(Boolean(userInfo.googleVerify));
    trigger();
  }, [userInfo, trigger]);

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("verify.title")} algin="center" />}
    >
      <div className="p-content">
        {!isVerify && (
          <div>
            <ul className="steps w-full font-bold text-xs">
              <li className="step step-primary">{t("googleVerify.step1")}</li>
              <li className="step step-primary">{t("googleVerify.step2")}</li>
              <li className="step">{t("googleVerify.step3")}</li>
            </ul>
            <p className="font-bold text-center text-xs my-4">
              {t("googleVerify.instructions")}
            </p>
            <div className="w-30 mx-auto">
              <Qrcode value={data?.data?.secretQrCode || ""}></Qrcode>
            </div>
            <div className="flex items-center justify-between h-10 px-4 font-bold text-xs bg-bg-color2 rounded-md my-4">
              <span>{data?.data?.secret}</span>
              <Icon
                name="copy-user"
                onClick={() => {
                  navigator.clipboard.writeText(data?.data?.secret);
                  toast.success(t("googleVerify.keyCopied"));
                }}
              />
            </div>
          </div>
        )}
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex-col items-start gap-0">
              <h3>{t("googleVerify.googleAuth")}</h3>
              <p className="text-xs text-text2">
                {t("googleVerify.authFromApp")}
              </p>
            </legend>
            <label className="input w-full">
              <Icon name="google-verify" />
              <input
                type="code"
                {...register("code")}
                placeholder={t("googleVerify.enterCode")}
                className="grow text-xs"
              />
              <span
                className="text-primary font-bold"
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setValue("code", text);
                }}
              >
                {t("googleVerify.paste")}
              </span>
            </label>
            <TextError>{errors?.code?.message}</TextError>
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
