/** Content loader. JSON imported at build time — fully static. */
import manifestJson from '../content/manifest.json';
import heroJson from '../content/hero.json';
import backgroundJson from '../content/background.json';
import productJson from '../content/productOverview.json';
import customerJson from '../content/customer.json';
import marketJson from '../content/market.json';
import positioningJson from '../content/positioning.json';
import launchJson from '../content/launch.json';

import type {
  Manifest,
  HeroContent,
  BackgroundContent,
  ProductOverviewContent,
  CustomerContent,
  MarketContent,
  PositioningContent,
  LaunchContent,
} from './types';

export const manifest = manifestJson as Manifest;
export const hero = heroJson as HeroContent;
export const background = backgroundJson as BackgroundContent;
export const productOverview = productJson as ProductOverviewContent;
export const customer = customerJson as CustomerContent;
export const market = marketJson as MarketContent;
export const positioning = positioningJson as PositioningContent;
export const launch = launchJson as LaunchContent;

export function getRailSections(externalPreview: boolean) {
  return manifest.sections
    .filter((s) => s.visible)
    .filter((s) => s.showInRail !== false)
    .filter((s) => (externalPreview ? s.external !== false : true))
    .sort((a, b) => a.order - b.order);
}
