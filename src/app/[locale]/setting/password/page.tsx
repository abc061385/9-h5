import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingPasswordView from "@/views/setting/password/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "修改密码",
  };
}
export default function SettingPasswordPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingPasswordView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
