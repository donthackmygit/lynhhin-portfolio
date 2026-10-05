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

Nội dung được cập nhật theo file **Nội dung Portfolio - Trang tính1.pdf** và các ảnh chỉnh sửa do người dùng cung cấp: Khuất Nguyễn Thảo Linh (Lynhhin), Onetrip with Local, trao đổi tại Nara Women’s University ở Nhật Bản, hoạt động sinh viên quốc tế tại FTU, hai dự án, IELTS 7.0, DELF B1, email và WhatsApp. Timeline nhóm theo mốc người dùng cung cấp: 2024 Onetrip; 2025 Nhật Bản và FTU; 2026 tiếp tục dẫn tour. DISCOVER VIETNAM, ON US nằm trong phần dự án. Không thêm ngày cấp chứng chỉ khi tài liệu không cung cấp.

| File                       | Nội dung                                                                 |
| -------------------------- | ------------------------------------------------------------------------ |
| `src/data/profile.ts`      | Tên, giới thiệu, liên hệ, liên kết CV, navigation và câu chữ các section |
| `src/data/experiences.ts`  | Các cột mốc của timeline                                                 |
| `src/data/projects.ts`     | Dự án và nội dung cửa sổ chi tiết                                        |
| `src/data/english.ts`      | Bản dịch tiếng Anh của hồ sơ, timeline, dự án, kỹ năng và chứng chỉ      |
| `src/data/content.ts`      | Nội dung theo ngôn ngữ, nhãn giao diện và nhãn hỗ trợ tiếp cận           |
| `src/data/skills.ts`       | Kỹ năng và điểm mạnh                                                     |
| `src/data/achievements.ts` | Thành tích, chứng chỉ                                                    |
| `src/data/images.ts`       | Đường dẫn ảnh, crop, alt text, tác giả và nguồn tải                      |

`profile.isPlaceholder` hiện là `false`. Mục Góc Du lịch / Văn hóa đã được bỏ; phần tìm hiểu các câu chuyện văn hóa được giữ trong Về tôi. Các mục được đánh số liên tục từ 01 đến 07. Link và mã QR của Lynhhin's Hanoi Recommendations dùng đúng URL NextbyLocal người dùng cung cấp; thay `profile.hanoiRecommendationsUrl` để cập nhật cả hai.

Nút VI/EN trên thanh điều hướng đổi nội dung toàn trang, cửa sổ chi tiết dự án, chú thích ảnh và các nhãn hỗ trợ tiếp cận. Hai ngôn ngữ dùng chung component, ảnh, font, màu sắc, bố cục và hiệu ứng. Lựa chọn ngôn ngữ được lưu trong localStorage với khóa `lynhhin-language`, đồng bộ giữa các tab; tiếng Việt là mặc định. Thuộc tính `html.lang`, tiêu đề và mô tả trang được cập nhật theo ngôn ngữ hiển thị.

Timeline hỗ trợ trường `month` từ 1 đến 12 trong `src/data/experiences.ts`: Nara tháng 7/2025, FTU Exchange Student Buddy tháng 8/2025 và hỗ trợ sự kiện sinh viên quốc tế tháng 9/2025. Các hoạt động cùng năm được xếp theo tháng; hoạt động chưa có tháng nằm sau các mốc đã xác định. Nhãn tháng hiển thị theo ngôn ngữ VI/EN, và bản tiếng Anh dùng chung năm/tháng từ dữ liệu gốc theo `id`. Dự án DISCOVER trong `src/data/projects.ts` có `month: 10`, hiển thị tháng 10/2025 tại danh sách dự án và cửa sổ chi tiết. Chỉ điền tháng thực tế được cung cấp; hoạt động không có tháng vẫn hiển thị theo năm.

## Ảnh & CV

Ảnh được tải từ Unsplash và lưu cục bộ dạng WebP trong `public/images/`. Nguồn và tác giả có trong `src/data/images.ts`, đồng thời được hiển thị ở footer. Ảnh áo dài là ảnh cảm hứng, không phải ảnh chân dung của chủ portfolio.

Thay file ảnh trong các thư mục tương ứng hoặc cập nhật `images.ts`. Không cần sửa đường dẫn rải rác trong component. Script tải lại ảnh dùng Node.js hỗ trợ strip TypeScript:

```powershell
node --experimental-strip-types scripts/download-images.mjs
```

Tài liệu nội dung không có CV thật. `profile.cv` hiện là `null`, nên các nút tải CV được ẩn hoặc chuyển thành nút liên hệ. Thêm CV thật vào `public/cv/` và đặt đường dẫn vào `profile.cv` để khôi phục tải CV. File CV mẫu cũ không được liên kết với hồ sơ Lynhhin; script tạo CV mẫu cũng không chạy với hồ sơ thật.

## Animation & accessibility

- GSAP được tải động, quản lý hero, tiến độ timeline, reveal gallery và parallax nhẹ trên desktop.
- GSAP matchMedia tự cleanup khi unmount, đổi breakpoint hoặc đổi cài đặt reduced motion.
- Motion phụ trách reveal section, mobile menu và dialog.
- Intro du lịch dài khoảng 4,2 giây: bản đồ thế giới → các đường bay hội tụ về Việt Nam → hai pulse nhẹ → mây phủ và tan để lộ Hero. Desktop có 5 chuyến bay; mobile dùng khung bản đồ tập trung vào châu Á với 3 chuyến bay và icon lớn hơn.
- Intro chỉ chạy một lần trong mỗi tab session, lưu `portfolio-intro-seen` trong sessionStorage khi hoàn tất hoặc bấm **Skip intro →**. Refresh cùng session vào thẳng portfolio. Có thể xóa key này trong DevTools để xem lại intro.
- Portfolio và ảnh Hero được render từ đầu phía sau overlay. Hero bắt đầu animation khi mây phủ kín; intro cleanup GSAP, khôi phục cuộn và tương tác khi kết thúc. Nút Skip dùng được với bàn phím; Escape cũng bỏ qua intro. Reduced motion bỏ qua intro hoàn toàn.
- Các component intro và timeline nằm trong `src/components/intro/`; bản đồ SVG nhẹ nằm tại `public/maps/world-map.svg`, dùng dữ liệu Natural Earth public domain. Nguồn và license được ghi trong `public/maps/SOURCES.md`; không thêm dependency mới.
- Link nội bộ sang trang khác được phủ màn chuyển cảnh trước khi Next.js đổi route. Anchor trong cùng trang vẫn cuộn mượt; tải CV, email, điện thoại và link mở tab mới không bị chặn.
- Reveal trượt lên 30px trong 0,65 giây; các nhóm nội dung xuất hiện so le theo nhịp 0,1 giây. Hover phóng ảnh 1,05 lần, nâng tiêu đề/icon 4px và đổi viền nhẹ.
- Chữ nội dung dùng 17px, chữ phụ 14px và nhãn 12px; bố cục mobile tự nới theo nội dung, không ép chiều cao làm cắt chữ.
- `prefers-reduced-motion` tắt scrub, parallax và giảm chuyển động; nội dung vẫn hiển thị đầy đủ.
- Menu và dialog có Escape, focus trap, phục hồi focus và khóa tương tác nội dung nền.
- Smooth anchors có offset navbar, điều hướng có active state, ảnh dùng `next/image` và font dùng `next/font`.

Design tokens, khoảng cách, typography và các breakpoint được quản lý trong `src/app/globals.css`. Không có backend, CMS, database hay authentication.

Khi đưa lên hosting, đặt `NEXT_PUBLIC_SITE_URL` thành URL thật của portfolio để metadata chia sẻ sử dụng đúng domain. Biến mẫu nằm trong `.env.example`.
