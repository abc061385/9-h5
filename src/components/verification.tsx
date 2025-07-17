import { FC, useEffect, useState } from "react";
import VerificationInput, {
  VerificationInputProps,
} from "react-verification-input";

export const Verification: FC<VerificationInputProps> = (props) => {
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
      setText(clip);
    } catch {}
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
        {...props}
      />
      <div className="flex justify-between items-center  mt-2">
        <button
          className="btn btn-link h-auto"
          onClick={sendOtp}
          disabled={seconds > 0}
        >
          重发
          <span className="text-primary text-xs font-medium">
            {seconds ? `${seconds}s` : null}
          </span>
        </button>
        <button disabled={seconds < 1} onClick={handlePaste}>
          Paste
        </button>
      </div>
    </div>
  );
};
