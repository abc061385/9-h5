import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import LoginView from "@/views/login";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "登录",
  };
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <LoginView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
