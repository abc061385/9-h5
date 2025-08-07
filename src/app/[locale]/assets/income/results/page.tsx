import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import AssetsIncomeResultsView from "@/views/assets/income/results";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "投资收益",
  };
}

export default function AssetsIncomeResultsPage({ params }: RootProps) {
  useInitLocale(params);

  return <AssetsIncomeResultsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
