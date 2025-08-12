import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import VerificationView from "@/views/verification";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export async function generateMetadata({
  params,
}: RootProps): Promise<Metadata> {
  const { locale } = await params;
  return generateSEO({
    title: "获取验证码",
    locale,
  });
}

export default function VerificationPage({ params }: RootProps) {
  useInitLocale(params);
  return <VerificationView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
