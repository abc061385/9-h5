import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import AboutUsView from "@/views/about-us/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "关于我们",
    locale,
  });
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <AboutUsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
