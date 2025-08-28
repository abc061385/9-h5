import React, { useEffect, useRef, useState } from "react";

interface VideoCoverProps {
  videoSrc: string;
  width?: number;
  height?: number;
}

const VideoCover: React.FC<VideoCoverProps> = ({
  videoSrc,
  width = 640,
  height = 360,
}) => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!video || !canvas || !ctx) return;

    const handleLoadedMetadata = () => {
      canvas.width = width;
      canvas.height = height;
      video.currentTime = 0;
    };

    const handleSeeked = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCoverImage(canvas.toDataURL("image/jpeg"));
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [videoSrc, width, height, videoRef, canvasRef]);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  console.log(coverImage);

  return (
    <div>
      <video ref={videoRef} src={videoSrc} style={{ display: "none" }} />
      {/* <canvas ref={canvasRef} style={{ display: "none" }} /> */}
      <canvas ref={canvasRef} />
      {coverImage ? (
        <div>
          <img
            src={coverImage}
            alt="Video Cover"
            width={width}
            height={height}
          />
          <button onClick={handlePlayClick}>
            {isPlaying ? "暫停" : "播放"}
          </button>
        </div>
      ) : (
        <div>加载中...</div>
      )}
    </div>
  );
};

export default VideoCover;
