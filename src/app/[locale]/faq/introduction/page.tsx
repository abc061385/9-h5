import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import FAQIntroductionView from "@/views/faq/introduction";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "9M Introduction",
  };
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <FAQIntroductionView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
