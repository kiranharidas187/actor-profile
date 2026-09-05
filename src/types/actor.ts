// Hand-written mirror of schemas/actor.schema.json and schemas/site.schema.json.
// Keep these in sync with the schema by hand — there's no codegen step.

export interface ImageRef {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface GalleryImage extends ImageRef {
  caption: string;
}

export interface Stat {
  label: string;
  value: string;
}

export type CreditMedium =
  | "Feature Film"
  | "Television"
  | "Web Series"
  | "Theatre"
  | "Short Film"
  | "Commercial";

export interface Credit {
  title: string;
  role: string;
  medium: CreditMedium;
  year: number;
  director?: string;
  company?: string;
}

export interface TrainingEntry {
  program: string;
  school: string;
  instructor?: string;
  year: number;
}

export interface SkillItem {
  label: string;
  level: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Showreel {
  youtubeId: string;
  poster?: ImageRef;
}

export interface AwardEntry {
  name: string;
  project: string;
  year: number;
  category?: string;
}

export interface PressEntry {
  title: string;
  publication: string;
  url: string;
  date?: string;
}

export interface Agent {
  name: string;
  agency: string;
  email?: string;
  phone?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  socials?: SocialLink[];
}

export interface Actor {
  slug: string;
  name: string;
  pronouns?: string;
  headline: string;
  bio: string;
  location: string;
  photos: {
    headshot: ImageRef;
    fullBody?: ImageRef;
    gallery?: GalleryImage[];
  };
  stats?: Stat[];
  credits: Credit[];
  training?: TrainingEntry[];
  skills?: SkillCategory[];
  showreel?: Showreel;
  awards?: AwardEntry[];
  press?: PressEntry[];
  agent?: Agent;
  contact: ContactInfo;
}

export interface SiteConfig {
  name: string;
  description: string;
  footer?: {
    copyrightName?: string;
    socials?: SocialLink[];
  };
}
