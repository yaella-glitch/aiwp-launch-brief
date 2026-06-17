import { Check, X } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MessagingHierarchy } from '@/components/MessagingHierarchy';
import { FocusCarousel } from '@/components/FocusCarousel';
import { positioning, focus } from '@/content';

/**
 * Positioning & messaging — visual hierarchy of:
 *   tagline → key message → secondary messages (up to 3)
 * with say/don't-say language guardrails underneath.
 */
export function Positioning() {
  return (
    <section
      id="positioning"
      data-section="positioning"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader title={positioning.title} lede="" />

        {/* What we lead with externally — carousel sits ABOVE the hierarchy */}
        {focus.items.length > 0 && (
          <>
            <ScrollReveal delay={0.05}>
              <div className="mt-20 max-w-3xl">
                <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
                  What we lead with externally.
                </h3>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="mt-12">
                <FocusCarousel items={focus.items} />
              </div>
            </ScrollReveal>
          </>
        )}

        {/* Messaging hierarchy */}
        <ScrollReveal delay={0.1}>
          <div className="mt-24">
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
              Messaging hierarchy.
            </h3>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="mt-12">
            <MessagingHierarchy
              tagline={positioning.tagline}
              keyMessage={positioning.keyMessage}
              secondaryMessages={positioning.secondaryMessages}
            />
          </div>
        </ScrollReveal>

        {/* Differentiators — pillars under the hierarchy */}
        {positioning.differentiators && positioning.differentiators.length > 0 && (
          <ScrollReveal delay={0.14}>
            <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {positioning.differentiators.map((d) => (
                <div
                  key={d.id}
                  className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/[0.06] via-canvas to-canvas p-7 md:p-9"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_0%,rgba(165,138,255,0.10),transparent_55%)]"
                  />
                  <div className="relative">
                    <h4 className="font-display text-xl font-semibold leading-tight text-ink md:text-2xl">
                      {d.title}
                    </h4>
                    <p className="mt-3 font-display text-base font-medium leading-snug text-ink/95 md:text-lg">
                      {d.positioning}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                      {d.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Writing & content guidelines */}
        {positioning.writingGuidelines && positioning.writingGuidelines.length > 0 && (
          <>
            <ScrollReveal delay={0.12}>
              <div className="mt-24">
                <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
                  Writing & content guidelines.
                </h3>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <ul className="mt-10 max-w-4xl space-y-3">
                {positioning.writingGuidelines.map((g, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6"
                  >
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/[0.12] font-mono text-xs font-semibold text-accent">
                      {i + 1}
                    </span>
                    <p className="text-base leading-relaxed text-ink/90 md:text-lg">{g}</p>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </>
        )}

        {/* Say / Don't Say — language guardrails (no "Why" lines anymore) */}
        <ScrollReveal delay={0.15}>
          <div className="mt-24">
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
              Say. Don't say.
            </h3>
          </div>
        </ScrollReveal>

        <div className="mt-12 space-y-6">
          {positioning.sayDontSay.map((s, i) => (
            <ScrollReveal key={s.topic} delay={0.04 * i}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-10">
                <h4 className="font-display text-lg font-semibold text-ink md:text-xl">{s.topic}</h4>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.05] p-5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    <div>
                      <h5 className="font-display text-base font-semibold text-emerald-300">Say</h5>
                      <p className="mt-2 text-base leading-relaxed text-ink">{s.say}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-rose-400/25 bg-rose-400/[0.05] p-5">
                    <X className="mt-1 h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
                    <div>
                      <h5 className="font-display text-base font-semibold text-rose-300">Don't say</h5>
                      <p className="mt-2 text-base leading-relaxed text-ink/85">{s.dontSay}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
