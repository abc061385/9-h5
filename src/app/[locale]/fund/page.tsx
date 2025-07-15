import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import FundView from "@/views/fund/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "基金",
  };
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <FundView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
