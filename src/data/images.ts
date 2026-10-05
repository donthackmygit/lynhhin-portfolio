import type { JournalImage } from "./types";

function suppliedImage(
  src: string,
  alt: string,
  width: number,
  height: number,
  position = "center",
): JournalImage {
  return {
    src,
    alt,
    width,
    height,
    position,
  };
}

const carouselPhotos: [string, number, number][] = [
  ["1571179-3000x2000-desktop-hd-hanoi-background-image.jpg", 3000, 2000],
  ["1571252-2048x1152-desktop-hd-hanoi-wallpaper-image.jpg", 2048, 1152],
  ["1571271-2107x1423-desktop-hd-hanoi-wallpaper-photo.jpg", 2107, 1423],
  ["1571354-2560x1440-desktop-hd-hanoi-wallpaper-photo.jpg", 2560, 1440],
  ["1571463-2400x1530-desktop-hd-hanoi-wallpaper-image.jpg", 2400, 1530],
  ["1571496-2048x1363-desktop-hd-hanoi-background-image.jpg", 2048, 1363],
  [
    "1571585-2560x1280-desktop-dual-monitors-hanoi-wallpaper-image.jpg",
    2560,
    1280,
  ],
  ["1571828-1920x1200-desktop-hd-hanoi-wallpaper-photo.jpg", 1920, 1200],
  ["1572414-2500x1667-desktop-hd-hanoi-background.jpg", 2500, 1667],
  ["1572981-2560x1707-desktop-hd-hanoi-wallpaper.jpg", 2560, 1707],
  ["1573389-3840x2160-desktop-4k-hanoi-background-image.jpg", 3840, 2160],
  ["pexels-han-vu-fpv-899723554-38983930.jpg", 4660, 3107],
  ["pexels-hson-38407187.jpg", 6682, 4455],
  ["pexels-linh-tran-553086511-19892915.jpg", 6000, 4104],
  ["pexels-linh-tran-553086511-35056585.jpg", 4000, 2667],
];

export const heroCarousel = carouselPhotos.map(
  ([filename, width, height], index) =>
    suppliedImage(
      `/images/hero/carousel/${filename}`,
      `Khung cảnh Hà Nội — ảnh ${index + 1}`,
      width,
      height,
    ),
);

export const images = {
  hero: heroCarousel[0],
  portrait: suppliedImage(
    "/images/about/newer.jpg",
    "Chân dung Lynhhin trong tà áo dài tím và chiếc nón truyền thống Việt Nam",
    1704,
    2560,
    "center 62%",
  ),
  project: suppliedImage(
    "/images/projects/discover-vietnam.jpg",
    "Khoảnh khắc đồng hành cùng sinh viên quốc tế trong tour khám phá Việt Nam",
    1920,
    2560,
  ),
  projectModal: suppliedImage(
    "/images/projects/discover-vietnam-modal.jpg",
    "Sinh viên quốc tế đồng hành cùng tour văn hóa tại Hà Nội trong một ngày mưa",
    2568,
    1926,
  ),
  recommendations: suppliedImage(
    "/images/projects/hanoi-recommendations.jpg",
    "Gợi ý ẩm thực và trải nghiệm Hà Nội của Lynhhin",
    1080,
    1080,
  ),
  recommendationModal: suppliedImage(
    "/images/projects/hanoi-recommendations-modal.jpg",
    "Bản ngang các gợi ý ẩm thực và trải nghiệm Hà Nội của Lynhhin",
    1920,
    1080,
  ),
} satisfies Record<string, JournalImage>;
