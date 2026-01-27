import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import InternalTransferConfirmView from "@/views/wallet/internal-transfer/confirm";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "confirmInfo",
    locale,
  });
}

export default function WithdrawConfirmPage({ params }: RootProps) {
  useInitLocale(params);
  return <InternalTransferConfirmView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
