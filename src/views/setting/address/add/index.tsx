"use client";

import { api } from "@/api";
import BaseImage from "@/components/base-image";
import { Drawer } from "@/components/drawer";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { Skeleton } from "@/components/skeleton";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useRequestQuery } from "@/hooks/useRequestQuery";
import { useTrans } from "@/hooks/useTrans";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import z from "@/lib/z";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  coin: CryptoAsset | null;
}

const SettingAddressAddView = () => {
  const t = useTrans();
  const { back } = useRouter();

  const [coinList, setCoinList] = useState<CryptoAsset[]>();
  const [coinDrawer, setCoinDrawer] = useState(false);
  const [chainDrawer, setChainDrawer] = useState(false);
  const [coinItem, setCoinItem] = useState<CryptoAsset>();
  const [chainItem, setChainItem] = useState<ChainList>();
  const [address, setAddress] = useState("");
  const [remark, setRemark] = useState("");

  const { data, isLoading } = useRequestQuery(
    api.currencySettings.protocolListUsingGet,
    {}
  );

  const { trigger: getChain, data: chainData } = useRequestMutation(
    api.currencySettings.pageUsingGet
  );

  const { trigger: submit } = useRequestMutation(
    api.member.memberAddressAddUsingPost
  );

  const chainList: ChainList[] = Array.isArray(chainData?.data)
    ? chainData.data
    : [];

  useEffect(() => {
    setCoinList(Array.isArray(data?.data) ? data.data : []);
    setCoinItem(data?.data?.[0]);
  }, [data]);

  useEffect(() => {
    if (!coinItem?.currencyCode) return;
    getChain({ currencyCode: coinItem?.currencyCode });
  }, [getChain, coinItem]);

  const handleSubmit = () => {
    if (!chainItem?.id) return toast.error(t("addressAdd.selectChain"));
    if (!address) return toast.error(t("address.enterAddress"));

    submit(
      {
        addr: address,
        remark: remark,
        coin: coinItem?.currencyCode,
        protocol: chainItem.protocolType,
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
  });

  const {} = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("addressAdd.title")} algin="center" />}
    >
      <div className="p-content h-full flex flex-col justify-between">
        <form className="grow flex-1" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t("addressAdd.coinType")}
            </legend>
            <Skeleton isLoading={isLoading}>
              <label
                className="input w-full"
                onClick={() => setCoinDrawer(true)}
              >
                <BaseImage
                  src={coinItem?.logo || "/"}
                  className="w-6 h-6 rounded-full overflow-hidden"
                />
                <input
                  type="text"
                  className="grow placeholder:text-xs font-bold flex-1"
                  value={coinItem?.currencyCode ?? ""}
                  readOnly
                />
                <Icon name="arrow-line-down" />
              </label>
            </Skeleton>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t("addressAdd.chainType")}
            </legend>
            <Skeleton isLoading={isLoading}>
              <label
                className="input w-full"
                onClick={() => {
                  setChainDrawer(true);
                }}
              >
                <input
                  type="text"
                  className="grow placeholder:text-xs font-bold flex-1"
                  value={chainItem?.protocolType ?? ""}
                  readOnly
                  placeholder={t("addressAdd.selectChain")}
                />
                <Icon name="arrow-line-down" />
              </label>
            </Skeleton>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t("addressAdd.address")}
            </legend>
            <Skeleton isLoading={isLoading}>
              <label className="input w-full">
                <input
                  type="text"
                  className="grow placeholder:text-xs font-bold flex-1"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <span
                  className="btn-text text-primary font-bold"
                  onClick={async () => {
                    const text = await navigator.clipboard.readText();
                    setAddress(text);
                  }}
                >
                  {t("googleVerify.paste")}
                </span>
              </label>
            </Skeleton>
            <p className="text-error font-medium leading-[120%]">
              {t("addressAdd.warning")}
            </p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              {t("addressAdd.remark")}
            </legend>
            <Skeleton isLoading={isLoading}>
              <textarea
                rows={4}
                maxLength={50}
                className="textarea border-accent placeholder:text-xs font-bold flex-1 pt-2 w-full !outline-none focus-within:border-primary"
                value={remark}
                placeholder={t("addressAdd.enterRemark")}
                onChange={(e) => setRemark(e.target.value)}
              />
            </Skeleton>
          </fieldset>
        </form>
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          {t("addressAdd.title")}
        </button>
      </div>
      <Drawer
        open={coinDrawer}
        title={t("address.selectToken")}
        onChange={setCoinDrawer}
      >
        <div className="h-[40vh] overflow-auto px-2">
          {coinList?.map((item) => {
            return (
              <div
                key={item.id}
                className={cn(
                  "flex items-center justify-center gap-1 h-11 mb-4 font-bold rounded-md",
                  item.id === coinItem?.id ? "bg-primary text-white" : ""
                )}
                onClick={() => {
                  setCoinItem(item);
                  setCoinDrawer(false);
                  setChainItem({});
                }}
              >
                <BaseImage
                  src={item.logo || ""}
                  className="w-6 h-6 rounded-full overflow-hidden"
                />
                <span>{item.currencyCode}</span>
              </div>
            );
          })}
        </div>
      </Drawer>
      <Drawer
        open={chainDrawer}
        title={t("address.selectToken")}
        onChange={setChainDrawer}
        className="h-auto"
      >
        <div className="flex flex-col h-full">
          <div className="max-h-[27vh] overflow-auto px-2 flex-1">
            {chainList?.map((item) => {
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center justify-center gap-1 h-10 mb-3 font-bold rounded-md",
                    item.id === chainItem?.id ? "bg-primary text-white" : ""
                  )}
                  onClick={() => {
                    setChainItem(item);
                    setChainDrawer(false);
                  }}
                >
                  <span>{item.protocolType}</span>
                </div>
              );
            })}
          </div>
          <p className="text-text2 font-bold text-xs bg-bg1 p-2 rounded-md flex gap-1">
            <Icon name="prompt" />
            <span className="flex-1">{t("chainPicker.tip")}</span>
          </p>
        </div>
      </Drawer>
    </ViewLayout>
  );
};
export default SettingAddressAddView;
