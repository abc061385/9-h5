import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import HelperAIView from "@/views/helper-ai/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "AI助手",
    locale,
  });
}

export default function HelperAI({ params }: RootProps) {
  useInitLocale(params);

  return <HelperAIView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
