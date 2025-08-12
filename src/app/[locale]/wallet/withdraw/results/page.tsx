import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import WithdrawResultsView from "@/views/wallet/withdraw/results";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "results",
    locale,
  });
}

export default function WithdrawResultsPage({ params }: RootProps) {
  useInitLocale(params);
  return <WithdrawResultsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
