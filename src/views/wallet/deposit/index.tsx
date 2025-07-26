"use client";
import { api } from "@/api";
import CopyText from "@/components/copy-text";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { Qrcode } from "@/components/qrcode";
import { SelectChain } from "@/components/select/select-chain";
import { SelectToken } from "@/components/select/select-token";
import { ShowIf } from "@/components/show-if";
import { useTrans } from "@/hooks/useTrans";
import z from "@/lib/z";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

const DepositView = () => {
  const t = useTrans();
  const [address, setAddress] = useState("");
  const Schema = z.object({
    currencyCode: z.string().nonempty(),
    chainEnum: z.object({ protocolType: z.string() }),
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
    api.deposit
      .createAddrTwoUsingPost({ chainEnum: chainEnum.protocolType })
      .then((res) => {
        setAddress(res.data.addr || "");
      });
  }, [chainEnum]);
  return (
    <ViewLayout
      header={<HeaderWithBack title={t("deposit.title")} algin="center" />}
    >
      <div className="p-content">
        <ShowIf condition={Boolean(address)}>
          <>
            <div className="size-[188px] p-4 mx-auto bg-secondary rounded-xl">
              <Qrcode value={address} bgColor="var(--color-secondary)" />
            </div>
            <div className="h-10 rounded-md bg-bg1 mt-4 flex items-center justify-between px-2.5">
              <p>{address}</p>
              <CopyText text={address} />
            </div>
          </>
        </ShowIf>
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
                    setValue("chainEnum", { protocolType: "" });
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
                <SelectChain
                  {...field}
                  currencyCode={currencyCode}
                  value={field.value?.protocolType}
                />
              )}
            ></Controller>
          </fieldset>
        </form>
      </div>
    </ViewLayout>
  );
};

export default DepositView;
