import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import DepositView from "@/views/wallet/deposit";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "deposit" });
  return {
    title: t("title"),
  };
}

export default function DepositPage({ params }: RootProps) {
  useInitLocale(params);
  return <DepositView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
