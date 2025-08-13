import { useTrans } from "@/hooks/useTrans";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import VerificationInput, {
  VerificationInputProps,
} from "react-verification-input";

type IProps = {
  reSendcode?: () => Promise<void>;
  onComplete?: (code: string) => Promise<void>;
};
export const Verification: FC<VerificationInputProps & IProps> = ({
  reSendcode,
  onComplete,
  ...props
}) => {
  const t = useTrans();

  const [seconds, setSeconds] = useState(0); // 倒计时秒数
  const [text, setText] = useState("");
  const sendOtp = () => {
    setSeconds(60);
  };
  useEffect(() => {
    sendOtp();
  }, []);
  useEffect(() => {
    if (seconds <= 0) return;
    const timerId = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timerId);
  }, [seconds]);

  const handlePaste = async () => {
    if (!navigator.clipboard?.readText) {
      alert("当前浏览器不支持剪贴板读取");
      return;
    }
    try {
      const clip = await navigator.clipboard.readText();

      // 增加6位数字验证逻辑
      if (!/^\d{6}$/.test(clip)) {
        toast.error(t("verificationCodeMustBe6Digits"));
        return;
      }

      setText(clip);
      onComplete?.(clip);
    } catch {}
  };
  const sendCode = async () => {
    if (reSendcode) {
      await reSendcode();
    }
    sendOtp();
  };
  return (
    <div className="w-full">
      <VerificationInput
        length={6}
        classNames={{
          character: "character",
          characterSelected: "characterSelected",
          characterFilled: "characterFilled",
        }}
        value={text}
        onChange={setText}
        placeholder=" "
        onComplete={onComplete}
        {...props}
      />
      <div className="flex justify-between items-center  mt-2">
        <button
          className="btn btn-link h-auto"
          onClick={() => {
            sendCode();
          }}
          disabled={seconds > 0}
        >
          {t('resend')}
          <span className="text-primary text-xs font-medium">
            {seconds ? `${seconds}s` : null}
          </span>
        </button>
        <button onClick={handlePaste}>
          {t("googleVerify.paste")}
        </button>
      </div>
    </div>
  );
};
