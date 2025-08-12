import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import AssetsView from "@/views/assets/index";
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

export default function Assets({ params }: RootProps) {
  useInitLocale(params);

  return <AssetsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
