import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingBindEmailView from "@/views/setting/bind-email/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "绑定邮箱",
  };
}
export default function SettingBindEmailPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingBindEmailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
