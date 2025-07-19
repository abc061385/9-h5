"use client";
import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { Verification } from "@/components/verification";
import { useUserStore } from "@/store/useUserStore";
import { useVerificationStore } from "@/store/useVerification";
import { useEffect, useCallback } from "react";
import { routerMap, useRouter } from "@/i18n/navigation";

const VerificationView = () => {
  const router = useRouter();
  const faCheckId = useVerificationStore((s) => s.faCheckId);
  const account = useVerificationStore((s) => s.account);
  const accountType = useVerificationStore((s) => s.accountType);
  const faBizType = useVerificationStore((s) => s.faBizType);
  const setUserField = useUserStore((s) => s.setField);

  const sendCode = useCallback(async () => {
    api.auth
      .sendCodeUsingPost({ account, faCheckId, accountType, faBizType })
      .then(console.log)
      .catch(console.log);
  }, [account, faCheckId, faBizType]);
  const validateCode = useCallback(
    async (code: string) => {
      const res = await api.auth.validateCodeUsingPost({
        captcha: code,
        faCheckId,
      });
      const faResultId = res.data.faResultId;
      await api.auth.getTokenUsingPost({
        faResultId,
        type: faBizType,
      });
      setUserField("userInfo", res.data);
      setUserField("token", res.data.token);
      useVerificationStore.persist.clearStorage();
      router.push(routerMap.home);
    },
    [faCheckId],
  );
  useEffect(() => {
    sendCode();
    console.log("我发送了验证码1");
  }, []);

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title="Security Verification"
          algin="center"
          onChange={() => {
            useVerificationStore.persist.clearStorage();
          }}
        />
      }
    >
      <div className="p-content">
        <p className="text-xs font-medium mb-2">
          Verification code sent. Please check your inbox or spam folder.
        </p>
        <Verification reSendcode={sendCode} onComplete={validateCode} />
      </div>
    </ViewLayout>
  );
};

export default VerificationView;
