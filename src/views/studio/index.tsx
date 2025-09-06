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

  const t = useTrans();
  const { push } = useRouter();
  const reg = useRootReg();

  const [needLecturer, setNeedLecturer] = useState("NO");
  const [isAgreement, setIsAgreement] = useState(false);
  const [chainSelectOpen, setChainSelectOpen] = useState(false);
  const [venueSelectOpen, setVenueSelectOpen] = useState(false);
  const [contactSelectOpen, setContactSelectOpen] = useState(false);
  const [countrySelectOpen, setCountrySelectOpen] = useState(false);
  const [parNumber, setParNumber] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

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

  const imageFileList: FileType[] = useMemo(
    () => [
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    ],
    []
  );
  const videoFileList: FileType[] = useMemo(
    () => [
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
      { fileName: "", fileUrl: "", thumbnailUrl: "", fileType: 1 },
    ],
    []
  );

  const Schema = z.object({
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
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  useEffect(() => {
    Bridge.setFull(true);
  }, []);

  const submit = useCallback(
    async (e: FormData) => {
      console.log(imageFileList, videoFileList);
      try {
        if (!imageFileList[0].fileUrl || !imageFileList[1].fileUrl) {
          toast.error("请上传场地租赁凭证图片");
          return;
        }
        if (!videoFileList[0].fileUrl || !videoFileList[1].fileUrl) {
          toast.error("请上传直播视频");
          return;
        }
        if (!isAgreement) {
          toast.error("请阅读并同意工作室项目规则");
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
          toast.success("提交成功");
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
            roundedFull
            onUploadSuccess={(d) => {
              if (d.originalUrl) {
                imageFileList[i] = {
                  fileName: d.fileName,
                  fileUrl: d.originalUrl,
                  thumbnailUrl: d.thumbnailUrl,
                  fileType: 1,
                };
              }
            }}
          >
            <ShowIf condition={!v.fileName}>
              <div className="bg-bg3 rounded-lg h-full flex flex-col gap-4 items-center justify-center cursor-pointer">
                <Icon name="add" className="size-6" />
                <span className="text-text4 text-sm">
                  Click to upload photos
                </span>
              </div>
            </ShowIf>
          </ImageUploader>
        </div>
      );
    });
  }, [imageFileList]);

  const videoUploadDom = useMemo(() => {
    return videoFileList.map((v, i) => {
      return (
        <div key={i} className="h-50">
          <VideoUploader
            roundedFull
            onUploadSuccess={(d) => {
              if (d.originalUrl) {
                videoFileList[i] = {
                  fileName: d.fileName,
                  fileUrl: d.originalUrl,
                  thumbnailUrl: "",
                  fileType: 2,
                };
              }
            }}
          >
            <ShowIf condition={!v.fileName}>
              <div className="bg-bg3 rounded-lg h-full flex flex-col gap-4 items-center justify-center cursor-pointer">
                <Icon name="add" className="size-6" />
                <span className="text-text4 text-sm">
                  Click to upload photos
                </span>
              </div>
            </ShowIf>
          </VideoUploader>
        </div>
      );
    });
  }, [videoFileList]);

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={
            <div className="flex-1 flex justify-center items-center relative">
              <span></span>
              Studio Application
              <span
                onClick={() => push(routerMap.studioRecords)}
                className="absolute right-[-24px] font-medium text-base text-primary"
              >
                Records
              </span>
            </div>
          }
          algin="center"
        />
      }
      className="h-max mt-2"
    >
      <BaseImage src="/images/studio/banner.png" className="w-full h-[148px]" />
      <div className="p-content pb-10">
        <h2 className="font-bold text-xl leading-5 mb-2">Basic Information</h2>
        <form className="grow" autoComplete="off">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Phone number
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
                placeholder="Please enter your phone number"
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.phoneNumber?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Email
            </legend>
            <label className="input w-full h-12">
              <input
                type="email"
                {...register("emailAccount")}
                placeholder={t("请输入要绑定的邮箱账号")}
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.emailAccount?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex-col items-start gap-1">
              <h3 className="font-medium text-base">Venue Address</h3>
              <p className="text-sm text-text4 font-normal">
                Please provide as detailed an address as possible (country,
                city, and specific address, including venue name, street number,
                and street name) for subsequent verification.
              </p>
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("address")}
                placeholder="Please enter the venue address"
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.address?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Contact
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
                placeholder="Please enter contact information"
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.contactInformation?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Venue Type
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("siteType")}
                placeholder="Please select venue type"
                className="grow placeholder:text-sm"
                readOnly
                onClick={() => setVenueSelectOpen(true)}
              />
              <Icon name="right-enter" className="w-1.5 h-2.5 rotate-90 ml-3" />
            </label>
            <TextError>{errors?.siteType?.message}</TextError>
          </fieldset>

          <h3 className="text-lg font-bold mt-11 mb-6">
            Venue rental certificate
          </h3>
          <div className="grid grid-cols-2 gap-2">{imageUploadDom}</div>

          <h3 className="text-lg font-bold mt-11">Live video</h3>
          <p className="text-text4 text-sm my-4">
            Please upload a live video. Each video should be ≥ 10 minutes long
            and have more than 20 participants. The video should clearly show
            the scene and the teaching situation.
          </p>
          <div className="grid grid-cols-2 gap-2">{videoUploadDom}</div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Operational Plan
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("operationPlan")}
                placeholder="Please enter your operating plan"
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.operationPlan?.message}</TextError>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Number of participants
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                {...register("participantNumber")}
                placeholder="Please enter the number of participants"
                className="grow placeholder:text-sm"
                onChange={(e) => setParNumber(e.target.value)}
              />
            </label>
            <TextError>{errors?.participantNumber?.message}</TextError>
          </fieldset>

          <ShowIf condition={Number(parNumber || 0) > 25}>
            <div className="flex items-center justify-between mt-4 mb-2">
              <h4 className="font-medium text-sm">Do you need a lecturer?</h4>
              <div className="flex items-center gap-6">
                {["YES", "NO"].map((v) => {
                  return (
                    <div
                      key={v}
                      className="flex gap-2"
                      onClick={() => setNeedLecturer(v)}
                    >
                      <div
                        className={cn(
                          "border-2 rounded-full size-6 flex items-center justify-center",
                          needLecturer === v
                            ? "!bg-primary !border-primary"
                            : " !border-border1 !bg-transparent"
                        )}
                      >
                        <Icon name="duigou" />
                      </div>
                      <span className="font-medium">{v}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <ShowIf condition={needLecturer === "YES"}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-medium text-sm py-3.5">
                  Language of Instruction
                </legend>
                <label className="input w-full h-12">
                  <input
                    type="text"
                    {...register("teachLanguage")}
                    placeholder="Please enter the language of instruction"
                    className="grow placeholder:text-sm"
                  />
                </label>
                <TextError>{errors?.teachLanguage?.message}</TextError>
              </fieldset>
            </ShowIf>
          </ShowIf>

          <fieldset className="fieldset">
            <legend className="fieldset-legend font-medium text-sm py-3.5">
              Receiving address
            </legend>
            <label className="input w-full h-12">
              <input
                type="text"
                placeholder="Please select chain"
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
                placeholder="Please enter the  address"
                className="grow placeholder:text-sm"
              />
            </label>
            <TextError>{errors?.receiveAddress?.message}</TextError>
          </fieldset>
        </form>
        <div className="flex items-center text-xs text-text4 mt-8">
          <label className="label">
            <input
              type="checkbox"
              className="checkbox checkbox-neutral"
              checked={isAgreement}
              onChange={(e) => setIsAgreement(e.target.checked)}
            />

            {t("我已阅读")}
          </label>
          <span
            className="text-text1"
            onClick={() => {
              push(`${routerMap.protocol}?type=9`);
            }}
          >
            《 Training Center/Studio Program Rules 》
          </span>
        </div>
        <button
          className="btn btn-primary w-full mt-4"
          onClick={handleSubmit((e) => {
            console.log(e);
            submit(e);
          })}
          disabled={submitLoading}
        >
          {submitLoading ? (
            <span className="loading"></span>
          ) : (
            "Submit your application"
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
            setValue("siteType", e.label);
            setSiteTypeValue(e.value);
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
