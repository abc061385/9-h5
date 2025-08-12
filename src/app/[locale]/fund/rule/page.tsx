import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import FundRuleView from "@/views/fund/rule/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "基金规则",
    locale,
  });
}

export default function FundRulePage({ params }: RootProps) {
  useInitLocale(params);

  return <FundRuleView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
