import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import VerificationView from "@/views/verification";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "发送验证码",
  };
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);
  return <VerificationView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
