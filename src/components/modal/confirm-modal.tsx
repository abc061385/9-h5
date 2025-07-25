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
      {title && <h3 className="font-bold text-center">{title}</h3>}
      {tips && (
        <p className="text-text2 font-bold mt-4 leading-[120%]">{tips}</p>
      )}
      <div className="flex justify-between gap-4 mt-6">
        <button
          className="flex-1 btn"
          onClick={() => {
            if (onCancel) return onCancel();
            onClose?.();
          }}
        >
          {cancelText || t("common.cancel")}
        </button>
        <button className="flex-1 btn btn-primary" onClick={onConfirm}>
          {confirmText || t("common.confirm")}
        </button>
      </div>
    </Modal>
  );
};
