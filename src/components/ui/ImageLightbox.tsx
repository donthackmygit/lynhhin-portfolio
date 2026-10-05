"use client";

import Image from "next/image";
import { Dialog } from "@/components/ui/Dialog";
import type { JournalImage } from "@/data/types";

type ImageLightboxProps = {
  image: JournalImage;
  open: boolean;
  onClose: () => void;
};

export function ImageLightbox({ image, open, onClose }: ImageLightboxProps) {
  const width = image.width ?? 1920;
  const height = image.height ?? 1280;
  return (
    <Dialog open={open} onClose={onClose} title={image.alt} variant="image">
      <Image
        src={image.src}
        alt={image.alt}
        width={width}
        height={height}
        className="image-lightbox-photo"
        style={{
          width: `min(calc(100vw - 48px), calc((100dvh - 72px) * ${width / height}))`,
          height: "auto",
        }}
        loading="eager"
        unoptimized
      />
    </Dialog>
  );
}
