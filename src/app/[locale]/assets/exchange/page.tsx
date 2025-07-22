import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import AssetsExchangeView from "@/views/assets/exchange/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "闪兑",
  };
}

export default function AssetsExchangePage({ params }: RootProps) {
  useInitLocale(params);

  return <AssetsExchangeView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
