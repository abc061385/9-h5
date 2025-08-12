import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import AssetsIncomeResultsView from "@/views/assets/income/results";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "结果",
    locale,
  });
}

export default function AssetsIncomeResultsPage({ params }: RootProps) {
  useInitLocale(params);

  return <AssetsIncomeResultsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
