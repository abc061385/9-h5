import React, { PropsWithChildren, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import BaseImage from "@/components/base-image";
import { ShowIf } from "@/components/show-if";
import toast from "react-hot-toast";
import { useTrans } from "@/hooks/useTrans";
import { createAxiosInstance, ApiResponse } from "@/lib/axios";
import { Icon } from "@/components/icon";

interface ImageMetadata {
  contentType: string; // 圖片的 MIME 類型，例如 "image/png"
  fileName: string; // 圖片的檔案名稱
  fileSize: number; // 圖片的檔案大小（以位元組為單位）
  height: number; // 圖片的高度（以像素為單位）
  originalUrl: string; // 圖片的原始 URL
  thumbnailUrl: string; // 圖片的縮圖 URL，若無則為 null
  uploadTime: string; // 圖片的上傳時間，格式為 "YYYY-MM-DD HH:mm:ss"
  width: number; // 圖片的寬度（以像素為單位）
}

interface ImageUploaderProps {
  onUploadSuccess?: (imgMeta: ImageMetadata) => void;
  onUploadError?: (error: string) => void;
  type?: string;
  defaultUrl?: string;
  className?: string;
  setPreviewDom?: (preview: string) => React.ReactNode;
  roundedFull?: boolean;
  fileType: "front_id" | "back_id" | "selfie_with_id"; //type front_id（证件正面照）、back_id（证件反面照）、selfie_with_id（手持证件自拍）
  onClear?: () => void;
}

const ImageUploader: React.FC<PropsWithChildren<ImageUploaderProps>> = ({
  onUploadSuccess,
  onUploadError,
  className = "",
  defaultUrl = "",
  setPreviewDom,
  roundedFull = false,
  children,
  fileType,
  onClear,
}) => {
  const t = useTrans();
  const apiIns = createAxiosInstance("/app/");
  const [preview, setPreview] = useState<string | null>(defaultUrl);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (defaultUrl) {
      setPreview(defaultUrl);
    }
  }, [defaultUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file && file.size > maxSizeInBytes) {
      toast.error(t("imageSizeLimit"));
      event.target.value = "";
      return;
    }
    if (file) {
      handleUpload(file);
      event.target.value = "";
    }
  };

  const handleUpload = async (image: File) => {
    if (!image) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("type", fileType);

    try {
      const response: ApiResponse<unknown> = await apiIns.post(
        "/nine-index/card-kyc/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.code === 200 && onUploadSuccess) {
        setIsUploading(false);
        setPreview(URL.createObjectURL(image));
        onUploadSuccess(response.data as unknown as ImageMetadata);
      }
    } catch {
      if (onUploadError) {
        setIsUploading(false);
        onUploadError("上傳失敗，請稍後再試。");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const renderPreview = setPreviewDom
    ? setPreviewDom(preview || "")
    : preview && (
        <div className="w-full h-full relative">
          <BaseImage
            src={preview as string}
            alt="preview"
            className={cn([
              "w-full h-full object-cover object-center",
              roundedFull ? "rounded-lg overflow-hidden" : "",
            ])}
          />
          <Icon
            name="del_red"
            className="absolute right-[-6px] top-[-6px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClear?.();
              setPreview("");
            }}
          />
        </div>
      );

  return (
    <div className={`size-full ${className}`}>
      <ShowIf
        condition={!isUploading}
        elseEl={<span className="loading flex mx-auto pt-50 loading-xl"></span>}
      >
        <label className="size-full inline-block">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={Boolean(defaultUrl || preview)}
          />
          {renderPreview || children}
        </label>
      </ShowIf>
    </div>
  );
};

export default ImageUploader;
