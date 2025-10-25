import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import TeamsInformationView from "@/views/teams/information/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "我的团队",
    locale,
  });
}

export default function TeamsInformation({ params }: RootProps) {
  useInitLocale(params);

  return <TeamsInformationView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
