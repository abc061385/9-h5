"use client";

import BaseImage from "@/components/base-image";
import { HeaderWithBack } from "@/components/header-with-back";
import ViewLayout from "@/components/layout";
import { useTrans } from "@/hooks/useTrans";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useCallback, useState } from "react";
import TypeWriter from "./type-writer";

type DialogueListType = {
  type: "user" | "ai";
  content: string;
  timestamp: number;
  loading?: boolean;
};

const HelperAIView = () => {
  const t = useTrans();
  const [dialogueList, setDialogueList] = useState<DialogueListType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [disabledSend, setDisabledSend] = useState(false);

  const askAi = useCallback(
    async (value: string, list: DialogueListType[]) => {
      try {
        const { data } = await axios.post("https://www.9mc.org/app/ai/chat", {
          content: value,
        });

        const updatedArray = [
          ...list.slice(0, -1),
          {
            ...list[list.length - 1],
            loading: false,
            content: data?.data?.content || t("walletDetail.statusFailed"),
            timestamp: new Date().getTime(),
          },
        ];
        setDialogueList(updatedArray);
      } catch {}
    },
    [t]
  );

  return (
    <ViewLayout
      heightFull
      header={<HeaderWithBack title={t("AI助手")} algin="center" />}
      className="flex flex-col"
    >
      <div className="p-content overflow-auto grow">
        {dialogueList && dialogueList?.length ? (
          dialogueList.map((item) => {
            return (
              <div
                key={item.timestamp}
                className={cn(
                  "flex justify-end mb-4 text-sm relative",
                  item.type === "ai" ? "justify-start" : ""
                )}
              >
                {item.type === "user" ? (
                  <div
                    className={cn(
                      "bg-primary rounded-lg px-4 py-2.5 text-white"
                    )}
                  >
                    {item.content}
                  </div>
                ) : (
                  <div
                    className={cn(
                      "rounded-lg px-3.5 py-3 bg-bg3 relative pb-6"
                    )}
                  >
                    {item.loading ? (
                      <span className="loading loading-spinner loading-sm max-w-full"></span>
                    ) : (
                      <div>
                        <TypeWriter
                          text={item.content}
                          speed={30}
                          onDone={() => setDisabledSend(false)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <>
            <BaseImage
              src="/images/common/logo.svg"
              className="w-20 h-8 mb-4"
            />
            <h2 className="font-bold text-lg text-primary">{t("ai嗨")}</h2>
            <p className="text-sm mt-4 text-text3">{t("ai介绍")}</p>
          </>
        )}
      </div>
      <div className="p-content flex items-center gap-2 pt-3 border-t border-border2">
        <label className="input h-10 flex-1 border-none shadow-none !bg-bg3">
          <input
            type="text"
            className="grow"
            placeholder="hi"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </label>
        <button
          className={cn(
            "btn btn-primary text-xs font-bold w-20",
            disabledSend && "btn-disabled"
          )}
          onClick={() => {
            if (!inputValue || disabledSend) return;
            const arr = [...(dialogueList || [])];
            arr.push(
              {
                type: "user",
                content: inputValue,
                timestamp: new Date().getTime(),
              },
              {
                type: "ai",
                content: "",
                timestamp: new Date().getTime() + 100,
                loading: true,
              }
            );
            askAi(inputValue, arr);
            setDialogueList(arr);
            setInputValue("");
            setDisabledSend(true);
          }}
        >
          {t("发送")}
        </button>
      </div>
    </ViewLayout>
  );
};
export default HelperAIView;
