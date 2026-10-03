export type JournalImage = {
  src: string;
  alt: string;
  position?: string;
  credit: string;
  source: string;
  downloadUrl: string;
};

export type Experience = {
  id: string;
  period?: string;
  year?: string;
  category: string;
  title: string;
  organization: string;
  description: string;
  highlights: string[];
};

export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: JournalImage;
  year?: string;
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

export type CultureNote = {
  id: string;
  number: string;
  name: string;
  region: string;
  title: string;
  description: string;
  tags: string[];
  image: JournalImage;
  note: string;
  questions: string[];
};
