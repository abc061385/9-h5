import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import WalletDetailView from "@/views/wallet/detail/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "wallet detail",
  };
}

export default function WalletDetail({ params }: RootProps) {
  useInitLocale(params);

  return <WalletDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
