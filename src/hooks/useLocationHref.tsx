import { useLocale } from "next-intl";

export function useLocationHref() {
  const lang = useLocale();

  function goToActivity(id: string) {
    if (!id) return;
    const targetUrl = `/activity/${lang}?id=${id}`;
    window.location.href = targetUrl;
  }
  function goToLuckyActivity(id: string) {
    if (!id) return;
    const targetUrl = `/activity/${lang}/luckydraw/?id=${id}`;
    window.location.href = targetUrl;
  }

  return { goToActivity, goToLuckyActivity };
}
