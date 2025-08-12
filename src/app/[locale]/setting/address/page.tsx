import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingAddressView from "@/views/setting/address/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "address.title",
    locale,
  });
}

export default function SettingAddressPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingAddressView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
