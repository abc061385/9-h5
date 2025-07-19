"use client";
import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { SelectChain } from "@/components/select/select-chain";
import { SelectToken } from "@/components/select/select-token";
import { useTrans } from "@/hooks/useTrans";
import z from "@/lib/z";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

const DepositView = () => {
  const t = useTrans();
  const Schema = z.object({
    currencyCode: z.string().nonempty(),
    chainEnum: z.string().nonempty(),
  });
  const { control, setValue } = useForm({
    defaultValues: { currencyCode: "USDT" },
    resolver: zodResolver(Schema),
  });

  const currencyCode = useWatch({ control, name: "currencyCode" });
  const chainEnum = useWatch({ control, name: "chainEnum" });
  useEffect(() => {
    if (!chainEnum) {
      return;
    }
    api.deposit.createAddrTwoUsingPost({ chainEnum }).then((res) => {
      console.log(res);
    });
  }, [chainEnum]);
  return (
    <ViewLayout
      header={<HeaderWithBack title={t("deposit.title")} algin="center" />}
    >
      <div className="p-content">
        <form>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">{t("deposit.coinType")}</legend>
            <Controller
              name="currencyCode"
              control={control}
              render={({ field }) => (
                <SelectToken
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue("chainEnum", "");
                  }}
                />
              )}
            ></Controller>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t("deposit.chainType")}
            </legend>
            <Controller
              name="chainEnum"
              control={control}
              render={({ field }) => (
                <SelectChain currencyCode={currencyCode} {...field} />
              )}
            ></Controller>
          </fieldset>
        </form>
      </div>
    </ViewLayout>
  );
};

export default DepositView;
