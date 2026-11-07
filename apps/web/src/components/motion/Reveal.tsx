'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

/** Shared easing — "emphasized decelerate": fast start, long soft landing. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px (ignored under reduced motion). */
  y?: number;
}

/** Fade + rise into view once. Renders statically for reduced-motion users. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
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
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
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

/** Section heading block: eyebrow chip + title + optional lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = 'dark',
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** `dark` = dark text (for light backgrounds), `light` = light text. */
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
  className?: string;
}) {
  const light = tone === 'light';
  return (
    <Reveal className={cn(align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className)}>
      <span
        className={cn(
          'chip-glass mb-5',
          light ? 'glass-dark text-paper/85' : 'glass text-ink/75',
        )}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
        </span>
        {eyebrow}
      </span>
      <h2
        className={cn(
          'font-display text-display-lg tracking-tightest text-balance',
          light ? 'text-paper' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn('mt-5 text-lg leading-relaxed text-pretty', light ? 'text-paper/70' : 'text-ink/65')}>
          {lead}
        </p>
      )}
    </Reveal>
  );
}
