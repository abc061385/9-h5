import { useCallback, useEffect, useState } from "react";
import { routerMap, useRouter } from "@/i18n/navigation";
import { ShowIf } from "@/components/show-if";
import ChallengeProgress from "./progress";
import { Icon } from "@/components/icon";
import { Modal } from "@/components/modal";
import StatusModal from "./status-modal";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { formatBalance } from "@/lib/utils";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useTrans } from "@/hooks/useTrans";
import { useUserStore } from "@/store/useUserStore";

export interface IntroduceType {
  orderId: number;
  orderStatus: 0 | 1 | 2;
  raceIntroduce?: string;
  targetInvestment: number;
  targetVipLevel: number;
  teamInvestment: number;
  vipLevel: number;
  endTime: string;
}

const ChallengeStatusBox = () => {
  const t = useTrans();
  const api = createAxiosInstance("/app/");
  const { push } = useRouter();

  const { userInfo } = useUserStore();

  const [isAgreement, setIsAgreement] = useState(false);
  const [towardsStandardsTipsOpen, setTowardsStandardsTipsOpen] =
    useState(false);

  const [introduce, setIntroduce] = useState<IntroduceType>();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const getIntroduce = useCallback(async () => {
    try {
      const res: ApiResponse<IntroduceType> = await api.get(
        "/level-race/introduce"
      );
      if (res.code === 200) {
        setIntroduce(res.data);
      }
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getIntroduce();
  }, [getIntroduce]);

  const signUp = useCallback(async () => {
    if (!isAgreement) {
      toast.error(t("agreeToRules1"));
      return;
    }
    setConfirmLoading(true);
    try {
      const res: ApiResponse<{
        code: number;
        message: string;
      }> = await api.post("/level-race/registration");
      if (res.code === 200) {
        if (res?.data?.code === 500) {
          toast.error(res.data.message);
          setConfirmLoading(false);
          return;
        }
        setConfirmLoading(false);
        toast.success(t("registrationSuccess"));
        push(routerMap.VIPChallengeRecord);
      }
    } catch (error) {
      console.log(error);
      setConfirmLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAgreement]);

  return (
    <div>
      <ShowIf condition={introduce?.orderStatus !== 0}>
        <button
          className="btn btn-primary w-full mb-4"
          onClick={() => signUp()}
          disabled={confirmLoading}
        >
          {confirmLoading ? <span className="loading"></span> : t("register")}
        </button>
        <div className="pl-5">
          <label className="label ml-[-20px]">
            <input
              type="checkbox"
              checked={isAgreement}
              onChange={(e) => setIsAgreement(e.target.checked)}
              className="checkbox checkbox-neutral size-4 mt-0.5"
            />
            <div className="text-text4 text-xs flex">{t("agree_to_rules")}</div>
          </label>
          <a
            className="text-text1 text-xs relative top-[-6px]"
            onClick={() => {
              push(`${routerMap.protocol}?type=8`);
            }}
          >
            《 {t("programRules")} 》
          </a>
        </div>
        <ShowIf
          condition={userInfo?.vipLevel !== 0 && userInfo?.vipLevel !== 9}
        >
          <div className="divider"></div>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: t("currentLevelMessage", {
                vip: `<span style="color:#6E2AFE;">VIP${
                  introduce?.vipLevel || 0
                }</span>`,
              }),
            }}
          ></p>
        </ShowIf>
      </ShowIf>
      <ShowIf condition={introduce?.orderStatus === 0}>
        <button className="btn btn-outline w-full mb-4">
          {t("challengeInProgress")}
        </button>
        <p className="text-sm leading-5">
          {t("challengeDeadline", { time: "" })}
        </p>
        <p className="text-sm text-primary leading-5">
          {dayjs(new Date(introduce?.endTime ?? "").getTime()).format(
            "YYYY-MM-DD HH:mm"
          )}
        </p>

        <div className="divider"></div>

        <h3 className="font-medium leading-6 mb-4">
          {t("progressStatus")}
          <Icon
            name="annotation"
            className="size-3 ml-2"
            onClick={() => setTowardsStandardsTipsOpen(true)}
          />
        </h3>

        <p className="text-sm mb-2">{t("teamInvestmentProgress")}</p>
        <ChallengeProgress
          value={introduce?.teamInvestment || 0}
          max={introduce?.targetInvestment || 1}
        />
        <p className="text-sm">
          <span className="text-primary">
            {formatBalance(introduce?.teamInvestment || 0, 2)}
          </span>{" "}
          / {formatBalance(introduce?.targetInvestment || 0, 2)} USDT
        </p>

        <p className="text-sm mb-2 mt-6">{t("vipUpgradeProgress")}</p>
        <ChallengeProgress
          value={introduce?.vipLevel || 0}
          max={introduce?.targetVipLevel || 1}
        />
        <p className="text-sm">
          <span className="text-primary">V{introduce?.vipLevel}</span> / V
          {introduce?.targetVipLevel}
        </p>
      </ShowIf>
      <Modal
        title={t("progressStatus")}
        open={towardsStandardsTipsOpen}
        onClose={() => setTowardsStandardsTipsOpen(false)}
      >
        <p className="text-sm mt-2 text-center">{t("investmentNote")}</p>
      </Modal>
      <StatusModal />
    </div>
  );
};
export default ChallengeStatusBox;
