import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ProductAccordion } from '@/components/ProductAccordion';
import { ActionLink } from '@/components/ActionLink';
import { productOverview } from '@/content';

/**
 * What we're launching — title + vertical accordion of feature domains with
 * a sticky preview on the right. Top-right action links to the full feature
 * list maintained outside the brief.
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
          action={<ActionLink href="#" label="Full feature list" />}
        />

        <ScrollReveal delay={0.05}>
          <div className="mt-20">
            <ProductAccordion tabs={productOverview.tabs} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
