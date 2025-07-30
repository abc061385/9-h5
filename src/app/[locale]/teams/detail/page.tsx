import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import TeamsDetailView from "@/views/teams/detail/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "团队投资数据",
  };
}

export default function TeamsDetail({ params }: RootProps) {
  useInitLocale(params);

  return <TeamsDetailView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
