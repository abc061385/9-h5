import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import FundRecordView from "@/views/fund/record/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "购买记录",
    locale,
  });
}

export default function FundRecord({ params }: RootProps) {
  useInitLocale(params);

  return <FundRecordView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
