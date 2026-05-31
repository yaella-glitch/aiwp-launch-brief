import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { User } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { launch } from '@/content';
import { cn } from '@/lib/utils';

const statusColor: Record<string, string> = {
  done: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30',
  doing: 'bg-amber-400/15 text-amber-100 border-amber-400/30',
  todo: 'bg-white/10 text-muted border-white/15',
  blocked: 'bg-rose-400/15 text-rose-200 border-rose-400/30',
};

/**
 * Launch & marketing — date statement, 2 goals, single combined assets+owners
 * table, expectations card, out-of-scope (small, below).
 */
export function Launch() {
  const reduce = useReducedMotion();
  return (
    <section
      id="launch"
      data-section="launch"
      className="relative w-full overflow-hidden py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader
          title={launch.title}
          lede={launch.lede}
        />

        {/* Launch date */}
        <ScrollReveal>
          <div className="mt-16 border-b border-white/10 pb-12">
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
              Launch date.
            </h3>
            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-display text-[clamp(48px,9vw,128px)] font-bold leading-none tracking-[-0.02em] text-ink"
            >
              <span className="bg-gradient-to-br from-violet-200 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
                {launch.launchDate}
              </span>
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Goals (2 only) — large, editorial */}
        <ScrollReveal delay={0.08}>
          <div className="mt-32">
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
              Goals.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              What we're trying to achieve.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {launch.goals.map((g, i) => (
            <ScrollReveal key={g.title} delay={0.04 * i}>
              <SpotlightCard className="h-full">
                <div className="flex h-full flex-col gap-4 p-10 md:p-12">
                  <h4 className="font-display text-[clamp(24px,2.6vw,36px)] font-semibold leading-[1.15] text-ink">
                    {g.title}
                  </h4>
                  <p className="text-base leading-relaxed text-muted">{g.description}</p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Deliverables + Owners (combined) */}
        <ScrollReveal delay={0.1}>
          <div className="mt-40">
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
              Assets &amp; owners.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Everything we're shipping — and who owns each.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-muted">
                <tr>
                  <th className="px-5 py-4 text-eyebrow font-medium uppercase tracking-wide">Asset</th>
                  <th className="hidden px-5 py-4 text-eyebrow font-medium uppercase tracking-wide md:table-cell">Channel</th>
                  <th className="px-5 py-4 text-eyebrow font-medium uppercase tracking-wide">Owner</th>
                  <th className="hidden px-5 py-4 text-eyebrow font-medium uppercase tracking-wide md:table-cell">Due</th>
                  <th className="px-5 py-4 text-eyebrow font-medium uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {launch.deliverables.map((d, i) => (
                  <tr
                    key={`${d.name}-${i}`}
                    className="border-t border-white/5 transition-colors duration-200 hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-4 font-display text-base font-medium text-ink">{d.name}</td>
                    <td className="hidden px-5 py-4 text-muted md:table-cell">{d.channel}</td>
                    <td className="px-5 py-4">
                      <OwnerCell owner={d.owner} />
                    </td>
                    <td className="hidden px-5 py-4 text-muted md:table-cell">{d.due}</td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
                          statusColor[d.status] ?? statusColor.todo,
                        )}
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Expectations */}
        <ScrollReveal delay={0.15}>
          <div className="mt-40">
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
              What's expected from you.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              The asks for each team contributing to the launch.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mt-10">
            <SpotlightCard>
              <div className="p-8 md:p-10">
                <ul className="space-y-3">
                  {launch.expectations.map((e, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="text-base leading-relaxed text-ink/90">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </div>
        </ScrollReveal>

        {/* Out of scope — small, below */}
        <ScrollReveal delay={0.2}>
          <div className="mt-20 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted/70">
              Out of scope · for the record
            </p>
            <ul className="mt-3 space-y-1.5">
              {launch.outOfScope.map((o, i) => (
                <li key={i} className="text-xs text-muted/70">
                  · {o}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function OwnerCell({ owner }: { owner: { name: string; function: string; photo: string } }) {
  const [imgOk, setImgOk] = useState<boolean | null>(null);
  return (
    <div className="flex items-center gap-3">
      <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 ring-1 ring-white/15">
        {imgOk !== false ? (
          <img
            src={owner.photo}
            alt={owner.name}
            className={cn('h-full w-full object-cover', imgOk === null && 'opacity-0')}
            onLoad={() => setImgOk(true)}
            onError={() => setImgOk(false)}
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-white/90">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        )}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink leading-tight">{owner.name}</p>
        <p className="text-[10px] uppercase tracking-wide text-muted">{owner.function}</p>
      </div>
    </div>
  );
}
