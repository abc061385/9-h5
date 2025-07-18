import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import HelperAIView from "@/views/helper-ai/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI助手",
  };
}

export default function HelperAI({ params }: RootProps) {
  useInitLocale(params);

  return <HelperAIView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
