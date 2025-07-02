import { routing } from "@/i18n/routing";

// common function
// set generateStaticParams
export default function getStaticParams() {
  // set locale object List

  return routing.locales.map((locale) => ({ locale }));
}
