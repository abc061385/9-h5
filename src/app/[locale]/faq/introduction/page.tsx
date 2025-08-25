import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import { generateSEO } from "@/lib/seo";
import FAQIntroductionView from "@/views/faq/introduction";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "9M Introduction",
    locale,
  });
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <FAQIntroductionView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
