import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import IncomeView from "@/views/assets/income/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "投资收益",
    locale,
  });
}

export default function Assets({ params }: RootProps) {
  useInitLocale(params);

  return <IncomeView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
