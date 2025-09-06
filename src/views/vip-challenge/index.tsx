"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import ChallengeRewardRules from "./rules";
import ChallengeStatusBox from "./status";
import { routerMap, useRouter } from "@/i18n/navigation";

const VIPLevelUpChallengeView = () => {
  const { push } = useRouter();

  return (
    <ViewLayout
      header={
        <HeaderWithBack
          title={
            <div className="flex-1 flex justify-center items-center relative">
              <span></span>
              VIP Level Up Challenge
              <span
                onClick={() => push(routerMap.VIPChallengeRecord)}
                className="absolute right-[-24px] font-medium text-base text-primary"
              >
                Records
              </span>
            </div>
          }
          algin="center"
        />
      }
    >
      <BaseImage
        src="/images/vip-challenge/banner.png"
        className="w-full h-42 mt-2"
      />
      <div className="p-content">
        <h2 className="font-bold text-xl leading-5 mb-4">
          9M AI | VIP Level Up Challenge
        </h2>
        <h3 className="font-medium text-sm leading-6">
          Event Duration: Open permanently
        </h3>
        <p className="text-text4 text-sm">
          (Challenge period starts at registration date)
        </p>

        <div className="divider"></div>

        <div>
          <h3 className="font-bold leading-6 mb-4">Event Overview</h3>
          <p className="text-sm leading-5">
            The &quot;VIP Level Up Challenge&quot; is a long-term incentive
            mechanism open to all 9M AI users.
          </p>
          <p className="text-sm text-primary leading-5">
            Users who achieve VIP level advancement and team staking goals
            within the specified timeframe will win USDM rewards equivalent to
            USDT, and even have the chance to win a luxury car!
          </p>
        </div>

        <div className="divider"></div>

        <div>
          <h3 className="font-bold leading-6 mb-4">How to Participate</h3>
          <p className="text-sm leading-5">
            Go to [VIP Challenge Zone] Click the Register for Challenge button
            to start the timer. Each user can only participate in one challenge
            at a time. You can only start the next challenge after completing or
            failing the current challenge.
          </p>
        </div>

        <div className="divider"></div>

        <h3 className="font-bold leading-6 mb-4">Challenge Requirements</h3>
        <p className="text-sm leading-5">
          During the challenge period, your VIP level must be increased by 3 or
          more levels. And your team is performance must meet the corresponding
          threshold. Once achieved, the system will consider you successful and
          rewards will be distributed immediately.
        </p>

        <div className="divider"></div>

        <h3 className="font-bold leading-6 mb-4">Special Notes</h3>
        <p className="text-sm leading-5">
          You must click Register for Challenge to officially participate. If
          you are demoted to a level lower than the completed challenge, you
          must re-upgrade before registering again. Each challenge level can
          only be completed once.
        </p>

        <div className="divider"></div>

        <ChallengeRewardRules />

        <div className="divider"></div>

        <h3 className="font-bold leading-6 mb-4">Reward Details</h3>
        <p className="text-sm leading-5">
          All rewards will be issued in USDM tokens, and the equivalent
          conversion will be based on the market price on the issuance date.
          Users can choose to deposit directly into their account or withdraw
          on-chain. Physical rewards (such as a Mercedes-Benz) will be redeemed
          through dedicated customer service.
        </p>

        <div className="divider"></div>

        <h3 className="mb-6 font-medium text-primary leading-6">
          Register for the challenge now to activate exclusive promotion
          incentives.
        </h3>
        <h3 className="font-medium leading-6">
          Grasp the USDM wealth theme and win your prestigious spot with your
          strength!
        </h3>

        <div className="divider"></div>

        <ChallengeStatusBox />
      </div>
    </ViewLayout>
  );
};

export default VIPLevelUpChallengeView;
