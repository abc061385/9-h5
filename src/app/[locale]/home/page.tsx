import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import HomeView from "@/views/home/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "首页title",
  };
}
export default function HomePage({ params }: RootProps) {
  useInitLocale(params);

  return <HomeView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
