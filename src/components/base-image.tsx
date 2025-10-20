import { cn } from "@/lib/utils";
import Image from "next/image";

interface IBaseImageProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  cover?: boolean;
}

const BaseImage: React.FC<IBaseImageProps> = ({
  src,
  alt = "",
  className = "",
  cover = true,
  onClick,
}) => {
  return (
    <span
      className={cn("relative inline-block", className)}
      onClick={(e) => onClick?.(e)}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          style={cover ? { objectFit: "cover" } : {}}
        />
      ) : (
        alt
      )}
    </span>
  );
};

export default BaseImage;
