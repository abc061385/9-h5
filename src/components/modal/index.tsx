import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactNode, useId } from "react";
import { Icon } from "../icon";

interface IModalProps extends PropsWithChildren {
  open: boolean;
  title?: string | ReactNode;
  onChange?: (open: boolean) => void;
  onClose: () => void;
  wrapClassName?: string;
  titleClassName?: string;
  close?: boolean;
  children?: ReactNode;
}

export const Modal: React.FC<IModalProps> = ({
  open,
  title = "",
  onClose,
  wrapClassName = "",
  titleClassName = "",
  close = true,
  children,
}) => {
  const id = useId();
  const inputId = `modal-${id}`;
  return (
    <div>
      <input
        id={inputId}
        type="checkbox"
        checked={open}
        className="modal-toggle"
        onChange={() => onClose?.()}
      />
      <div className="modal" role="dialog">
        <div className={cn("modal-box rounded-2xl", wrapClassName)}>
          <header className="relative pt-2">
            {title && (
              <div
                className={cn(
                  "font-bold text-center text-lg",
                  titleClassName
                )}
              >
                {title}
              </div>
            )}
            {close && (
              <Icon
                name="close"
                className="absolute right-0 top-0"
                onClick={() => onClose?.()}
              />
            )}
          </header>
          {children}
        </div>
        <label className="modal-backdrop" htmlFor={inputId}>
          Close
        </label>
      </div>
    </div>
  );
};
