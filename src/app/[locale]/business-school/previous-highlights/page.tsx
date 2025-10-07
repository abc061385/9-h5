import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";

import useInitLocale from "@/hooks/useInitLocale";
import PreviousHighlightsView from "@/views/business-school/previous-highlights/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "",
    locale,
  });
}

export default function PreviousHighlightsPage({ params }: RootProps) {
  useInitLocale(params);

  return <PreviousHighlightsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
