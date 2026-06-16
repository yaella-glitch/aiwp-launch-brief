import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { focus } from '@/content';
import { cn, withBase } from '@/lib/utils';
import type { FocusItem } from '@/types';

/**
 * What we lead with externally — editorial stack.
 *
 * Each emphasis (lead / reinforce / close) gets its own row:
 *   - The designed slide image on one side, free to render at its natural
 *     aspect ratio (no fixed-aspect cropping / letterboxing).
 *   - A dedicated text area on the other side: number label, title,
 *     description, optional talking-points list.
 *   - The sides alternate per row for an editorial rhythm.
 *
 * On mobile each row collapses to image-on-top, text-below.
 */
export function Focus() {
  return (
    <section
      id="focus"
      data-section="focus"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader title={focus.title} lede={focus.lede ?? ''} />

        <div className="mt-20 space-y-20 md:space-y-28">
          {focus.items.map((item, i) => (
            <ScrollReveal key={item.id} delay={0.04 * i}>
              <FocusRow item={item} index={i} total={focus.items.length} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FocusRow({
  item,
  index,
  total,
}: {
  item: FocusItem;
  index: number;
  total: number;
}) {
  const isImageRight = index % 2 === 1;
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
      {/* Image — alternates side */}
      <div className={cn(isImageRight ? 'md:order-2' : 'md:order-1')}>
        <FocusImage src={item.image} alt={item.title} />
      </div>

      {/* Text column */}
      <div className={cn(isImageRight ? 'md:order-1' : 'md:order-2')}>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted/70">
          {(index + 1).toString().padStart(2, '0')} / {total}
        </span>

        <h3 className="mt-4 font-display text-[clamp(26px,3.4vw,40px)] font-semibold leading-[1.1] tracking-tight text-ink">
          {item.title}
        </h3>

        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          {item.description}
        </p>

        {item.talkingPoints && item.talkingPoints.length > 0 && (
          <ul className="mt-6 space-y-2.5">
            {item.talkingPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-ink/85">
                <span
                  aria-hidden="true"
                  className="mt-[10px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FocusImage({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  const [ok, setOk] = useState<boolean | null>(null);

  if (ok === false || !src) {
    return (
      <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-canvas to-canvas">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <ImageIcon className="h-5 w-5 text-white/60" aria-hidden="true" />
          </span>
          <p className="mt-3 px-4 font-mono text-[10px] text-white/40">{src}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.img
      src={withBase(src)}
      alt={alt}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
      initial={reduce ? undefined : { opacity: 0 }}
      animate={reduce ? undefined : { opacity: ok ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="block h-auto w-full rounded-3xl border border-white/10 shadow-card-lg"
    />
  );
}
