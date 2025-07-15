"use client";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { Verification } from "@/components/verification";
import { useState } from "react";

const LoginVerificationView = () => {
  return (
    <ViewLayout
      header={<HeaderWithBack title="Security Verification" algin="center" />}
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
