/** Shared types used across the site. */

export type SectionId =
  | 'hero'
  | 'launch-date'
  | 'bottom-line'
  | 'background'
  | 'focus'
  | 'product-overview'
  | 'gist-story'
  | 'customer'
  | 'market'
  | 'positioning'
  | 'launch'
  | 'resources';

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

export interface GistOrbitNode {
  id: string;
  title: string;
  summary: string;
  detail: string;
}

export interface BackgroundContent {
  title: string;
  /** Short 2-3 sentence gist of the launch. */
  story: string;
  /** Highlighted closing line (painted-marker accent). */
  highlight: string;
}

export interface GistStoryBox {
  id: string;
  title: string;
  body: string;
  tags: string[];
}

export interface GistStoryContent {
  title: string;
  lede?: string;
  /** Two side-by-side boxes that frame the launch narrative. */
  boxes: GistStoryBox[];
  /** Orbit visual that sits below the boxes. */
  gist: {
    center: { title: string; tagline: string };
    nodes: GistOrbitNode[];
  };
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
  /** Short name of the scenario. */
  name: string;
  /** Customer pain — quoted, first-person. */
  pain: string;
  /** Solution — how this launch resolves the pain. */
  solution: string;
  /** Feature tags that power the solution. */
  features: string[];
}

export interface ProductOverviewContent {
  eyebrow?: string;
  title: string;
  lede: string;
  /** Top-level tabs of grouped capability cards. */
  tabs: CapabilityTab[];
}

export interface FocusItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface FocusContent {
  title: string;
  lede: string;
  /** 3-panel emphasis: lead / reinforce / close. */
  items: FocusItem[];
}

export interface MessagingHierarchyContent {
  title: string;
  lede: string;
  /** The official launch tagline — top of the hierarchy. */
  tagline: string;
  /** The single key message — second level. */
  keyMessage: string;
  /** Up to 3 supporting / secondary messages. */
  secondaryMessages: string[];
  /** Writing & content guidelines — sit between the hierarchy and Say/Don't say. */
  writingGuidelines: string[];
  sayDontSay: Array<{ topic: string; say: string; dontSay: string; why: string }>;
}

export interface Persona {
  id: string;
  /** primary = decision maker, secondary = end user, supporting = investor */
  kind: 'primary' | 'secondary' | 'supporting';
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
  useCases: UseCase[];
  beforeAfter: BeforeAfter[];
}

export interface MarketContent {
  title: string;
  lede: string;
  /** Competitor categories — same shape as ProductOverview tabs. */
  tabs: CapabilityTab[];
}

/** Positioning section is now a Messaging Hierarchy. */
export type PositioningContent = MessagingHierarchyContent;

export interface BottomLineContent {
  title: string;
  lede?: string;
  /** 3–5 short statements. Rendered as a numbered editorial list. */
  points: string[];
}

export interface ResourceLink {
  label: string;
  href: string;
  note?: string;
}

export interface ResourcesContent {
  title: string;
  lede?: string;
  groups: Array<{
    id: string;
    title: string;
    links: ResourceLink[];
  }>;
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
