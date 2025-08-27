import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import AccountAddManageView from "@/views/user/accounts/add";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "user.title",
    locale,
  });
}

export default function AccountsAddManagePage({ params }: RootProps) {
  useInitLocale(params);

  return <AccountAddManageView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
