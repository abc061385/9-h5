import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingView from "@/views/setting/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "security.title",
    locale,
  });
}
export default function SettingPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
