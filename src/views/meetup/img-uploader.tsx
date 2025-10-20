import { api } from "@/api";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import BaseImage from "@/components/base-image";
import { ImageMetadata } from "./type";
import { ShowIf } from "@/components/show-if";
import toast from "react-hot-toast";
import { useTrans } from "@/hooks/useTrans";

interface ImageUploaderProps {
  onUploadSuccess?: (imgMeta: ImageMetadata) => void;
  onUploadError?: (error: string) => void;
  type?: string;
  defaultUrl?: string;
  className?: string;
  setPreviewDom?: (preview: string) => React.ReactNode;
  roundedFull?: boolean;
}

const ImageUploader: React.FC<PropsWithChildren<ImageUploaderProps>> = ({
  onUploadSuccess,
  onUploadError,
  className = "",
  type = "h5_upload",
  defaultUrl = "",
  setPreviewDom,
  roundedFull = false,
  children,
}) => {
  const t = useTrans();
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

    try {
      const response = await api.image.uploadImageUsingPost(
        {
          type,
        },
        { file: image }
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
        <BaseImage
          src={preview as string}
          alt="preview"
          className={cn([
            "w-full h-full object-cover object-center",
            roundedFull ? "rounded-lg overflow-hidden" : "",
          ])}
        />
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
          />
          {renderPreview || children}
        </label>
      </ShowIf>
    </div>
  );
};

export default ImageUploader;
