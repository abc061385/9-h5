import { api } from "@/api";
import React, { PropsWithChildren, useState } from "react";
import { cn } from "@/lib/utils";
import { ImageMetadata } from "./type";

interface VideoUploaderProps {
  onUploadSuccess?: (imgMeta: ImageMetadata) => void;
  onUploadError?: (error: string) => void;
  type?: string;
  defaultUrl?: string;
  className?: string;
  setPreviewDom?: (preview: string) => React.ReactNode;
  roundedFull?: boolean;
}

const VideoUploader: React.FC<PropsWithChildren<VideoUploaderProps>> = ({
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
  // const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      handleUpload(file);
    }
  };

  const handleUpload = async (video: File) => {
    if (!video) return;

    // setIsUploading(true);
    const formData = new FormData();
    formData.append("file", video);

    try {
      const response = await api.file.uploadFileUsingPost(
        {
          type,
        },
        { file: video }
      );
      if (response.code === 200 && onUploadSuccess) {
        onUploadSuccess(response.data as unknown as ImageMetadata);
      }
    } catch {
      if (onUploadError) {
        onUploadError("上傳失敗，請稍後再試。");
      }
    } finally {
      // setIsUploading(false);
    }
  };

  const renderPreview = setPreviewDom
    ? setPreviewDom(preview || "")
    : preview && (
        <video
          controls
          src={preview as string}
          className={cn([
            "w-full h-full object-cover object-center",
            roundedFull ? "rounded-lg overflow-hidden" : "",
          ])}
        />
      );
  return (
    <div className={`size-full ${className}`}>
      <label className="size-full inline-block">
        <input
          type="file"
          className="hidden"
          accept="video/*"
          onChange={handleFileChange}
        />
        {renderPreview || children}
      </label>
    </div>
  );
};

export default VideoUploader;
