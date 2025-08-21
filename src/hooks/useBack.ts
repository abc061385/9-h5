import { useRouter } from "@/i18n/navigation";
import Bridge from "@/lib/dsBridge";
import Platform from "@/lib/platfrom";

export const useBack = () => {
  const { back } = useRouter();
  if (Platform.isInApp()) {
    return Bridge.goBack;
  }
  return back;
};
