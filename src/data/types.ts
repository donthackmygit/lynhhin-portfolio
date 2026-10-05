export type JournalImage = {
  src: string;
  alt: string;
  position?: string;
  width?: number;
  height?: number;
  credit: string;
  source: string;
  downloadUrl: string;
};

export type CalendarMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Experience = {
  id: string;
  period?: string;
  year: string;
  month?: CalendarMonth;
  category: string;
  title: string;
  organization: string;
  description: string;
  details?: { title: string; description: string }[];
  highlights: string[];
};

export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: JournalImage;
  modalImage?: JournalImage;
  imageCaption?: string;
  year?: string;
  month?: CalendarMonth;
  category: string;
  badge?: string;
  role: string;
  roleDescription?: string;
  stats?: { value: string; label: string }[];
  skills: string[];
  brief: string;
  challenge?: string;
  approach: string[];
  deliverables: string[];
  takeaway: string;
  takeawayLabel?: string;
  link?: { label: string; url: string | null };
};
