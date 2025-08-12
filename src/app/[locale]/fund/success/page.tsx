import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import FundSuccessView from "@/views/fund/success/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "results",
    locale,
  });
}

export default function FundSuccess({ params }: RootProps) {
  useInitLocale(params);

  return <FundSuccessView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
