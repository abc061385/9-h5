import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import LoginView from "@/views/login";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "login.loginTab",
    locale,
  });
}
export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <LoginView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
