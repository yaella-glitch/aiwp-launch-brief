import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { EmphasisAccordion } from '@/components/EmphasisAccordion';
import { focus } from '@/content';

/**
 * Focus section — "What we lead with externally."
 *
 * Sits between the feature dump (Product Overview accordion) and the customer
 * sections. Uses the 3-panel emphasis accordion (lead / reinforce / close) to
 * show the marketing hierarchy at a glance.
 */
export function Focus() {
  return (
    <section
      id="focus"
      data-section="focus"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader title={focus.title} lede={focus.lede} />

        <ScrollReveal delay={0.05}>
          <div className="mt-16">
            <EmphasisAccordion
              items={focus.items.map((e) => ({
                title: e.title,
                description: e.description,
                image: e.image,
                imageAlt: `Emphasis: ${e.title}`,
              }))}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
