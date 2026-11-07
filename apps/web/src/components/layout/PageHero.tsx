'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Lamp } from '@/components/effects/Lamp';
import { SplitHeadline, EASE_OUT } from '@/components/motion/Reveal';

/**
 * PageHero — the opening band for every inner page.
 * Lamp-lit from above, faint grid, optional accent tint (for service/project
 * pages), back link, eyebrow chip, split headline, lead and a slot for extras.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  back,
  tint,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Trailing words rendered in italic serif + gradient. */
  accent?: string;
  lead?: React.ReactNode;
  back?: { href: string; label: string };
  /** Optional hex colour that tints the ambient light (e.g. a service accent). */
  tint?: string;
  /** Optional element shown above the eyebrow (e.g. a service icon). */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  });

  return (
    <div className="relative overflow-hidden bg-night pb-20 pt-40 md:pb-28 md:pt-48">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-fade absolute inset-0 opacity-80" />
        {tint ? (
          <div
            className="absolute -top-40 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
            style={{ backgroundColor: tint }}
          />
        ) : (
          <>
            <div className="absolute -left-40 -top-20 h-[30rem] w-[30rem] rounded-full bg-cyan/[0.12] blur-[120px]" />
            <div className="absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-magenta/10 blur-[120px]" />
          </>
        )}
        <div className="hairline absolute inset-x-0 bottom-0" />
      </div>
      <Lamp immediate color="white" width={26} className="top-20 md:top-24" />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {back && (
            <motion.div {...fade(0)}>
              <Link
                href={back.href}
                className="group mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2} />
                {back.label}
              </Link>
            </motion.div>
          )}
          {icon && <motion.div {...fade(0.05)} className="mb-6">{icon}</motion.div>}
          <motion.span {...fade(0.05)} className="chip-glass glass-dark mb-6 text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan to-magenta shadow-[0_0_10px_2px_rgba(56,200,245,0.6)]" />
            {eyebrow}
          </motion.span>
          <SplitHeadline
            as="h1"
            inView={false}
            delay={0.1}
            text={title}
            accent={accent}
            className="font-display text-[length:clamp(2.5rem,6.5vw,5.25rem)] font-semibold leading-[1] tracking-[-0.045em] text-white text-balance"
          />
          {lead && (
            <motion.p {...fade(0.45)} className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
              {lead}
            </motion.p>
          )}
          {children && <motion.div {...fade(0.6)} className="mt-8">{children}</motion.div>}
        </div>
      </Container>
    </div>
  );
}
