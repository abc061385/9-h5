import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import FAQDocView from "@/views/faq/doc";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "9M AI Documentation",
  };
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <FAQDocView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
