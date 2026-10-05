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
    credit: "Ảnh được cung cấp",
    source: src,
    downloadUrl: src,
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
    "/images/about/lynhhin.jpg",
    "Chân dung Lynhhin trong tà áo dài trắng bên hồ ở Hà Nội",
    1706,
    2560,
    "center 62%",
  ),
  project: suppliedImage(
    "/images/projects/discover-vietnam.jpg",
    "Khoảnh khắc đồng hành cùng sinh viên quốc tế trong tour khám phá Việt Nam",
    1920,
    2560,
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
  hanoi: {
    src: "/images/projects/ha-noi.webp",
    alt: "Nhịp sống phố Hà Nội với những lá cờ đỏ và hàng quán địa phương",
    position: "center 55%",
    credit: "Kevin Charit / Unsplash",
    source: "https://unsplash.com/photos/sh6VnKI81vE",
    downloadUrl:
      "https://images.unsplash.com/photo-1743485754066-f45e26489e9a?fm=webp&fit=crop&w=1300&q=82",
  },
  hue: {
    src: "/images/vietnam/hue.webp",
    alt: "Kiến trúc kinh thành Huế bên mặt nước dưới bầu trời trong xanh",
    position: "center 55%",
    credit: "Nguyen Minh / Unsplash",
    source: "https://unsplash.com/photos/lzjlYsMGYXg",
    downloadUrl:
      "https://images.unsplash.com/photo-1765034841805-8330b54bfdb7?fm=webp&fit=crop&w=1300&q=82",
  },
  hoiAn: {
    src: "/images/vietnam/hoi-an.webp",
    alt: "Nhà cổ và dòng sông ở Hội An trong ánh sáng cuối ngày",
    position: "center 60%",
    credit: "Charge The Globe / Unsplash",
    source: "https://unsplash.com/photos/MeEopamZ8_s",
    downloadUrl:
      "https://images.unsplash.com/photo-1588540955526-bb1c6c587321?fm=webp&fit=crop&w=1300&q=82",
  },
  ninhBinh: {
    src: "/images/vietnam/ninh-binh.webp",
    alt: "Dòng sông uốn lượn giữa núi đá vôi và những cánh đồng ở Tam Cốc, Ninh Bình",
    position: "center 52%",
    credit: "Danielle Suijkerbuijk / Unsplash",
    source: "https://unsplash.com/photos/68TjFyhPJec",
    downloadUrl:
      "https://images.unsplash.com/photo-1745237512031-6713cb34e310?fm=webp&fit=crop&w=1300&q=82",
  },
} satisfies Record<string, JournalImage>;
