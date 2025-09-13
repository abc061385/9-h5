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
import { useMeetupStore } from "@/store/useMeetupStore";

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
    formArrangeImageFileList,
    formContactType,
    formPrefixId,
  } = useMeetupStore();

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
  const [remainingNumber, setRemainingNumber] = useState(0);

  const [imageFileList, setImageFileList] = useState<FileType[]>([
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
  ]);

  const [arrangeImageFileList, setArrangeImageFileList] = useState<FileType[]>([
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 3 },
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 3 },
  ]);

  const [videoFileList, setVideoFileList] = useState<FileType[]>([
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
    { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
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
      siteType: reg.selectMeetupType,
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
    setContactType(formContactType || { label: "Whatsapp", value: "1" });
    setPrefixId(
      formPrefixId || {
        code: "HK",
        country: "香港(中国)",
        id: 48,
        phonePrefix: "+852",
      }
    );
    setImageFileList((prev) =>
      prev.map((file, index) => {
        return formImageFileList[index] || file;
      })
    );
    setArrangeImageFileList((prev) =>
      prev.map((file, index) => {
        return formArrangeImageFileList[index] || file;
      })
    );
    setVideoFileList((prev) =>
      prev.map((file, index) => formVideoFileList[index] || file)
    );
  }, [
    formImageFileList,
    formArrangeImageFileList,
    formVideoFileList,
    formNeedLecturer,
    formIsAgreement,
    formSiteType,
    formContactType,
    formPrefixId,
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
        if (
          !arrangeImageFileList[0].fileUrl ||
          !arrangeImageFileList[1].fileUrl
        ) {
          toast.error(t("uploadVenueSetupPhotos"));
          return;
        }
        if (!videoFileList[0].fileUrl || !videoFileList[1].fileUrl) {
          toast.error(t("uploadOnsiteVideo"));
          return;
        }
        if (!isAgreement) {
          toast.error(t("readAndAgree") + t("subsidyRules"));
          return;
        }
        setSubmitLoading(true);
        const res: ApiResponse<unknown> = await api.post("/meetup/apply", {
          ...e,
          prefixId: prefixId.id,
          meetType: siteType,
          contactType: contactType.value,
          lecturer: needLecturer === "YES" ? "1" : "0",
          receiveNetwork: e.receiveNetwork === "TRX" ? "1" : "2",
          attachmentList: [
            ...imageFileList,
            ...arrangeImageFileList,
            ...videoFileList,
          ],
        });
        if (res.code === 200) {
          setSubmitLoading(false);
          toast.success(t("submitSuccess"));
          handleReset();
          push(routerMap.meetupRecords);
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

  const getRemainingNumber = useCallback(async () => {
    try {
      const res: ApiResponse<number> = await api.get("/meetup/rest-count");
      if (res.code === 200) {
        setRemainingNumber(res.data || 0);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getRemainingNumber();
  }, [getRemainingNumber]);

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

  const arrangeImageUploadDom = useMemo(() => {
    return arrangeImageFileList.map((v, i) => {
      return (
        <div key={i} className="h-50">
          <ImageUploader
            defaultUrl={v.fileUrl}
            roundedFull
            onUploadSuccess={(d) => {
              if (d.originalUrl) {
                setArrangeImageFileList((prev) =>
                  prev.map((file, index) =>
                    i === index
                      ? {
                          fileName: d.fileName,
                          fileUrl: d.originalUrl,
                          thumbnailUrl: d.thumbnailUrl,
                          fileType: 3,
                        }
                      : file
                  )
                );
                formArrangeImageFileList[i] = {
                  fileName: d.fileName,
                  fileUrl: d.originalUrl,
                  thumbnailUrl: "",
                  fileType: 3,
                };
                setField("formArrangeImageFileList", formArrangeImageFileList);
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
  }, [formArrangeImageFileList, arrangeImageFileList, setField, t]);

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

  const handleReset = () => {
    reset();
    setField("formData", {});
    setField("formImageFileList", [
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    ]);
    setField("formArrangeImageFileList", [
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 3 },
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 3 },
    ]);
    setField("formVideoFileList", [
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 2 },
    ]);
    setField("formNeedLecturer", "NO");
    setField("formIsAgreement", false);
    setField("formSiteType", "");
    setField("formContactType", { label: "Whatsapp", value: "1" });
    setField("formPrefixId", {
      code: "HK",
      country: "香港(中国)",
      id: 48,
      phonePrefix: "+852",
    });
  };

  return (
    <ViewLayout
      heightFull
      header={
        <HeaderWithBack
          title={
            <div className="flex-1 flex justify-center items-center relative">
              <span></span>
              {t("meetupApplication")}
              <span
                onClick={() => {
                  const values = getValues();
                  setField("formData", values);
                  push(routerMap.meetupRecords);
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
      className="mt-2"
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
                onClick={(e) => {
                  e.preventDefault();
                  setCountrySelectOpen(true);
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
                onClick={(e) => {
                  e.preventDefault();
                  setContactSelectOpen(true);
                }}
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
              {t("meetupType")}
            </legend>
            <label
              className="input w-full h-12"
              onClick={() => setVenueSelectOpen(true)}
            >
              <input
                type="text"
                {...register("siteType")}
                placeholder={t("selectMeetupType")}
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
          <p className="text-text4 text-sm my-4">{t("uploadVenueProof")}</p>
          <div className="grid grid-cols-2 gap-2">{imageUploadDom}</div>

          <h3 className="text-lg font-bold mt-11 mb-6">
            {t("venueSetupPhotos")}
          </h3>
          <p className="text-text4 text-sm my-4">{t("uploadSetupPhotos")}</p>
          <div className="grid grid-cols-2 gap-2">{arrangeImageUploadDom}</div>

          <h3 className="text-lg font-bold mt-11">{t("live_video_upload")}</h3>
          <p className="text-text4 text-sm my-4">{t("uploadVideos1")}</p>
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
              push(`${routerMap.protocol}?type=10`);
            }}
          >
            《{t("subsidyRules")}》
          </a>
        </div>
        <button
          className="btn btn-primary w-full mt-4"
          onClick={handleSubmit((e) => {
            submit(e);
          })}
          disabled={submitLoading || !isAgreement}
        >
          {submitLoading ? (
            <span className="loading"></span>
          ) : (
            t("submitApplication")
          )}
        </button>
        <p className="text-center mt-4 text-sm">
          {t("remainingApplications")}：{remainingNumber}
        </p>
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
          onConfirm={(v) => {
            setContactType(v);
            setField("formContactType", v);
          }}
        />
        <CountrySelectDrawer
          open={countrySelectOpen}
          onClose={() => setCountrySelectOpen(false)}
          onConfirm={(e) => {
            setPrefixId(e);
            setField("formPrefixId", e);
          }}
        />
      </div>
    </ViewLayout>
  );
};

export default StudioView;
