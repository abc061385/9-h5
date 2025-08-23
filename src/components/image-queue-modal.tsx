"use client";

import { useState, useRef, useEffect } from "react";
import BaseImage from "./base-image";
import { Modal } from "./modal";

type ImageItem = { [key in string]: unknown };

export default function ImageQueueModal({
  images,
  keyName = "imageUrl",
}: {
  images: ImageItem[];
  keyName: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.display = visible ? "block" : "none";
    }
  }, [visible]);

  const handleClose = () => {
    const next = currentIndex + 1;
    if (next < images.length) {
      setCurrentIndex(next);
    } else {
      setVisible(false);
      setCurrentIndex(0);
    }
  };
  return (
    <Modal open={visible} onClose={handleClose}>
      <BaseImage
        src={
          images[currentIndex] ? (images[currentIndex][keyName] as string) : ""
        }
        alt={`Image ${currentIndex}`}
        className="aspect-[4/3] w-full object-cover mt-8"
      />
    </Modal>
  );
}
