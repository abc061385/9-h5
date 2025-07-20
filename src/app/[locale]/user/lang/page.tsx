import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import LangView from "@/views/user/lang/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "language",
  };
}

export default function User({ params }: RootProps) {
  useInitLocale(params);

  return <LangView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
