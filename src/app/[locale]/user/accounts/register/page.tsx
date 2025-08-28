import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";
import AccountRegisterManageView from "@/views/user/accounts/register";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "user.title",
    locale,
  });
}

export default function AccountsRegisterManagePage({ params }: RootProps) {
  useInitLocale(params);

  return <AccountRegisterManageView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
