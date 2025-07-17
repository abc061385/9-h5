"use client";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { Verification } from "@/components/verification";
import { useLoginStore } from "@/store/useLoginStore";

const LoginVerificationView = () => {
  const email = useLoginStore((s) => s.email);
  const password = useLoginStore((s) => s.password);
  console.log(email, password);

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title="Security Verification"
          algin="center"
          onChange={() => {
            useLoginStore.persist.clearStorage();
          }}
        />
      }
    >
      <div className="p-content">
        <p className="text-xs font-medium mb-2">
          Verification code sent. Please check your inbox or spam folder.
        </p>
        <Verification />
      </div>
    </ViewLayout>
  );
};

export default LoginVerificationView;
