import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import FundDetailView from "@/views/fund/detail/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "详情",
    locale,
  });
}
export default function FundDetailPage({ params }: RootProps) {
  useInitLocale(params);

  return <FundDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
