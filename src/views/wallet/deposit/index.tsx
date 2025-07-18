"use client";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { SelectChain } from "@/components/select/select-chain";
import { SelectToken } from "@/components/select/select-token";
import { useTrans } from "@/hooks/useTrans";
import z from "@/lib/z";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const DepositView = () => {
  const t = useTrans();
  const Schema = z.object({
    currencyCode: z.string().nonempty(),
  });
  const { register, handleSubmit, getValues, control } = useForm({
    defaultValues: { currencyCode: "USDT" },
    resolver: zodResolver(Schema),
  });
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
              render={({ field }) => <SelectToken {...field} />}
            ></Controller>
          </fieldset>
          {/* <fieldset className="fieldset"> */}
          {/*   <legend className="fieldset-legend"> */}
          {/*     {t("deposit.chainType")} */}
          {/*   </legend> */}
          {/*   <Controller */}
          {/*     name="chain" */}
          {/*     control={control} */}
          {/*     render={({ field }) => <SelectChain {...field} />} */}
          {/*   ></Controller> */}
          {/* </fieldset> */}
        </form>
      </div>
    </ViewLayout>
  );
};

export default DepositView;
