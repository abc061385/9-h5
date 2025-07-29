import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import FundBuyView from "@/views/fund/buy/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "基金买入",
  };
}

export default function FundBuyPage({ params }: RootProps) {
  useInitLocale(params);

  return <FundBuyView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
