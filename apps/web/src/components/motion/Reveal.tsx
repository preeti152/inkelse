'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

/** Shared easing — "expo out": quick start, long soft landing. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fade + rise into view once. Static for reduced-motion users. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** Parent that staggers any `motion.*` children using `itemVariants`. */
export function StaggerGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      variants={groupVariants}
      initial={reduce ? 'show' : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial headline: each line slides up from behind a mask, one after another.
 * Screen readers get the full sentence once.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = 'h2',
  inView = true,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  /** Animate when scrolled into view (true) or on mount (false). */
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((line, i) => {
        const target = { y: '0%' };
        const trigger = inView
          ? { whileInView: target, viewport: { once: true, margin: '-40px' } }
          : { animate: target };
        return (
          <span key={i} aria-hidden="true" className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className={cn('block', lineClassName)}
              initial={reduce ? false : { y: '105%' }}
              {...trigger}
              transition={{ duration: 1.1, delay: delay + i * 0.12, ease: EASE_OUT }}
            >
              {line}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/**
 * Section heading in the board's language: tracked label, large light
 * headline (masked line reveal) and an optional short rule.
 */
export function SectionHeading({
  label,
  lines,
  tone = 'dark',
  className,
  rule = true,
}: {
  label: string;
  lines: string[];
  /** `dark` = coal text (on sand), `light` = sand text (on coal). */
  tone?: 'dark' | 'light';
  className?: string;
  rule?: boolean;
}) {
  const light = tone === 'light';
  return (
    <div className={className}>
      <Reveal>
        <p className={cn('label', light ? 'text-sand/60' : 'text-mute')}>{label}</p>
      </Reveal>
      <MaskLines
        lines={lines}
        className={cn(
          'mt-5 text-[length:clamp(2.25rem,4.6vw,4rem)] font-normal leading-[1.04] tracking-[-0.02em]',
          light ? 'text-sand-50' : 'text-coal',
        )}
      />
      {rule && (
        <Reveal delay={0.2}>
          <span className={cn('rule mt-7', light ? 'text-sand' : 'text-coal')} />
        </Reveal>
      )}
    </div>
  );
}
