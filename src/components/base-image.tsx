import { cn } from "@/lib/utils";
import Image from "next/image";

interface IBaseImageProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const BaseImage: React.FC<IBaseImageProps> = ({
  src,
  alt = "",
  className = "",
  onClick,
}) => {
  return (
    <span
      className={cn("relative inline-block", className)}
      onClick={(e) => onClick?.(e)}
    >
      {src ? (
        <Image src={src} alt={alt} fill style={{ objectFit: "cover" }} />
      ) : (
        alt
      )}
    </span>
  );
};

export default BaseImage;
