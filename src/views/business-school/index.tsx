"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import { Icon } from "@/components/icon";
import ViewLayout from "@/components/layout";
import { routerMap, useRouter } from "@/i18n/navigation";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useState } from "react";

const BusinessSchoolView = () => {
  const api = createAxiosInstance("/app");
  const locale = useLocale();
  const { push } = useRouter();

  const [meetTypeList, setMeetTypeList] = useState<BusinessCollegeMeetType[]>();

  const getList = useCallback(async () => {
    const res: ApiResponse<{ list: BusinessCollegeMeetType[] }> = await api.get(
      "/business-college-meet-type/page-list"
    );
    setMeetTypeList(res?.data?.list || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  const stepList = [
    {
      title1: "9M AI Global Summit · 1st Stop",
      title2: "June 27｜Hong Kong",
      desc: "300+ industry elites gathered as 9M AI’s global strategy was unveiled for the first time, marking the beginning of a new era in intelligent finance.",
    },
    {
      title1: "9M AI Global Summit · 2nd Stop",
      title2: "August 8｜Seoul, Korea",
      desc: "700+ leaders from technology and finance came together to showcase cutting-edge technologies and innovation strength, with influence rapidly expanding across East Asia.",
    },
    {
      title1: "9M AI Global Summit · 3rd Stop",
      title2: "August 24｜Kuala Lumpur, Malaysia",
      desc: "500+ investors and entrepreneurs participated, upgrading the scale of the summit and accelerating the pace of globalization.",
    },
    {
      title1: "9M AI Global Summit · 4th Stop",
      title2: "September 11｜Changwon, Korea",
      desc: "700+ corporate and entrepreneurial representatives attended, deepening presence in the heart of emerging markets, driving industrial upgrading and regional economic vitality through AI finance.",
    },
    {
      title1: "9M AI Global Summit · 5th Stop",
      title2: "September 27｜Frankfurt, Germany",
      desc: "300+ European pioneers in AI finance gathered as 9M AI took the European stage for the first time, marking the company’s full internationalization.",
    },
    {
      title1: "9M AI Global Summit · 6th Stop",
      title2: "October 9｜Hong Kong",
      desc: "700+ Asian users came together in a grand celebration, setting a new record in scale and bringing 9M AI’s globalization into a new phase.",
    },
  ];
  return (
    <ViewLayout
      header={
        <HeaderWithBack title="9M AI Global Business School" algin="center" />
      }
      heightFull
      className="h-full overflow-auto no-scrollbar"
    >
      <div className="h-[148px] relative">
        <BaseImage
          src="/images/activity/business-school-banner.png"
          className="w-full h-full"
        />
        <h3 className="absolute text-xl font-bold w-40 top-13 left-6 text-white">
          9M AI Global Business School
        </h3>
      </div>
      <div className="p-content">
        {meetTypeList?.map((v) => {
          return (
            <div key={v.id} className="mt-6 pb-6 border-b border-bg3">
              <h3 className="mb-6 flex items-center justify-between">
                <span className="font-bold text-xl">{v.meetName}</span>
                <span
                  className="text-sm"
                  onClick={() =>
                    push(
                      `${routerMap.businessSchoolPreviousHighlights}?id=${v.id}`
                    )
                  }
                >
                  See more <Icon name="right-enter" className="w-1.5 h-2.5" />
                </span>
              </h3>
              <video
                src={v.fileUrl}
                controls
                className="h-[180px] w-full rounded-lg"
              ></video>
              <p className="text-sm mt-4">
                {v?.i18nList?.find((v) => v.language === locale)?.meetDesc}
              </p>
            </div>
          );
        })}
        <h3 className="font-bold text-xl my-6">9M journey</h3>
        <h4 className="font-medium text-xl mb-6">
          ​​Global Wisdom, AI-Driven — 9M AI Conquers New Heights in Global
          Finance
        </h4>
        <p className="text-sm mb-6">
          Starting from New York, crossing the core of Asian finance, and
          advancing toward the center of the European market, 9M AI is reshaping
          the global capital landscape with the power of AI-driven finance.
        </p>
        <p className="font-medium text-sm mb-6">
          Every step forward witnesses the continuous growth of technological
          strength, ecosystem scale, and global influence.
        </p>
        <div>
          {stepList?.map((v, i) => {
            return (
              <div className="pb-6 last:pb-0 flex gap-3 relative" key={i}>
                <div className="flex flex-col items-center">
                  <input
                    type="radio"
                    className="radio radio-primary radio-custom"
                    defaultChecked
                  />
                  <div
                    className="w-[1px] bg-border2 absolute top-4.5"
                    style={{ height: "calc(100% - 18px)" }}
                  ></div>
                </div>
                <dl className="flex-1">
                  <dt className="mb-3.5 font-medium text-sm">
                    <h4>{v.title1}</h4>
                    <h4>{v.title2}</h4>
                  </dt>
                  <dd className="text-sm">{v.desc}</dd>
                </dl>
              </div>
            );
          })}
        </div>
        <h3 className="font-medium text-lg mt-10 mb-6">
          Globalization Is Only the Beginning
        </h3>
        <p>
          From Asia to Europe, 9M AI continues to break boundaries with
          technology and ecosystem, connecting global capital with innovative
          power through intelligent finance.
        </p>
        <p>
          Every step is a milestone, and every gathering is a preview of the
          future — 9M AI is leading a new order in intelligent finance, allowing
          the world to witness the power of AI-driven wealth growth.
        </p>
        <button
          className="btn btn-outline w-full h-12 mb-4 mt-10"
          onClick={() => push(routerMap.studio)}
        >
          Learn more
        </button>
        <button
          className="btn btn-primary w-full h-12"
          onClick={() => push(routerMap.activity)}
        >
          Register for the event
        </button>
      </div>
    </ViewLayout>
  );
};

export default BusinessSchoolView;
