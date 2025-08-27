import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import FAQPostersView from "@/views/faq/posters";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return { title: "Promotional Posters" };
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <FAQPostersView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
