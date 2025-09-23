"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { cn } from "@/lib/utils";
import FormBox from "./form";
import { useUCardStore } from "@/store/useUCardStore";

const UCardView = () => {
  const { step } = useUCardStore();

  return (
    <ViewLayout
      header={<HeaderWithBack title="Apply for a U card" algin="center" />}
      className="h-full overflow-auto no-scrollbar"
    >
      <BaseImage
        src="/images/ucard-banner.png"
        className="w-full h-[148px]"
        cover={false}
      />
      <div className="p-content">
        <p className="text-sm leading-5 mb-6">
          The U Card is a convenient and secure payment tool available in both
          virtual and physical formats. Users can link it to their digital
          wallet or bank account, making payments online on global e-commerce
          platforms and app stores, as well as using the physical card for POS
          purchases and ATM withdrawals.
        </p>
        <p className="text-sm leading-5">
          Virtual cards generate a card number instantly upon application,
          making them ideal for quick use and subscription payments. Physical
          cards are delivered like traditional bank cards, offering long-term
          validity and meeting everyday offline needs. Whether it&apos;s
          cross-border shopping, digital subscriptions, or everyday payments,
          the U Card provides users with a flexible and secure solution.
        </p>
        <h2 className="font-medium mt-10 mb-6" id="ucard-form-title">
          Please fill in the application information:
        </h2>
        <div className="flex items-center justify-between relative">
          {[...new Array(3)].map((_, i) => {
            return (
              <div
                key={i}
                className={cn(
                  "size-10 rounded-full bg-white text-text5 border-2 border-border1 flex items-center justify-center font-bold relative z-10",
                  step >= i && "bg-primary text-white border-0"
                )}
              >
                {i + 1}
              </div>
            );
          })}
          <div className="absolute top-[50%] h-[1px] bg-border1 w-full z-0"></div>
        </div>
        <FormBox />
      </div>
    </ViewLayout>
  );
};
export default UCardView;
