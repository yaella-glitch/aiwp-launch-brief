import { EditorialHeader } from '@/components/EditorialHeader';
import { background } from '@/content';

/**
 * Standalone Background section — sits between the hero and Part 1.
 * Title + paragraph only, no eyebrow.
 */
export function Background() {
  return (
    <section
      id="background"
      data-section="background"
      className="relative w-full overflow-hidden py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader title={background.title} lede={background.lede} />
      </div>
    </section>
  );
}
