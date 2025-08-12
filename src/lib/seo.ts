import { getTranslations } from "next-intl/server";

export interface SEOProps {
  title: string;
  keywords?: string;
  description?: string;
}

export async function generateSEO({
  title = "9M Investment Platform",
  keywords = "9M | AI | Fund",
  description = "Welcome to 9M Investment Platform, Powerful AI Smart Chat System, No need to stare at charts, AI penetrates K-line fog, using probability models to secure optimal solutions for each trade., Start Your Investment Journey Now.",
  locale,
}: SEOProps & { locale: string }) {
  const t = await getTranslations({ locale });

  return {
    title: title ? t(title) : "9M Investment Platform",
    keywords,
    description,
  };
}
