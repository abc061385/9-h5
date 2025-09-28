import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";

// import { getTranslations } from "next-intl/server";
import useInitLocale from "@/hooks/useInitLocale";
import BusinessSchoolView from "@/views/business-school/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "",
    locale,
  });
}

export default function BusinessSchoolPage({ params }: RootProps) {
  useInitLocale(params);

  return <BusinessSchoolView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
