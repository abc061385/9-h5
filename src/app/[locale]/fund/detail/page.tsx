import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import FundDetailView from "@/views/fund/detail/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "投资详情",
  };
}

export default function FundDetailPage({ params }: RootProps) {
  useInitLocale(params);

  return <FundDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
