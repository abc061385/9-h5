import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import WalletTransDetailView from "@/views/wallet/transaction-detail/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "详情",
  };
}

export default function WalletDetail({ params }: RootProps) {
  useInitLocale(params);

  return <WalletTransDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
