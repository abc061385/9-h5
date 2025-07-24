"use client";
import { CurrencyView } from "@/components/currency-view";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import ViewLayout from "@/components/layout";
import { SelectChain } from "@/components/select/select-chain";
import { SelectToken } from "@/components/select/select-token";
import { useTrans } from "@/hooks/useTrans";
import { Link, routerMap } from "@/i18n/navigation";
import z from "@/lib/z";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";

const WithdrawView = () => {
  const t = useTrans();
  const chainEnum = z.object({
    protocolType: z.string(),
    minWithdrawal: z.number(),
  });
  const Schema = z
    .object({
      currencyCode: z.string().nonempty(),
      chainEnum: chainEnum,
      XRPTag: z.string(),
      withdrawAddress: z.string().nonempty({ message: "请输入地址" }),
      withdrawAmount: z.coerce.number(),
    })
    .check((ctx) => {
      console.log(ctx, "data");
      const data = ctx.value;
      if (data.withdrawAmount < (data.chainEnum.minWithdrawal as number)) {
        ctx.issues.push({
          code: "custom",
          message: t("withdraw.minAmountTip", {
            min: (data.chainEnum.minWithdrawal as number) + data.currencyCode,
          }),
          path: ["withdrawAmount"],
          input: ctx.value,
        });
      }

      if (data.currencyCode.toUpperCase() === "XRP" && !data.XRPTag) {
        ctx.issues.push({
          code: "custom",
          message: t("XRP Tag Withdraw"),
          path: ["XRPTag"],
          input: ctx.value,
        });
      }
    });
  const {
    control,
    setValue,
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { currencyCode: "USDT", chainEnum: {} },
    resolver: zodResolver(Schema),
  });

  const currencyCode = useWatch({ control, name: "currencyCode" });
  return (
    <ViewLayout
      header={<HeaderWithBack title={t("withdraw.title")} algin="center" />}
      heightFull
    >
      <div className="p-content h-full flex flex-col">
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t("withdraw.coinType")}
            </legend>
            <Controller
              name="currencyCode"
              control={control}
              render={({ field }) => (
                <SelectToken
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue("chainEnum", {
                      protocolType: "",
                      minWithdrawal: 0,
                    });
                  }}
                />
              )}
            ></Controller>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("withdraw.network")}</legend>
            <Controller
              name="chainEnum"
              control={control}
              render={({ field }) => (
                <SelectChain
                  {...field}
                  currencyCode={currencyCode}
                  value={field.value?.protocolType as string}
                />
              )}
            ></Controller>
            <TextError>{errors.chainEnum?.message}</TextError>
          </fieldset>
          {getValues("currencyCode").toUpperCase() === "XRP" ? (
            <fieldset className="fieldset">
              <legend className="fieldset-legend">XRP Tag</legend>
              <label className="input w-full">
                <input
                  type="text"
                  {...register("XRPTag")}
                  placeholder={t("输入 XRP Tag")}
                  className="grow"
                />
              </label>
              <TextError>{errors.XRPTag?.message}</TextError>
            </fieldset>
          ) : null}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("withdraw.address")}</legend>
            <label className="input w-full flex">
              <input
                type="text"
                {...register("withdrawAddress")}
                placeholder={t("withdraw.longPressToPaste")}
                className="w-9/10"
              />
              <Link href={routerMap.home}>
                <div className="grow text-center">
                  <Icon name="address" />
                </div>
              </Link>
            </label>
            <TextError>{errors.withdrawAddress?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("withdraw.amount")}</legend>
            <label className="input w-full">
              <input
                type="number"
                placeholder={t("withdraw.amount")}
                className="grow"
                {...register("withdrawAmount")}
              />
              <span>{getValues("currencyCode")}</span>
            </label>
            <TextError>{errors.withdrawAmount?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset h-10 rounded-md bg-bg1 flex items-center px-3 mt-4">
            <span className="grow text-sm font-bold">
              {t("withdraw.availableBalance")}
            </span>
            <CurrencyView value="0" currency={getValues("currencyCode")} />
            <button type="button" className="btn btn-link text-sm font-bold">
              {t("withdraw.useAll")}
            </button>
          </fieldset>
          <fieldset className="fieldset h-10 rounded-md bg-bg1 flex items-center px-3 mt-4">
            <span className="grow text-sm font-bold">{t("withdraw.fee")}</span>
            <CurrencyView value="0" currency={getValues("currencyCode")} />
          </fieldset>
        </form>
        <button
          className="btn btn-primary w-full"
          onClick={handleSubmit((data) => {
            console.log("123", data);
          })}
        >
          {t("withdraw.confirm")}
        </button>
      </div>
    </ViewLayout>
  );
};

export default WithdrawView;
