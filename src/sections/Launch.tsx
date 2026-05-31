import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import { SectionMarker } from '@/components/SectionMarker';
import { ScrollReveal } from '@/components/ScrollReveal';
import { launch } from '@/content';
import { cn } from '@/lib/utils';

const statusColor: Record<string, string> = {
  done: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30',
  doing: 'bg-amber-400/15 text-amber-100 border-amber-400/30',
  todo: 'bg-white/10 text-muted border-white/15',
  blocked: 'bg-rose-400/15 text-rose-200 border-rose-400/30',
};

/**
 * Part 5 · Launch & marketing plan (consolidated from prior GTM + Marketing).
 *   - Launch date (statement)
 *   - 2 goals
 *   - Marketing scope (actions with owner photos)
 *   - Key assets table
 *   - What's expected from you
 *   - Out of scope (small, below)
 */
export function Launch() {
  const reduce = useReducedMotion();
  return (
    <section id="launch" data-section="launch" className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <SectionMarker number="05" eyebrow={launch.eyebrow} title={launch.title} lede={launch.lede} />

        {/* Launch date — editorial statement */}
        <ScrollReveal>
          <div className="mt-20 flex flex-col items-start gap-4 border-b border-white/10 pb-12">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-accent" aria-hidden="true" />
              <span className="text-eyebrow uppercase text-accent">Launch date</span>
            </div>
            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(48px,9vw,128px)] font-bold leading-none tracking-tighter text-ink"
            >
              <span className="bg-gradient-to-br from-violet-200 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
                {launch.launchDate}
              </span>
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Goals (2) */}
        <ScrollReveal delay={0.1}>
          <div className="mt-24">
            <p className="text-eyebrow uppercase text-muted">Goals</p>
            <h3 className="mt-3 font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
              What we're trying to achieve.
            </h3>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {launch.goals.map((g, i) => (
            <ScrollReveal key={g.title} delay={0.05 + i * 0.08}>
              <article className="card-gradient h-full">
                <div className="card-gradient-inner h-full p-8 md:p-10">
                  <span
                    aria-hidden="true"
                    className="font-display text-7xl font-bold text-accent/25"
                  >
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <h4 className="mt-4 font-display text-2xl text-ink md:text-3xl">{g.title}</h4>
                  <p className="mt-3 text-base leading-relaxed text-muted">{g.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Marketing scope — what we're doing in marketing, with owner photos */}
        <ScrollReveal delay={0.15}>
          <div className="mt-32">
            <p className="text-eyebrow uppercase text-muted">Marketing scope</p>
            <h3 className="mt-3 font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
              What we're doing.
            </h3>
            <p className="mt-3 max-w-2xl text-base text-muted">
              Marketing actions for the launch — and who owns each.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 space-y-3">
          {launch.marketingScope.map((m, i) => (
            <ScrollReveal key={`${m.name}-${i}`} delay={0.04 * i}>
              <div className="group flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-200 hover:border-accent/30 hover:bg-white/[0.05]">
                <div className="flex min-w-0 items-center gap-5">
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl font-bold text-accent/40 transition-colors duration-200 group-hover:text-accent"
                  >
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <p className="truncate font-display text-lg text-ink md:text-xl">{m.name}</p>
                </div>
                <OwnerPill owner={m.owner} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Key assets */}
        <ScrollReveal delay={0.2}>
          <div className="mt-32">
            <p className="text-eyebrow uppercase text-muted">Deliverables</p>
            <h3 className="mt-3 font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
              Key assets.
            </h3>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-muted">
                <tr>
                  <th className="px-4 py-3 text-eyebrow font-medium uppercase tracking-wide">Asset</th>
                  <th className="hidden px-4 py-3 text-eyebrow font-medium uppercase tracking-wide md:table-cell">
                    Channel
                  </th>
                  <th className="px-4 py-3 text-eyebrow font-medium uppercase tracking-wide">Due</th>
                  <th className="px-4 py-3 text-eyebrow font-medium uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {launch.assets.map((a, i) => (
                  <tr
                    key={`${a.name}-${i}`}
                    className="border-t border-white/5 transition-colors duration-200 hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3 text-ink">{a.name}</td>
                    <td className="hidden px-4 py-3 text-muted md:table-cell">{a.channel}</td>
                    <td className="px-4 py-3 text-muted">{a.due}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
                          statusColor[a.status] ?? statusColor.todo,
                        )}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Expectations */}
        <ScrollReveal delay={0.2}>
          <div className="mt-24">
            <div className="card-gradient">
              <div className="card-gradient-inner p-8 md:p-10">
                <p className="text-eyebrow uppercase text-accent">What's expected from you</p>
                <ul className="mt-6 space-y-4">
                  {launch.expectations.map((e, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent"
                      >
                        {i + 1}
                      </span>
                      <span className="text-base leading-relaxed text-ink/90">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Out of scope — small, below, de-emphasized */}
        <ScrollReveal delay={0.25}>
          <div className="mt-20 max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted/70">
              For the record · out of scope
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

function OwnerPill({ owner }: { owner: { name: string; function: string; photo: string } }) {
  const [imgOk, setImgOk] = useState<boolean | null>(null);
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2 py-1 pr-3 transition-colors duration-200 group-hover:border-white/20">
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
            <User className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </span>
      <div className="hidden text-right sm:block">
        <p className="text-xs font-semibold text-ink leading-tight">{owner.name}</p>
        <p className="text-[10px] uppercase tracking-wide text-muted">{owner.function}</p>
      </div>
    </div>
  );
}
