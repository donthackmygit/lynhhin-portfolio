import { profile, navigation, sectionCopy } from "./profile";
import { experiences } from "./experiences";
import { projects } from "./projects";
import { skillGroups, strengths } from "./skills";
import { achievements } from "./achievements";
import { images } from "./images";
import {
  englishProfile,
  englishNavigation,
  englishSectionCopy,
  englishExperiences,
  englishProjects,
  englishSkillGroups,
  englishStrengths,
  englishAchievements,
  englishImages,
} from "./english";

export type Locale = "vi" | "en";

const vietnameseUi = {
  skipToContent: "Đến nội dung chính",
  downloadCv: "Tải CV",
  contact: "Liên hệ",
  contactName: "Liên hệ Lynhhin",
  mainNavigation: "Điều hướng chính",
  mobileNavigation: "Điều hướng di động",
  openMenu: "Mở menu",
  closeMenu: "Đóng menu",
  journeyWith: "MỘT HÀNH TRÌNH CÙNG",
  aboutImageEyebrow: "01 / MỘT CHÚT CẢM HỨNG",
  interests: "Sở thích",
  continueJourney: "Đi tiếp cùng tôi",
  scrollToAbout: "Cuộn đến phần về tôi",
  about: "Về tôi",
  backToTop: "Về đầu trang",
  photoCredits: "Nguồn ảnh",
  closeDialog: "Đóng cửa sổ",
  close: "Đóng",
  viewProject: "Xem dự án",
  projectLabel: "DỰ ÁN",
  projectImageCaption: "Hà Nội · Ảnh minh họa",
  role: "VAI TRÒ",
  projectDetails: "Chi tiết dự án",
  openRecommendations: "Mở Lynhhin's Hanoi Recommendations",
  qrRecommendations:
    "Mã QR tới Lynhhin's Hanoi Recommendations trên NextbyLocal",
  contactClosing: "Hẹn gặp ở một hành trình mới.",
  journeyFirstLine: "Hành",
  journeySecondLine: "trình.",
  journeyDescription:
    "Học từ môi trường thực tế, từ những chuyến tour và từ những người tôi đồng hành.",
  journeyEyebrow: "TRẢI NGHIỆM & KẾT NỐI",
  languageSelector: "Chọn ngôn ngữ",
  siteDescription: `${profile.name} — Lynhhin. Hướng dẫn du lịch, thiết kế trải nghiệm văn hóa, vận hành tour và kết nối với du khách quốc tế.`,
};

const englishUi = {
  skipToContent: "Skip to main content",
  downloadCv: "Download CV",
  contact: "Contact",
  contactName: "Contact Lynhhin",
  mainNavigation: "Main navigation",
  mobileNavigation: "Mobile navigation",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  journeyWith: "A JOURNEY WITH",
  aboutImageEyebrow: "01 / A LITTLE INSPIRATION",
  interests: "Interests",
  continueJourney: "Continue the journey with me",
  scrollToAbout: "Scroll to about me",
  about: "About me",
  backToTop: "Back to top",
  photoCredits: "Photo credits",
  closeDialog: "Close dialog",
  close: "Close",
  viewProject: "View project",
  projectLabel: "PROJECT",
  projectImageCaption: "Hanoi · Illustrative image",
  role: "ROLE",
  projectDetails: "Project details",
  openRecommendations: "Open Lynhhin's Hanoi Recommendations",
  qrRecommendations:
    "QR code for Lynhhin's Hanoi Recommendations on NextbyLocal",
  contactClosing: "See you on a new journey.",
  journeyFirstLine: "My",
  journeySecondLine: "journey.",
  journeyDescription:
    "Learning from hands-on experiences, from tours and from the people I travel with.",
  journeyEyebrow: "EXPERIENCES & CONNECTIONS",
  languageSelector: "Select language",
  siteDescription: `${profile.name} — Lynhhin. Tour guiding, cultural experience design, tour operations and connections with international visitors.`,
} satisfies typeof vietnameseUi;

export const contentByLocale = {
  vi: {
    profile,
    navigation,
    sectionCopy,
    experiences,
    projects,
    skillGroups,
    strengths,
    achievements,
    images,
    ui: vietnameseUi,
  },
  en: {
    profile: englishProfile,
    navigation: englishNavigation,
    sectionCopy: englishSectionCopy,
    experiences: englishExperiences,
    projects: englishProjects,
    skillGroups: englishSkillGroups,
    strengths: englishStrengths,
    achievements: englishAchievements,
    images: englishImages,
    ui: englishUi,
  },
};
