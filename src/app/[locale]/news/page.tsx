import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import NewsView from "@/views/news/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "公告",
  };
}

export default function News({ params }: RootProps) {
  useInitLocale(params);

  return <NewsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
