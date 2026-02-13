"use client";

import { api } from "@/api";
import BaseImage from "@/components/base-image";
import CopyText from "@/components/copy-text";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { Modal } from "@/components/modal";
import { Skeleton } from "@/components/skeleton";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { useTrans } from "@/hooks/useTrans";
import { cn, maskString } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ShowIf } from "@/components/show-if";

const WalletTransDetailView = () => {
  const t = useTrans();
  const params = useSearchParams();

  const [detail, setDetail] = useState<TransactionRecord>();
  const [previewOpen, setPreviewOpen] = useState(false);

  const { trigger } = useRequestMutation(api.wallet.rechargeDetailUsingPost);

  useEffect(() => {
    if (!params.get("id")) return;
    trigger(
      {
        id: Number(params.get("id")),
      },
      {
        onSuccess: ({ data }) => setDetail(data as TransactionRecord),
      }
    );
  }, [params, trigger]);

  const cardEl = useCallback(
    (label: string | ReactNode, value: string | ReactNode) => {
      return (
        <div className="flex items-start justify-between text-xs mb-4 last:mb-0">
          <span className="font-medium">{label}</span>
          <Skeleton isLoading={false}>
            <span>{value}</span>
          </Skeleton>
        </div>
      );
    },
    []
  );

  const getStatusText = (type?: string, status?: number) => {
    if (status === null || status === undefined)
      return t("transactionDetail.statusNo");
    if (type === "RECHARGE") {
      const statusMap: Record<number, string> = {
        0: t("transactionDetail.recharge0"),
        1: t("transactionDetail.recharge1"),
        2: t("transactionDetail.recharge2"),
      };
      return statusMap[status] || t("transactionDetail.statusNo");
    } else {
      const statusMap: Record<number, string> = {
        0: t("transactionDetail.draw0"),
        1: t("transactionDetail.draw1"),
        2: t("transactionDetail.draw2"),
      };
      return statusMap[status] || t("transactionDetail.statusNo");
    }
  };

  const statusColor = ["text-warning", "text-rise", "text-fall"];

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          algin="center"
          title={
            detail?.type === "RECHARGE"
              ? t("transactionDetail.title")
              : t("transactionDetail.title")
          }
        />
      }
    >
      <div className="p-content">
        <div className="flex flex-col items-center gap-2">
          <span className={cn(statusColor[detail?.status || 0])}>
            {getStatusText(detail?.type, detail?.status)}
          </span>
          <span className="font-medium">
            {detail?.type === "RECHARGE" ? "+" : "-"} {detail?.amount}{" "}
            <span className="text-xs">{detail?.symbol}</span>
          </span>
        </div>
        <div className="mt-4">
          {cardEl(
            t("transactionDetail.protocol"),
            <div className="badge badge-soft badge-primary rounded-sm text-xs bg-bg1 border-primary">
              {detail?.protocol}
            </div>
          )}
          {cardEl(
            t("transactionDetail.address"),
            <div className="flex gap-1">
              {maskString(detail?.rechargeAddress || "")}
              <CopyText text={detail?.rechargeAddress || ""} />
            </div>
          )}

          {/* 充币凭证（仅充币时显示) */}
          <ShowIf
            condition={
              detail?.type !== "RECHARGE" && Boolean(detail?.certificate)
            }
          >
            {cardEl(
              t("transactionDetail.certificate"),
              <div className="flex gap-1" onClick={() => setPreviewOpen(true)}>
                <BaseImage
                  src={detail?.certificate || ""}
                  className="w-20 h-20"
                />
              </div>
            )}
          </ShowIf>

          {/* 交易哈希（仅提币时显示) */}
          <ShowIf
            condition={detail?.type !== "RECHARGE" && detail?.status === 1}
          >
            {cardEl(
              t("transactionDetail.txid"),
              <div className="flex gap-1">
                {maskString(detail?.txid || "")}
                <CopyText text={detail?.txid || ""} />
              </div>
            )}
          </ShowIf>

          {/* 失败原因（仅失败时显示) */}
          <ShowIf condition={detail?.status === 2}>
            {cardEl(t("transactionDetail.reason"), detail?.reason)}
          </ShowIf>

          {cardEl(t("transactionDetail.time"), detail?.createTime)}
        </div>
        <Modal
          wrapClassName="bg-transparent shadow-none p-0 rounded-none"
          open={previewOpen}
          close={false}
          onClose={() => setPreviewOpen(false)}
          onChange={() => setPreviewOpen(false)}
        >
          {detail?.certificate && (
            <Image
              src={detail?.certificate}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Modal>
      </div>
    </ViewLayout>
  );
};
export default WalletTransDetailView;
