import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import AssetsView from "@/views/assets/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "资产",
  };
}

export default function Assets({ params }: RootProps) {
  useInitLocale(params);

  return <AssetsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
