import { profile, sectionCopy, navigation } from "./profile";
import { experiences } from "./experiences";
import { projects } from "./projects";
import { skillGroups, strengths } from "./skills";
import { achievements } from "./achievements";
import { images, heroCarousel } from "./images";
import type { Experience, Project } from "./types";

export const englishHeroCarousel = heroCarousel.map((image, index) => ({
  ...image,
  alt: `A view of Hanoi — image ${index + 1}`,
}));

export const englishImages = {
  hero: {
    ...images.hero,
    alt: englishHeroCarousel[0].alt,
  },
  portrait: {
    ...images.portrait,
    alt: "A portrait of Lynhhin in a white ao dai beside a lake in Hanoi",
  },
  project: {
    ...images.project,
    alt: "Sharing a moment with international students on a cultural tour of Vietnam",
  },
  recommendations: {
    ...images.recommendations,
    alt: "Lynhhin's Hanoi food and local experience recommendations",
  },
  recommendationModal: {
    ...images.recommendationModal,
    alt: "Landscape illustration of Lynhhin's Hanoi food and local experience recommendations",
  },
  hanoi: {
    ...images.hanoi,
    alt: "Everyday life in Hanoi, with red flags and local shops lining the street",
  },
  hue: {
    ...images.hue,
    alt: "The architecture of Hue's Imperial City beside the water under a clear sky",
  },
  hoiAn: {
    ...images.hoiAn,
    alt: "Historic houses and the river in Hoi An in the late afternoon light",
  },
  ninhBinh: {
    ...images.ninhBinh,
    alt: "A river winding between limestone mountains and fields in Tam Coc, Ninh Binh",
  },
} satisfies typeof images;

export const englishProfile = {
  ...profile,
  location: "Hanoi, Vietnam",
  availability: "Open to opportunities in travel and tourism",
  disciplines: ["Tour guiding", "Culture", "History", "Vietnam"],
  hero: {
    ...profile.hero,
    eyebrow: "LYNHHIN / TRAVEL & CULTURE",
    greeting: "Hello, I'm",
    quote: "Turning local stories into meaningful journeys",
    primaryCta: "Explore my journey",
    secondaryCta: "Connect with me",
    imageLocation: "Hanoi, Vietnam",
    imageCaption: "Local history, people and culture.",
    bottomNote: "A journey towards a deeper understanding of Vietnam.",
  },
  about: {
    eyebrow: "ABOUT ME",
    title: "More than seeing a place.",
    italicTitle: "Understanding and connecting.",
    lead: "I love journeys that deepen my understanding of local history, people and culture.",
    paragraphs: [
      "Hello, I'm Khuất Nguyễn Thảo Linh. To me, a memorable trip is about more than the places you visit. It is also about the stories, experiences and feelings you take home with you.",
      "I always make a habit of looking into the stories behind Vietnam's places, customs and cultural traditions. I often wonder how a street got its name, where a tradition began, or what shaped the way Vietnamese people live today. That curiosity encourages me to read more about Vietnamese history, traditions and culture, and to learn how to turn that knowledge into stories that visitors can understand and enjoy.",
      "I am pursuing a career in tour guiding, cultural experience design and tour operations, especially journeys centred on culture, history and local life. I hope to work with both Vietnamese and international visitors while continuing to develop my storytelling skills and create meaningful travel experiences.",
    ],
    interests: [
      "Historical sites",
      "Local culture",
      "Customs and traditions",
      "Local life",
    ],
    facts: [
      { label: "ALSO KNOWN AS", value: "Lynhhin" },
      { label: "INTERESTS", value: "History · People · Local culture" },
      {
        label: "CAREER DIRECTION",
        value: "Tour guiding · Cultural experiences · Tour operations",
      },
    ],
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Let's create",
    italicTitle: "meaningful journeys together.",
    description:
      "Interested in opportunities in tour guiding, cultural experiences, tour operations and travel content creation.",
    cta: "Email me",
    mailSubject: "Connect with Lynhhin - Opportunities in travel and tourism",
  },
  footer: {
    tagline: "Understanding Vietnam through local history, people and culture.",
    note: profile.footer.note,
  },
} satisfies typeof profile;

const navigationLabels: Record<string, string> = {
  "trang-chu": "Home",
  "ve-toi": "About",
  "hanh-trinh": "Experience",
  "du-an": "Projects",
  "lien-he": "Contact",
};

export const englishNavigation = navigation.map((item) => ({
  ...item,
  label: navigationLabels[item.id],
}));

export const englishSectionCopy = {
  journey: {
    eyebrow: "EXPERIENCE & ACTIVITIES",
    title: "Experiences shared,",
    italic: "connections made.",
    note: "Continuing to learn with every journey.",
  },
  projects: {
    eyebrow: "FEATURED PROJECTS",
    title: "Introducing Vietnam.",
    italic: "Connecting perspectives.",
    description:
      "A cultural tour for international students and recommendations for exploring Hanoi through a local's eyes.",
    detailLabel: "Explore the project",
    briefLabel: "Project overview",
    roleLabel: "My role and experience",
    challengeLabel: "The challenge",
    approachLabel: "My contribution",
    deliverablesLabel: "Experiences & content",
    takeawayLabel: "What I learned",
  },
  skills: {
    eyebrow: "SKILLS",
    title: "What I bring",
    italic: "to each journey.",
    description:
      "Communication, destination research, activity coordination and travel content creation.",
  },
  achievements: {
    eyebrow: "ACHIEVEMENTS & CERTIFICATIONS",
    title: "Languages,",
    italic: "doors to connection.",
    description: "IELTS 7.0 and DELF B1 — French Language Diploma.",
  },
  strengths: {
    eyebrow: "STRENGTHS",
    title: "The qualities I bring",
    italic: "to a tour.",
    description:
      "Friendliness, flexibility, teamwork and a willingness to learn in multicultural settings.",
  },
} satisfies typeof sectionCopy;

export const englishExperiences: Experience[] = [
  {
    id: "onetrip-with-local",
    year: "2024",
    category: "TOUR SUPPORT & LOCAL EXPERIENCES",
    title: "Onetrip with Local",
    organization: "Onetrip with Local",
    description:
      "Gained hands-on experience in tourism by supporting tour delivery, working with tour guides and interacting with visitors during local activities. This helped me understand how a tour is prepared, run and adjusted when unexpected situations arise.",
    highlights: ["Tour support", "Working with guides", "Local experiences"],
  },
  {
    id: "nara-exchange",
    year: "2025",
    category: "EXCHANGE & CULTURAL EXPERIENCES",
    title: "Exchange programme at Nara Women’s University, Japan",
    organization: "Nara Women’s University · Japan",
    description:
      "Took part in a one-week exchange programme at Nara Women’s University in Japan, with learning activities and experiences focused on Japanese culture, history, people and local life. During my time in Nara, I explored how a city rich in heritage preserves and shares its historical values with younger generations and international visitors. The programme broadened my perspective on cross-cultural communication, destination experiences and the ways local culture can become a meaningful travel experience.",
    details: [
      {
        title: "Places I explored and experienced in Nara",
        description:
          "Highlights include Nara Park, known for its free-roaming deer; Tōdai-ji, the temple famous for its Great Buddha; Kasuga Taisha, a Shinto shrine known for its thousands of lanterns; Kōfuku-ji, one of Nara's important historic temples; Naramachi, an old neighbourhood offering insight into traditional life and architecture; and Heijō Palace Site, connected to Nara's history as a former capital of Japan.",
      },
    ],
    highlights: [
      "One-week exchange in Japan",
      "Heritage & local life",
      "Cross-cultural communication",
    ],
  },
  {
    id: "ftu-exchange-student-buddy",
    year: "2025",
    category: "CROSS-CULTURAL COMMUNICATION",
    title: "FTU Exchange Student Buddy",
    organization: "Foreign Trade University",
    description:
      "Became a buddy for international exchange students at Foreign Trade University, helping them settle into their studies and everyday life in Vietnam. This experience developed my cross-cultural communication skills, ability to support international visitors and confidence in building connections in an international environment.",
    highlights: [
      "Supporting international students",
      "Helping international visitors",
      "Cross-cultural connections",
    ],
  },
  {
    id: "continuing-tour-guiding",
    year: "2026",
    period: "Ongoing",
    category: "TOUR GUIDING",
    title: "Continuing to guide tours",
    organization: "Tour guiding & travel experiences",
    description:
      "Continuing to guide tours, accompany visitors and learn from every journey.",
    highlights: [
      "Tour guiding",
      "Connecting with visitors",
      "Continued learning",
    ],
  },
].map((experience) => {
  const source = experiences.find((entry) => entry.id === experience.id);
  return {
    ...experience,
    year: source?.year ?? experience.year,
    month: source?.month,
  };
});

type ProjectTranslation = Pick<
  Project,
  | "title"
  | "imageCaption"
  | "subtitle"
  | "description"
  | "category"
  | "role"
  | "roleDescription"
  | "stats"
  | "skills"
  | "brief"
  | "challenge"
  | "approach"
  | "deliverables"
  | "takeaway"
  | "takeawayLabel"
  | "link"
>;

const projectTranslations: Record<string, ProjectTranslation> = {
  "discover-vietnam-on-us": {
    title: "DISCOVER VIETNAM, ON US",
    imageCaption: "Hanoi · Moments from a cultural journey",
    subtitle:
      "A Free Cultural Journey for International Students · by Onetrip with Local",
    description:
      "A completely free cultural tour for 40 international students from 10 countries, organised to mark the 80th anniversary of Vietnam's National Day.",
    category: "FEATURED PROJECT",
    role: "Contributing ideas · Supporting tour delivery · Accompanying international students",
    roleDescription:
      "I contributed ideas, helped deliver the tour alongside the Onetrip with Local team and tour guides, and accompanied the international students throughout the journey. This experience helped me understand how to share cultural stories with international visitors, work with a team on a real tour and adapt to the needs of different groups.",
    stats: [
      { value: "40", label: "International students" },
      { value: "10", label: "Countries" },
      { value: "80", label: "Years of Vietnam's National Day" },
    ],
    skills: ["Cultural storytelling", "Teamwork", "Adaptability"],
    brief:
      "A completely free cultural tour for 40 international students from 10 countries, organised to mark the 80th anniversary of Vietnam's National Day. The project introduced Vietnam's history, culture and people to international friends through a hands-on, welcoming and memorable experience.",
    challenge:
      "The tour took place during stormy weather and changing road closures for military parade rehearsals. The team had to adapt the itinerary and coordinate on site to ensure the students could still enjoy the full experience.",
    approach: [],
    deliverables: [],
    takeaway:
      "I learned that a good tour requires more than destination knowledge. It also calls for adaptability, communication, teamwork, attentiveness to visitors and the ability to handle unexpected changes.",
  },
  "lynhhins-hanoi-recommendations": {
    title: "Lynhhin's Hanoi Recommendations",
    imageCaption: "Hanoi through Lynhhin's recommendations",
    subtitle: "Explore Hanoi through a local's eyes",
    description:
      "A collection of recommendations for visitors to Hanoi, focused on culture, food and experiences rooted in local life.",
    category: "LOCAL EXPERIENCE RECOMMENDATIONS",
    role: "Researching, selecting & curating Hanoi experiences",
    skills: [
      "Destination research",
      "Local knowledge",
      "Travel content creation",
    ],
    brief:
      "A collection of Hanoi recommendations that I curated from a local's perspective, focused on culture, food and experiences rooted in local life. I hope to help visitors go beyond checking in at famous landmarks and discover Hanoi in a more personal and authentic way.",
    approach: [],
    deliverables: [
      "Hanoi culture",
      "Local food",
      "Experiences rooted in local life",
    ],
    takeawayLabel: "Skills demonstrated through this project",
    takeaway:
      "The project demonstrates destination research, local knowledge, the ability to select and curate travel recommendations, an understanding of visitors' needs and travel content creation.",
    link: {
      label: "Explore My Hanoi Recommendations",
      url: profile.hanoiRecommendationsUrl,
    },
  },
};

export const englishProjects: Project[] = projects.map((project) => ({
  ...project,
  ...projectTranslations[project.id],
  image:
    project.id === "discover-vietnam-on-us"
      ? englishImages.project
      : englishImages.recommendations,
  modalImage: project.modalImage
    ? englishImages.recommendationModal
    : undefined,
}));

const skillTranslations: Record<string, { title: string; items: string[] }> = {
  communication: {
    title: "Connecting with visitors",
    items: [
      "Visitor communication",
      "Cross-cultural communication",
      "Cultural storytelling",
      "Teamwork",
    ],
  },
  tourism: {
    title: "Supporting each tour",
    items: [
      "Destination research",
      "Event organisation support",
      "Problem solving",
      "Adaptability",
    ],
  },
  tools: {
    title: "Creating content",
    items: ["Social media content creation", "Canva", "Microsoft Office"],
  },
  languages: {
    title: "Communicating across languages",
    items: ["Vietnamese · Native", "English · IELTS 7.0", "French · DELF B1"],
  },
};

export const englishSkillGroups = skillGroups.map((group) => ({
  ...group,
  ...skillTranslations[group.id],
}));

const strengthTranslations: Record<
  string,
  { title: string; description: string }
> = {
  empathy: {
    title: "Friendly & approachable",
    description:
      "Friendly and comfortable connecting with visitors in multicultural settings.",
  },
  adaptability: {
    title: "Flexible when plans change",
    description:
      "Flexible when plans change and energetic during activities in the field.",
  },
  storytelling: {
    title: "A collaborative spirit",
    description: "A cooperative teammate when working together on a tour.",
  },
  curiosity: {
    title: "Eager to learn",
    description:
      "Proactive about learning local history, customs and cultural stories.",
  },
};

export const englishStrengths = strengths.map((strength) => ({
  ...strength,
  ...strengthTranslations[strength.icon],
}));

const achievementTranslations: Record<
  string,
  { type: string; organization: string; description: string }
> = {
  ielts: {
    type: "ENGLISH LANGUAGE CERTIFICATION",
    organization: "English",
    description:
      "Language skills for communicating and connecting with international visitors.",
  },
  "delf-b1": {
    type: "FRENCH LANGUAGE CERTIFICATION",
    organization: "French Language Diploma",
    description: "French · B1 level.",
  },
};

export const englishAchievements = achievements.map((achievement) => ({
  ...achievement,
  ...achievementTranslations[achievement.id],
}));
