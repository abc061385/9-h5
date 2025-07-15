import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import NewsDetailView from "@/views/news/detail/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "消息详情",
  };
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <NewsDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
