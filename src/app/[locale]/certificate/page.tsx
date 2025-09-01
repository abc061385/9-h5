import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import { generateSEO } from "@/lib/seo";
import CertificateView from "@/views/certificate";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "Level Certificate",
    locale,
  });
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <CertificateView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
