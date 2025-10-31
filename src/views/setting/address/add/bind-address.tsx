import { Modal } from "@/components/modal";
import { FC } from "react";
// import { useTrans } from "@/hooks/useTrans";

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
  // const t = useTrans();
  return (
    <Modal open={open} onClose={onClose} title="Bind Address" close={false}>
      <div>
        <p className="text-center break-words mb-6">
          {network} withdrawal address:
        </p>
        <p className="text-center break-words mb-4 leading-none">{address}</p>
        <p className="text-center break-words mb-6 text-assist2 leading-none">
          For the safety of your funds, please ensure that your address is
          correct. Once filled in, it cannot be modified or deleted.
        </p>
        <button
          className="btn btn-primary bg-black text-white shadow-none w-full mb-2"
          onClick={onOk}
        >
          Binding
        </button>
        <button className="btn btn-outline w-full" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default BindAddressModal;
