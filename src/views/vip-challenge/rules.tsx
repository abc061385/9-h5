import { ShowIf } from "@/components/show-if";

const ChallengeRewardRules = () => {
  const columns = [
    { title: "Current Level" },
    { title: "Target Level" },
    { title: "Profit sharing ratio" },
    { title: "Staking Requirements", desc: "(Orders over 180 days)" },
    { title: "Rewards", desc: "(USDT equivalent → USDM distribution)" },
  ];

  const data = [
    {
      currentLevel: "VIP1",
      targetLevel: "VIP4",
      challengeCycle: "20天",
      pledge: "≥ 100,000 USDT",
      award: "1,000 USDT 等值 USDM",
    },
    {
      currentLevel: "VIP2",
      targetLevel: "VIP5",
      challengeCycle: "25天",
      pledge: "≥ 300,000 USDT",
      award: "3,000 USDT 等值 USDM",
    },
    {
      currentLevel: "VIP3",
      targetLevel: "VIP6",
      challengeCycle: "30天",
      pledge: "≥ 1,000,000 USDT",
      award: "9,000 USDT 等值 USDM",
    },
    {
      currentLevel: "VIP4",
      targetLevel: "VIP7",
      challengeCycle: "35天",
      pledge: "≥ 3,000,000 USDT",
      award: "27,000 USDT 等值 USDM",
    },
    {
      currentLevel: "VIP5",
      targetLevel: "VIP8",
      challengeCycle: "50天",
      pledge: "≥ 10,000,000 USDT",
      award: "90,000 USDT 等值 USDM",
    },
    {
      currentLevel: "VIP6",
      targetLevel: "VIP9",
      challengeCycle: "60天",
      pledge: "≥ 20,000,000 USDT",
      award: "270,000 USDT 等值 USDM",
    },
    {
      currentLevel: "VIP7",
      targetLevel: "VIP9",
      challengeCycle: "60天",
      pledge: "≥ 30,000,000 USDT",
      award: "300,000 USDT 等值 USDM",
      orAward: "or Mercedes-Benz S-Class Maybach",
    },
    {
      currentLevel: "VIP8",
      targetLevel: "VIP9",
      challengeCycle: "90天",
      pledge: "≥ 50,000,000 USDT",
      award: "300,000 USDT 等值 USDM",
      orAward: "or Mercedes-Benz S-Class Maybach",
    },
  ];

  return (
    <div>
      <h3 className="font-medium mb-4">
        Challenge Reward Rules (distributed in USDM equivalent)
      </h3>
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
                <td className={tdClass}>{v.challengeCycle}</td>
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
      <p className="text-sm leading-5 mt-6">
        Each account that successfully completes the challenge can proceed to
        the next round (e.g., if you successfully complete V1-V4, you can
        register for V4-V7). If you fail, you can retry again. (Each account has
        three challenge opportunities.)
      </p>
    </div>
  );
};
export default ChallengeRewardRules;
