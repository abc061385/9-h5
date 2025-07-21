import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import FundProtocolView from "@/views/fund/protocol/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "基金投资协议",
  };
}

export default function Fund({ params }: RootProps) {
  useInitLocale(params);

  return <FundProtocolView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
