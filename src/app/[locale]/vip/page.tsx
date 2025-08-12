import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import VipView from "@/views/vip/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "VIP权益",
    locale,
  });
}

export default function Vip({ params }: RootProps) {
  useInitLocale(params);

  return <VipView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
