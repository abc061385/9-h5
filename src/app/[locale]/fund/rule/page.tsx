import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import FundRuleView from "@/views/fund/rule/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "基金规则",
  };
}

export default function Fund({ params }: RootProps) {
  useInitLocale(params);

  return <FundRuleView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
