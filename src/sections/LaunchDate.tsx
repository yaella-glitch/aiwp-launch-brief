import { motion, useReducedMotion } from 'framer-motion';
import { launch } from '@/content';

/**
 * Launch date — single statement directly under the hero. Big gradient date,
 * no chrome, no description. The date is the message.
 */
export function LaunchDate() {
  const reduce = useReducedMotion();
  return (
    <section
      id="launch-date"
      data-section="launch-date"
      className="relative w-full overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 18, filter: 'blur(10px)' }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(28px,4vw,52px)] font-semibold leading-[1.1] tracking-tight text-ink"
        >
          <span className="bg-gradient-to-br from-violet-200 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
            Product milestone is planned for {launch.launchDate}.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
