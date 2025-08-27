import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import AccountManageView from "@/views/user/accounts";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "user.title",
    locale,
  });
}

export default function AccountsManagePage({ params }: RootProps) {
  useInitLocale(params);

  return <AccountManageView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
