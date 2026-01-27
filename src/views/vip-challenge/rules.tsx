import { ShowIf } from "@/components/show-if";
import { useTrans } from "@/hooks/useTrans";
import { USD1 } from "@/lib/const";

const ChallengeRewardRules = () => {
  const t = useTrans();
  const columns = [
    { title: t("currentVIPLevel") },
    { title: t("targetLevel") },
    { title: t("challengeCycle") },
    { title: t("teamStakingRequirement"), desc: `(${t("order180Days")})` },
    {
      title: t("reward"),
      desc: `(USDT ${t("equivalentValue")} → ${USD1} ${t("distribution")})`,
    },
  ];

  const data = [
    {
      currentLevel: "VIP1",
      targetLevel: "VIP4",
      challengeCycle: "20",
      pledge: "≥ 100,000 USDT",
      award: `1,000 USDT ${t("equivalentValue")} ${USD1}`,
    },
    {
      currentLevel: "VIP2",
      targetLevel: "VIP5",
      challengeCycle: "25",
      pledge: "≥ 300,000 USDT",
      award: `3,000 USDT ${t("equivalentValue")} ${USD1}`,
    },
    {
      currentLevel: "VIP3",
      targetLevel: "VIP6",
      challengeCycle: "30",
      pledge: "≥ 1,000,000 USDT",
      award: `9,000 USDT ${t("equivalentValue")} ${USD1}`,
    },
    {
      currentLevel: "VIP4",
      targetLevel: "VIP7",
      challengeCycle: "35",
      pledge: "≥ 3,000,000 USDT",
      award: `27,000 USDT ${t("equivalentValue")} ${USD1}`,
    },
    {
      currentLevel: "VIP5",
      targetLevel: "VIP8",
      challengeCycle: "50",
      pledge: "≥ 10,000,000 USDT",
      award: `90,000 USDT ${t("equivalentValue")} ${USD1}`,
    },
    {
      currentLevel: "VIP6",
      targetLevel: "VIP9",
      challengeCycle: "60",
      pledge: "≥ 20,000,000 USDT",
      award: `270,000 USDT ${t("equivalentValue")} ${USD1}`,
    },
    {
      currentLevel: "VIP7",
      targetLevel: "VIP9⭐️",
      challengeCycle: "60",
      pledge: "≥ 30,000,000 USDT",
      award: `300,000 USDT ${t("equivalentValue")} ${USD1}`,
      orAward: t("mercedesMaybach"),
    },
    {
      currentLevel: "VIP8",
      targetLevel: "VIP9⭐️⭐️",
      challengeCycle: "90",
      pledge: "≥ 50,000,000 USDT",
      award: `300,000 USDT ${t("equivalentValue")} ${USD1}`,
      orAward: t("mercedesMaybach"),
    },
  ];

  return (
    <div>
      <h3 className="font-medium mb-4">{t("rewardRules")}</h3>
      <table>
        <thead>
          <tr>
            {columns.map((v, i) => {
              return (
                <th
                  key={i}
                  className="text-center border border-border2 py-3 px-1"
                >
                  <h4 className="!text-xs !text-text1 font-medium leading-3.5 break-words">
                    {v.title}
                  </h4>
                  <ShowIf condition={Boolean(v.desc)}>
                    <p className="text-[10px] text-text4 mt-0.5">{v.desc}</p>
                  </ShowIf>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => {
            const tdClass = "border border-border2 py-2 px-1";
            return (
              <tr key={i} className="text-xs text-center">
                <td className={tdClass}>{v.currentLevel}</td>
                <td className={tdClass}>{v.targetLevel}</td>
                <td className={tdClass}>
                  {v.challengeCycle}
                  {t("天")}
                </td>
                <td className={tdClass}>{v.pledge}</td>
                <td className={tdClass}>
                  {v.award}
                  <ShowIf condition={Boolean(v.orAward)}>
                    <p className="text-primary text-[10px] mt-0.5">
                      {v.orAward}
                    </p>
                  </ShowIf>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-sm leading-5 mt-6">{t("challengeContinuation")}</p>
    </div>
  );
};
export default ChallengeRewardRules;
