import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import TeamsMembersView from "@/views/teams/members/index";
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

export default function TeamsMembers({ params }: RootProps) {
  useInitLocale(params);

  return <TeamsMembersView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
