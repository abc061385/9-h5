"use client";
import { api } from "@/api";
import CopyText from "@/components/copy-text";
import { Drawer } from "@/components/drawer";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { Qrcode } from "@/components/qrcode";
import { ShowIf } from "@/components/show-if";
import { useTrans } from "@/hooks/useTrans";
import { utils } from "@/lib/utils";
import { useAssetStore } from "@/store/useAssetStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DepositView = () => {
  const t = useTrans();
  const { depositChainItem, depositCoinItem, chainList, setField } =
    useAssetStore();

  const [address, setAddress] = useState("");
  const [memo, setMemo] = useState("");
  const [depositChainDrawerOpen, setDepositChainDrawerOpen] = useState(false);

  useEffect(() => {
    if (!depositChainItem?.id) return;
    api.deposit
      .createAddrTwoUsingPost({ chainEnum: depositChainItem.protocolType })
      .then((res) => {
        setAddress(res.data.addr || "");
        setMemo(res.data?.memo || "");
      });
  }, [depositChainItem]);
  return (
    <ViewLayout
      heightFull
      header={
        <HeaderWithBack
          title={
            <div className="flex items-center justify-center w-full relative">
              <span>
                {depositCoinItem.currencyCode} {t("deposit.title")}
              </span>
              {/* <Icon name="history" className="size-11 absolute right-[-30px]" /> */}
            </div>
          }
          algin="center"
        />
      }
    >
      <div className="p-content">
        <ShowIf condition={Boolean(address)}>
          <>
            <div className="size-40 mx-auto my-12">
              <Qrcode value={address} size={160} />
            </div>
            <div className="rounded-lg bg-bg2 flex items-center justify-between p-4 font-medium text-sm">
              <p className="max-w-[88%] flex-1 leading-4 wrap-break-word">
                {address}
              </p>
              <CopyText text={address} />
            </div>
          </>
        </ShowIf>
        <h5 className="mt-6 mb-4 text-sm lieading-5">
          {t("address.selectChain")}
        </h5>
        <label
          className="input w-full"
          onClick={() => {
            setDepositChainDrawerOpen(true);
          }}
        >
          <input
            type="text"
            className="grow placeholder:text-xs font-bold flex-1"
            value={depositChainItem?.protocolType ?? ""}
            readOnly
            placeholder={t("addressAdd.selectChain")}
          />
          <Icon name="right-enter" className="rotate-90 w-1.5 h-2.5" />
        </label>
        {depositCoinItem?.currencyCode?.toUpperCase() === "XRP" ? (
          <>
            <p className="fieldset-legend text-sm font-normal pt-6 pb-4">
              XRP Tag
            </p>
            <div className="rounded-lg bg-bg2 flex items-center justify-between p-4 font-medium text-sm">
              <p className="max-w-[88%] flex-1 leading-4 wrap-break-word">
                {memo}
              </p>
              <CopyText text={memo} />
            </div>
            <div className="text-xs mt-1 text-text4">
              {t("XRP Tag Recharge")}
            </div>
          </>
        ) : null}
        {/* <div className="flex items-center justify-between text-text4 text-xs mb-1 mt-4"> */}
        {/*   <span>Arrived(Tradable)</span> */}
        {/*   <span>6 Confirmations</span> */}
        {/* </div> */}
        {/* <div className="flex items-center justify-between text-text4 text-xs"> */}
        {/*   <span>Unlocked(Withdrawable)</span> */}
        {/*   <span>64 Confirmations</span> */}
        {/* </div> */}
        {/* <div className="bg-bg2 rounded-lg py-3 px-4 flex gap-2 mt-6"> */}
        {/*   <Icon name="warning-black" className="size-4" /> */}
        {/*   <p className="flex-1 text-xs text-text4 leading-4"> */}
        {/*     {t("depositWarning")} */}
        {/*   </p> */}
        {/* </div> */}
        <div className="grid grid-cols-1 gap-2 mt-14">
          {/* <button className="btn btn-neutral">Save QR Code</button> */}
          <button
            className="btn btn-primary w-full"
            onClick={() => {
              utils.copyText(address).then(() => {
                toast.success(t("transactionDetail.copy"));
              });
              // navigator.clipboard.writeText(address);
            }}
          >
            Copy Address
          </button>
        </div>
        <Drawer
          className="h-auto"
          title={t("address.selectChain")}
          open={depositChainDrawerOpen}
          onChange={() => {
            setDepositChainDrawerOpen(false);
          }}
        >
          <div className="max-h-[400px] overflow-auto no-scrollbar">
            {chainList?.map((v) => {
              return (
                <div
                  key={v.id}
                  className="flex items-center justify-between py-3.5 border-b border-border2"
                  onClick={() => {
                    setField("depositChainItem", v);
                    setDepositChainDrawerOpen(false);
                  }}
                >
                  <span className="font-bold flex-1">{v.protocolType}</span>
                  <ShowIf
                    condition={depositChainItem.protocolType === v.protocolType}
                  >
                    <Icon name="duigou-primary" className="w-4 h-3" />
                  </ShowIf>
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-outline w-full mt-6"
            onClick={() => {
              setDepositChainDrawerOpen(false);
            }}
          >
            {t("common.cancel")}
          </button>
        </Drawer>
      </div>
    </ViewLayout>
  );
};

export default DepositView;
