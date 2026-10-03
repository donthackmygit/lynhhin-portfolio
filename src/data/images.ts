import type { JournalImage } from "./types";

export const images = {
  hero: {
    src: "/images/hero/hoi-an-riverside.webp",
    alt: "Những mái nhà cổ Hội An soi bóng bên dòng sông yên bình",
    position: "center 56%",
    credit: "Charge The Globe / Unsplash",
    source: "https://unsplash.com/photos/MeEopamZ8_s",
    downloadUrl:
      "https://images.unsplash.com/photo-1588540955526-bb1c6c587321?fm=webp&fit=crop&w=1800&q=85",
  },
  portrait: {
    src: "/images/about/ao-dai-ha-noi.webp",
    alt: "Hình ảnh cảm hứng: người phụ nữ mặc áo dài đỏ trên ban công phố cổ Hà Nội",
    position: "center 38%",
    credit: "Elist Nguyen / Unsplash",
    source: "https://unsplash.com/photos/jkthmpUHLQw",
    downloadUrl:
      "https://images.unsplash.com/photo-1759671826682-3307bb98e68a?fm=webp&fit=crop&w=1100&q=82",
  },
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
