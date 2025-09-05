import { ShowIf } from "@/components/show-if";

const ChallengeRewardRules = () => {
  const columns = [
    { title: "Current Level" },
    { title: "Target Level" },
    { title: "Profit sharing ratio" },
    { title: "Staking Requirements", desc: "(Orders over 180 days)" },
    { title: "Rewards", desc: "(USDT equivalent → USDM distribution)" },
  ];

  return (
    <div>
      <h3 className="font-medium mb-4">
        Challenge Reward Rules (distributed in USDM equivalent)
      </h3>
      <div>
        <div className="flex justify-between">
          {columns.map((v, i) => {
            return (
              <div key={i} className="text-center border-r border-border2">
                <h4 className="!text-xs !text-text1 font-medium leading-3.5 break-words">
                  {v.title}
                </h4>
                <ShowIf condition={Boolean(v.desc)}>
                  <p className="text-[10px] text-text4 mt-0.5">{v.desc}</p>
                </ShowIf>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ChallengeRewardRules;
