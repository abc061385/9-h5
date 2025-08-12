import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import WalletTransDetailView from "@/views/wallet/transaction-detail/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "详情",
    locale,
  });
}

export default function WalletDetail({ params }: RootProps) {
  useInitLocale(params);

  return <WalletTransDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
