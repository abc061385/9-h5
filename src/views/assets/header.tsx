import BaseImage from "@/components/base-image";
import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";

type CardType = {
  icon: string;
  label: string;
  path?: string;
};

const HeaderBox = () => {
  const { push } = useRouter();
  const t = useTrans();
  const cardList: CardType[] = [
    { icon: "/images/assets/deposit.svg", label: "assets.deposit", path: routerMap.walletDeposit },
    { icon: "/images/assets/withdraw.svg", label: "assets.withdraw", path: routerMap.walletWithdraw },
    {
      icon: "/images/assets/flash.svg",
      label: "闪兑",
      path: routerMap.assetsExchange,
    },
    {
      icon: "/images/assets/investment.svg",
      label: "assets.investment",
      path: routerMap.income,
    },
    {
      icon: "/images/assets/plan.svg",
      label: "assets.upgrade",
      path: routerMap.upgrade,
    },
  ];
  return (
    <div>
      <BaseImage
        src="/images/assets/assets-banner.png"
        className="w-full h-[350px] absolute top-0 left-0"
      />
      <div className="relative z-1 font-bold">
        <h3 className="mb-2">{t("assets.balance")}</h3>
        <h4 className="text-[26px]">$30,200</h4>
        <div className="bg-[rgba(255,255,255,0.3)] rounded-md inline-flex items-center px-1 py-1.5 text-xs my-3">
          <span>{t("冻结金额")}：</span>
          <span>0.00 USDT</span>
          <Icon name={"prompt"} className="ml-1 w-3.5 h-3.5" />
        </div>
        <p className="mb-2 text-xs">{t("投资总额")} (USD)</p>
        <p>$1000</p>
        <div className="grid grid-cols-5 bg-[rgba(255,255,255,0.5)] rounded-t-2xl p-5 px-2 mt-4 gap-1">
          {cardList.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start"
              onClick={() => {
                if (!item.path) return;
                push(item.path);
              }}
            >
              <BaseImage src={item.icon} className="w-[42px] h-[42px]" />
              <span className="font-bold text-xs mt-2.5 text-center">
                {t(item.label)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderBox;
