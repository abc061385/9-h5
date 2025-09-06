import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import { Icon } from "@/components/icon";
import { IconName } from "@/types/icons";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";

interface ResultType {
  orderId: number;
  resultStr: string;
  resultTitle: string;
  status: number;
}

const StatusModal = () => {
  const api = createAxiosInstance("/app/");

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [challengeResults, setChallengeResults] = useState<ResultType>();

  const getResults = useCallback(async () => {
    const res: ApiResponse<ResultType> = await api.post(
      "/level-race/check-finish"
    );
    if (res.code === 200) {
      setChallengeResults(res.data);
      if (res.data.orderId) {
        setStatusModalOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getResults();
  }, [getResults]);

  const content: {
    icon: IconName;
  }[] = [
    { icon: "modal-success" },
    { icon: "modal-success" },
    { icon: "modal-fail" },
  ];
  return (
    <Modal
      open={statusModalOpen}
      onClose={() => setStatusModalOpen(false)}
      title={challengeResults?.resultTitle}
      close={false}
      wrapClassName="bg-gradient-to-t form-[rgba(255,247,254,0)] to-[rgba(227,205,255,1)]"
    >
      <div className="flex flex-col gap-6 items-center pt-6">
        <Icon
          name={content[challengeResults?.status || 1].icon}
          className="size-12"
        />
        <p className="text-center leading-5">{challengeResults?.resultStr}</p>
        <button
          className="btn btn-neutral w-50"
          onClick={() => setStatusModalOpen(false)}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};
export default StatusModal;
