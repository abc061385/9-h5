import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import FundSuccessView from "@/views/fund/success/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "基金购买",
  };
}

export default function FundSuccess({ params }: RootProps) {
  useInitLocale(params);

  return <FundSuccessView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
