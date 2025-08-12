import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import TeamsDetailView from "@/views/teams/detail/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "团队投资数据",
    locale,
  });
}

export default function TeamsDetail({ params }: RootProps) {
  useInitLocale(params);

  return <TeamsDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
