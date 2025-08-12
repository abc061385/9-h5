import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import UpgradeView from "@/views/upgrade/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "VIP计划",
    locale,
  });
}

export default function Upgrade({ params }: RootProps) {
  useInitLocale(params);

  return <UpgradeView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
