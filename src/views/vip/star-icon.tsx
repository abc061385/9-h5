import { FC } from "react";
import BaseImage from "@/components/base-image";

interface IStarIconProps {
  star?: number;
  type?: "light" | "dark";
  level: number;
}

const StarIcon: FC<IStarIconProps> = ({ star, type = "light", level }) => {
  if (level === 9 && star) {
    return (
      <div className="flex">
        {[...new Array(star)].map((_, index) => {
          return (
            <BaseImage
              key={index}
              src={
                type === "light"
                  ? "/images/vip/star_l.svg"
                  : "/images/vip/star_r.svg"
              }
              className="w-4 h-4"
            />
          );
        })}
      </div>
    );
  }
  return null;
};

export default StarIcon;
