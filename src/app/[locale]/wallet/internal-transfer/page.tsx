import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import InternalTransferView from "@/views/wallet/internal-transfer";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "withdraw.title",
    locale,
  });
}
export default function WithdrawPage({ params }: RootProps) {
  useInitLocale(params);
  return <InternalTransferView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
