import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import MeetingMinutesView from "@/views/activity-center/meeting-minutes/index";
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
export default function MeetingMinutesPage({ params }: RootProps) {
  useInitLocale(params);

  return <MeetingMinutesView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
