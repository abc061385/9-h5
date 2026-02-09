import { cn } from "@/lib/utils";
import Image from "next/image";

interface IBaseImageProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  cover?: boolean;
  color?: string;
}

const BaseImage: React.FC<IBaseImageProps> = ({
  src,
  alt = "",
  className = "",
  cover = true,
  onClick,
  color,
}) => {
  const imgStyle: React.CSSProperties = cover ? { objectFit: "cover" } : {};


  return (
    <span
      className={cn("relative inline-block", className)}
      onClick={(e) => onClick?.(e)}
    >
      {src ? (
        color ? (
          <span
            aria-label={alt}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: color,
              WebkitMask: `url(${src}) no-repeat center / cover`,
              mask: `url(${src}) no-repeat center / cover`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <Image src={src} alt={alt} fill style={imgStyle} />
        )
      ) : (
        alt
      )}
    </span>
  );
};

export default BaseImage;
