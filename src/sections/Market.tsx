import { motion, useReducedMotion } from 'framer-motion';
import { SectionMarker } from '@/components/SectionMarker';
import { ScrollReveal } from '@/components/ScrollReveal';
import { market } from '@/content';
import { cn } from '@/lib/utils';

/**
 * Part 3 · Market & competitive
 *   - Market context lede
 *   - 2x2 quadrant matrix — competitors plotted on user-defined axes
 *   - Differentiators row
 */
export function Market() {
  const reduce = useReducedMotion();
  return (
    <section id="market" data-section="market" className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <SectionMarker number="03" eyebrow={market.eyebrow} title={market.title} lede={market.lede} />

        {/* Market context */}
        <ScrollReveal>
          <div className="mt-16 max-w-3xl">
            <p className="text-eyebrow uppercase text-accent">Market context</p>
            <p className="mt-4 text-lead leading-relaxed text-ink/85">{market.marketContext}</p>
          </div>
        </ScrollReveal>

        {/* Quadrant */}
        <ScrollReveal delay={0.1}>
          <div className="mt-20">
            <p className="text-eyebrow uppercase text-muted">Competitive positioning</p>
            <h3 className="mt-3 font-display text-3xl text-ink">Where we sit.</h3>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-10 relative">
            <div className="card-gradient">
              <div className="card-gradient-inner relative aspect-[16/10] w-full">
                {/* Background quadrant lines */}
                <div aria-hidden="true" className="absolute inset-8 md:inset-12">
                  {/* Y axis */}
                  <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
                  {/* X axis */}
                  <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />
                  {/* Grid subtle dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />
                </div>

                {/* Axis labels */}
                <div className="absolute inset-8 md:inset-12">
                  {/* X axis */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 -rotate-0 text-[10px] font-medium uppercase tracking-wider text-muted">
                    {market.quadrant.xAxis.leftLabel}
                  </span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-[10px] font-medium uppercase tracking-wider text-muted">
                    {market.quadrant.xAxis.rightLabel}
                  </span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-eyebrow uppercase text-accent">
                    {market.quadrant.xAxis.label} →
                  </span>
                  {/* Y axis */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-3 text-[10px] font-medium uppercase tracking-wider text-muted">
                    {market.quadrant.yAxis.bottomLabel}
                  </span>
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-3 text-[10px] font-medium uppercase tracking-wider text-muted">
                    {market.quadrant.yAxis.topLabel}
                  </span>
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full -rotate-90 origin-right text-eyebrow uppercase text-accent">
                    {market.quadrant.yAxis.label} →
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
                    // Position is computed in the inner padded box (inset 8 / 12).
                    style={{
                      left: `calc(${c.x}% * 0.88 + 6%)`,
                      bottom: `calc(${c.y}% * 0.82 + 9%)`,
                      transform: 'translate(-50%, 50%)',
                    }}
                  >
                    <CompetitorDot {...c} />
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              Hover any competitor to see their angle. monday glows.
            </p>
          </div>
        </ScrollReveal>

        {/* Differentiators */}
        <ScrollReveal delay={0.2}>
          <div className="mt-32">
            <p className="text-eyebrow uppercase text-muted">Why we win</p>
            <h3 className="mt-3 font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
              Our differentiators.
            </h3>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {market.differentiators.map((d, i) => (
            <ScrollReveal key={i} delay={0.05 + i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-accent/20 bg-accent/[0.05] p-8 transition-colors duration-200 hover:border-accent/40 hover:bg-accent/[0.1]">
                <span
                  aria-hidden="true"
                  className="absolute -right-6 -top-6 font-display text-7xl font-bold text-accent/15 transition-transform duration-500 group-hover:scale-110"
                >
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <p className="relative text-base leading-relaxed text-ink/90">{d}</p>
              </div>
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
            ? 'h-6 w-6 bg-accent ring-4 ring-accent/30 shadow-[0_0_40px_rgba(165,138,255,0.7)] animate-pulse-soft'
            : 'h-3 w-3 bg-white/60 ring-2 ring-white/20 group-hover:bg-white group-hover:ring-white/40',
        )}
        aria-label={c.name}
      />
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 whitespace-nowrap pt-2',
          c.isUs ? 'top-full' : 'top-full',
        )}
      >
        <p className={cn('text-xs font-semibold', c.isUs ? 'text-accent' : 'text-ink/80')}>
          {c.name}
        </p>
      </div>
      {/* Hover note */}
      <div
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-10 mt-10 w-56 -translate-x-1/2 rounded-lg border border-white/10 bg-canvas/95 p-3 text-xs text-muted shadow-card-lg opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100"
      >
        {c.note}
      </div>
    </div>
  );
}
