import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import WithdrawView from "@/views/wallet/withdraw";
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

export default function WithdrawPage({ params }: RootProps) {
  useInitLocale(params);
  return <WithdrawView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
