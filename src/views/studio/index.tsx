"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { useRootReg } from "@/lib/z";
import { TextError } from "@/components/input/text-error";
import { useTrans } from "@/hooks/useTrans";
import { Icon } from "@/components/icon";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import ChainSelectDrawer from "./select/chain";
import VenueSelectDrawer from "./select/venue";
import ContactSelectDrawer from "./select/contact";
import CountrySelectDrawer from "./select/country";
import { routerMap, useRouter } from "@/i18n/navigation";
import Bridge from "@/lib/dsBridge";
import { CountryListType, FileType, SelectListType } from "./type";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import ImageUploader from "./img-uploader";
import { ShowIf } from "@/components/show-if";
import VideoUploader from "./video-uploader";
import toast from "react-hot-toast";
import { useStudioStore } from "@/store/useStudioStore";

type FormData = {
  emailAccount: string;
  phoneNumber: string;
  address: string;
  contactInformation: string;
  operationPlan: string;
  participantNumber: string;
  teachLanguage: string;
  receiveAddress: string;
  siteType: string;
  receiveNetwork: string;
};

const StudioView = () => {
  const api = createAxiosInstance("/app/");
  const {
    setField,
    formData,
    formImageFileList,
    formVideoFileList,
    formNeedLecturer,
    formIsAgreement,
    formSiteType,
  } = useStudioStore();

  const t = useTrans();
  const { push, back } = useRouter();
  const reg = useRootReg();

  const [needLecturer, setNeedLecturer] = useState("NO");
  const [isAgreement, setIsAgreement] = useState(false);
  const [chainSelectOpen, setChainSelectOpen] = useState(false);
  const [venueSelectOpen, setVenueSelectOpen] = useState(false);
  const [contactSelectOpen, setContactSelectOpen] = useState(false);
  const [countrySelectOpen, setCountrySelectOpen] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [imageFileList, setImageFileList] = useState<FileType[]>([
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
  ]);

  const [videoFileList, setVideoFileList] = useState<FileType[]>([
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
  ]);

  const [prefixId, setPrefixId] = useState<CountryListType>({
    code: "HK",
    country: "香港(中国)",
    id: 48,
    phonePrefix: "+852",
  });
  const [siteType, setSiteTypeValue] = useState("");
  const [contactType, setContactType] = useState<SelectListType>({
    label: "Whatsapp",
    value: "1",
  });

  const Schema = z
    .object({
      emailAccount: reg.email,
      phoneNumber: reg.countryPhone,
      address: reg.studioAddress,
      contactInformation: reg.studioContactType,
      operationPlan: reg.studioOperationPlan,
      participantNumber: reg.studioParticipantNumber,
      teachLanguage: z.any(),
      receiveAddress: reg.studioReceiveAddress,
      siteType: reg.studioSiteType,
      receiveNetwork: z.string(),
    })
    .refine(
      (data) => {
        if (
          Number(data.participantNumber || 0) >= 25 &&
          needLecturer === "YES" &&
          !Boolean(data.teachLanguage)
        ) {
          return false;
        }
        return true;
      },
      { message: t("enter_language_of_instruction"), path: ["teachLanguage"] }
    );

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  useEffect(() => {
    setNeedLecturer(formNeedLecturer || "NO");
    setIsAgreement(formIsAgreement);
    setSiteTypeValue(formSiteType);
    setImageFileList((prev) =>
      prev.map((file, index) => {
        return formImageFileList[index] || file;
      })
    );
    setVideoFileList((prev) =>
      prev.map((file, index) => formVideoFileList[index] || file)
    );
  }, [
    formImageFileList,
    formVideoFileList,
    formNeedLecturer,
    formIsAgreement,
    formSiteType,
  ]);

  useEffect(() => {
    Bridge.setFull(true);
  }, []);

  const submit = useCallback(
    async (e: FormData) => {
      try {
        if (!imageFileList[0].fileUrl || !imageFileList[1].fileUrl) {
          toast.error(t("uploadLeaseCertificate"));
          return;
        }
        if (!videoFileList[0].fileUrl || !videoFileList[1].fileUrl) {
          toast.error(t("uploadOnsiteVideo"));
          return;
        }
        if (!isAgreement) {
          toast.error(t("agreeToRules"));
          return;
        }
        setSubmitLoading(true);
        const res: ApiResponse<unknown> = await api.post("/workroom/apply", {
          ...e,
          prefixId: prefixId.id,
          siteType: siteType,
          contactType: contactType.value,
          lecturer: needLecturer === "YES" ? "1" : "0",
          receiveNetwork: e.receiveNetwork === "TRX" ? "1" : "2",
          attachmentList: [...imageFileList, ...videoFileList],
        });
        if (res.code === 200) {
          setSubmitLoading(false);
          toast.success(t("submitSuccess"));
          handleReset();
          push(routerMap.studioRecords);
        }
      } catch (error) {
        console.log(error);
        setSubmitLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      prefixId,
      siteType,
      contactType,
      needLecturer,
      imageFileList,
      videoFileList,
      isAgreement,
    ]
  );

  const imageUploadDom = useMemo(() => {
    return imageFileList.map((v, i) => {
      return (
        <div key={i} className="h-50">
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
                <span className="text-text4 text-sm">{t("uploadPhotos")}</span>
              </div>
            </ShowIf>
          </ImageUploader>
        </div>
      );
    });
  }, [formImageFileList, imageFileList, setField, t]);

  const videoUploadDom = useMemo(() => {
    return videoFileList.map((v, i) => {
      return (
        <div key={i} className="h-50">
          <VideoUploader
            defaultUrl={v.fileUrl}
            roundedFull
            onUploadSuccess={(d) => {
              if (d.originalUrl) {
                setVideoFileList((prev) =>
                  prev.map((file, index) =>
                    i === index
                      ? {
                          fileName: d.fileName,
                          fileUrl: d.originalUrl,
                          thumbnailUrl: "",
                          fileType: 2,
                        }
                      : file
                  )
                );
                formVideoFileList[i] = {
                  fileName: d.fileName,
                  fileUrl: d.originalUrl,
                  thumbnailUrl: "",
                  fileType: 2,
                };
                setField("formVideoFileList", formVideoFileList);
              }
            }}
            className="bg-bg3 rounded-lg"
          >
            <ShowIf condition={!v.fileName}>
              <div className="bg-bg3 rounded-lg h-full flex flex-col gap-4 items-center justify-center cursor-pointer">
                <Icon name="add" className="size-6" />
                <span className="text-text4 text-sm">{t("uploadVideos")}</span>
              </div>
            </ShowIf>
          </VideoUploader>
        </div>
      );
    });
  }, [videoFileList, t, formVideoFileList, setField]);

  const needLecturerList = [
    { label: t("yes"), value: "YES" },
    { label: t("no"), value: "NO" },
  ];

  const handleReset = () => {
    reset();
    setField("formData", {});
    setField("formImageFileList", [
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    ]);
    setField("formVideoFileList", [
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
    ]);
    setField("formNeedLecturer", "NO");
    setField("formIsAgreement", false);
    setField("formSiteType", "");
  };

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={
            <div className="flex-1 flex justify-center items-center relative">
              <span></span>
              {t("studio_application")}
              <span
                onClick={() => {
                  const values = getValues();
                  setField("formData", values);
                  push(routerMap.studioRecords);
                }}
                className="absolute right-[-24px] font-medium text-base text-primary"
              >
                {t("records")}
              </span>
            </div>
          }
          algin="center"
          onClick={() => {
            handleReset();
            Bridge.goBack();
            back();
          }}
        />
      }
      className="h-max mt-2"
    >
      <BaseImage src="/images/studio/banner.png" className="w-full h-[148px]" />
      <div className="p-content pb-10">
        <h2 className="font-bold text-xl leading-5 mb-2">{t("basic_info")}</h2>
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("phone_number")}
            </legend>
            <label className="input w-full h-12">
              <div
                className="h-6 border-r border-border2 pr-2.5"
                onClick={() => setCountrySelectOpen(true)}
              >
                <b>{prefixId?.phonePrefix}</b>
                <Icon
                  name="right-enter"
                  className="w-1.5 h-2.5 rotate-90 ml-3"
                />
              </div>
              <input
                type="text"
                {...register("phoneNumber")}
                placeholder={t("enter_phone_number")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.phoneNumber?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("login.email")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="email"
                {...register("emailAccount")}
                placeholder={t("enter_email_address")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.emailAccount?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex-col items-start gap-1">
              <h3 className="font-medium text-base">{t("venue_address")}</h3>
              <p className="text-sm text-text4 font-normal">
                {t("venue_address_detail")}
              </p>
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("address")}
                placeholder={t("enter_venue_address")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.address?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("contact_info")}
            </legend>
            <label className="input w-full h-12">
              <div
                className="h-6 border-r border-border2 pr-2.5"
                onClick={() => setContactSelectOpen(true)}
              >
                <b>{contactType.label}</b>
                <Icon
                  name="right-enter"
                  className="w-1.5 h-2.5 rotate-90 ml-3"
                />
              </div>
              <input
                type="text"
                {...register("contactInformation")}
                placeholder={t("enter_contact_info")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.contactInformation?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("venue_type")}
            </legend>
            <label
              className="input w-full h-12"
              onClick={() => setVenueSelectOpen(true)}
            >
              <input
                type="text"
                {...register("siteType")}
                placeholder={t("select_venue_type")}
                className="grow placeholder:text-sm"
                readOnly
              />
              <Icon name="right-enter" className="w-1.5 h-2.5 rotate-90 ml-3" />
            </label>
            <TextError>{errors?.siteType?.message}</TextError>
          </fieldset>

          <h3 className="text-lg font-bold mt-11 mb-6">
            {t("venue_rental_certificate")}
          </h3>
          <div className="grid grid-cols-2 gap-2">{imageUploadDom}</div>

          <h3 className="text-lg font-bold mt-11">{t("live_video_upload")}</h3>
          <p className="text-text4 text-sm my-4">{t("upload_live_video")}</p>
          <div className="grid grid-cols-2 gap-2">{videoUploadDom}</div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("operational_plan")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("operationPlan")}
                placeholder={t("enter_operational_plan")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.operationPlan?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("number_of_participants")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("participantNumber")}
                placeholder={t("enter_participants_number")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.participantNumber?.message}</TextError>
          </fieldset>
          <ShowIf condition={Number(watch().participantNumber || 0) >= 25}>
            <div className="flex items-center justify-between mt-4 mb-2">
              <h4 className="font-medium text-sm">{t("need_lecturer")}</h4>
              <div className="flex items-center gap-6">
                {needLecturerList.map((v) => {
                  return (
                    <div
                      key={v.value}
                      className="flex gap-2"
                      onClick={() => {
                        setNeedLecturer(v.value);
                        setField("formNeedLecturer", v.value);
                        setValue("teachLanguage", "", { shouldValidate: true });
                      }}
                    >
                      <div
                        className={cn(
                          "border-2 rounded-full size-6 flex items-center justify-center",
                          needLecturer === v.value
                            ? "!bg-primary !border-primary"
                            : " !border-border1 !bg-transparent"
                        )}
                      >
                        <Icon name="duigou" />
                      </div>
                      <span className="font-medium">{v.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <ShowIf condition={needLecturer === "YES"}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-medium text-sm py-3.5">
                  {t("language_of_instruction")}
                </legend>
                <label className="input w-full h-12">
                  <input
                    type="text"
                    {...register("teachLanguage", {
                      required:
                        needLecturer === "YES"
                          ? t("enter_language_of_instruction")
                          : false,
                    })}
                    placeholder={t("enter_language_of_instruction")}
                    className="grow placeholder:text-sm"
                  />
                </label>
                <TextError>{errors?.teachLanguage?.message}</TextError>
              </fieldset>
            </ShowIf>
          </ShowIf>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              {t("receiving_address")}
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                placeholder={t("withdraw.selectChain")}
                className="grow placeholder:text-sm"
                readOnly
                {...register("receiveNetwork")}
                onClick={() => setChainSelectOpen(true)}
              />
              <Icon name="right-enter" className="w-1.5 h-2.5 rotate-90 ml-3" />
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("receiveAddress")}
                placeholder={t("enter_receiving_address")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.receiveAddress?.message}</TextError>
          </fieldset>
        </form>
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
            className="text-text1 text-xs relative top-[-6px]"
            onClick={() => {
              const values = getValues();
              setField("formData", values);
              push(`${routerMap.protocol}?type=9`);
            }}
          >
            《 {t("training_center_rules")} 》
          </a>
        </div>
        <button
          className="btn btn-primary w-full mt-4"
          onClick={handleSubmit((e) => {
            submit(e);
          })}
          disabled={submitLoading}
        >
          {submitLoading ? (
            <span className="loading"></span>
          ) : (
            t("submitApplication")
          )}
        </button>
        <ChainSelectDrawer
          open={chainSelectOpen}
          onClose={() => setChainSelectOpen(false)}
          onConfirm={(chain) => {
            setValue("receiveNetwork", chain);
          }}
        />
        <VenueSelectDrawer
          open={venueSelectOpen}
          onClose={() => setVenueSelectOpen(false)}
          onConfirm={(e) => {
            setValue("siteType", e.label, { shouldValidate: true });
            setSiteTypeValue(e.value);
            setField("formSiteType", e.value);
          }}
        />
        <ContactSelectDrawer
          open={contactSelectOpen}
          onClose={() => setContactSelectOpen(false)}
          onConfirm={(v) => setContactType(v)}
        />
        <CountrySelectDrawer
          open={countrySelectOpen}
          onClose={() => setCountrySelectOpen(false)}
          onConfirm={(e) => setPrefixId(e)}
        />
      </div>
    </ViewLayout>
  );
};

export default StudioView;
