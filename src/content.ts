/** Content loader. JSON imported at build time — fully static. */
import manifestJson from '../content/manifest.json';
import heroJson from '../content/hero.json';
import bottomLineJson from '../content/bottomLine.json';
import backgroundJson from '../content/background.json';
import gistStoryJson from '../content/gistStory.json';
import productJson from '../content/productOverview.json';
import focusJson from '../content/focus.json';
import customerJson from '../content/customer.json';
import marketJson from '../content/market.json';
import positioningJson from '../content/positioning.json';
import launchJson from '../content/launch.json';
import resourcesJson from '../content/resources.json';

import type {
  Manifest,
  HeroContent,
  BottomLineContent,
  BackgroundContent,
  GistStoryContent,
  ProductOverviewContent,
  FocusContent,
  CustomerContent,
  MarketContent,
  PositioningContent,
  LaunchContent,
  ResourcesContent,
} from './types';

export const manifest = manifestJson as Manifest;
export const hero = heroJson as HeroContent;
export const bottomLine = bottomLineJson as BottomLineContent;
export const background = backgroundJson as BackgroundContent;
export const gistStory = gistStoryJson as GistStoryContent;
export const productOverview = productJson as ProductOverviewContent;
export const focus = focusJson as FocusContent;
export const customer = customerJson as CustomerContent;
export const market = marketJson as MarketContent;
export const positioning = positioningJson as PositioningContent;
export const launch = launchJson as LaunchContent;
export const resources = resourcesJson as ResourcesContent;

export function getRailSections(externalPreview: boolean) {
  return manifest.sections
    .filter((s) => s.visible)
    .filter((s) => s.showInRail !== false)
    .filter((s) => (externalPreview ? s.external !== false : true))
    .sort((a, b) => a.order - b.order);
}
