import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import RegisterView from "@/views/register";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "login.registerTab",
    locale,
  });
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <RegisterView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
