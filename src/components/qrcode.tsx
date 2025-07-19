import { FC } from "react";
import QRCode from "react-qr-code";
type IProps = {
  bgColor?: string;
  value: string;
};
export const Qrcode: FC<IProps> = ({ value, bgColor = "#fff" }) => {
  return (
    <div>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        bgColor={bgColor}
        value={value}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};
