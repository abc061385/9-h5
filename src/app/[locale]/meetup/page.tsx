import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";

// import { getTranslations } from "next-intl/server";
import useInitLocale from "@/hooks/useInitLocale";
import MeetupView from "@/views/meetup/index";
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

export default function MeetupPage({ params }: RootProps) {
  useInitLocale(params);

  return <MeetupView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
