import { motion, useReducedMotion } from 'framer-motion';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { market } from '@/content';
import { cn } from '@/lib/utils';

/**
 * Market & competitive — context lede, compact 2x2 quadrant, 4 differentiator
 * spotlight cards.
 */
export function Market() {
  const reduce = useReducedMotion();
  return (
    <section
      id="market"
      data-section="market"
      className="relative w-full overflow-hidden py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader
          title={market.title}
          lede={market.lede}
        />

        {/* Market context + Quadrant — two columns on desktop */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div className="max-w-md">
              <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
                Market context.
              </h3>
              <p className="mt-5 text-lead leading-relaxed text-ink/85">{market.marketContext}</p>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted/70">
                {market.quadrant.xAxis.label} × {market.quadrant.yAxis.label}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="card-gradient">
              <div className="card-gradient-inner relative aspect-square w-full max-w-md">
                {/* Background quadrant lines */}
                <div aria-hidden="true" className="absolute inset-7">
                  <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
                  <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />
                </div>

                {/* Axis labels */}
                <div className="absolute inset-7">
                  <span className="absolute -left-1 top-1/2 -translate-y-1/2 -translate-x-full -rotate-90 origin-right text-[9px] font-semibold uppercase tracking-wider text-accent">
                    {market.quadrant.yAxis.label}
                  </span>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-wider text-accent">
                    {market.quadrant.xAxis.label} →
                  </span>
                </div>

                {/* Competitor dots */}
                {market.quadrant.competitors.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={reduce ? undefined : { opacity: 0, scale: 0.4 }}
                    whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute"
                    style={{
                      left: `calc(${c.x}% * 0.86 + 7%)`,
                      bottom: `calc(${c.y}% * 0.86 + 7%)`,
                      transform: 'translate(-50%, 50%)',
                    }}
                  >
                    <CompetitorDot {...c} />
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Differentiators — 4 spotlight cards with subtle numerals */}
        <ScrollReveal delay={0.15}>
          <div className="mt-40">
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
              Why we win.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              The differentiators we lean on across the launch.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {market.differentiators.map((d, i) => (
            <ScrollReveal key={d.title} delay={0.04 * i}>
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col gap-5 p-7">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted/70">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <h4 className="font-display text-xl font-semibold leading-tight text-ink">
                    {d.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted">{d.description}</p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompetitorDot(c: { name: string; isUs: boolean; note: string }) {
  return (
    <div className="group relative cursor-pointer">
      <span
        className={cn(
          'block rounded-full transition-all duration-300',
          c.isUs
            ? 'h-5 w-5 bg-accent ring-4 ring-accent/30 shadow-[0_0_36px_rgba(165,138,255,0.7)] animate-pulse-soft'
            : 'h-2.5 w-2.5 bg-white/60 ring-2 ring-white/20 group-hover:bg-white group-hover:ring-white/40',
        )}
        aria-label={c.name}
      />
      <p
        className={cn(
          'absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap pt-2 text-[10px] font-semibold',
          c.isUs ? 'text-accent' : 'text-ink/80',
        )}
      >
        {c.name}
      </p>
      <div
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-10 mt-8 w-44 -translate-x-1/2 rounded-lg border border-white/10 bg-canvas/95 p-2.5 text-[11px] text-muted shadow-card-lg opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100"
      >
        {c.note}
      </div>
    </div>
  );
}
