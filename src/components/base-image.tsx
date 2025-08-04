import { cn } from "@/lib/utils";
import Image from "next/image";

interface IBaseImageProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
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
      onClick={() => onClick?.()}
    >
      {src ? <Image src={src} alt={alt} fill /> : alt}
      <Image src={src} alt={alt} fill />
    </span>
  );
};

export default BaseImage;
