import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import RegisterVerificationView from "@/views/register/verification";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "注册",
  };
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <RegisterVerificationView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
