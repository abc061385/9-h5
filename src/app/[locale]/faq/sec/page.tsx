import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import FAQView from "@/views/faq";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "SEC License",
  };
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <FAQView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
