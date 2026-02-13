import { useTrans } from "@/hooks/useTrans";
import { Drawer } from "./drawer";
import { Icon } from "./icon";
import { FC, useState } from "react";
import { useRequestMutation } from "@/hooks/useRequestMutation";
import { api } from "@/api";

interface ISecurityVerificationProps {
  open: boolean;
  onClick: (codeValue: string) => void;
  onClose: () => void;
}

const SecurityVerification: FC<ISecurityVerificationProps> = ({
  open,
  onClick,
  onClose,
}) => {
  const t = useTrans();
  const [codeValue, setCodeValue] = useState("");

  const { trigger: postGoogleVerify } = useRequestMutation(
    api.member.googleLoginUsingPost1
  );

  return (
    <Drawer open={open} className="h-auto" onChange={onClose}>
      <fieldset className="fieldset p-0">
        <legend className="fieldset-legend font-normal gap-1 pt-6 pb-4 flex flex-col items-start">
          <h3 className="text-sm leading-5">{t("security.googleAuth")}</h3>
          <p className="text-xs text-text2 leading-5">
            {t("googleVerify.authFromApp")}
          </p>
        </legend>

        <label className="input w-full h-14">
          <Icon name="google-verify" className="size-5" />
          <input
            type="code"
            placeholder={t("googleVerify.enterCode")}
            className="grow text-base"
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
          />
          <span
            className="text-sm"
            onClick={async () => {
              const text = await navigator.clipboard.readText();
              setCodeValue(text);
            }}
          >
            {t("googleVerify.paste")}
          </span>
        </label>
      </fieldset>
      <button
        className="btn btn-primary w-full mt-10"
        onClick={() => {
          postGoogleVerify(
            { code: Number(codeValue) },
            {
              onSuccess: () => {
                setCodeValue("");
                onClick?.(codeValue);
              },
              throwOnError: false,
            }
          );
        }}
      >
        {t("common.confirm")}
      </button>
    </Drawer>
  );
};

export default SecurityVerification;
