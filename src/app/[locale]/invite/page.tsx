import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import InviteView from "@/views/invite/index";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "邀请好友",
    locale,
  });
}

export default function InvitePage({ params }: RootProps) {
  useInitLocale(params);

  return <InviteView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
