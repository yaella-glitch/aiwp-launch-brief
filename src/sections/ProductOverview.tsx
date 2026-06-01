import { useState } from 'react';
import { Play, ImageIcon } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { CapabilityTabs } from '@/components/CapabilityTabs';
import { FlipCard } from '@/components/FlipCard';
import { productOverview } from '@/content';
import { cn } from '@/lib/utils';

/**
 * What we're launching:
 *  - Capabilities as asymmetric editorial rows (image + text, alternating)
 *  - Product demo video
 *  - 3 use cases as flip cards (front: scenario over image · back: outcome)
 */
export function ProductOverview() {
  return (
    <section
      id="product-overview"
      data-section="product-overview"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader
          title={productOverview.title}
          lede={productOverview.lede}
        />

        {/* Capabilities — top tabs + card grid (monday.com pattern) */}
        <ScrollReveal delay={0.05}>
          <div className="mt-20">
            <CapabilityTabs tabs={productOverview.tabs} />
          </div>
        </ScrollReveal>

        {/* Demo */}
        <ScrollReveal delay={0.1}>
          <div className="mt-24 grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-12">
            <div>
              <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
                Demo.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{productOverview.demo.description}</p>
            </div>
            <SpotlightCard className="overflow-hidden">
              <div className="aspect-video w-full">
                <VideoSlot src={productOverview.demo.video} poster={productOverview.demo.poster} caption={productOverview.demo.caption} />
              </div>
            </SpotlightCard>
          </div>
        </ScrollReveal>

        {/* Use cases — flip cards */}
        <ScrollReveal delay={0.15}>
          <div className="mt-24">
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
              Use cases.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Three scenarios we lead with.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {productOverview.useCases.map((uc, i) => (
            <ScrollReveal key={uc.id} delay={0.05 + i * 0.06}>
              <div className="relative aspect-[3/4] w-full">
                <FlipCard
                  front={<UseCaseFront uc={uc} />}
                  back={<UseCaseBack uc={uc} />}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseFront({ uc }: { uc: { title: string; scenario: string; image: string } }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="absolute inset-0">
        <MediaSlot src={uc.image} alt={uc.title} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-7">
        <h4 className="font-display text-xl font-semibold text-ink md:text-2xl">{uc.title}</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{uc.scenario}</p>
      </div>
    </div>
  );
}

function UseCaseBack({ uc }: { uc: { title: string; outcome: string } }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/15 via-canvas to-canvas">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(165,138,255,0.20),transparent_60%)]" />
      <div className="relative flex h-full flex-col justify-end p-7">
        <h4 className="font-display text-xl font-semibold text-ink md:text-2xl">{uc.title}</h4>
        <p className="mt-3 text-base leading-relaxed text-ink/85">{uc.outcome}</p>
      </div>
    </div>
  );
}

function MediaSlot({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  return ok === false ? (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/12 via-indigo-500/6 to-sky-500/8">
      <div className="relative text-center">
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
