import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import VIPLevelUpChallengeRecordsView from "@/views/vip-challenge/records/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "VIP Level Up Challenge",
    locale,
  });
}

export default function VIPLevelUpChallengeRecords({ params }: RootProps) {
  useInitLocale(params);

  return <VIPLevelUpChallengeRecordsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
