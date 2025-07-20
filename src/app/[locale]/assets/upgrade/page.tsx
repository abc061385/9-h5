import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import UpgradeView from "@/views/upgrade/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "VIP计划",
  };
}

export default function Upgrade({ params }: RootProps) {
  useInitLocale(params);

  return <UpgradeView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
