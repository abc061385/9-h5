"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import ListStepBox from "./list-step";
import { routerMap, useRouter } from "@/i18n/navigation";

const ActivityCenterView = () => {
  const { push } = useRouter();
  return (
    <ViewLayout
      theme="dark"
      heightFull
      header={
        <HeaderWithBack
          algin="center"
          title="9M AI Global Activity Center"
          theme="dark"
        />
      }
    >
      <BaseImage
        src="/images/activity/center-banner.png"
        className="w-full h-50"
      />
      <div className="p-content text-white">
        <div className="text-sm leading-5 py-10 border-b border-text3">
          <p>
            To better serve our global users, 9M AI is establishing offline
            activity centers in multiple cities around the world.
          </p>
          <p className="my-10">
            These centers are not only our frontier for reaching users and
            connecting with local communities, but also serve as crucial
            platforms for education, training, communication, and collaboration.
          </p>
          <p>
            We firmly believe that the future of fintech lies not only in online
            spaces but also in the warmth and trust of offline communities.
          </p>
        </div>

        <ListStepBox />
        <p className="my-10 text-sm leading-5">
          We have already established preliminary contacts with several local
          partners and will gradually start setting up activity centers and
          launching local projects in the future.
        </p>
        <button
          className="btn btn-primary w-full h-12 mb-10"
          onClick={() => push(routerMap.activity)}
        >
          Sign up for an event
        </button>
      </div>
    </ViewLayout>
  );
};

export default ActivityCenterView;
