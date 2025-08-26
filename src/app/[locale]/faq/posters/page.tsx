import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import { generateSEO } from "@/lib/seo";
import FAQPostersView from "@/views/faq/posters";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "Promotional Posters",
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
