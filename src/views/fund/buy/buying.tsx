import { Icon } from "@/components/icon";
import { useTrans } from "@/hooks/useTrans";
import { routerMap, useRouter } from "@/i18n/navigation";

const BuyingBox = () => {
  const t = useTrans();
  const { push } = useRouter();
  return (
    <div>
      <h2 className="my-4">{t("买入基金")}</h2>
      <input
        type="text"
        placeholder={t("输入总质押USDT额度")}
        className="input bg-white"
      />
      <div className="bg-bg-color2 rounded-md px-2.5 py-4 mt-4">
        <h3>{t("您需支付")}</h3>
        <div className="flex justify-between items-center h-12 bg-white rounded-md px-2 mt-4">
          <div>USDT</div>
          <span>70</span>
        </div>
        <div className="flex items-center justify-between mt-2 mb-4">
          <span>{t("余额")} 0.00USDT</span>
          <span className="text-primary cursor-pointer">{t("充值")}</span>
        </div>
        <div className="flex justify-between items-center h-12 bg-white rounded-md px-2 mt-4">
          <div>USDT</div>
          <span>70</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span>{t("余额")} 0.00USDT</span>
          <span className="text-primary cursor-pointer">{t("充值")}</span>
        </div>
      </div>
      <div className="flex items-center justify-between h-12 mt-2 rounded-md bg-bg-color2 px-3">
        <span>{t("买入周期")}</span>
        <span className="flex items-center gap-1">
          360{t("天")}
          <Icon name="arrow-line-down" />
        </span>
      </div>
      <div className="flex items-center text-xs mt-2">
        <label className="label">
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-primary"
          />

          {t("我已阅读")}
        </label>
        <span
          className="text-primary"
          onClick={() => push(routerMap.fundProtocol)}
        >
          {t("基金投资协议")}
        </span>
      </div>
      <button className="btn btn-primary w-full mt-4">{t("买入")}</button>
    </div>
  );
};
export default BuyingBox;
