import { ScrollExpandHero } from '@/components/ScrollExpandHero';
import { hero, manifest } from '@/content';

/**
 * Hero — scroll-expand pattern (arunachalam0606 reference).
 *
 * Background image fills the viewport. A small "lens" card sits in the
 * center, growing to fullscreen as the user scrolls. Two-line title
 * sits around the card using mix-blend-difference for a knockout effect.
 *
 * Images live in /public/hero/:
 *   - hero-bg.png   → full-bleed background
 *   - hero.png      → the lens / foreground card
 * Both placeholder gracefully until images are dropped.
 */
export function Hero(_: { presentMode: boolean }) {
  return (
    <ScrollExpandHero
      bgImageSrc={hero.bgImage ?? '/hero/hero-bg.png'}
      mediaSrc={manifest.siteMeta.heroImagePath}
      mediaAlt="AI work platform — Milestone 2 hero visual"
      titleFirstLine={hero.headline}
      titleRestLine={hero.highlight}
      subtitle={`${hero.badge} · Launching ${hero.launchDate}`}
      scrollHint="Scroll to expand"
    />
  );
}
