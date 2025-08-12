import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import FundProtocolView from "@/views/fund/protocol/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "基金投资协议",
    locale,
  });
}

export default function Fund({ params }: RootProps) {
  useInitLocale(params);

  return <FundProtocolView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
