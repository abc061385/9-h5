import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import DemoView from "@/views/demo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "我是DEMO",
    description: "我是DEMO的描述",
    keywords: "D, A, B",
  };
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <DemoView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
