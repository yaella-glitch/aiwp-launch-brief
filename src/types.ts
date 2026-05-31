/** Shared types used across the site. */

export type SectionId =
  | 'hero'
  | 'how-it-comes-together'
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
  /** If false, the section is rendered but does not appear in the left rail. */
  showInRail?: boolean;
  /** If false, hidden when External preview toggle is ON. */
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
  defaults: {
    externalPreview: boolean;
    presentMode: boolean;
  };
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
  subhead: string;
  description: string;
  launchDate: string;
}

export interface Aspect {
  id: string;
  title: string;
  oneLiner: string;
  image: string;
  imageAlt: string;
  description: string;
  highlights: string[];
}

export interface HowItComesTogetherContent {
  eyebrow: string;
  title: string;
  lede: string;
  aspects: Aspect[];
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  media: { type: 'image' | 'video'; src: string; alt: string };
}

export interface UseCase {
  id: string;
  title: string;
  scenario: string;
  outcome: string;
  image: string;
}

export interface ProductOverviewContent {
  eyebrow: string;
  title: string;
  lede: string;
  capabilities: Capability[];
  demo: { title: string; description: string; video: string; poster: string; caption: string };
  completesPicture: {
    title: string;
    lede: string;
    parts: Array<{ name: string; description: string }>;
  };
  useCases: UseCase[];
}

export interface BeforeAfter {
  id: string;
  theme: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  beforeDescription: string;
  afterDescription: string;
}

export interface CustomerContent {
  eyebrow: string;
  title: string;
  lede: string;
  audience: {
    primary: { title: string; description: string };
    secondary: Array<{ title: string; description: string }>;
  };
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
  differentiators: string[];
}

export interface PositioningContent {
  eyebrow: string;
  title: string;
  lede: string;
  supportsVision: {
    title: string;
    lede: string;
    supportPoints: Array<{ title: string; description: string }>;
  };
  externalEmphasis: Array<{ title: string; description: string }>;
  sayDontSay: Array<{ topic: string; say: string; dontSay: string; why: string }>;
}

export interface LaunchContent {
  eyebrow: string;
  title: string;
  lede: string;
  launchDate: string;
  goals: Array<{ title: string; description: string }>;
  marketingScope: Array<{
    name: string;
    owner: { name: string; function: string; photo: string };
  }>;
  assets: Array<{ name: string; channel: string; due: string; status: string }>;
  expectations: string[];
  outOfScope: string[];
}
