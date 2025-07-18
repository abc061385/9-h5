import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import VipView from "@/views/vip/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "个人中心",
  };
}

export default function Vip({ params }: RootProps) {
  useInitLocale(params);

  return <VipView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
