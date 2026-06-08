import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CapabilityTabs } from '@/components/CapabilityTabs';
import { market } from '@/content';

/**
 * Competitive overview — top tabs by competitor category + carousel of cards.
 * Same component pattern as "What we're launching" so the visual language is
 * consistent across the brief.
 */
export function Market() {
  return (
    <section
      id="market"
      data-section="market"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader title={market.title} lede={market.lede} />

        <ScrollReveal delay={0.05}>
          <div className="mt-20">
            <CapabilityTabs tabs={market.tabs} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
