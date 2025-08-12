import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import DownloadView from "@/views/download/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "googleVerify.step1",
    locale,
  });
}

export default function DownloadPage({ params }: RootProps) {
  useInitLocale(params);

  return <DownloadView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
