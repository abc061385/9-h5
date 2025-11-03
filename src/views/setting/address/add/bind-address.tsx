import { Modal } from "@/components/modal";
import { FC } from "react";
import { useTrans } from "@/hooks/useTrans";
import { api } from "@/api";
import toast from "react-hot-toast";
import { useWithdrawalStore } from "@/store/useWithdrawal";

type IProps = {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  address: string;
  network: string;
};

const BindAddressModal: FC<IProps> = ({
  open,
  onClose,
  onOk,
  address,
  network,
}) => {
  const getAddrMap = useWithdrawalStore((s) => s.getAddrMap);

  const t = useTrans();
  const hanldeSubmit = async () => {
    try {
      await api.withdrawAddress.bindAddressUsingPost({
        addr: address,
        protocol: network,
      });

      toast.success(t("googleVerify.bindComplete"));
      onOk();
      getAddrMap();
    } catch {
      onOk();
    }
  };
  return (
    <Modal open={open} onClose={onClose} title={t("bindAddress")} close={false}>
      <div>
        <p className="text-center break-words mb-6">
          {t("bindAddressTitle", { network })}
        </p>
        <p className="text-center break-words mb-4 leading-none">{address}</p>
        <p className="text-center break-words mb-6 text-assist2 leading-none">
          {t("bindAddressTips")}
        </p>
        <button
          className="btn btn-primary bg-black text-white shadow-none border-none w-full mb-2"
          onClick={hanldeSubmit}
        >
          {t("binding")}
        </button>
        <button className="btn btn-outline w-full" onClick={onClose}>
          {t("common.cancel")}
        </button>
      </div>
    </Modal>
  );
};

export default BindAddressModal;
