import { SectionFrame } from '@/components/SectionFrame';
import { CardGradient } from '@/components/CardGradient';
import { ScrollReveal } from '@/components/ScrollReveal';

interface PlaceholderProps {
  id: string;
  title: string;
  eyebrow?: string;
  note?: string;
}

/**
 * Temporary stand-in used during P1 so every section ID exists and the
 * scroll-spy + left-rail behavior can be verified. Each section gets a
 * proper component in later phases.
 */
export function Placeholder({ id, title, eyebrow, note }: PlaceholderProps) {
  return (
    <SectionFrame
      id={id}
      eyebrow={eyebrow ?? `Section · ${id}`}
      title={title}
      lede={note ?? 'Coming soon — this section is scaffolded but its content lands in a later phase.'}
    >
      <ScrollReveal>
        <CardGradient padded>
          <div className="flex min-h-[180px] items-center justify-center text-muted">
            <p className="text-sm">
              <span className="text-ink/80">{title}</span> · placeholder
            </p>
          </div>
        </CardGradient>
      </ScrollReveal>
    </SectionFrame>
  );
}
