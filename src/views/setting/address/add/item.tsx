"use client";

import { useTrans } from "@/hooks/useTrans";
import z from "@/lib/z";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import BindAddressModal from "./bind-address";
import BaseImage from "@/components/base-image";

interface FormData {
  address: string;
  network: string;
}

const AddressAddItem: FC<{ network: string }> = ({ network }) => {
  const t = useTrans();
  const [open, setOpen] = useState(false);

  const submit = (e: FormData) => {
    if (!e.address) return toast.error(t("address.enterAddress"));
    // 去提交
    setOpen(true);
  };

  const Schema = z.object({
    address: z.string().nonempty(""),
    network: z.string().nonempty(""),
  });

  const { handleSubmit, register, watch } = useForm<FormData>({
    resolver: zodResolver(Schema),
    values: { network: network, address: "" },
  });
  const address = watch("address");

  return (
    <div>
      <form autoComplete="off">
        <fieldset className="fieldset p-0">
          <legend className="fieldset-legend p-0 pb-4">Network</legend>
          <label className="input w-full h-12 border border-border1 bg-bg3 ">
            <BaseImage
              src="https://861276122348apse1.s3.ap-southeast-1.amazonaws.com/20250428/22.png"
              className="size-6 shrink-0"
            ></BaseImage>
            <input
              {...register("network")}
              type="text"
              disabled
              className="grow placeholder:text-sm font-normal  text-black bg-none"
            />
          </label>
        </fieldset>
        <fieldset className="fieldset p-0">
          <legend className="fieldset-legend p-0 pb-4 pt-6">
            {t("addressAdd.address")}
          </legend>
          <label className="input w-full h-12">
            <input
              type="text"
              {...register("address")}
              placeholder="Long press to paste"
              className="grow placeholder:text-sm font-normal "
            />
            {/* <span */}
            {/*   className="btn-text text-base font-medium" */}
            {/*   onClick={async () => { */}
            {/*     const text = await navigator.clipboard.readText(); */}
            {/*     setValue("address", text); */}
            {/*   }} */}
            {/* > */}
            {/*   {t("googleVerify.paste")} */}
            {/* </span> */}
          </label>
          {/* <p className="text-assist2 text-sm leading-5"> */}
          {/*   {t("addressAdd.warning")} */}
          {/* </p> */}
        </fieldset>
      </form>
      <button
        className="btn btn-primary w-full mt-6"
        disabled={!address}
        onClick={handleSubmit((e) => {
          submit(e);
        })}
      >
        {t("common.confirm")}
      </button>
      <BindAddressModal
        network={network}
        address={address}
        open={open}
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
      />
    </div>
  );
};
export default AddressAddItem;
