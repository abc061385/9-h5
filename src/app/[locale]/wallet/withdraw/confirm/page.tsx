import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import WithdrawConfirmView from "@/views/wallet/withdraw/confirm";
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

export default function WithdrawConfirmPage({ params }: RootProps) {
  useInitLocale(params);
  return <WithdrawConfirmView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
