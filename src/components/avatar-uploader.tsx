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
  showIcon?: boolean;
  onUploadSuccess?: () => void; // 外部回调
}
export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  className,
  showIcon = false,
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
    <div className={cn(["size-[160px] rounded-full relative", className])}>
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
        {showIcon ? (
          <BaseImage
            src="/images/certificate/camera.png"
            className="size-8 absolute bottom-[-16px] left-1/2 translate-x-[-50%]"
          />
        ) : null}
      </ImageUploader>
    </div>
  );
};
