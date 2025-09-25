import { useTrans } from "@/hooks/useTrans";
import { FC, useState } from "react";
import { DrawerPortal } from "@/components/drawer-portal";
import { Drawer } from "@/components/drawer";
import { useUCardStore } from "@/store/useUCardStore";
import { ShowIf } from "@/components/show-if";
import { Icon } from "@/components/icon";

interface ISelectProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (v: { label: string; code: string }[]) => void;
}

const SelectCurreniesType: FC<ISelectProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const t = useTrans();
  const { currencies } = useUCardStore();

  const [checkList, setCheckList] = useState<{ label: string; code: string }[]>(
    []
  );

  return (
    <DrawerPortal>
      <Drawer
        className="h-auto"
        title={t("currencyPlaceholder")}
        open={open}
        onChange={() => onClose?.()}
      >
        <div className="max-h-[400px] overflow-auto no-scrollbar">
          {currencies?.map((v) => {
            return (
              <div
                key={v.code}
                className="flex items-center justify-between py-3.5 border-b border-border2"
                onClick={() => {
                  const arr = [...checkList];
                  const isCheck = checkList.findIndex(
                    (check) => v.code === check.code
                  );
                  if (isCheck === -1) {
                    arr.push(v);
                  } else {
                    arr.splice(isCheck, 1);
                  }

                  setCheckList(arr);
                }}
              >
                <span className="font-bold flex-1">{v.label}</span>
                <ShowIf
                  condition={
                    checkList.findIndex((check) => check.code === v.code) !== -1
                  }
                >
                  <Icon name="duigou-primary" className="w-4 h-3" />
                </ShowIf>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-primary w-full mt-6"
          onClick={() => {
            onConfirm?.(checkList);
            onClose?.();
          }}
        >
          {t("common.confirm")}
        </button>
        <button
          className="btn btn-outline w-full mt-2"
          onClick={() => onClose()}
        >
          {t("common.cancel")}
        </button>
      </Drawer>
    </DrawerPortal>
  );
};
export default SelectCurreniesType;
