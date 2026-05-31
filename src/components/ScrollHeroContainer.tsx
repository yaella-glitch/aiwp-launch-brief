import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollHeroContainerProps {
  /** Title/eyebrow/badge content that sits above the scroll card. */
  title: ReactNode;
  /** Path to the hero image placed inside the scroll card. */
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

/**
 * Aceternity-style container scroll hero. The title sits above; a tilted
 * "device frame" card scales + rotates upright as user scrolls. The card
 * holds the hero image (with graceful placeholder when missing).
 *
 * Pattern from Magic MCP (Aceternity ContainerScrollAnimation).
 */
export function ScrollHeroContainer({
  title,
  imageSrc,
  imageAlt = 'Hero visual',
  className,
}: ScrollHeroContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.95] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div
      ref={containerRef}
      className={cn('relative flex min-h-[120vh] items-start justify-center', className)}
      style={{ perspective: '1000px' }}
    >
      <div className="w-full pt-20 md:pt-28 lg:pt-32">
        {/* Title block */}
        <motion.div
          style={reduce ? undefined : { translateY: translate }}
          className="mx-auto max-w-5xl px-6 text-center md:px-10"
        >
          {title}
        </motion.div>

        {/* Card */}
        <motion.div
          style={
            reduce
              ? undefined
              : {
                  rotateX: rotate,
                  scale,
                  boxShadow:
                    '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a',
                }
          }
          className="mx-auto mt-12 h-[28rem] w-full max-w-5xl rounded-[28px] border-[3px] border-white/10 bg-[#1a1a26] p-2 shadow-2xl md:mt-16 md:h-[34rem] md:p-3 lg:h-[40rem]"
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-surface">
            <HeroFrameImage src={imageSrc} alt={imageAlt} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function HeroFrameImage({ src, alt }: { src?: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (!src || ok === false) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(165,138,255,0.18),transparent_60%),rgb(17,17,32)]">
        <div className="relative text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <ImageIcon className="h-6 w-6 text-white/60" aria-hidden="true" />
          </span>
          <p className="mt-4 px-6 text-sm text-muted">
            Drop a hero image at <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs">{src ?? '/public/hero/hero.png'}</code>
          </p>
          <p className="mt-1 text-xs text-muted/70">Scrolls into frame as you scroll.</p>
        </div>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={cn('h-full w-full object-cover object-top', ok === null && 'opacity-0')}
      draggable={false}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}
