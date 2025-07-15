// 暂时不用
import { FC, PropsWithChildren, ReactNode } from "react";
import { FixedLayout } from "./fxied-layout";
import { cn } from "@/lib/utils";

type IProps = Pick<HTMLFormElement, "onSubmit"> & {
  header?: ReactNode;
  scroll?: boolean;
};

export const FormComponent: FC<PropsWithChildren<IProps>> = ({
  onSubmit,
  children,
  scroll = false,
  header,
}) => {
  const buttonNode = (
    <button type="submit" className="btn btn-primary w-full" onClick={onSubmit}>
      提交
    </button>
  );
  return (
    <FixedLayout header={header} footer={scroll ? buttonNode : null}>
      <form
        className={cn([
          "flex flex-col grow pb-4",
          scroll ? "overflow-y-scroll  overflow-hidden" : "",
        ])}
      >
        <div className="space-y-4 grow">{children}</div>
      </form>
      {scroll ? null : buttonNode}
    </FixedLayout>
  );
};
