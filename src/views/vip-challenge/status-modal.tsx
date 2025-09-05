import { FC } from "react";
import { Modal } from "@/components/modal";
import { Icon } from "@/components/icon";
import { IconName } from "@/types/icons";

interface IStatusModalProps {
  status: 0 | 1 | 2;
  open: boolean;
  onClose: () => void;
}

const StatusModal: FC<IStatusModalProps> = ({ open, onClose, status }) => {
  const content: {
    title: string;
    desc: string;
    icon: IconName;
  }[] = [
    {
      title: "Challenge Successful",
      desc: "Congratulations on the challenge success, the reward has been sent to your account",
      icon: "modal-success",
    },
    {
      title: "Challenge Successful",
      desc: "Congratulations on successfully completing the challenge. Please contact customer service to choose your prize.",
      icon: "modal-success",
    },
    {
      title: "Challenge Failed",
      desc: "You have failed the challenge, you can re-initiate a challenge at a different VIP level",
      icon: "modal-fail",
    },
  ];
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={content[status].title}
      close={false}
      wrapClassName="bg-gradient-to-t form-[rgba(255,247,254,0)] to-[rgba(227,205,255,1)]"
    >
      <div className="flex flex-col gap-6 items-center pt-6">
        <Icon name={content[status].icon} className="size-12" />
        <p className="text-center leading-5">{content[status].desc}</p>
        <button className="btn btn-neutral w-50">Confirm</button>
      </div>
    </Modal>
  );
};
export default StatusModal;
