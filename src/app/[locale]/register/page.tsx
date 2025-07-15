import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import RegisterView from "@/views/register";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "注册",
  };
}

export default function Demo({ params }: RootProps) {
  useInitLocale(params);

  return <RegisterView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
