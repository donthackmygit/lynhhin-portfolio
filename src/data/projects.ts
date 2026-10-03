import { images } from "./images";
import { profile } from "./profile";
import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "discover-vietnam-on-us",
    number: "01",
    title: "DISCOVER VIETNAM, ON US",
    subtitle:
      "A Free Cultural Journey for International Students · by Onetrip with Local",
    description:
      "Một chương trình tour văn hóa hoàn toàn miễn phí dành cho 40 sinh viên quốc tế đến từ 10 quốc gia, được tổ chức đúng dịp kỷ niệm 80 năm Quốc khánh Việt Nam.",
    image: images.hanoi,
    category: "FEATURED PROJECT",
    badge: "Onetrip with Local",
    role: "Đóng góp ý tưởng · Hỗ trợ triển khai tour · Đồng hành cùng sinh viên quốc tế",
    roleDescription:
      "Tôi đóng góp ý tưởng, tham gia hỗ trợ triển khai tour cùng đội ngũ Onetrip with Local và các hướng dẫn viên, đồng thời đồng hành cùng sinh viên quốc tế trong suốt hành trình. Trải nghiệm này giúp tôi hiểu rõ hơn cách truyền tải câu chuyện văn hóa tới khách quốc tế, phối hợp trong một tour thực tế và thích ứng với nhu cầu của nhiều nhóm khách khác nhau.",
    stats: [
      { value: "40", label: "Sinh viên quốc tế" },
      { value: "10", label: "Quốc gia" },
      { value: "80", label: "Năm Quốc khánh Việt Nam" },
    ],
    skills: ["Kể chuyện văn hóa", "Làm việc nhóm", "Khả năng thích ứng"],
    brief:
      "Một chương trình tour văn hóa hoàn toàn miễn phí dành cho 40 sinh viên quốc tế đến từ 10 quốc gia, được tổ chức đúng dịp kỷ niệm 80 năm Quốc khánh Việt Nam. Dự án hướng tới việc giới thiệu lịch sử, văn hóa và con người Việt Nam tới bạn bè quốc tế thông qua một trải nghiệm thực tế, gần gũi và đáng nhớ.",
    challenge:
      "Tour diễn ra trong điều kiện mưa bão và lịch cấm đường phục vụ sơ duyệt diễu binh có nhiều thay đổi. Đội ngũ phải linh hoạt điều chỉnh lịch trình và phối hợp tại hiện trường để đảm bảo trải nghiệm của sinh viên vẫn diễn ra trọn vẹn.",
    approach: [],
    deliverables: [],
    takeaway:
      "Tôi nhận ra rằng một tour tốt không chỉ phụ thuộc vào kiến thức về điểm đến, mà còn đòi hỏi khả năng thích ứng, giao tiếp, làm việc nhóm, quan sát khách và xử lý những thay đổi ngoài kế hoạch.",
  },
  {
    id: "lynhins-hanoi-recommendations",
    number: "02",
    title: "Lynhin's Hanoi Recommendations",
    subtitle: "Khám phá Hà Nội từ góc nhìn của một người địa phương",
    description:
      "Một danh sách gợi ý trải nghiệm Hà Nội dành cho du khách, tập trung vào văn hóa, ẩm thực và những trải nghiệm mang dấu ấn bản địa.",
    image: images.hanoi,
    category: "GỢI Ý TRẢI NGHIỆM ĐỊA PHƯƠNG",
    badge: "NextbyLocal",
    role: "Tổng hợp, chọn lọc & xây dựng gợi ý trải nghiệm Hà Nội",
    skills: [
      "Nghiên cứu điểm đến",
      "Hiểu biết địa phương",
      "Sáng tạo nội dung du lịch",
    ],
    brief:
      "Một danh sách gợi ý trải nghiệm Hà Nội dành cho du khách, được tôi tổng hợp từ góc nhìn của một người địa phương, tập trung vào văn hóa, ẩm thực và những trải nghiệm mang dấu ấn bản địa. Tôi mong muốn giúp du khách không chỉ “check-in” tại các địa điểm nổi tiếng mà còn khám phá Hà Nội theo cách gần gũi và chân thực hơn.",
    approach: [],
    deliverables: [
      "Văn hóa Hà Nội",
      "Ẩm thực địa phương",
      "Trải nghiệm mang dấu ấn bản địa",
    ],
    takeawayLabel: "Năng lực thể hiện qua dự án",
    takeaway:
      "Dự án thể hiện khả năng nghiên cứu điểm đến, hiểu biết địa phương, chọn lọc và xây dựng gợi ý du lịch, thấu hiểu nhu cầu của du khách và sáng tạo nội dung du lịch.",
    link: {
      label: "Explore My Hanoi Recommendations",
      url: profile.hanoiRecommendationsUrl,
    },
  },
];
