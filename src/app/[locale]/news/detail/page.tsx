import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import NewsDetailView from "@/views/news/detail/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "详情",
    locale,
  });
}

export default function NewsDetail({ params }: RootProps) {
  useInitLocale(params);

  return <NewsDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
