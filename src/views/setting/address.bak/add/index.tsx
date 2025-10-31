"use client";

import { api } from "@/api";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { SelectChain } from "@/components/select/select-chain";
import { SelectToken } from "@/components/select/select-token";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useTrans } from "@/hooks/useTrans";
import { useRouter } from "@/i18n/navigation";
import z from "@/lib/z";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  coin: CryptoAsset | null;
  chainEnum: ChainList | null;
}

const SettingAddressAddView = () => {
  const t = useTrans();

  const { back } = useRouter();

  const [address, setAddress] = useState("");
  const [remark, setRemark] = useState("");

  const { trigger } = useRequestMutation(api.member.memberAddressAddUsingPost);

  const submit = (e: FormData) => {
    if (!e.chainEnum?.id) return toast.error(t("addressAdd.selectChain"));

    if (!address) return toast.error(t("address.enterAddress"));

    trigger(
      {
        addr: address,
        remark: remark,
        coin: e.coin?.currencyCode,
        protocol: e.chainEnum?.protocolType,
      },
      {
        onSuccess: (e) => {
          if (e.code === 200) {
            toast.success(t("address.addSuccess"));
            back();
          }
        },
      }
    );
  };

  const Schema = z.object({
    coin: z.any().nullable(),
    chainEnum: z.any().nullable(),
  });

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const coin = useWatch({ control, name: "coin" });

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("addressAdd.title")} algin="center" />}
    >
      <div className="p-content h-full flex flex-col justify-between">
        <form className="grow flex-1" autoComplete="off">
          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend p-0 pb-4">
              {t("addressAdd.coinType")}
            </legend>
            <Controller
              name="coin"
              control={control}
              render={({ field }) => (
                <SelectToken
                  {...field}
                  value={field.value?.currencyCode}
                  onChange={(e) => {
                    field.onChange(e.coin);
                  }}
                />
              )}
            ></Controller>
          </fieldset>
          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend p-0 pb-4 pt-6">
              {t("addressAdd.chainType")}
            </legend>
            <Controller
              name="chainEnum"
              control={control}
              render={({ field }) => (
                <SelectChain
                  {...field}
                  currencyCode={coin?.currencyCode || "USDT"}
                  value={field.value?.protocolType as string}
                />
              )}
            ></Controller>
          </fieldset>
          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend p-0 pb-4 pt-6">
              {t("addressAdd.address")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                className="grow placeholder:text-sm font-normal flex-1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <span
                className="btn-text text-base font-medium"
                onClick={async () => {
                  const text = await navigator.clipboard.readText();
                  setAddress(text);
                }}
              >
                {t("googleVerify.paste")}
              </span>
            </label>
            <p className="text-assist2 text-sm leading-5">
              {t("addressAdd.warning")}
            </p>
          </fieldset>
          <fieldset className="fieldset p-0">
            <legend className="fieldset-legend p-0 pt-6 pb-4">
              {t("addressAdd.remark")}
            </legend>
            <textarea
              rows={4}
              maxLength={50}
              className="textarea border-border1 bg-white placeholder:text-sm font-normal flex-1 pt-2 w-full !outline-none focus-within:border-primary"
              value={remark}
              placeholder={t("addressAdd.enterRemark")}
              onChange={(e) => setRemark(e.target.value)}
            />
          </fieldset>
        </form>
        <button
          className="btn btn-primary w-full"
          onClick={handleSubmit((e) => {
            submit(e);
          })}
        >
          {t("addressAdd.title")}
        </button>
      </div>
    </ViewLayout>
  );
};
export default SettingAddressAddView;
