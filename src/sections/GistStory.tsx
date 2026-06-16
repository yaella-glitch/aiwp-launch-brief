import { motion, useReducedMotion } from 'framer-motion';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { GistOrbit } from '@/components/GistOrbit';
import { gistStory } from '@/content';
import { cn } from '@/lib/utils';
import type { GistStoryBox } from '@/types';

/**
 * The gist of the story — frames the two shifts at the heart of the launch
 * (collaboration + connectivity) as side-by-side boxes, with the radial
 * orbital visual below them as the supporting picture.
 */
export function GistStory() {
  return (
    <section
      id="gist-story"
      data-section="gist-story"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader title={gistStory.title} lede={gistStory.lede ?? ''} />

        {/* Framed quote — sits above the boxes */}
        {gistStory.framedQuote && (
          <ScrollReveal delay={0.05}>
            <div className="relative mt-16 overflow-hidden rounded-3xl border border-accent/45 bg-gradient-to-br from-accent/10 via-canvas to-canvas p-9 md:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_0%,rgba(165,138,255,0.12),transparent_55%)]"
              />
              <p className="relative font-display text-[clamp(20px,2.4vw,30px)] font-medium leading-[1.35] text-ink">
                {gistStory.framedQuote}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Two side-by-side boxes */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {gistStory.boxes.map((box, i) => (
              <StoryBox key={box.id} box={box} index={i} />
            ))}
          </div>
        </ScrollReveal>

        {/* Orbit visual below the boxes */}
        <ScrollReveal delay={0.1}>
          <div className="mt-20 md:mt-24">
            <GistOrbit center={gistStory.gist.center} nodes={gistStory.gist.nodes} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function StoryBox({ box, index }: { box: GistStoryBox; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: 0.05 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-canvas to-canvas p-9 md:p-11"
    >
      <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_0%,rgba(165,138,255,0.16),transparent_55%)]" />
      <div className="relative">
        <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted/70">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <h3 className="mt-4 font-display text-[clamp(22px,2.5vw,30px)] font-semibold leading-[1.18] text-ink">
          {box.title}
        </h3>
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{box.body}</p>

        {box.tags.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {box.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  'inline-flex items-center rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1',
                  'text-xs font-medium text-ink/85',
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
