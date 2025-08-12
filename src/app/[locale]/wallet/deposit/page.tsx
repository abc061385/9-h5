import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import DepositView from "@/views/wallet/deposit";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "deposit.title",
    locale,
  });
}

export default function DepositPage({ params }: RootProps) {
  useInitLocale(params);
  return <DepositView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
