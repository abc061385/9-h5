import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import AboutUsView from "@/views/about-us/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "关于我们",
  };
}
export default function AboutUsPage({ params }: RootProps) {
  useInitLocale(params);

  return <AboutUsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
