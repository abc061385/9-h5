import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import ActivityCenterView from "@/views/activity-center/index";
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
export default function ActivityCenterPage({ params }: RootProps) {
  useInitLocale(params);

  return <ActivityCenterView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
