import { images } from "./images";
import type { CultureNote } from "./types";

export const cultureNotes: CultureNote[] = [
  {
    id: "ha-noi",
    number: "01",
    name: "Chuyện sau một tên phố",
    region: "LỊCH SỬ ĐỊA PHƯƠNG",
    title: "The Story Behind a Hanoi Street Name",
    description:
      "Tôi thường tự hỏi vì sao một con phố có tên như vậy và đâu là câu chuyện phía sau địa danh đó.",
    tags: ["Hà Nội", "Tên phố", "Lịch sử"],
    image: images.hanoi,
    note: "Một góc nhìn có thể phát triển từ sự tò mò về câu chuyện phía sau tên một con phố Hà Nội.",
    questions: [
      "Vì sao một con phố có tên như vậy?",
      "Câu chuyện phía sau địa danh đó là gì?",
      "Làm thế nào để kể câu chuyện ấy dễ hiểu và thú vị hơn đối với du khách?",
    ],
  },
  {
    id: "hue",
    number: "02",
    name: "Hiểu một phong tục Việt",
    region: "PHONG TỤC & ĐỜI SỐNG",
    title: "A Vietnamese Custom Foreign Visitors Often Ask About",
    description:
      "Một góc nhìn về phong tục và đời sống bản địa, từ những câu hỏi mà khách quốc tế muốn tìm hiểu.",
    tags: ["Phong tục", "Văn hóa Việt Nam", "Giao tiếp đa văn hóa"],
    image: images.hoiAn,
    note: "Tôi muốn tìm hiểu một truyền thống bắt nguồn từ đâu và điều gì đã hình thành nên cách sống của người Việt ngày nay.",
    questions: [
      "Một phong tục bắt nguồn từ đâu?",
      "Điều gì đã hình thành nên nét văn hóa này?",
      "Làm thế nào để giải thích cho du khách quốc tế một cách gần gũi?",
    ],
  },
  {
    id: "ninh-binh",
    number: "03",
    name: "Một di tích muốn kể",
    region: "DI TÍCH & KỂ CHUYỆN",
    title: "A Historical Site I Would Love to Guide",
    description:
      "Một hướng nội dung về di tích lịch sử và cách biến kiến thức về điểm đến thành câu chuyện có ý nghĩa trong một hành trình.",
    tags: ["Di tích lịch sử", "Nghiên cứu điểm đến", "Kể chuyện văn hóa"],
    image: images.hue,
    note: "Tôi yêu thích những hành trình giúp mình hiểu thêm về lịch sử, con người và văn hóa địa phương.",
    questions: [
      "Vì sao địa danh ấy tồn tại?",
      "Những câu chuyện lịch sử nào giúp du khách hiểu hơn về nơi này?",
      "Đâu là những nét khiến vùng đất ấy trở nên khác biệt?",
    ],
  },
];
