import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import AssetsWalletDetailView from "@/views/assets/wallet-detail/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "wallet detail",
  };
}

export default function Assets({ params }: RootProps) {
  useInitLocale(params);

  return <AssetsWalletDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
