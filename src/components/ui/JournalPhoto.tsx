import Image from "next/image";
import type { JournalImage } from "@/data/types";

type JournalPhotoProps = {
  image: JournalImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: 75 | 85;
  fit?: "cover" | "contain";
  aspectRatio?: number;
};

export function JournalPhoto({
  image,
  className = "",
  sizes = "(max-width: 767px) 100vw, 50vw",
  priority = false,
  quality = priority ? 85 : 75,
  fit = "cover",
  aspectRatio,
}: JournalPhotoProps) {
  return (
    <div
      className={`journal-photo ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={priority}
        quality={quality}
        style={{
          objectFit: fit,
          objectPosition: image.position ?? "center",
        }}
      />
    </div>
  );
}
