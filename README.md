# Lynhhin / Travel & Culture

Portfolio single-page theo concept **Vietnamese Cultural Editorial**, hướng tới ứng tuyển công ty du lịch. Next.js App Router, TypeScript, Tailwind CSS, Motion, GSAP ScrollTrigger và Lucide React.

## Chạy project

Yêu cầu Node.js 22+ và npm.

```powershell
npm install
npm run dev
```

Mở http://localhost:3000. Khi cổng này đang dùng, chạy `npm run dev -- --port 3001`.

```powershell
npm run build
npm run start
```

Project dùng `package-lock.json`. Có thể chạy `npm ci` để cài đúng các phiên bản đã khóa.

Không có unit test, integration test hay E2E test. `npm run typecheck` kiểm tra TypeScript.

## Thay nội dung

Nội dung hồ sơ Khuất Nguyễn Thảo Linh (Lynhhin) được quản lý tập trung trong `src/data/`. Timeline gồm Onetrip with Local (2024), trao đổi tại Nara Women’s University và FTU Exchange Student Buddy (2025), tiếp tục dẫn tour (2026). Hai dự án là DISCOVER VIETNAM, ON US và Lynhhin's Hanoi Recommendations; chứng chỉ gồm IELTS 7.0 và DELF B1. Chỉ cập nhật các thông tin, mốc thời gian và liên kết thực tế được cung cấp.

| File                       | Nội dung                                                                 |
| -------------------------- | ------------------------------------------------------------------------ |
| `src/data/profile.ts`      | Tên, giới thiệu, liên hệ, liên kết CV, navigation và câu chữ các section |
| `src/data/experiences.ts`  | Các cột mốc của timeline                                                 |
| `src/data/projects.ts`     | Dự án và nội dung cửa sổ chi tiết                                        |
| `src/data/english.ts`      | Bản dịch tiếng Anh của hồ sơ, timeline, dự án, kỹ năng và chứng chỉ      |
| `src/data/content.ts`      | Nội dung theo ngôn ngữ, nhãn giao diện và nhãn hỗ trợ tiếp cận           |
| `src/data/skills.ts`       | Kỹ năng và điểm mạnh                                                     |
| `src/data/achievements.ts` | Thành tích, chứng chỉ                                                    |
| `src/data/images.ts`       | Bộ ảnh carousel, ảnh từng mục, ảnh modal, kích thước và alt text         |

Các mục được đánh số liên tục từ 01 đến 07. Link và mã QR của Lynhhin's Hanoi Recommendations dùng chung `profile.hanoiRecommendationsUrl`.

Nút VI/EN trên thanh điều hướng đổi nội dung toàn trang, cửa sổ chi tiết dự án, chú thích ảnh và các nhãn hỗ trợ tiếp cận. Hai ngôn ngữ dùng chung component, ảnh, font, màu sắc, bố cục và hiệu ứng. Lựa chọn ngôn ngữ được lưu trong localStorage với khóa `lynhhin-language`, đồng bộ giữa các tab; tiếng Việt là mặc định. Thuộc tính `html.lang`, tiêu đề và mô tả trang được cập nhật theo ngôn ngữ hiển thị.

Timeline hỗ trợ trường `month` từ 1 đến 12 trong `src/data/experiences.ts`: Nara tháng 7/2025 và FTU Exchange Student Buddy tháng 8/2025. Các hoạt động cùng năm được xếp theo tháng; hoạt động chưa có tháng nằm sau các mốc đã xác định. Nhãn tháng hiển thị theo ngôn ngữ VI/EN, và bản tiếng Anh dùng chung năm/tháng từ dữ liệu gốc theo `id`. Dự án DISCOVER trong `src/data/projects.ts` có `month: 10`, hiển thị tháng 10/2025 tại danh sách dự án và cửa sổ chi tiết. Chỉ điền tháng thực tế được cung cấp; hoạt động không có tháng vẫn hiển thị theo năm.

## Ảnh & CV

Ảnh và CV dùng trên website được lưu tại `public/images/` và `public/documents/`:

- `public/images/hero/carousel/`: 15 ảnh Hà Nội. `heroCarousel` trong `images.ts` quy định thứ tự, kích thước và alt text; bản tiếng Anh đổi alt text trong `english.ts`. Carousel tự chuyển sau 6 giây, từ ảnh cuối quay về ảnh đầu; hai nút ở hai cạnh cho phép chuyển thủ công.
- `public/images/about/new.jpg`: ảnh Về tôi, có hiệu ứng hover và cửa sổ xem ảnh gốc trên nền đen.
- `public/images/projects/`: ảnh thẻ dự án và ảnh cửa sổ chi tiết. `image` và `modalImage` trong `projects.ts` chọn ảnh cho từng vị trí; `englishProjects` chọn cùng ảnh với alt text tiếng Anh. Khung ảnh modal giữ đúng tỉ lệ gốc để không tạo khoảng trống.
- `public/documents/Khuat-Nguyen-Thao-Linh-CV.pdf`: CV thật, liên kết qua `profile.cv`. Nút tải CV nằm cạnh nút gửi email ở phần Liên hệ. Có thể đặt `profile.cv` thành `null` để ẩn nút khi chưa có CV.

Khi thay ảnh, cập nhật đường dẫn và kích thước thực tế trong `images.ts`, đồng thời cập nhật alt text tương ứng ở `english.ts`. Không cần sửa đường dẫn rải rác trong component.

## Animation & accessibility

- GSAP được tải động, quản lý hero, tiến độ timeline và parallax nhẹ trên desktop.
- GSAP matchMedia tự cleanup khi unmount, đổi breakpoint hoặc đổi cài đặt reduced motion.
- Motion phụ trách reveal section, mobile menu và dialog.
- Intro du lịch dài khoảng 4,2 giây: bản đồ thế giới → các đường bay hội tụ về Việt Nam → hai pulse nhẹ → mây phủ và tan để lộ Hero. Desktop có 5 chuyến bay; mobile dùng khung bản đồ tập trung vào châu Á với 3 chuyến bay và icon lớn hơn.
- Intro chỉ chạy một lần trong mỗi tab session, lưu `portfolio-intro-seen` trong sessionStorage khi hoàn tất hoặc bấm **Skip intro →**. Refresh cùng session vào thẳng portfolio. Có thể xóa key này trong DevTools để xem lại intro.
- Portfolio và ảnh Hero được render từ đầu phía sau overlay. Hero bắt đầu animation khi mây phủ kín; intro cleanup GSAP, khôi phục cuộn và tương tác khi kết thúc. Nút Skip dùng được với bàn phím; Escape cũng bỏ qua intro. Reduced motion bỏ qua intro hoàn toàn.
- Các component intro nằm trong `src/components/intro/`; bản đồ SVG nhẹ nằm tại `public/maps/world-map.svg`, dùng dữ liệu Natural Earth public domain. Nguồn và license được ghi trong `public/maps/SOURCES.md`.
- Link nội bộ sang trang khác được phủ màn chuyển cảnh trước khi Next.js đổi route. Anchor trong cùng trang vẫn cuộn mượt; tải CV, email, điện thoại và link mở tab mới không bị chặn.
- Reveal trượt lên 30px trong 0,65 giây; các nhóm nội dung xuất hiện so le theo nhịp 0,1 giây. Hover phóng ảnh 1,05 lần, nâng tiêu đề/icon 4px và đổi viền nhẹ.
- Chữ nội dung dùng 17px, chữ phụ 14px và nhãn 12px; bố cục mobile tự nới theo nội dung, không ép chiều cao làm cắt chữ.
- `prefers-reduced-motion` tắt scrub, parallax và giảm chuyển động; nội dung vẫn hiển thị đầy đủ.
- Menu và dialog có Escape, focus trap, phục hồi focus và khóa tương tác nội dung nền.
- Smooth anchors có offset navbar, điều hướng có active state, ảnh dùng `next/image` và font dùng `next/font`.

Design tokens, khoảng cách, typography và các breakpoint được quản lý trong `src/app/globals.css`. Không có backend, CMS, database hay authentication.

Script `node scripts/generate-world-map.mjs` tạo lại bản đồ intro từ dữ liệu Natural Earth. Workflow `.github/workflows/ci.yml` cài dependencies bằng npm, chạy lint và build khi push hoặc mở pull request vào `main`.

Khi đưa lên hosting, đặt `NEXT_PUBLIC_SITE_URL` thành URL thật của portfolio để metadata chia sẻ sử dụng đúng domain. Biến mẫu nằm trong `.env.example`.
