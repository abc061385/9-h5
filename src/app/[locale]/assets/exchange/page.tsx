import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import AssetsExchangeView from "@/views/assets/exchange/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "闪兑",
    locale,
  });
}

export default function AssetsExchangePage({ params }: RootProps) {
  useInitLocale(params);

  return <AssetsExchangeView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
