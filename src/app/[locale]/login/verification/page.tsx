import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import LoginVerificationView from "@/views/login/verification";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "登录",
  };
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <LoginVerificationView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
