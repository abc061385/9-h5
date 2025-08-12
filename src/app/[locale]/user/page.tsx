import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import UserView from "@/views/user/index";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "user.title",
    locale,
  });
}

export default function User({ params }: RootProps) {
  useInitLocale(params);

  return <UserView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
