import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import FundBuyView from "@/views/fund/buy/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "买入",
    locale,
  });
}
export default function FundBuyPage({ params }: RootProps) {
  useInitLocale(params);

  return <FundBuyView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
