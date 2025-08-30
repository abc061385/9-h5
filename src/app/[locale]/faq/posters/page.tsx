import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import FAQPostersView from "@/views/faq/posters";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "faq_posters",
    locale,
  });
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <FAQPostersView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
