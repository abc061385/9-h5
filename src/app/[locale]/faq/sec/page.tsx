import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import FAQSECView from "@/views/faq/sec";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "sec_license",
    locale,
  });
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <FAQSECView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
