import { useTrans } from "@/hooks/useTrans";

const RuleDescBox = () => {
  const t = useTrans();
  const list = [
    { title: "选择基金周期和投资金额", desc: "选择基金周期和投资金额p" },
    { title: "每日收益", desc: "每日收益p" },
    { title: "复投选择", desc: "复投选择p" },
    { title: "到期退还本金", desc: "到期退还本金p" },
    { title: "再次选择", desc: "再次选择p" },
    { title: "了解风险和回报", desc: "了解风险和回报p" },
  ];
  return (
    <div className="mt-8">
      {list.map((item, index) => {
        return (
          <div key={index} className="mb-8">
            <h3 className="font-medium mb-2 leading-6">{t(item.title)}</h3>
            <p className="text-text4 text-sm leading-4">{t(item.desc)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RuleDescBox;
