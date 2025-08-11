import { FC, PropsWithChildren, ReactNode } from "react";
import { Modal } from ".";
import { useTrans } from "@/hooks/useTrans";

interface IConfirmModalProps extends PropsWithChildren {
  open: boolean;
  title?: string | ReactNode;
  tips: string | ReactNode;
  onChange?: (open: boolean) => void;
  onClose: () => void;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm: () => void;
}

export const ConfirmModal: FC<IConfirmModalProps> = ({
  open,
  onClose,
  title,
  tips,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}) => {
  const t = useTrans();
  return (
    <Modal open={open} onClose={onClose} close={false}>
      {title && (
        <h3 className="font-bold text-lg leading-6 text-center">{title}</h3>
      )}
      {tips && (
        <div className="text-assist2 mt-4 text-sm leading-4">{tips}</div>
      )}

      <button className="flex-1 btn btn-neutral w-full mt-6 mb-2" onClick={onConfirm}>
        {confirmText || t("common.confirm")}
      </button>
      <button
        className="flex-1 btn btn-outline w-full"
        onClick={() => {
          if (onCancel) return onCancel();
          onClose?.();
        }}
      >
        {cancelText || t("common.cancel")}
      </button>
    </Modal>
  );
};
