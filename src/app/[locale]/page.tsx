import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";

import { getTranslations } from "next-intl/server";
import useInitLocale from "@/hooks/useInitLocale";
import IndexView from "@/views/index";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "" });

  return {
    title: "首页title",
  };
}
export default function HomePage({ params }: RootProps) {
  useInitLocale(params);

  return <IndexView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
