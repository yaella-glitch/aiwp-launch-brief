import { ScrollExpandHero } from '@/components/ScrollExpandHero';
import { hero } from '@/content';

/**
 * Hero — scroll-expand pattern with video lens.
 *
 * Drop a video at /public/hero/hero.mp4 (or set hero.media in JSON).
 * Drop a still bg image at /public/hero/hero-bg.png (or set hero.bgImage).
 * Both placeholder gracefully until provided.
 */
export function Hero(_: { presentMode: boolean }) {
  return (
    <ScrollExpandHero
      mediaSrc={hero.media ?? '/hero/hero.mp4'}
      bgImageSrc={hero.bgImage ?? '/hero/hero-bg.png'}
      mediaAlt="AI work platform — Milestone 2 hero visual"
      titleFirstLine={hero.headline}
      titleRestLine={hero.highlight}
      subtitle={`${hero.badge} · Launching ${hero.launchDate}`}
      scrollHint="Scroll to expand"
    />
  );
}
