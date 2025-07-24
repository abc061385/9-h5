import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import { IconName } from "@/types/icons";

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
    <div className="mt-4">
      {list.map((item, index) => {
        return (
          <div key={index} className="bg-bg1 rounded-md px-2 py-2.5 mb-2">
            <h3 className="flex items-center gap-2.5 font-bold leading-[120%] mb-2">
              <Icon
                name={`rule-desc-icon${index + 1}` as IconName}
                className="w-5 h-5"
              />
              <span>{t(item.title)}</span>
            </h3>
            <p className="font-[510] text-text2 leading-[120%]">{t(item.desc)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RuleDescBox;
