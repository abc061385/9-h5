import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import { useRouter } from "@/i18n/navigation";

const FundHeaderBox = () => {
  const { push } = useRouter();
  const t = useTrans();
  return (
    <div className="flex items-center justify-between px-4 py-2 fixed top-0 left-0 bg-white w-full z-10">
      <h1 className="text-lg font-bold">{t("基金")}</h1>
      <Icon name="order" size={24} onClick={() => push('/fund/record/')} />
    </div>
  );
};
export default FundHeaderBox;
