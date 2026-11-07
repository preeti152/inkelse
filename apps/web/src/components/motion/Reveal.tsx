'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

/** Shared easing — "expo out": fast start, long soft landing. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px (ignored under reduced motion). */
  y?: number;
}

/** Fade + rise + de-blur into view once. Static for reduced-motion users. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, margin: '-80px' }}
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
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE_OUT }, transitionEnd: { filter: 'none' } },
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
 * Word-by-word headline reveal. Screen readers get the plain string once.
 * Pass `accent` to render trailing words in the italic serif + CMYK gradient.
 */
export function SplitHeadline({
  text,
  accent,
  className,
  accentClassName,
  delay = 0,
  as: Tag = 'h2',
  inView = true,
}: {
  text: string;
  accent?: string;
  className?: string;
  accentClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3';
  /** Animate when scrolled into view (true) or immediately on mount (false). */
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  const accentWords = accent ? accent.split(' ') : [];

  const wordProps = (i: number) => {
    const target = { opacity: 1, y: '0em', filter: 'blur(0px)', transitionEnd: { filter: 'none' } };
    return {
      initial: reduce ? false : { opacity: 0, y: '0.45em', filter: 'blur(10px)' },
      ...(inView ? { whileInView: target, viewport: { once: true, margin: '-60px' } } : { animate: target }),
      transition: { duration: 0.85, delay: delay + i * 0.06, ease: EASE_OUT },
    };
  };

  return (
    <Tag className={className}>
      <span className="sr-only">
        {text}
        {accent ? ` ${accent}` : ''}
      </span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <motion.span key={`w-${i}`} {...wordProps(i)} className="inline-block whitespace-pre">
            {w}{' '}
          </motion.span>
        ))}
        {accentWords.map((w, i) => (
          <motion.span
            key={`a-${i}`}
            {...wordProps(words.length + i)}
            className={cn(
              'inline-block whitespace-pre pb-[0.1em] font-serif font-normal italic tracking-normal',
              accentClassName ?? 'text-gradient-cmyk',
            )}
          >
            {w}
            {i < accentWords.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}

/**
 * Section heading: eyebrow chip + split headline + optional lead.
 * Designed for the dark theme; `tone="dark"` gives dark text for light bands.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  tone = 'light',
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: React.ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
}) {
  const light = tone === 'light';
  return (
    <div className={cn(align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl', className)}>
      <Reveal>
        <span className={cn('chip-glass mb-6', light ? 'glass-dark text-white/80' : 'glass text-ink/75')}>
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan to-magenta shadow-[0_0_10px_2px_rgba(56,200,245,0.6)]" />
          {eyebrow}
        </span>
      </Reveal>
      <SplitHeadline
        text={title}
        accent={accent}
        accentClassName={light ? undefined : 'text-gradient-ink'}
        className={cn(
          'font-display text-[length:clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance',
          light ? 'text-white' : 'text-ink',
        )}
      />
      {lead && (
        <Reveal delay={0.15}>
          <p className={cn('mt-6 text-lg leading-relaxed text-pretty', light ? 'text-white/60' : 'text-ink/65')}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
