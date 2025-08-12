import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingBindEmailView from "@/views/setting/bind-email/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "绑定邮箱",
    locale,
  });
}

export default function SettingBindEmailPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingBindEmailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
