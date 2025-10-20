import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import VIPLevelUpChallengeView from "@/views/vip-challenge/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "vipChallengeTitle",
    locale,
  });
}

export default function VIPLevelUpChallenge({ params }: RootProps) {
  useInitLocale(params);

  return <VIPLevelUpChallengeView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
