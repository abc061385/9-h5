import { useUserStore } from "@/store/useUserStore";
import ImageUploader from "./img-uploader";
import { useMemo } from "react";
import { api } from "@/api";
import toast from "react-hot-toast";
import BaseImage from "./base-image";
import { cn } from "@/lib/utils";
import { useTrans } from "@/hooks/useTrans";

interface AvatarUploaderProps {
  className?: string;
  onUploadSuccess?: () => void; // 外部回调
}
export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  className,
  onUploadSuccess,
}) => {
  const t = useTrans();
  const userInfo = useUserStore((s) => s.userInfo);
  const fetchUserInfo = useUserStore((s) => s.fetchUserInfo);
  const avatar = useMemo(
    () => userInfo?.headUrl || "/images/user/head.png",
    [userInfo],
  );
  return (
    <div
      className={cn([
        "size-[160px] absolute top-[212px] left-1/2 translate-x-[-50%] z-10 rounded-full",
        className,
      ])}
    >
      <ImageUploader
        roundedFull
        defaultUrl={avatar}
        onUploadSuccess={(d) => {
          if (d.originalUrl) {
            api.member
              .editInfoUsingPost1({ headUrl: d.originalUrl })
              .then((res) => {
                if (res.code === 200) {
                  toast.success(t("user.avatarUpdateSuccess"));
                  fetchUserInfo();
                  if (onUploadSuccess) onUploadSuccess();
                } else {
                  toast.error(res.message);
                }
              });
          }
        }}
      >
        <BaseImage
          src="/images/certificate/camera.png"
          className="size-8 absolute bottom-[-16px] left-1/2 translate-x-[-50%]"
        />
      </ImageUploader>
    </div>
  );
};
