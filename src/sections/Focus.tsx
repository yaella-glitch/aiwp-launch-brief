import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { focus } from '@/content';
import { cn, withBase } from '@/lib/utils';

/**
 * What we lead with externally — 3 equal-width image cards (lead / reinforce /
 * close). All three are always fully visible (no hover-accordion); each card
 * is just a designed image with object-contain so the full content shows.
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

        <ScrollReveal delay={0.05}>
          <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {focus.items.map((item, i) => (
              <FocusCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FocusCard({
  item,
  index,
}: {
  item: { id: string; title: string; image: string; description: string };
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.05 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]"
    >
      <div className="relative aspect-[4/5] w-full bg-canvas">
        <FocusImage src={item.image} alt={item.title} />
      </div>
    </motion.article>
  );
}

function FocusImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/12 via-indigo-500/6 to-sky-500/8">
        <div className="text-center">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <ImageIcon className="h-4 w-4 text-white/60" aria-hidden="true" />
          </span>
          <p className="mt-2 px-4 font-mono text-[10px] text-white/40">{src}</p>
        </div>
      </div>
    );
  }
  return (
    <img
      src={withBase(src)}
      alt={alt}
      className={cn('h-full w-full object-contain', ok === null && 'opacity-0')}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}
