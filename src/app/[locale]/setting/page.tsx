import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import SettingView from "@/views/setting/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "安全设置",
  };
}
export default function SettingPage({ params }: RootProps) {
  useInitLocale(params);

  return <SettingView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
