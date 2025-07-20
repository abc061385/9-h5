import { useTrans } from "@/hooks/useTrans";

const AwardDetail = () => {
  const t = useTrans();
  return (
    <div className="mt-4">
      <h2 className="font-bold">{t("奖励明细")}</h2>
    </div>
  );
};
export default AwardDetail;
