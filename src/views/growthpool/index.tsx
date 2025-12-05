"use client";

import BaseImage from "@/components/base-image";
import ReactDOMServer from "react-dom/server.browser";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import Bridge from "@/lib/dsBridge";
import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { useForm } from "react-hook-form";

type FormData = {
  type: string;
  amount: string;
};

const GrowthPoolView = () => {
  const t = useTrans();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (Bridge.setFull) {
      Bridge.setFull(true);
    }
  }, []);

  const formatDesc = (text: string) => {
    try {
      const newTextList = text?.split("\n").map((item, index) => {
        if (index > 2) {
          return ReactDOMServer.renderToString(
            <p key={index} className="text-primary list-item list-disc ml-4">
              {item}
            </p>,
          );
        }
        return `<p>${item}</p>`;
      });
      return newTextList.join("\n");
    } catch {
      return text;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <ViewLayout
      className="h-max md-pc:h-full overflow-hidden flex flex-col"
      header={
        <HeaderWithBack title={t("9MEcosystemGrowthPool")} algin="center" />
      }
    >
      <BaseImage
        src="/images/growthpool/banner@2x.webp"
        className="w-full h-[164px] mt-2 mb-7 block"
      />
      <div className="px-content pb-4 flex-1 flex flex-col ">
        <div>
          <div
            className="text-sm mb-[26px]"
            dangerouslySetInnerHTML={{
              __html: formatDesc(t("9MEcosystemGrowthPoolDesc")),
            }}
          ></div>
          <div className="grid grid-cols-2">
            <div className="flex justify-center items-center flex-col  border-r-[1px] border-[rgba(0,0,0,0.1)]">
              <p>{t("USDMBalance")}</p>
              <span className="text-lg font-bold text-primary">123</span>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>{t("9MCBalance")}</p>
              <span className="text-lg font-bold text-primary">123</span>
            </div>
          </div>
          <div className="h-[1PX] bg-[rgba(0,0,0,0.1)] mt-3"></div>
          <div className="mt-6">{t("Deposit History")}</div>
        </div>
        <div className="grow shrink-0 relative mb-4 mt-3">
          <div className="absolute size-full overflow-x-auto ">
            <div className="rounded-box border border-base-content/5 ">
              <table className="table">
                <tbody>
                  <tr className="divide-x divide-base-content/5">
                    <td>123 USDM</td>
                    <td>2024-2-2</td>
                  </tr>
                  <tr className="divide-x divide-base-content/5">
                    <td>123 9MC</td>
                    <td>2024-20-20</td>
                  </tr>
                  <tr className="divide-x divide-base-content/5">
                    <td>123 </td>
                    <td>2024-20-20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          {t("9MEcosystemBuy")}
        </button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title={t("9MEcosystemBuy")}
        >
          <div className="grid gap-4">
            <div className="form-control w-full mt-4">
              <select
                className="select w-full max-w-xs"
                defaultValue={"9MC"}
                {...register("type", { required: "请选择类型" })}
              >
                <option value="9MC">9MC</option>
                <option value="USDM">USDM</option>
              </select>
              {errors.type && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.type.message}
                </span>
              )}
            </div>
            <div className="form-control w-full">
              <input
                type="text"
                placeholder={t("selectCurrencyDesc")}
                className="input input-bordered w-full"
                {...register("amount", { required: "名称不能为空" })}
              />
              {errors.amount && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.amount.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              onClick={handleSubmit((v) => {
                console.log(v);
              })}
            >
              {t("9MEcosystemBuy")}
            </button>
          </div>
        </Modal>
      </div>
    </ViewLayout>
  );
};

export default GrowthPoolView;
