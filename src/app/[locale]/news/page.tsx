import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import NewsView from "@/views/news/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "消息中心",
    locale,
  });
}

export default function News({ params }: RootProps) {
  useInitLocale(params);

  return <NewsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
