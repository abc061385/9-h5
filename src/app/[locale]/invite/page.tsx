import type { Metadata } from "next";
import getStaticParams from "@/lib/getStaticParams";
import useInitLocale from "@/hooks/useInitLocale";
import InviteView from "@/views/invite/index";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "邀请好友",
  };
}
export default function InvitePage({ params }: RootProps) {
  useInitLocale(params);

  return <InviteView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
