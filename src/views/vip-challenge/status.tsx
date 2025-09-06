import { useCallback, useEffect, useState } from "react";
import { routerMap, useRouter } from "@/i18n/navigation";
import { ShowIf } from "@/components/show-if";
import ChallengeProgress from "./progress";
import { Icon } from "@/components/icon";
import { Modal } from "@/components/modal";
import StatusModal from "./status-modal";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";

const ChallengeStatusBox = () => {
  const api = createAxiosInstance("/app/");
  const { push } = useRouter();

  const [isAgreement, setIsAgreement] = useState(false);
  const [towardsStandardsTipsOpen, setTowardsStandardsTipsOpen] =
    useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const getResults = useCallback(async () => {
    const res = await api.post("/level-race/check-finish");
    console.log(res);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getResults();
  }, [getResults]);

  const signUp = useCallback(async () => {
    const res: ApiResponse<unknown> = await api.post(
      "/level-race/registration"
    );
    console.log(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ShowIf condition={true}>
        <button
          className="btn btn-primary w-full mb-4"
          onClick={() => signUp()}
        >
          Sign up
        </button>
        <div className="pl-5">
          <label className="label ml-[-20px]">
            <input
              type="checkbox"
              checked={isAgreement}
              onChange={(e) => setIsAgreement(e.target.checked)}
              className="checkbox checkbox-neutral size-4 mt-0.5"
            />
            <div className="text-text4 text-xs flex">
              I have read and agree to the
            </div>
          </label>
          <a
            className="text-text1 text-xs relative top-[-6px]"
            onClick={() => {
              push(`${routerMap.protocol}?type=8`);
            }}
          >
            《 VIP Level Up Challenge Rules 》
          </a>
          <div className="divider"></div>
          <p className="text-sm">
            Your current level is <span className="text-primary">VIP3</span>, so
            you can only sign up for VIP3 corresponding activities
          </p>
        </div>
      </ShowIf>
      <ShowIf condition={false}>
        <button className="btn btn-outline w-full mb-4">In progress</button>
        <p className="text-sm leading-5">
          Please complete the challenge before
        </p>
        <p className="text-sm text-primary leading-5">2025-03-23 16:12</p>

        <div className="divider"></div>

        <h3 className="font-medium leading-6 mb-4">
          Progress towards achieving the target
          <Icon
            name="annotation"
            className="size-3 ml-2"
            onClick={() => setTowardsStandardsTipsOpen(true)}
          />
        </h3>

        <p className="text-sm mb-2">Team investment completion status</p>
        <ChallengeProgress value={45} max={89} />
        <p className="text-sm">
          <span className="text-primary">450,000.00</span>/1,000,000 USDT
        </p>

        <p className="text-sm mb-2 mt-6">VIP upgrade progress</p>
        <ChallengeProgress value={80} max={89} />
        <p className="text-sm">
          <span className="text-primary">V3</span>/V6
        </p>
      </ShowIf>
      <Modal
        title="Progress towards standards"
        open={towardsStandardsTipsOpen}
        onClose={() => setTowardsStandardsTipsOpen(false)}
      >
        <p className="text-sm mt-2 text-center">
          Only investment amounts for products with an investment period of 180
          days or longer are displayed.
        </p>
      </Modal>
      <StatusModal
        status={1}
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />
    </div>
  );
};
export default ChallengeStatusBox;
