import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import UserView from "@/views/user/index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "个人中心",
  };
}

export default function User({ params }: RootProps) {
  useInitLocale(params);

  return <UserView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
