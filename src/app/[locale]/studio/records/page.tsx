import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import StudioRecordsView from "@/views/studio/records/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "Submit Records",
    locale,
  });
}

export default function StudioRecords({ params }: RootProps) {
  useInitLocale(params);

  return <StudioRecordsView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
