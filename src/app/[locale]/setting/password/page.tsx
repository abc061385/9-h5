import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingPasswordView from "@/views/setting/password/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "editPassword.title",
    locale,
  });
}

export default function SettingPasswordPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingPasswordView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
