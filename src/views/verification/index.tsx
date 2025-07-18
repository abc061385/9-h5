"use client";
import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { Verification } from "@/components/verification";
import { useUserStore } from "@/store/useUserStore";
// import { GetTokenType } from "@/lib/const";
import { useVerificationStore } from "@/store/useVerification";
import { useEffect, useCallback } from "react";

const VerificationView = () => {
  const faCheckId = useVerificationStore((s) => s.faCheckId);
  const account = useVerificationStore((s) => s.account);
  const accountType = useVerificationStore((s) => s.accountType);
  const setUserField = useUserStore((s) => s.setField);
  const sendCode = useCallback(async () => {
    api.auth
      .sendCodeUsingPost({ account, faCheckId, accountType })
      .then(console.log)
      .catch(console.log);
  }, [account, faCheckId]);
  const validateCode = useCallback(
    async (code: string) => {
      // const res = api.auth.validateCodeUsingPost({ captcha: code, faCheckId });
      // const faResultId = "0f00bb1711ad44ee831a080ce66c427f";
      // await api.auth.getTokenUsingPost({
      //   faResultId,
      //   type: GetTokenType.login,
      // });
      const d = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoxNzUyNjM2NjQxMjYzLCJpZCI6NTc0NzksIm9iamVjdCI6IiJ9.f-o1aUDT1fw69h0K5WUco9ANoVsIipHz0VAftXfGUsg",
      };
      setUserField("userInfo", d);
      console.log(code, "校验成功");
    },
    [faCheckId],
  );
  useEffect(() => {
    // sendCode();
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
