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
import { useSettingStore } from "@/store/useSettingStore";
import { useRouter } from "@/i18n/navigation";
import CopyText from "@/components/copy-text";

type FormData = {
  code: string;
};

const SettingGoogleVerifyView = () => {
  const t = useTrans();
  const reg = useRootReg();
  const { back } = useRouter();

  const { setField, gaPreviousPageType } = useSettingStore();

  const { userInfo, fetchUserInfo } = useUserStore();

  const [isVerify, setVerify] = useState(true);
  const [codeValue, setCodeValue] = useState("");

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
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const submit = useCallback(
    (e: { code: string }) => {
      if (!isVerify) {
        debouncedBindGoogle(
          { code: Number(e.code), secret: data?.data?.secret },
          {
            onSuccess: () => {
              toast.success(t("googleVerify.bindComplete"));
              setValue("code", "");
              setCodeValue("");
              fetchUserInfo();
            },
            throwOnError: false,
          }
        );
        return;
      }
      if (gaPreviousPageType) {
        debouncedPostGoogleVerify(
          { code: Number(e.code) },
          {
            onSuccess: () => {
              setField("googleCode", e.code);
              setValue("code", "");
              setCodeValue("");
              back();
            },
            throwOnError: false,
          }
        );
        return;
      }
      debouncedPostGoogleVerify(
        { code: Number(e.code) },
        {
          onSuccess: () => {
            setVerify(false);
            setValue("code", "");
            setCodeValue("");
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
      gaPreviousPageType,
      setField,
      back,
    ]
  );

  useEffect(() => {
    setVerify(Boolean(userInfo.googleVerify));
    trigger();
  }, [userInfo, trigger]);

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("verify.title")} algin="center" />}
    >
      <div className="p-content h-full flex flex-col">
        {!isVerify && (
          <div>
            <ul className="steps w-full text-xs">
              <li className="step step-primary">
                <span className="step-icon">
                  <Icon name="duigou" />
                </span>
                {t("googleVerify.step1")}
              </li>
              <li className="step step-primary">
                <span className="step-icon">
                  <Icon name="duigou" />
                </span>
                {t("googleVerify.step2")}
              </li>
              <li className="step">
                <span className="step-icon !bg-white !border-2"></span>
                {t("googleVerify.step3")}
              </li>
            </ul>
            <p className="text-center text-xs text-text4 my-8">
              {t("googleVerify.instructions")}
            </p>
            <div className="w-30 mx-auto">
              <Qrcode value={data?.data?.secretQrCode || ""}></Qrcode>
            </div>
            <div className="flex items-center justify-between h-10 px-4 font-bold text-xs bg-bg1 rounded-md my-4">
              <span>{data?.data?.secret}</span>
              <CopyText text={data?.data?.secret} />
            </div>
          </div>
        )}
        <form autoComplete="off">
          <fieldset className="fieldset">
            <label className="input w-full">
              <Icon name="google-verify" />
              <input
                type="code"
                {...register("code")}
                placeholder={t("googleVerify.enterCode")}
                className="grow text-xs"
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value)}
              />
              <span
                className="text-sm"
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setCodeValue(text);
                  setValue("code", text);
                }}
              >
                {t("googleVerify.paste")}
              </span>
            </label>
            <TextError>{errors?.code?.message}</TextError>
          </fieldset>
        </form>
        <div className="flex items-start gap-2 px-4 py-3 bg-bg2 rounded-lg mt-6">
          <Icon name="warning-black" className="w-4 h-4 mt-0" />
          <p className="flex-1 text-xs text-text4">
            The key of Google Authenticator is valid for 30 seconds. Please
            enter the correct key within the valid time.
          </p>
        </div>
        <div className="grow"></div>
        <button
          disabled={!getValues("code")}
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
