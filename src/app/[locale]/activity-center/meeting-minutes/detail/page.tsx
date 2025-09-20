import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import MeetingMinutesDetailView from "@/views/activity-center/meeting-minutes/detail/index";
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
export default function MeetingMinutesDetailPage({ params }: RootProps) {
  useInitLocale(params);

  return <MeetingMinutesDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
