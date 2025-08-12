import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import HomeView from "@/views/home/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "",
    locale,
  });
}
export default function HomePage({ params }: RootProps) {
  useInitLocale(params);

  return <HomeView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
