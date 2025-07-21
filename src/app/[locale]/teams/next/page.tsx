import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import TeamsNextView from "@/views/teams/next/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "我的下级团队",
  };
}

export default function TeamsNext({ params }: RootProps) {
  useInitLocale(params);

  return <TeamsNextView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
