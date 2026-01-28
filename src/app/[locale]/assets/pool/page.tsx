import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import PoolView from "@/views/assets/pool/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "earnings_lock_pool",
    locale,
  });
}

export default function SmartTieldPage({ params }: RootProps) {
  useInitLocale(params);

  return <PoolView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
