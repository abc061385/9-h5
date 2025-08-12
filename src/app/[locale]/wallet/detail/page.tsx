import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import WalletDetailView from "@/views/wallet/detail/index";
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

  return <WalletDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
