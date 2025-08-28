import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import FAQVideosView from "@/views/faq/videos";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "Promotional Video",
  };
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <FAQVideosView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
