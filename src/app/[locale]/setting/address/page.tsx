import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingAddressView from "@/views/setting/address/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "地址簿",
  };
}
export default function SettingAddressPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingAddressView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
