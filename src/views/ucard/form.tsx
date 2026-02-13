import { Icon } from "@/components/icon";
import { TextError } from "@/components/input/text-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { useRootReg } from "@/lib/z";
import { useTrans } from "@/hooks/useTrans";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { SelectListType, useUCardStore } from "@/store/useUCardStore";
import { routerMap, useRouter } from "@/i18n/navigation";
import { ShowIf } from "@/components/show-if";
import ImageUploader from "./img-uploader";
import SelectDocumentType from "./select/document-type";
import SelectCardType from "./select/card-type";
import TimePicker from "@/components/date-picker";
import CountrySelectDrawer from "./select/country";
import dayjs from "dayjs";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import toast from "react-hot-toast";
import SelectCurreniesType from "./select/currencies";
import { CountryListType } from "../meetup/type";
import CountryNumberSelectDrawer from "./select/country-phone";
import { cn } from "@/lib/utils";
import { api as apiRes } from "@/api";

type FormData = {
  firstName: string;
  lastName: string;
  country: string;
  postalCode: string;
  birthDate: string;
  contact: string;
};
type FormData1 = {
  idType: string;
};

type FormData2 = {
  address: string;
  cardType: string;
  currencies: string;
};

export interface ChildHandle {
  reset: () => void;
}

const FormBox = forwardRef<ChildHandle>((_props, ref) => {
  const api = createAxiosInstance("/app/");
  const t = useTrans();
  const reg = useRootReg();
  const { push } = useRouter();
  const {
    setField,
    step,
    formImageFileList,
    formHoldImageFileList,
    formData,
    formData1,
    formData2,
    formPrefixId,
    formatBirthDate,
    formCurrencies,
    formCountry,
    countries,
    countryPhoneList,
    cardTypes,
    currencies,
    formCardType,
    formIdType,
    idTypes,
  } = useUCardStore();

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
  const [currenciesOpen, setCurrenciesOpen] = useState(false);
  const [countryNumberSelectOpen, setCountryNumberSelectOpen] = useState(false);

  const [countryValue, setCountryValue] = useState<SelectListType>();
  const [idTypeValue, setIdTypeValue] = useState<SelectListType>();
  const [cardTypeValue, setCardTypeValue] = useState<SelectListType>();
  const [currenciesValue, setCurrenciesValue] = useState<string>();
  const [birthDate, setBirthDate] = useState<number>();
  const [prefixId, setPrefixId] = useState<CountryListType>({
    code: "HK",
    country: "香港(中国)",
    id: 48,
    phonePrefix: "+852",
  });

  const [updateId, setUpdateId] = useState<number>();
  const [status, setStatus] = useState<string>();

  const Schema = z.object({
    firstName: reg.firstName,
    lastName: reg.lastName,
    country: reg.country,
    postalCode: reg.postCode,
    birthDate: reg.birthDate,
    contact: reg.countryPhone,
  });

  const Schema1 = z.object({
    idType: reg.documentType,
  });

  const Schema2 = z.object({
    address: reg.billingAddress,
    cardType: reg.cardType,
    currencies: reg.currencies,
  });

  const {
    setValue,
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    getValues: getValues1,
    reset: reset1,
    formState: { errors: errors1 },
  } = useForm<FormData1>({
    resolver: zodResolver(Schema1),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    register: register2,
    setValue: setValue2,
    getValues: getValues2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm<FormData2>({
    resolver: zodResolver(Schema2),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset(formData);
    reset1(formData1);
    reset2(formData2);
    setPrefixId(
      formPrefixId || {
        code: "HK",
        country: "香港(中国)",
        id: 48,
        phonePrefix: "+852",
      }
    );
    setBirthDate(formatBirthDate);
    setImageFileList((prev) =>
      prev.map((file, index) => {
        return formImageFileList[index] || file;
      })
    );
    setHoldImageFileList((prev) =>
      prev.map((file, index) => {
        return formHoldImageFileList[index] || file;
      })
    );
    const code = formCurrencies.map((item) => item.code).join(",");
    setCurrenciesValue(code);
    setCountryValue(formCountry);
    setCardTypeValue(formCardType);
    setIdTypeValue(formIdType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formCountry,
    formData,
    formData1,
    formData2,
    formHoldImageFileList,
    formImageFileList,
    formPrefixId,
    formatBirthDate,
    reset,
    reset1,
    reset2,
  ]);

  const imageUploadDom = useMemo(() => {
    return imageFileList.map((v, i) => {
      return (
        <div key={i} className="h-48 my-1">
          <ImageUploader
            fileType={i === 0 ? "front_id" : "back_id"}
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
            onClear={() => {
              setImageFileList((prev) =>
                prev.map((file, index) =>
                  i === index
                    ? {
                        fileName: "",
                        fileUrl: "",
                        thumbnailUrl: "",
                        fileType: 1,
                      }
                    : file
                )
              );
              formImageFileList[i] = {
                fileName: "",
                fileUrl: "",
                thumbnailUrl: "",
                fileType: 1,
              };
              setField("formImageFileList", formImageFileList);
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
            fileType="selfie_with_id"
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
            onClear={() => {
              setHoldImageFileList((prev) =>
                prev.map((file, index) =>
                  i === index
                    ? {
                        fileName: "",
                        fileUrl: "",
                        thumbnailUrl: "",
                        fileType: 1,
                      }
                    : file
                )
              );
              formHoldImageFileList[i] = {
                fileName: "",
                fileUrl: "",
                thumbnailUrl: "",
                fileType: 1,
              };
              setField("formHoldImageFileList", formHoldImageFileList);
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

  const handleReset = () => {
    reset();
    reset1();
    reset2();
    setField("formData", {});
    setField("formData1", {});
    setField("formData2", {});
    setBirthDate(undefined);
    setField("formatBirthDate", undefined);
    setPrefixId({
      code: "HK",
      country: "香港(中国)",
      id: 48,
      phonePrefix: "+852",
    });
    setField("formPrefixId", {
      code: "HK",
      country: "香港(中国)",
      id: 48,
      phonePrefix: "+852",
    });
    setIdTypeValue(undefined);
    setField("formIdType", undefined);
    setImageFileList([
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    ]);
    setHoldImageFileList([
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    ]);
    setField("formImageFileList", [
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    ]);
    setField("formHoldImageFileList", [
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    ]);
    setField("formStatus", "");
    setStatus("");
    setField("step", 0);
  };

  useImperativeHandle(ref, () => ({
    reset() {
      handleReset();
    },
  }));

  const getInfo = useCallback(async () => {
    try {
      const res = await apiRes.nineIndex.cardKyc.mine();
      if (res.code === 200 && res.data) {
        const data = res.data;
        setUpdateId(data?.id);
        setStatus(data.status);
        setField("formStatus", data.status!);
        if (data.status !== "PENDING" && data.status !== "REJECTED") return;
        if (data.status === "PENDING") {
          setField("step", 2);
        }
        setValue("firstName", data.firstName!);
        setValue("lastName", data.lastName!);
        setValue("postalCode", data.postalCode!);
        const phone = data.contact?.split("-");
        setValue("contact", phone?.[1] || "");
        const phonePrefixVal = countryPhoneList.find(
          (v) => v.phonePrefix === phone?.[0]
        );
        setPrefixId(phonePrefixVal!);
        setField("formPrefixId", phonePrefixVal!);
        const countryVal = countries.find((v) => v.code === data.country);
        setValue("country", countryVal?.label || "");
        setField("formCountry", countryVal!);
        setCountryValue(countryVal);
        setField("formatBirthDate", dayjs(data.birthDate).valueOf());
        setValue("birthDate", dayjs(data.birthDate).format("DD/MM/YYYY"), {
          shouldValidate: true,
        });
        setBirthDate(dayjs(data.birthDate).valueOf());
        setValue2("address", data?.address || "");
        const cardTypeVal = cardTypes.find((v) => v.code === data.cardType);
        setValue2("cardType", cardTypeVal?.label || "", {
          shouldValidate: true,
        });
        setCardTypeValue(cardTypeVal);
        setField("formCardType", cardTypeVal!);
        setValue2("currencies", data?.currencies || "");
        const currenciesValueList = data?.currencies
          ?.split(",")
          .map((item) => item?.trim());
        const set2 = new Set(currenciesValueList?.map((item) => item));
        const common = currencies.filter((item) => set2.has(item.code?.trim()));
        const code = common.map((item) => item.code).join(", ");
        const label = common.map((item) => item.label).join(", ");
        setValue2("currencies", label, { shouldValidate: true });
        setCurrenciesValue(code);
        setField("formCurrencies", common);
        const idTypeVal = idTypes.find((v) => v.code === data.idType);
        setValue1("idType", idTypeVal?.label || "", { shouldValidate: true });
        setIdTypeValue(idTypeVal);
        setField("formIdType", idTypeVal);
        setImageFileList([
          {
            fileName: "",
            fileUrl: data.idFrontUrl!,
            thumbnailUrl: data.idFrontUrl,
            fileType: 1,
          },
          {
            fileName: "",
            fileUrl: data.idBackUrl!,
            thumbnailUrl: data.idBackUrl,
            fileType: 1,
          },
        ]);
        setField("formImageFileList", [
          {
            fileName: "",
            fileUrl: data.idFrontUrl!,
            thumbnailUrl: data.idFrontUrl,
            fileType: 1,
          },
          {
            fileName: "",
            fileUrl: data.idBackUrl!,
            thumbnailUrl: data.idBackUrl,
            fileType: 1,
          },
        ]);
        setHoldImageFileList([
          {
            fileName: "",
            fileUrl: data.selfieWithIdUrl!,
            thumbnailUrl: data.selfieWithIdUrl,
            fileType: 1,
          },
        ]);
        setField("formHoldImageFileList", [
          {
            fileName: "",
            fileUrl: data.selfieWithIdUrl!,
            thumbnailUrl: data.selfieWithIdUrl,
            fileType: 1,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    cardTypes,
    countries,
    countryPhoneList,
    currencies,
    idTypes,
    setField,
    setValue,
    setValue1,
    setValue2,
  ]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  const submitFirst = useCallback(() => {
    setField("step", 1);
    getInfo();
    smoothFn();
  }, [getInfo, setField]);

  const submitSecond = useCallback(() => {
    if (!imageFileList?.[0]?.fileUrl || !imageFileList?.[1]?.fileUrl) {
      toast.error(t("uploadIdPhoto"));
      return;
    }
    if (!holdImageFileList?.[0]?.fileUrl) {
      toast.error(t("uploadSelfieWithId"));
      return;
    }
    setField("step", 2);
    getInfo();
    smoothFn();
  }, [getInfo, holdImageFileList, imageFileList, setField, t]);

  const submit = useCallback(async () => {
    if (!isAgreement) {
      toast.error(t("readAndAgree") + t("applicationRulesTitle"));
      return;
    }
    const params: FormData & FormData1 & FormData2 & { [key: string]: string } =
      {
        ...getValues(),
        ...getValues1(),
        ...getValues2(),
        birthDate: dayjs(birthDate).format("YYYY-MM-DD"),
        contact: prefixId.phonePrefix + "-" + getValues().contact,
        cardType: cardTypeValue?.code || "",
        idType: idTypeValue?.code || "",
        idFrontUrl: imageFileList?.[0].fileUrl || "",
        idBackUrl: imageFileList?.[1].fileUrl,
        selfieWithIdUrl: holdImageFileList?.[0].fileUrl,
        currencies: currenciesValue || "",
        country: countryValue?.code || "",
      };
    if (status === "REJECTED") {
      params.id = updateId?.toString() || "";
    }

    const req: Promise<ApiResponse<unknown>> =
      status === "REJECTED"
        ? api.put("/nine-index/card-kyc/update", {
            ...params,
          })
        : api.post("/nine-index/card-kyc/submit", {
            ...params,
          });

    try {
      const res: ApiResponse<unknown> = await req;
      if (res.code === 200) {
        toast.success(t("submitSuccess"));
        getInfo();
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    api,
    birthDate,
    cardTypeValue?.code,
    countryValue?.code,
    currenciesValue,
    getValues,
    getValues1,
    getValues2,
    holdImageFileList,
    idTypeValue?.code,
    imageFileList,
    isAgreement,
    prefixId?.phonePrefix,
    status,
    t,
    updateId,
    getInfo,
  ]);

  return (
    <div className="mt-4">
      <ShowIf condition={step === 0}>
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("firstNameLabel")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("firstName")}
                placeholder={t("firstNamePlaceholder")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.firstName?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("lastNameLabel")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("lastName")}
                placeholder={t("lastNamePlaceholder")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.lastName?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("countryLabel")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("country")}
                placeholder={t("selectCountry")}
                className="grow placeholder:text-sm"
                readOnly
                onClick={() => setCountrySelectOpen(true)}
                onChange={(e) => console.log(e)}
                // value={countryValue?.country}
              />
              <Icon name="right-enter" className="w-1.5 h-2.5 rotate-90 ml-3"  color="var(--color-text1)"/>
            </label>
            <TextError>{errors?.country?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("dateOfBirthLabel")}
            </legend>
            <label className="input w-full h-12">
              <input
                {...register("birthDate")}
                type="text"
                className="input p-0"
                readOnly
                onClick={() => setTimePickerOpen(true)}
                placeholder={t("dateFormatHint")}
                value={
                  birthDate ? dayjs(birthDate).format("DD // MM // YYYY") : ""
                }
              />
            </label>
            <TextError>{errors?.birthDate?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("phone_number")}
            </legend>
            <label className="input w-full h-12">
              <div
                className="h-6 border-r border-border2 pr-2.5"
                onClick={(e) => {
                  e.preventDefault();
                  setCountryNumberSelectOpen(true);
                }}
              >
                <b>{prefixId?.phonePrefix}</b>
                <Icon
                  name="right-enter"
                  className="w-1.5 h-2.5 rotate-90 ml-3"
                />
              </div>
              <input
                type="text"
                {...register("contact")}
                placeholder={t("enter_phone_number")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.contact?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("postCodeLabel")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("postalCode")}
                placeholder={t("postCodePlaceholder")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.postalCode?.message}</TextError>
          </fieldset>
        </form>
        <button
          className="btn btn-primary w-full h-12 mt-10"
          onClick={handleSubmit(() => {
            submitFirst();
          })}
        >
          {t("nextButtonText")}
        </button>
      </ShowIf>

      <ShowIf condition={step === 1}>
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("documentTypeLabel")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register1("idType")}
                placeholder={t("idPhotoTypePrompt")}
                className="grow placeholder:text-sm"
                readOnly
                onClick={() => setDocumentSelectOpen(true)}
              />
              <Icon name="right-enter" className="w-1.5 h-2.5 rotate-90 ml-3"  color="var(--color-text1)"/>
            </label>
            <TextError>{errors1?.idType?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex-col items-start gap-1">
              <h3 className="font-medium text-[13px] mt-2">
                {t("uploadIdPhotosPrompt")}
              </h3>
              <p className="text-[13px] text-text2 font-normal mb-2">
                {t("clarityNote")}
              </p>
            </legend>
            {imageUploadDom}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex-col items-start gap-1">
              {t("uploadHoldingIdPrompt")}
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
            {t("previousButtonText")}
          </button>
          <button
            className="btn btn-primary h-12 col-span-2"
            onClick={handleSubmit1(() => {
              submitSecond();
            })}
          >
            {t("nextButtonText")}
          </button>
        </div>
      </ShowIf>

      <ShowIf condition={step === 2}>
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("billingAddressLabel")}
            </legend>
            <label
              className={cn(
                "input w-full h-12",
                Boolean(updateId && status === "PENDING") && "input-disabled"
              )}
            >
              <input
                type="text"
                {...register2("address")}
                placeholder={t("billingAddressPlaceholder")}
                className="grow placeholder:text-sm"
                disabled={Boolean(updateId && status === "PENDING")}
              />
            </label>
            <TextError>{errors2?.address?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("cardTypeLabel")}
            </legend>
            <label
              className={cn(
                "input w-full h-12",
                Boolean(updateId && status === "PENDING") && "input-disabled"
              )}
            >
              <input
                type="text"
                {...register2("cardType")}
                placeholder={t("cardTypePlaceholder")}
                className="grow placeholder:text-sm"
                readOnly
                onClick={() => setCardSelectOpen(true)}
                disabled={Boolean(updateId && status === "PENDING")}
              />
              {Boolean(updateId && status === "PENDING") ? null : (
                <Icon
                  name="right-enter"
                  className="w-1.5 h-2.5 rotate-90 ml-3"
                />
              )}
            </label>
            <TextError>{errors2?.cardType?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("currencyLabel")}
            </legend>
            <label
              className={cn(
                "input w-full h-12",
                Boolean(updateId && status === "PENDING") && "input-disabled"
              )}
            >
              <input
                type="text"
                {...register2("currencies")}
                placeholder={t("currencyPlaceholder")}
                className="grow placeholder:text-sm"
                readOnly
                onClick={() => setCurrenciesOpen(true)}
                disabled={Boolean(updateId && status === "PENDING")}
              />
              {Boolean(updateId && status === "PENDING") ? null : (
                <Icon
                  name="right-enter"
                  className="w-1.5 h-2.5 rotate-90 ml-3"
                />
              )}
            </label>
            <TextError>{errors2?.currencies?.message}</TextError>
          </fieldset>
        </form>
        <ShowIf
          condition={Boolean(updateId && status === "PENDING")}
          elseEl={
            <div className="grid grid-cols-3 gap-2 mt-10">
              <button
                className="btn btn-outline h-12"
                onClick={() => {
                  setField("step", 1);
                  smoothFn();
                }}
              >
                {t("previousButtonText")}
              </button>
              <button
                className="btn btn-primary h-12 col-span-2"
                onClick={handleSubmit2(() => submit())}
              >
                {t("deposit.submit")}
              </button>
            </div>
          }
        >
          <button
            className="btn w-full mt-8 !bg-[#E0E0E0] !text-text5"
            disabled
          >
            {t("underReview")}...
          </button>
        </ShowIf>
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
          <div className="text-text2 text-xs flex">{t("agree_to_rules")}</div>
        </label>
        <a
          className="text-text1 text-xs relative top-[-4px]"
          onClick={() => {
            setField("formData", getValues());
            setField("formData1", getValues1());
            setField("formData2", getValues2());
            push(`${routerMap.protocol}?type=11`);
          }}
        >
          《 {t("applicationRulesTitle")} 》
        </a>
      </div>
      <SelectDocumentType
        open={documentSelectOpen}
        onClose={() => setDocumentSelectOpen(false)}
        onConfirm={(e) => {
          setValue1("idType", e.label, { shouldValidate: true });
          setIdTypeValue(e);
          setField("formIdType", e);
        }}
      />
      <SelectCardType
        open={cardSelectOpen}
        onClose={() => setCardSelectOpen(false)}
        onConfirm={(e) => {
          setValue2("cardType", e.label, { shouldValidate: true });
          setCardTypeValue(e);
          setField("formCardType", e);
        }}
      />
      <TimePicker
        open={timePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        value={{
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDay(),
        }}
        onChange={(e) => {
          setValue("birthDate", dayjs(e).format("DD/MM/YYYY"), {
            shouldValidate: true,
          });
          setBirthDate(e);
          setField("formatBirthDate", e);
        }}
      />
      <CountrySelectDrawer
        open={countrySelectOpen}
        onClose={() => setCountrySelectOpen(false)}
        onConfirm={(e) => {
          setValue("country", e.label, { shouldValidate: true });
          setCountryValue(e);
          setField("formCountry", e);
        }}
      />
      <SelectCurreniesType
        open={currenciesOpen}
        onClose={() => setCurrenciesOpen(false)}
        onConfirm={(e) => {
          const code = e.map((item) => item.code).join(",");
          const label = e.map((item) => item.label).join(",");
          setValue2("currencies", label, { shouldValidate: true });
          setCurrenciesValue(code);
          setField("formCurrencies", e);
        }}
      />

      <CountryNumberSelectDrawer
        open={countryNumberSelectOpen}
        onClose={() => setCountryNumberSelectOpen(false)}
        onConfirm={(e) => {
          setPrefixId(e);
          setField("formPrefixId", e);
        }}
      />
    </div>
  );
});
export default FormBox;
FormBox.displayName = "FormBox";
