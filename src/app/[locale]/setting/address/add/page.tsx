import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingAddressAddView from "@/views/setting/address/add/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "添加地址",
  };
}
export default function SettingAddressAddPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingAddressAddView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
