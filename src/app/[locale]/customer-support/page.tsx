import useInitLocale from "@/hooks/useInitLocale";
import getStaticParams from "@/lib/getStaticParams";
import CustomerSupportView from "@/views/customer-support";
import { Metadata } from "next";

export async function generateMetadata({}: RootProps): Promise<Metadata> {
  return {
    title: "Online Customer Support",
  };
}

export default function CustomerSupportPage({ params }: RootProps) {
  useInitLocale(params);

  return <CustomerSupportView />;
}

export function generateStaticParams() {
  return getStaticParams();
}
