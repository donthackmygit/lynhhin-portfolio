import Image from "next/image";
import type { JournalImage } from "@/data/types";

type JournalPhotoProps = {
  image: JournalImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function JournalPhoto({
  image,
  className = "",
  sizes = "(max-width: 767px) 100vw, 50vw",
  priority = false,
}: JournalPhotoProps) {
  return (
    <div className={`journal-photo ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={priority ? 85 : 75}
        style={{
          objectFit: "cover",
          objectPosition: image.position ?? "center",
        }}
      />
    </div>
  );
}
