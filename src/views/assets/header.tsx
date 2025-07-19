import BaseImage from "@/components/base-image";
import { useTrans } from "@/hooks/useTrans";

const HeaderBox = () => {
  const t = useTrans();
  const cardList = [
    { icon: "/images/assets/deposit.svg", label: "充币" },
    { icon: "/images/assets/withdraw.svg", label: "提币" },
    { icon: "/images/assets/flash.svg", label: "闪兑" },
    { icon: "/images/assets/investment.svg", label: "投资收益" },
    { icon: "/images/assets/plan.svg", label: "VIP计划" },
  ];
  return (
    <div>
      <BaseImage
        src="/images/assets/assets-banner.png"
        className="w-full h-[350px] absolute top-0 left-0"
      />
      <div className="relative z-1 font-bold">
        <h3 className="mb-2">{t("余额")}</h3>
        <h4 className="text-[26px]">$30,200</h4>
        <div className="bg-[rgba(255,255,255,0.3)] rounded-md inline-flex px-1 py-1.5 text-xs my-3">
          <span>{t("冻结金额")}：</span>
          <span>0.00 USDT</span>
        </div>
        <p className="mb-2 text-xs">{t("投资总额")}USD</p>
        <p>$1000</p>
        <div className="grid grid-cols-5 bg-[rgba(255,255,255,0.5)] rounded-t-2xl p-5 mt-4">
          {cardList.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between"
            >
              <BaseImage src={item.icon} className="w-[42px] h-[42px]" />
              <span className="font-bold text-xs mt-2.5">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderBox;
