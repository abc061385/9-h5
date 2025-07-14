import { cn } from "@/lib/utils";
import Image from "next/image";

interface IBaseImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const BaseImage: React.FC<IBaseImageProps> = ({
  src,
  alt = "",
  className = "",
}) => {
  return (
    <div className={cn("relative", className)}>
      <Image src={src} alt={alt} fill />
    </div>
  );
};

export default BaseImage;
