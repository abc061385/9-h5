import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingGoogleVerifyView from "@/views/setting/google-verify/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "安全验证",
  };
}
export default function SettingGoogleVerifyPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingGoogleVerifyView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
