import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import MeetupRecordsView from "@/views/meetup/records/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "submitRecords",
    locale,
  });
}

export default function MeetupRecords({ params }: RootProps) {
  useInitLocale(params);

  return <MeetupRecordsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
