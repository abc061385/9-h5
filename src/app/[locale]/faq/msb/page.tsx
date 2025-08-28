import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import FAQMSBView from "@/views/faq/msb";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "MSB License",
  };
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <FAQMSBView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
