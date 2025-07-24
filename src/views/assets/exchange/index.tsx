"use client";

import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { useRootReg } from "@/lib/z";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";

type FormData = {
  code: string;
};

const AssetsExchangeView = () => {
  const t = useTrans();
  const reg = useRootReg();

  const Schema = z.object({
    code: reg.googleVerifyCode,
  });

  const {
    register,
    // getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <ViewLayout
      header={<HeaderWithBack title={t("verify.title")} algin="center" />}
    >
      <div className="p-content">
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("支付代币")}</legend>
            <label className="input w-full">
              <button className="text-xs flex items-center gap-1">
                {t("withdraw.selectCoin")} <Icon name="arrow-line-down" />
              </button>
              <input
                type="code"
                {...register("code")}
                className="grow text-xs text-right"
              />
            </label>
            <TextError>{errors?.code?.message}</TextError>
          </fieldset>

          <div className="flex items-center justify-between text-xs font-medium">
            <span>{t("余额")}：123 USDT</span>
            <button className="text-primary">{t("walletDetail.all")}</button>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("接收代币")}</legend>
            <label className="input w-full">
              <button className="text-xs flex items-center gap-1">
                {t("withdraw.selectCoin")} <Icon name="arrow-line-down" />
              </button>
              <input
                type="code"
                {...register("code")}
                className="grow text-xs text-right"
              />
            </label>
            <TextError>{errors?.code?.message}</TextError>
          </fieldset>

          <div className="text-xs font-bold">{t("余额")}：123 USDT</div>

          <div className="bg-bg1 h-10 px-4 rounded-md flex items-center justify-between text-xs font-bold my-4">
            <span>{t("兑换价格")}</span>
            <span>1 USDM ≈ 1 USDT</span>
          </div>
        </form>
        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          onClick={handleSubmit((e) => {
            console.log(e);
          })}
        >
          {t("verify.confirm")}
        </button>
      </div>
    </ViewLayout>
  );
};
export default AssetsExchangeView;
