import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import DownloadView from "@/views/download/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "下载",
  };
}
export default function DownloadPage({ params }: RootProps) {
  useInitLocale(params);

  return <DownloadView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
