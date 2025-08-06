"use client";

import BaseImage from "@/components/base-image";
import CopyText from "@/components/copy-text";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { ReactNode, useCallback } from "react";

const WithdrawResultsView = () => {
  const fieldEl = useCallback(
    (label: string | ReactNode, value: string | ReactNode) => {
      return (
        <div className="text-sm text-text4 flex items-center justify-between mb-4">
          <div>{label}</div>
          <div>{value}</div>
        </div>
      );
    },
    []
  );
  return (
    <ViewLayout
      header={<HeaderWithBack title="Confirm Information" algin="center" />}
    >
      <div className="p-content">
        <div className="text-center border-b border-border2 pb-12 mb-12">
          <BaseImage
            className="size-12 rounded-full overflow-hidden my-4"
            src="https://imgproxy.fourthwall.com/rEYCFIiLk2SGLTIz1fNLTH5zOY4_M-K0QzKh5Mcs-eo/w:720/sm:1/enc/5B60Lq5u3DeKLeQ8/9nH5KNpahn2M6geF/qal-qQOGMKclF6y4/cirwa8y2MkYeHCRg/7PpwnSJ8bY8jbIJW/oSbql05LkNqofb8S/9DGew1yVDNfbl6b-/KPr4O07xEVA2pq2H/oQXbS1q4iLoe7Fvl/u4ya3YLJCY9rJwVp/BhykAZ0cGk2k5kQA/1XwJnFcVUBdGwW3I/dQZgOwi7-le2x0FP/52_A93KxDK-I_R5S/QNeDimOPK5M"
          />
          <h5 className="text-sm text-text4">Amount</h5>
          <div className="font-bold text-2xl mb-4 mt-2">10000.00 USDT</div>
          <div className="text-sm flex gap-2 items-center justify-center">
            <Icon name="right-result" className="size-4" />
            Withdraw successful
          </div>
        </div>

        {fieldEl("Network", "Ethereum(ERC20)")}
        {fieldEl(
          "Withdraw Address",
          <div className="flex items-center gap-2">
            <span>0x0480dsfjofeowfwfwfdssode23</span>
            <CopyText text="0x0480dsfjofeowfwfwfdssode23" />
          </div>
        )}
        {fieldEl(
          "Transaction ID",
          <div className="flex items-center gap-2">
            <span>0x0480dsfjofeowfwfwfdssode23</span>
            <CopyText text="0x0480dsfjofeowfwfwfdssode23" />
          </div>
        )}
        {fieldEl("Service Fee", "0.001 USDT")}
        {fieldEl("Date", "2025.07.28 20:00:00")}
      </div>
    </ViewLayout>
  );
};

export default WithdrawResultsView;
