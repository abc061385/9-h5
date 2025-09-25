"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { cn } from "@/lib/utils";
import FormBox, { ChildHandle } from "./form";
import { SelectListType, useUCardStore } from "@/store/useUCardStore";
import { useTrans } from "@/hooks/useTrans";
import { useCallback, useEffect, useRef } from "react";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import Bridge from "@/lib/dsBridge";
import { useRouter } from "@/i18n/navigation";
import { ShowIf } from "@/components/show-if";

const UCardView = () => {
  const { back } = useRouter();
  const api = createAxiosInstance("/app/");
  const t = useTrans();
  const ref = useRef<ChildHandle>(null);
  const { step, setField, formStatus } = useUCardStore();

  const getSelectList = useCallback(async () => {
    try {
      const res: ApiResponse<{
        cardTypes: SelectListType[];
        countries: SelectListType[];
        currencies: SelectListType[];
        idTypes: SelectListType[];
      }> = await api.get("/nine-index/card-kyc/options");
      if (res.code === 200) {
        setField("cardTypes", res?.data?.cardTypes || []);
        setField("countries", res?.data?.countries || []);
        setField("currencies", res?.data?.currencies || []);
        setField("idTypes", res?.data?.idTypes || []);
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setField]);

  useEffect(() => {
    getSelectList();
  }, [getSelectList]);

  useEffect(() => {
    Bridge.setFull(true);
  }, []);
  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={t("applyButton")}
          algin="center"
          onClick={() => {
            ref?.current?.reset();
            Bridge.goBack();
            back();
          }}
        />
      }
      className="h-full overflow-auto no-scrollbar"
    >
      <BaseImage
        src="/images/ucard-banner.png"
        className="w-full h-[148px]"
        cover={false}
      />
      <div className="p-content">
        <p className="text-sm leading-5 mb-6">{t("uCardIntro1")}</p>
        <p className="text-sm leading-5">{t("uCardIntro2")}</p>
        <ShowIf condition={formStatus === "PENDING"}>
          <p className="my-6 text-primary text-sm">{t("completionNote")}</p>
          <p className="text-sm leading-5">{t("stepsSummary")}</p>
        </ShowIf>

        <h2 className="font-medium mt-10 mb-6" id="ucard-form-title">
          {t("applicationInfoTitle")}
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
        <FormBox ref={ref} />
      </div>
    </ViewLayout>
  );
};
export default UCardView;
