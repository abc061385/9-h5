"use client";

import { useState, useRef, useEffect, useCallback } from "react";
// import BaseImage from "./base-image";
import { Modal } from "./modal";
import { Icon } from "./icon";
import Platform from "@/lib/platfrom";
import Bridge from "@/lib/dsBridge";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";

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
  const { push } = useRouter();

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
  const goTo = useCallback(() => {
    const currentItem = images[currentIndex];
    if (Platform.isInApp()) {
      if (currentItem?.nativeJumpUrl)
        Bridge.jumpTo(currentItem.nativeJumpUrl as string);
    } else {
      if (currentItem?.h5JumpUrl) push(currentItem.h5JumpUrl as string);
    }
  }, [currentIndex, images, push]);
  return (
    <Modal
      open={visible}
      onClose={handleClose}
      wrapClassName="bg-transparent shadow-none p-0 no-scrollbar"
      className="!bg-transparent "
      close={false}
    >
      <Image
        onClick={goTo}
        src={
          images[currentIndex] ? (images[currentIndex][keyName] as string) : ""
        }
        alt={`Image ${currentIndex}`}
        width={0}
        height={0}
        style={{ width: "100%", height: "auto", maxWidth: "90%" }}
        className="mx-auto rounded-lg"
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
    </Modal>
  );
}
