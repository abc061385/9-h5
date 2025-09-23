import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { useRootReg } from "@/lib/z";
import { useTrans } from "@/hooks/useTrans";
import { useMemo, useState } from "react";
import { useUCardStore } from "@/store/useUCardStore";
import { routerMap, useRouter } from "@/i18n/navigation";
import { ShowIf } from "@/components/show-if";
import ImageUploader from "../meetup/img-uploader";
import SelectDocumentType from "./select/document-type";
import SelectCardType from "./select/card-type";
import TimePicker from "@/components/date-picker";
import CountrySelectDrawer from "./select/country";

type FormData = {
  firstName: string;
  lastName: string;
  country: string;
  postCode: string;
};
type FormData1 = {
  documentType: string;
};

type FormData2 = {
  billingAddress: string;
};

const FormBox = () => {
  const t = useTrans();
  const reg = useRootReg();
  const { push } = useRouter();
  const { setField, step, formImageFileList, formHoldImageFileList } =
    useUCardStore();

  const [isAgreement, setIsAgreement] = useState(false);
  const [imageFileList, setImageFileList] = useState<FileType[]>([
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
  ]);
  const [holdImageFileList, setHoldImageFileList] = useState<FileType[]>([
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
  ]);

  const [documentSelectOpen, setDocumentSelectOpen] = useState(false);
  const [cardSelectOpen, setCardSelectOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [countrySelectOpen, setCountrySelectOpen] = useState(false);

  const Schema = z.object({
    firstName: reg.firstName,
    lastName: reg.lastName,
    country: reg.country,
    postCode: reg.postCode,
  });

  const Schema1 = z.object({
    documentType: reg.documentType,
  });

  const Schema2 = z.object({
    billingAddress: reg.billingAddress,
  });

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    register: register1,
    formState: { errors: errors1 },
  } = useForm<FormData1>({
    resolver: zodResolver(Schema1),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    register: register2,
    formState: { errors: errors2 },
  } = useForm<FormData2>({
    resolver: zodResolver(Schema2),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const imageUploadDom = useMemo(() => {
    return imageFileList.map((v, i) => {
      return (
        <div key={i} className="h-48 my-1">
          <ImageUploader
            defaultUrl={v.fileUrl}
            roundedFull
            onUploadSuccess={(d) => {
              if (d.originalUrl) {
                setImageFileList((prev) =>
                  prev.map((file, index) =>
                    i === index
                      ? {
                          fileName: d.fileName,
                          fileUrl: d.originalUrl,
                          thumbnailUrl: d.thumbnailUrl,
                          fileType: 1,
                        }
                      : file
                  )
                );
                formImageFileList[i] = {
                  fileName: d.fileName,
                  fileUrl: d.originalUrl,
                  thumbnailUrl: "",
                  fileType: 1,
                };
                setField("formImageFileList", formImageFileList);
              }
            }}
            className="bg-bg3 rounded-lg"
          >
            <ShowIf condition={!v.fileName}>
              <div className="bg-bg3 rounded-lg h-full flex flex-col gap-4 items-center justify-center cursor-pointer">
                <Icon name="add" className="size-6" />
              </div>
            </ShowIf>
          </ImageUploader>
        </div>
      );
    });
  }, [formImageFileList, imageFileList, setField]);

  const holdImageUploadDom = useMemo(() => {
    return holdImageFileList.map((v, i) => {
      return (
        <div key={i} className="h-48 my-1">
          <ImageUploader
            defaultUrl={v.fileUrl}
            roundedFull
            onUploadSuccess={(d) => {
              if (d.originalUrl) {
                setHoldImageFileList((prev) =>
                  prev.map((file, index) =>
                    i === index
                      ? {
                          fileName: d.fileName,
                          fileUrl: d.originalUrl,
                          thumbnailUrl: d.thumbnailUrl,
                          fileType: 1,
                        }
                      : file
                  )
                );
                formHoldImageFileList[i] = {
                  fileName: d.fileName,
                  fileUrl: d.originalUrl,
                  thumbnailUrl: "",
                  fileType: 1,
                };
                setField("formHoldImageFileList", formHoldImageFileList);
              }
            }}
            className="bg-bg3 rounded-lg"
          >
            <ShowIf condition={!v.fileName}>
              <div className="bg-bg3 rounded-lg h-full flex flex-col gap-4 items-center justify-center cursor-pointer">
                <Icon name="add" className="size-6" />
              </div>
            </ShowIf>
          </ImageUploader>
        </div>
      );
    });
  }, [formHoldImageFileList, holdImageFileList, setField]);

  const smoothFn = () => {
    const el = document.getElementById("ucard-form-title");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="mt-4">
      <ShowIf condition={step === 0}>
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              First Name
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("firstName")}
                placeholder="Please enter your First Name"
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.firstName?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Last Name
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("lastName")}
                placeholder="Please enter your Last Name"
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.lastName?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Country
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("country")}
                placeholder={t("selectCountry")}
                className="grow placeholder:text-sm"
                readOnly
                onClick={() => setCountrySelectOpen(true)}
              />
              <Icon name="right-enter" className="w-1.5 h-2.5 rotate-90 ml-3" />
            </label>
            <TextError>{errors?.country?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Date of birth
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                className="input"
                readOnly
                onClick={() => setTimePickerOpen(true)}
                placeholder="DD // MM // YYYY"
              />
            </label>
            <TextError>{errors?.country?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Post code
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("postCode")}
                placeholder="Please enter the  post code"
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.postCode?.message}</TextError>
          </fieldset>
        </form>
        <button
          className="btn btn-primary w-full h-12 mt-10"
          onClick={() => {
            setField("step", 1);
            smoothFn();
          }}
        >
          Next
        </button>
      </ShowIf>

      <ShowIf condition={step === 1}>
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Document type
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register1("documentType")}
                placeholder="Please select the type of ID photo to upload"
                className="grow placeholder:text-sm"
                readOnly
                onClick={() => setDocumentSelectOpen(true)}
              />
              <Icon name="right-enter" className="w-1.5 h-2.5 rotate-90 ml-3" />
            </label>
            <TextError>{errors1?.documentType?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex-col items-start gap-1">
              <h3 className="font-medium text-[13px] mt-2">
                Please upload photos of the front and back of your ID
              </h3>
              <p className="text-[13px] text-text4 font-normal mb-2">
                Please ensure clarity as much as possible
              </p>
            </legend>
            {imageUploadDom}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex-col items-start gap-1">
              Please upload a photo holding your ID
            </legend>
            {holdImageUploadDom}
          </fieldset>
        </form>
        <div className="grid grid-cols-3 gap-2 mt-10">
          <button
            className="btn btn-outline h-12"
            onClick={() => {
              setField("step", 0);
              smoothFn();
            }}
          >
            Previous
          </button>
          <button
            className="btn btn-primary h-12 col-span-2"
            onClick={() => {
              setField("step", 2);
              smoothFn();
            }}
          >
            Next
          </button>
        </div>
      </ShowIf>

      <ShowIf condition={step === 2}>
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Billing Address
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register2("billingAddress")}
                placeholder="Enter your billing address"
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors2?.billingAddress?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Card Type
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register1("documentType")}
                placeholder="Please select the type of ID photo to upload"
                className="grow placeholder:text-sm"
                readOnly
                onClick={() => setCardSelectOpen(true)}
              />
              <Icon name="right-enter" className="w-1.5 h-2.5 rotate-90 ml-3" />
            </label>
            <TextError>{errors1?.documentType?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Currency
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register1("documentType")}
                placeholder="Please select the type of ID photo to upload"
                className="grow placeholder:text-sm"
                readOnly
              />
              <Icon name="right-enter" className="w-1.5 h-2.5 rotate-90 ml-3" />
            </label>
            <TextError>{errors1?.documentType?.message}</TextError>
          </fieldset>
        </form>
        <div className="grid grid-cols-3 gap-2 mt-10">
          <button
            className="btn btn-outline h-12"
            onClick={() => {
              setField("step", 1);
              smoothFn();
            }}
          >
            Previous
          </button>
          <button className="btn btn-primary h-12 col-span-2">
            {t("deposit.submit")}
          </button>
        </div>
      </ShowIf>

      <div className="pl-5 mt-4">
        <label className="label ml-[-20px]">
          <input
            type="checkbox"
            checked={isAgreement}
            onChange={(e) => {
              setIsAgreement(e.target.checked);
              setField("formIsAgreement", e.target.checked);
            }}
            className="checkbox checkbox-neutral size-4 mt-0.5"
          />
          <div className="text-text4 text-xs flex">{t("agree_to_rules")}</div>
        </label>
        <a
          className="text-text1 text-xs relative top-[-4px]"
          onClick={() => {
            const values = getValues();
            setField("formData", values);
            push(`${routerMap.protocol}?type=9`);
          }}
        >
          《 U Card Application Rules 》
        </a>
      </div>
      <SelectDocumentType
        open={documentSelectOpen}
        onClose={() => setDocumentSelectOpen(false)}
        onConfirm={(v) => console.log(v)}
      />
      <SelectCardType
        open={cardSelectOpen}
        onClose={() => setCardSelectOpen(false)}
        onConfirm={(v) => console.log(v)}
      />
      <TimePicker
        open={timePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        value={{
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDay(),
        }}
      />
      <CountrySelectDrawer
        open={countrySelectOpen}
        onClose={() => setCountrySelectOpen(false)}
        onConfirm={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
};
export default FormBox;
