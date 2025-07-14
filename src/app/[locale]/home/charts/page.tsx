import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import ChartsView from "@/views/charts/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "币价走势",
  };
}
export default function ChartsPage({ params }: RootProps) {
  useInitLocale(params);

  return <ChartsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
