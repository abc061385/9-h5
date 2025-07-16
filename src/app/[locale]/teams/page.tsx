import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import TeamsView from "@/views/teams/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "我的团队",
  };
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <TeamsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
