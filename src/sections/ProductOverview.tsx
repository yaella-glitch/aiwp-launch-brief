import { useState } from 'react';
import { Play, ImageIcon } from 'lucide-react';
import { SectionMarker } from '@/components/SectionMarker';
import { ScrollReveal } from '@/components/ScrollReveal';
import { productOverview } from '@/content';
import { cn } from '@/lib/utils';

/**
 * Part 1 · Product overview
 *   - What we're launching (capability cards — 4 max, large media)
 *   - Product demo (video slot)
 *   - How it completes the AI work platform (parts list)
 *   - 3 key use cases (numbered)
 */
export function ProductOverview() {
  return (
    <section id="product-overview" data-section="product-overview" className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <SectionMarker number="01" eyebrow={productOverview.eyebrow} title={productOverview.title} lede={productOverview.lede} />

        {/* Capabilities — large editorial cards */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
          {productOverview.capabilities.map((c, i) => (
            <ScrollReveal key={c.id} delay={0.04 * i}>
              <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.06]">
                <div className="aspect-[16/10] w-full overflow-hidden border-b border-white/5">
                  <MediaSlot src={c.media.src} alt={c.media.alt} />
                </div>
                <div className="p-7 md:p-8">
                  <span aria-hidden="true" className="font-display text-3xl font-bold text-accent/30 transition-colors duration-300 group-hover:text-accent/60">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-ink md:text-3xl">{c.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{c.description}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Demo */}
        <ScrollReveal delay={0.1}>
          <div className="mt-32 grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-eyebrow uppercase text-muted">Demo</p>
              <h3 className="mt-3 font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
                {productOverview.demo.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{productOverview.demo.description}</p>
            </div>
            <div className="card-gradient">
              <div className="card-gradient-inner aspect-video w-full">
                <VideoSlot src={productOverview.demo.video} poster={productOverview.demo.poster} caption={productOverview.demo.caption} />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Completes the picture */}
        <ScrollReveal delay={0.15}>
          <div className="mt-32">
            <p className="text-eyebrow uppercase text-muted">Vision</p>
            <h3 className="mt-3 font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
              {productOverview.completesPicture.title}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{productOverview.completesPicture.lede}</p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2">
          {productOverview.completesPicture.parts.map((p, i) => (
            <ScrollReveal key={p.name} delay={0.03 * i}>
              <div className="h-full bg-canvas p-6 transition-colors duration-200 hover:bg-white/[0.03]">
                <p className="text-eyebrow uppercase text-accent">{p.name}</p>
                <p className="mt-3 text-base leading-relaxed text-ink/85">{p.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Use cases */}
        <ScrollReveal delay={0.2}>
          <div className="mt-32">
            <p className="text-eyebrow uppercase text-muted">Use cases</p>
            <h3 className="mt-3 font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
              Three scenarios we lead with.
            </h3>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {productOverview.useCases.map((uc, i) => (
            <ScrollReveal key={uc.id} delay={0.05 + i * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-200 hover:border-accent/30">
                <div className="aspect-[4/3] w-full overflow-hidden border-b border-white/5">
                  <MediaSlot src={uc.image} alt={`Use case: ${uc.title}`} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-eyebrow uppercase text-accent">#{i + 1}</span>
                  <h4 className="mt-2 font-display text-xl text-ink">{uc.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{uc.scenario}</p>
                  <p className="mt-auto pt-4 text-sm leading-relaxed text-ink/85">
                    <span className="font-semibold text-accent">→ </span>
                    {uc.outcome}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaSlot({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  return ok === false ? (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/15 via-indigo-500/8 to-sky-500/10">
      <div aria-hidden="true" className="pointer-events-none absolute" />
      <div className="text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
          <ImageIcon className="h-5 w-5 text-white/60" aria-hidden="true" />
        </span>
        <p className="mt-3 px-4 font-mono text-[10px] text-white/40">{src}</p>
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={cn('h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.03]', ok === null && 'opacity-0')}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}

function VideoSlot({ src, poster, caption }: { src: string; poster: string; caption: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  return ok === false ? (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
          <Play className="h-6 w-6 text-white" aria-hidden="true" />
        </span>
        <p className="mt-4 max-w-md px-4 text-sm text-muted">{caption}</p>
      </div>
    </div>
  ) : (
    <video
      src={src}
      poster={poster}
      controls
      muted
      playsInline
      className="h-full w-full object-cover"
      onError={() => setOk(false)}
      onLoadedMetadata={() => setOk(true)}
    />
  );
}
