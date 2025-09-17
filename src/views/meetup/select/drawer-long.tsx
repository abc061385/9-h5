import { cn } from "@/lib/utils";
import { FC, PropsWithChildren, useId } from "react";

type IProps = PropsWithChildren<{
  open?: boolean;
  onChange?: (open: boolean) => void;
  title?: string;
  className?: string;
}>;
export const Drawer: FC<IProps> = ({
  children,
  open,
  onChange,
  title,
  className,
}) => {
  const id = useId();
  const inputId = `drawer-${id}`;
  return (
    <div
      className="drawer drawer-bottom"
      role="dialog"
      aria-label={title}
      aria-modal={true}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={open}
        onChange={(e) => onChange && onChange(e.target.checked)}
        className="drawer-toggle"
      />
      <div className="drawer-side h-[2560px] md-pc:h-full !bottom-0 !top-[-10px]">
        <label
          htmlFor={inputId}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div
          className={cn([
            "fixed",
            "md-pc:absolute bottom-0 h-[50%] w-full rounded-t-2xl bg-white p-4 flex flex-col",
            className,
          ])}
        >
          <div className="flex justify-center mb-4">
            <div className="w-[46px] h-1 bg-[#D9D9D9] rounded-xs"></div>
          </div>
          {title ? (
            <p className="text-center text-lg font-bold mb-4">{title}</p>
          ) : null}
          <div className="grow overflow-hidden overflow-y-scroll no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
