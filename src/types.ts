/** Shared types used across the site. */

export type SectionId =
  | 'hero'
  | 'background'
  | 'product-overview'
  | 'customer'
  | 'market'
  | 'positioning'
  | 'launch';

export interface SectionMeta {
  id: SectionId;
  title: string;
  icon: string;
  order: number;
  visible: boolean;
  showInRail?: boolean;
  external?: boolean;
}

export interface SiteMeta {
  version: string;
  lastUpdated: string;
  launchDate: string;
  launchLead: string;
  audioBriefPath: string;
  heroImagePath: string;
  passwordHashHint: string;
  defaults: { externalPreview: boolean; presentMode: boolean };
}

export interface Manifest {
  siteMeta: SiteMeta;
  sections: SectionMeta[];
}

export interface HeroContent {
  badge: string;
  eyebrow: string;
  headline: string;
  highlight: string;
  launchDate: string;
}

export interface BackgroundContent {
  title: string;
  paragraphs: string[];
  marqueeText: string;
}

/** A single capability card — has text + a media slot (image or video). */
export interface CapabilityCard {
  id: string;
  title: string;
  description: string;
  media: { type: 'image' | 'video'; src: string; alt: string };
}

/** A top-level tab grouping several capability cards. */
export interface CapabilityTab {
  id: string;
  title: string;
  /** Short paragraph shown under the active tab. */
  tagline?: string;
  cards: CapabilityCard[];
}

export interface UseCase {
  id: string;
  title: string;
  scenario: string;
  outcome: string;
  image: string;
}

export interface ProductOverviewContent {
  eyebrow?: string;
  title: string;
  lede: string;
  /** Top-level tabs of grouped capability cards. */
  tabs: CapabilityTab[];
  useCases: UseCase[];
}

export interface Persona {
  id: string;
  kind: 'primary' | 'secondary';
  name: string;
  role: string;
  photo: string;
  description: string;
}

export interface BeforeAfter {
  id: string;
  theme: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface CustomerContent {
  eyebrow: string;
  title: string;
  lede: string;
  personas: Persona[];
  beforeAfter: BeforeAfter[];
}

export interface QuadrantCompetitor {
  id: string;
  name: string;
  x: number;
  y: number;
  isUs: boolean;
  note: string;
}

export interface MarketContent {
  eyebrow: string;
  title: string;
  lede: string;
  marketContext: string;
  quadrant: {
    xAxis: { label: string; leftLabel: string; rightLabel: string };
    yAxis: { label: string; bottomLabel: string; topLabel: string };
    competitors: QuadrantCompetitor[];
  };
  differentiators: Array<{ title: string; description: string }>;
}

export interface PositioningAspect {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
}

export interface PositioningContent {
  eyebrow: string;
  title: string;
  lede: string;
  vision: { title: string; statement: string };
  comesTogether: { title: string; lede: string; aspects: PositioningAspect[] };
  emphasisLede?: string;
  externalEmphasis: Array<{ title: string; image: string; description: string }>;
  sayDontSay: Array<{ topic: string; say: string; dontSay: string; why: string }>;
}

export interface LaunchDeliverable {
  name: string;
  channel: string;
  due: string;
  status: string;
  owner: { name: string; function: string; photo: string };
}

export interface LaunchContent {
  eyebrow: string;
  title: string;
  lede: string;
  launchDate: string;
  goals: Array<{ title: string; description: string }>;
  deliverables: LaunchDeliverable[];
  expectations: string[];
  outOfScope: string[];
}
