import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import { generateSEO } from "@/lib/seo";
import ForgotPasswordView from "@/views/forgot-password/index";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "forgotPassword.title",
    locale,
  });
}

export default function ForgotPasswordPage({ params }: RootProps) {
  useInitLocale(params);

  return <ForgotPasswordView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
