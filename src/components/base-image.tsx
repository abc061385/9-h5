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
    <div className={cn("relative", className)} onClick={() => onClick?.()}>
      <Image src={src} alt={alt} fill />
    </div>
  );
};

export default BaseImage;
