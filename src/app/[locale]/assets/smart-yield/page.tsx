import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import SmartTieldView from "@/views/assets/smart-yield/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "myAssets",
    locale,
  });
}

export default function SmartTieldPage({ params }: RootProps) {
  useInitLocale(params);

  return <SmartTieldView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
