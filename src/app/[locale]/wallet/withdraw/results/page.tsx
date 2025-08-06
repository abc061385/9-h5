import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import WithdrawResultsView from "@/views/wallet/withdraw/results";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "withdraw" });
  return {
    title: t("title"),
  };
}

export default function WithdrawResultsPage({ params }: RootProps) {
  useInitLocale(params);
  return <WithdrawResultsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
