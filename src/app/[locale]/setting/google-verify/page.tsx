import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingGoogleVerifyView from "@/views/setting/google-verify/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "googleVerify.title",
    locale,
  });
}

export default function SettingGoogleVerifyPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingGoogleVerifyView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
