// components/QRCode.tsx
import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";

export interface QRCodeProps {
  value: string; // 必填：二维码内容
  size?: number; // 尺寸（像素）
  bgColor?: string; // 背景色
  fgColor?: string; // 前景色
  level?: "L" | "M" | "Q" | "H"; // 容错级别
  logo?: string; // 中心 logo 图片 URL（可选）
  logoSize?: number; // logo 占二维码比例（默认 20%）
}

const Qrcode: React.FC<QRCodeProps> = ({
  value,
  size = 128,
  bgColor = "#ffffff",
  fgColor = "#000000",
  level = "M",
  logo,
  logoSize = 0.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!value) return;
    const opts = {
      width: size,
      margin: 1,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: level,
    };
    QRCode.toCanvas(canvasRef.current, value, opts, (error: unknown) => {
      if (error) console.error(error);
      if (logo && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          const img = new Image();
          img.src = logo;
          img.onload = () => {
            const logoDim = size * logoSize;
            ctx.drawImage(
              img,
              (size - logoDim) / 2,
              (size - logoDim) / 2,
              logoDim,
              logoDim
            );
          };
        }
      }
    });
  }, [value, size, bgColor, fgColor, level, logo, logoSize]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export { Qrcode };
