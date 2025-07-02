import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";

import { getTranslations } from "next-intl/server";
import useInitLocale from "@/hooks/useInitLocale";
import HomeView from "@/views/home";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
  };
}
export default function HomePage({ params }: RootProps) {
  useInitLocale(params);

  return <HomeView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
