"use client";

import { useState, useRef, useEffect } from "react";
import BaseImage from "./base-image";
import { Modal } from "./modal";
import { Icon } from "./icon";

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
    <Modal
      open={visible}
      onClose={handleClose}
      wrapClassName="bg-transparent shadow-none p-0"
      className="!bg-transparent"
      close={false}
    >
      <div>
        <BaseImage
          src={
            images[currentIndex]
              ? (images[currentIndex][keyName] as string)
              : ""
          }
          alt={`Image ${currentIndex}`}
          className="aspect-[4/3] w-full object-cover  rounded-lg overflow-hidden"
        />

        <div className="flex justify-center mt-10">
          <span className="bg-text3 opacity-75  rounded-full size-8 p-1 ">
            <Icon
              name="close_white"
              className="size-6"
              onClick={() => handleClose()}
            />
          </span>
        </div>
      </div>
    </Modal>
  );
}
