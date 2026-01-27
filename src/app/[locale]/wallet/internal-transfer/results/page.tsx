import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import InternalTransferResultsView from "@/views/wallet/internal-transfer/results";
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
  return <InternalTransferResultsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
