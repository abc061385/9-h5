import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import ActivityView from "@/views/activity/index";
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
export default function ActivityPage({ params }: RootProps) {
  useInitLocale(params);

  return <ActivityView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
