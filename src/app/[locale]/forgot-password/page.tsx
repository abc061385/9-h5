import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import ForgotPasswordView from "@/views/forgot-password/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "重置登录密码",
  };
}

export default function ForgotPasswordPage({ params }: RootProps) {
  useInitLocale(params);

  return <ForgotPasswordView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
