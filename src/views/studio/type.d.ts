export interface CountryListType {
  code: string;
  country: string;
  id: number;
  phonePrefix: string;
}

export interface SelectListType {
  label: string;
  value: string;
}

export interface ImageMetadata {
  contentType: string; // 圖片的 MIME 類型，例如 "image/png"
  fileName: string; // 圖片的檔案名稱
  fileSize: number; // 圖片的檔案大小（以位元組為單位）
  height: number; // 圖片的高度（以像素為單位）
  originalUrl: string; // 圖片的原始 URL
  thumbnailUrl: string; // 圖片的縮圖 URL，若無則為 null
  uploadTime: string; // 圖片的上傳時間，格式為 "YYYY-MM-DD HH:mm:ss"
  width: number; // 圖片的寬度（以像素為單位）
}

export interface FileType {
  fileName: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileType: 1 | 2;
}

export interface StudioRecordsListType {
  id: number;
  status: 0 | 1 | 2;
  siteType: 1 | 2;
  createTime: string;
  participantNumber: number;
}
