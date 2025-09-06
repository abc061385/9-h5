import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import StudioView from "@/views/studio/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "",
    locale,
  });
}

export default function Studio({ params }: RootProps) {
  useInitLocale(params);

  return <StudioView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
