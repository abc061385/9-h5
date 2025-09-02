import { api } from "@/api";
import React, { PropsWithChildren, useState } from "react";
import BaseImage from "./base-image";
import { cn } from "@/lib/utils";

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
  const [preview, setPreview] = useState<string | null>(defaultUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      handleUpload(file);
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
        { file: image },
      );
      if (response.code === 200 && onUploadSuccess) {
        onUploadSuccess(response.data as unknown as ImageMetadata);
      }
    } catch {
      if (onUploadError) {
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
            roundedFull ? "rounded-full overflow-hidden" : "",
          ])}
        />
      );
  return (
    <div className={`size-full ${className}`}>
      <label className="size-full inline-block">
        {renderPreview}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {children}
      </label>
    </div>
  );
};

export default ImageUploader;
