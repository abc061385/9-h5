import { forwardRef, useCallback, useMemo, useState } from "react";
import { Drawer } from "@/components/drawer";
import { InfiniteList } from "@/components/infinite-list";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";
type Data = {
  value: string | number;
  label: string;
};

interface IChainSelectProps {
  data: Data[];
  name?: string;
  value?: Data["value"];
  title?: string;
  className?: string;
  onChange?: (item?: Data) => void;
}

export const Select = forwardRef<HTMLDivElement, IChainSelectProps>(
  ({ data, value, onChange, title, className }, ref) => {
    const [open, setOpen] = useState(false);

    const selectValue = useMemo(() => {
      return data?.find((t) => t.value === value);
    }, [value, data]);

    const getActived = useCallback(
      (_: number, item: Data) => {
        const activedClass = cn("bg-primary text-white rounded-md");
        const isSelected = selectValue?.value === item?.value;
        return isSelected ? activedClass : "";
      },
      [selectValue],
    );
    return (
      <div ref={ref}>
        <button
          type="button"
          className={cn([
            "input w-full flex justify-between items-center",
            className,
          ])}
          onClick={() => setOpen(true)}
        >
          {value ? (
            <span className="text-sm font-bold">{selectValue?.label}</span>
          ) : (
            <p className="text-text2"></p>
          )}
          <Icon name="arrow-line-down" />
        </button>
        <Drawer open={open} onChange={setOpen} title={title}>
          <div
            className="size-full flex flex-col"
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <div className="flex-1">
              <InfiniteList<Data, unknown>
                data={data}
                hiddenEmpty
                hiddenFooter
                fetchMore={async () => {
                  return [];
                }}
                itemContent={(index, item) => {
                  return (
                    <div
                      onClick={() => {
                        setOpen(false);
                        onChange?.(item);
                      }}
                      className={cn([
                        "flex justify-center items-center h-8 space-x-2 mb-2 text-text2",
                        getActived(index, item),
                      ])}
                    >
                      <span className="text-sm font-bold">{item?.label}</span>
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
);

Select.displayName = "Select";
