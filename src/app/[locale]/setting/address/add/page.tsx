import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingAddressAddView from "@/views/setting/address/add/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "addressAdd.title",
    locale,
  });
}

export default function SettingAddressAddPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingAddressAddView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
