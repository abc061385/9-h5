import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import FundRecordView from "@/views/record/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "购买记录",
  };
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <FundRecordView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
