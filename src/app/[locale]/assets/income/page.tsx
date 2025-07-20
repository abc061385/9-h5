import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import IncomeView from "@/views/income/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "投资收益",
  };
}

export default function Assets({ params }: RootProps) {
  useInitLocale(params);

  return <IncomeView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
