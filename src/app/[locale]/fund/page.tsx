import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import FundView from "@/views/fund/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "基金",
    locale,
  });
}

export default function Fund({ params }: RootProps) {
  useInitLocale(params);

  return <FundView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
