import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import ProtocolView from "@/views/protocol/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "详情",
    locale,
  });
}

export default function ProtocolDetail({ params }: RootProps) {
  useInitLocale(params);

  return <ProtocolView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
