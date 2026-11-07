'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, MapPin, PenTool, UserRound } from 'lucide-react';
import { BRAND, PROCESS_STEPS, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { Lamp } from '@/components/effects/Lamp';
import { SplitHeadline, EASE_OUT } from '@/components/motion/Reveal';
import { BusinessCards, GiftBox, Letterhead, PackBox, Standee, Tote } from './Artifacts';

/**
 * Section 1 — Hero.
 *
 * A dark studio lit from above: a cyan lamp beams down onto the headline,
 * a CMYK horizon glows at the bottom, and a soft torch follows the cursor.
 * Below the copy, a glass "showcase stage" tilts flat as it scrolls into view,
 * displaying the physical things Inkelse makes plus a live project tracker.
 */
export function HeroInkelse() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Cursor torch
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty('--torch-x', `${e.clientX - r.left}px`);
    heroRef.current.style.setProperty('--torch-y', `${e.clientY - r.top}px`);
  };

  // Showcase: tilt from 22° to flat as it rises into view
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'start 25%'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);
  const stageY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, 0]);

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <div
      ref={heroRef}
      onPointerMove={onPointerMove}
      className="group/hero relative w-full overflow-hidden bg-night"
    >
      {/* ── Lighting ─────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-fade absolute inset-0 opacity-70" />
        <Lamp immediate color="cyan" width={34} className="top-0" />
        {/* Horizon: a curved rim of CMYK light behind the showcase */}
        <div className="absolute left-1/2 top-[58%] h-[60rem] w-[140%] -translate-x-1/2 rounded-[100%] border-t border-white/10 bg-night shadow-[0_-30px_120px_-20px_rgba(56,200,245,0.35),0_-10px_60px_-10px_rgba(240,69,138,0.25)] md:top-[52%]" />
        <div className="absolute left-1/2 top-[56%] h-40 w-[70%] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan/30 via-[#8B7CF6]/25 to-magenta/30 blur-[90px] md:top-[50%]" />
        {/* Torch */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover/hero:opacity-100"
          style={{
            background:
              'radial-gradient(600px circle at var(--torch-x, 50%) var(--torch-y, 30%), rgba(255,255,255,0.07), transparent 60%)',
          }}
        />
      </div>

      {/* ── Copy ──────────────────────────────────────────── */}
      <Container className="relative z-10 flex flex-col items-center pb-16 pt-36 text-center md:pt-44">
        <motion.div {...fade(0)} className="mb-8">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-xs font-medium text-white/75 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white"
          >
            <span className="rounded-pill bg-gradient-to-r from-cyan to-magenta px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              Inkelse
            </span>
            {BRAND.description}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
        </motion.div>

        <SplitHeadline
          as="h1"
          inView={false}
          delay={0.1}
          text="Everything your brand needs."
          accent="Designed, printed & delivered."
          className="max-w-5xl font-display text-[length:clamp(2.75rem,7.5vw,6.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white text-balance [&_.inline-block:not(.font-serif)]:text-silver"
        />

        <motion.p {...fade(0.7)} className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
          {BRAND.heroSubheadline}
        </motion.p>

        <motion.div {...fade(0.85)} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/#contact" className="btn-light btn-shine group !px-7 !py-3.5 text-[15px]">
            <span className="shine" aria-hidden="true" />
            Get a free quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.25} />
          </Link>
          <Link href="/projects" className="btn-pill-glass group !px-7 !py-3.5 text-[15px]">
            See our work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
          </Link>
        </motion.div>

        <motion.ul {...fade(1)} className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-white/50">
          {[
            { icon: PenTool, label: 'In-house design studio' },
            { icon: UserRound, label: 'One point of contact' },
            { icon: MapPin, label: 'Pan-India delivery' },
          ].map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-white/35" strokeWidth={1.75} />
              {label}
            </li>
          ))}
        </motion.ul>
      </Container>

      {/* ── Showcase stage ───────────────────────────────── */}
      <Container className="relative z-10 pb-24 md:pb-32">
        <div ref={stageRef} className="[perspective:1800px]">
          <motion.div
            style={{ rotateX, scale, y: stageY }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="border-beam relative origin-top rounded-[2rem] border border-white/10 bg-white/[0.03] p-2 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-sm md:rounded-[2.5rem] md:p-3"
          >
            <div className="relative grid gap-2 rounded-[1.6rem] bg-night-850/90 p-2 md:grid-cols-12 md:gap-3 md:rounded-[2rem] md:p-3">
              <StageTile className="md:col-span-5 md:row-span-2" label="Live project" glow="cyan">
                <TrackerPanel reduce={!!reduce} />
              </StageTile>

              <StageTile className="min-h-[15rem] md:col-span-7" label="Brand stationery" glow="magenta">
                <div className="relative flex h-full items-center justify-center">
                  <Letterhead className="absolute left-[8%] top-1/2 hidden w-28 -translate-y-1/2 -rotate-6 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-emphasized group-hover/tile:-translate-x-2 group-hover/tile:-rotate-12 sm:block md:w-32" />
                  <BusinessCards className="relative w-[78%] max-w-sm drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-emphasized group-hover/tile:scale-105 sm:ml-24" />
                </div>
              </StageTile>

              <StageTile className="hidden min-h-[13rem] sm:block md:col-span-3" label="Corporate gifting" glow="amber">
                <ArtifactCenter><GiftBox className="w-32" /></ArtifactCenter>
              </StageTile>
              <StageTile className="hidden min-h-[13rem] sm:block md:col-span-2" label="Signage">
                <ArtifactCenter><Standee className="w-[4.5rem]" /></ArtifactCenter>
              </StageTile>
              <StageTile className="hidden min-h-[13rem] sm:block md:col-span-2" label="Packaging" glow="cyan">
                <ArtifactCenter><PackBox className="w-28" /></ArtifactCenter>
              </StageTile>

              <StageTile className="hidden min-h-[13rem] md:col-span-5 md:block" label="Merch & kits" glow="magenta">
                <ArtifactCenter><Tote className="w-28" /></ArtifactCenter>
              </StageTile>
              <div className="hidden items-center justify-between gap-4 rounded-[1.25rem] border border-white/[0.06] bg-gradient-to-br from-white/[0.06] to-transparent p-6 md:col-span-7 md:flex">
                <div>
                  <p className="text-lg font-semibold tracking-tight text-white">From one business card to a full launch.</p>
                  <p className="mt-1 text-sm text-white/55">Tell us what you need — we&apos;ll send an itemised quote, fast.</p>
                </div>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-glass shrink-0"
                >
                  Start on WhatsApp
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────── */

function StageTile({
  children,
  className,
  label,
  glow,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
  glow?: 'cyan' | 'magenta' | 'amber';
}) {
  const glowBg = {
    cyan: 'bg-cyan/20',
    magenta: 'bg-magenta/20',
    amber: 'bg-yellow/15',
  };
  return (
    <div
      className={`group/tile relative overflow-hidden rounded-[1.25rem] border border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-white/[0.01] ${className ?? ''}`}
    >
      {glow && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-700 ${glowBg[glow]} opacity-60 group-hover/tile:opacity-100`}
        />
      )}
      <span className="absolute left-4 top-4 z-10 rounded-pill border border-white/10 bg-night/60 px-2.5 py-1 text-[11px] font-medium text-white/70 backdrop-blur">
        {label}
      </span>
      <div className="relative h-full">{children}</div>
    </div>
  );
}

function ArtifactCenter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center pt-8 transition-transform duration-700 ease-emphasized group-hover/tile:-translate-y-2 group-hover/tile:scale-105">
      {children}
    </div>
  );
}

function TrackerPanel({ reduce }: { reduce: boolean }) {
  const [active, setActive] = useState(reduce ? PROCESS_STEPS.length : 0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((i) => (i + 1) % (PROCESS_STEPS.length + 1)), 1700);
    return () => clearInterval(t);
  }, [reduce]);

  const done = active >= PROCESS_STEPS.length;
  const progress = done ? 1 : Math.max(active / PROCESS_STEPS.length, 0.05);

  return (
    <div className="flex h-full flex-col p-5 pt-14 md:p-7 md:pt-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xl font-semibold tracking-tight text-white">Brand launch kit</p>
          <p className="mt-0.5 text-sm text-white/45">Cards · Letterheads · Standees · Gift boxes</p>
        </div>
        <span
          className={`rounded-pill px-2.5 py-1 text-xs font-semibold transition-colors duration-500 ${
            done ? 'bg-[#22C55E]/15 text-[#4ADE80]' : 'bg-white/10 text-white/70'
          }`}
        >
          {done ? 'Delivered' : 'In progress'}
        </span>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <motion.div
          className="h-full origin-left rounded-full bg-gradient-to-r from-cyan via-[#8B7CF6] to-magenta"
          animate={{ scaleX: progress }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        />
      </div>

      <ol className="mt-5 flex-1 space-y-1.5">
        {PROCESS_STEPS.map((s, i) => {
          const isDone = i < active;
          const isCurrent = i === active;
          return (
            <li
              key={s.step}
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-500 ${
                isCurrent ? 'bg-white/[0.07]' : ''
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 ${
                  isDone
                    ? 'bg-gradient-to-br from-cyan to-magenta text-white'
                    : isCurrent
                      ? 'bg-white text-night shadow-[0_0_16px_2px_rgba(255,255,255,0.35)]'
                      : 'bg-white/[0.07] text-white/40'
                }`}
              >
                {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : s.step}
              </span>
              <span className={`text-sm transition-colors duration-500 ${isDone || isCurrent ? 'text-white' : 'text-white/40'}`}>
                {s.title}
              </span>
              {isCurrent && (
                <motion.span
                  layoutId="tracker-dot"
                  className="ml-auto h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_3px_rgba(56,200,245,0.8)]"
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
