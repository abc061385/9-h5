import { Drawer } from "@/components/drawer";
import { useTrans } from "@/hooks/useTrans";
import { Link, routerMap } from "@/i18n/navigation";
import { FC } from "react";

type IProps = {
  open: boolean;
  onChange: () => void;
};
export const WithDrawDrawer: FC<IProps> = ({ open, onChange }) => {
  const t = useTrans();
  const list = [
    { lable: t("internal_transfer"), link: routerMap.internalTransfer },
    { lable: t("onchain_withdrawal"), link: routerMap.walletWithdraw },
  ];
  return (
    <Drawer
      className="h-auto"
      title={t("assets.withdraw")}
      open={open}
      onChange={() => {
        onChange();
      }}
    >
      <div className="max-h-[400px] overflow-auto no-scrollbar">
        {list?.map((v, i) => {
          return (
            <div
              key={i}
              className="flex items-center justify-between py-3.5 border-b border-border2"
              onClick={() => {}}
            >
              <Link href={v.link} className="w-full h-full">
                <span className="font-bold">{v.lable}</span>
              </Link>
            </div>
          );
        })}
      </div>
      <button className="btn btn-outline w-full mt-6" onClick={onChange}>
        {t("common.cancel")}
      </button>
    </Drawer>
  );
};
