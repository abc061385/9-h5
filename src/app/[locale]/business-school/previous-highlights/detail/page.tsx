import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import PreviousHighlightsDetailView from "@/views/business-school/previous-highlights/detail";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "activityCenter",
    locale,
  });
}
export default function PreviousHighlightsDetailPage({ params }: RootProps) {
  useInitLocale(params);

  return <PreviousHighlightsDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
