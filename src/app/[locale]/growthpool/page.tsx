import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import GrowthPoolView from "@/views/growthpool";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "9MEcosystemGrowthPool",
    locale,
  });
}

export default function Fund({ params }: RootProps) {
  useInitLocale(params);

  return <GrowthPoolView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
