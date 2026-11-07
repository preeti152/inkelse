'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, Check, MessageCircle, Printer, Gift, Package, Palette } from 'lucide-react';
import { BRAND, PROCESS_STEPS, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';
import { EASE_OUT } from '@/components/motion/Reveal';

const LINE_1 = ['Everything', 'your', 'brand', 'needs.'];
const LINE_2 = ['Designed.', 'Printed.', 'Delivered.'];

/**
 * Section 1 — Hero.
 * Dark CMYK aurora canvas · word-by-word headline reveal · glass "project
 * tracker" panel driven by the real PROCESS_STEPS · pointer-parallax product
 * cards · content drifts and fades as you scroll away.
 */
export function HeroInkelse() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Pointer parallax (-0.5 … 0.5), smoothed with a spring.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Scroll-away: content lifts and fades.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  const word = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: '0.5em', filter: 'blur(10px)' },
    animate: { opacity: 1, y: '0em', filter: 'blur(0px)' },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className="bg-mesh-dark bg-grain relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      {/* ── Background layers ───────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-fade absolute inset-0" />
        <div className="aurora-blob -left-32 -top-24 h-[36rem] w-[36rem] bg-cyan/45" />
        <div className="aurora-blob -right-40 top-1/4 h-[32rem] w-[32rem] bg-magenta/40" style={{ animationDelay: '-7s' }} />
        <div className="aurora-blob bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] bg-yellow/25" style={{ animationDelay: '-13s' }} />
        {/* Spotlight cone from the top */}
        <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_60%)]" />
      </div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 w-full">
        <Container className="grid items-center gap-16 pb-28 pt-32 lg:grid-cols-12 lg:gap-10 lg:pb-32">
          {/* ── Copy ─────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.span
              {...word(0)}
              className="chip-glass glass-dark mb-7 text-paper/85"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              {BRAND.description}
            </motion.span>

            <h1 className="font-display text-[length:clamp(2.75rem,7.2vw,5.75rem)] font-extrabold leading-[0.98] tracking-tightest text-paper">
              <span className="sr-only">{BRAND.heroHeadline}</span>
              <span aria-hidden="true" className="block">
                {LINE_1.map((w, i) => (
                  <motion.span key={w} {...word(0.1 + i * 0.07)} className="mr-[0.22em] inline-block">
                    {w}
                  </motion.span>
                ))}
              </span>
              <span aria-hidden="true" className="mt-1 block">
                {LINE_2.map((w, i) => (
                  <motion.span
                    key={w}
                    {...word(0.45 + i * 0.12)}
                    className="text-gradient-cmyk mr-[0.22em] inline-block pb-[0.08em]"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              {...word(0.85)}
              className="mt-7 max-w-xl text-lg leading-relaxed text-paper/70 md:text-xl"
            >
              {BRAND.heroSubheadline}
            </motion.p>

            <motion.div {...word(1)} className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/#contact" className="btn-pill-gradient btn-shine group !px-7 !py-3.5">
                <span className="shine" aria-hidden="true" />
                Get a quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
              <Link href="/projects" className="btn-pill-glass !px-7 !py-3.5">
                View portfolio
              </Link>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-paper/70 transition-colors hover:text-white"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                WhatsApp us
              </a>
            </motion.div>

            {/* Capability row */}
            <motion.ul {...word(1.15)} className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-paper/55">
              {[
                { icon: Printer, label: 'Printing' },
                { icon: Gift, label: 'Corporate gifting' },
                { icon: Package, label: 'Packaging' },
                { icon: Palette, label: 'In-house design' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-paper/40" strokeWidth={1.75} />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ── Visual ───────────────────────────────────── */}
          <div className="relative hidden lg:col-span-5 lg:block">
            <HeroVisual sx={sx} sy={sy} reduce={!!reduce} />
          </div>
        </Container>
      </motion.div>

      {/* Scroll cue (sits above the overlapping next section) */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <motion.span
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2 w-1 rounded-full bg-white/70"
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */

function HeroVisual({ sx, sy, reduce }: { sx: MotionValue<number>; sy: MotionValue<number>; reduce: boolean }) {
  // Different depths → layered parallax.
  const panelX = useTransform(sx, (v) => v * -18);
  const panelY = useTransform(sy, (v) => v * -18);
  const nearX = useTransform(sx, (v) => v * 46);
  const nearY = useTransform(sy, (v) => v * 46);
  const farX = useTransform(sx, (v) => v * 24);
  const farY = useTransform(sy, (v) => v * 24);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.94, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 1.2, delay: 0.5, ease: EASE_OUT }}
      className="relative mx-auto aspect-[4/5] w-full max-w-md [perspective:1200px]"
    >
      {/* Floating product cards (behind / in front of the panel) */}
      <motion.div style={{ x: farX, y: farY }} className="absolute -left-10 top-6 z-0">
        <Float delay={0} reduce={reduce}><BizCard /></Float>
      </motion.div>
      <motion.div style={{ x: nearX, y: nearY }} className="absolute -right-8 bottom-10 z-20">
        <Float delay={1.2} reduce={reduce}><GiftBox /></Float>
      </motion.div>
      <motion.div style={{ x: farX, y: nearY }} className="absolute -bottom-6 left-2 z-20">
        <Float delay={2} reduce={reduce}><Tag /></Float>
      </motion.div>

      {/* Glass project tracker */}
      <motion.div style={{ x: panelX, y: panelY }} className="absolute inset-x-6 top-16 z-10">
        <TrackerPanel reduce={reduce} />
      </motion.div>
    </motion.div>
  );
}

function TrackerPanel({ reduce }: { reduce: boolean }) {
  const [active, setActive] = useState(reduce ? PROCESS_STEPS.length - 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setActive((i) => (i + 1) % (PROCESS_STEPS.length + 1)), 1600);
    return () => clearInterval(t);
  }, [reduce]);

  const progress = Math.min(active, PROCESS_STEPS.length - 1) / (PROCESS_STEPS.length - 1);

  return (
    <div className="glass-dark rounded-[1.75rem] p-6 text-paper">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-tracked text-paper/50">Your project</p>
          <p className="mt-1 text-lg font-semibold">Brand launch kit</p>
        </div>
        <span className="rounded-pill bg-white/10 px-3 py-1 text-xs font-medium text-paper/80">
          {active >= PROCESS_STEPS.length ? 'Delivered' : 'In progress'}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full origin-left rounded-full bg-gradient-to-r from-cyan via-magenta to-yellow"
          animate={{ scaleX: active >= PROCESS_STEPS.length ? 1 : Math.max(progress, 0.06) }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        />
      </div>

      <ol className="mt-6 space-y-2.5">
        {PROCESS_STEPS.map((s, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li
              key={s.step}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-500 ${
                current ? 'bg-white/10' : ''
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 ${
                  done
                    ? 'bg-gradient-to-br from-cyan to-magenta text-white'
                    : current
                      ? 'bg-white text-ink'
                      : 'bg-white/10 text-paper/50'
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : s.step}
              </span>
              <span className={`text-sm transition-colors duration-500 ${done || current ? 'text-paper' : 'text-paper/50'}`}>
                {s.title}
              </span>
              {current && (
                <motion.span
                  layoutId="tracker-dot"
                  className="ml-auto h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_2px_rgba(10,174,236,0.7)]"
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Float({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean }) {
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 2.5, 0] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: 'easeInOut' }}
      className="drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
    >
      {children}
    </motion.div>
  );
}

/* Pure-SVG product mockups — no external images, nothing to break. */

function BizCard() {
  return (
    <svg width="150" height="100" viewBox="0 0 150 100" fill="none" style={{ transform: 'rotate(-12deg)' }} aria-hidden="true">
      <rect x="4" y="4" width="142" height="90" rx="8" fill="#FFFFFF" />
      <rect x="4" y="4" width="142" height="26" rx="8" fill="url(#bizg)" />
      <rect x="16" y="46" width="60" height="4" rx="2" fill="#1A1A1A" />
      <rect x="16" y="56" width="100" height="3" rx="1.5" fill="#BBB" />
      <rect x="16" y="63" width="80" height="3" rx="1.5" fill="#BBB" />
      <rect x="16" y="76" width="40" height="3" rx="1.5" fill="#E91E63" />
      <defs>
        <linearGradient id="bizg" x1="0" x2="1">
          <stop stopColor="#0AAEEC" />
          <stop offset="1" stopColor="#E91E63" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GiftBox() {
  return (
    <svg width="120" height="130" viewBox="0 0 130 140" fill="none" style={{ transform: 'rotate(8deg)' }} aria-hidden="true">
      <rect x="20" y="45" width="90" height="80" rx="8" fill="#E91E63" />
      <rect x="20" y="45" width="90" height="26" rx="8" fill="#C2185B" />
      <rect x="58" y="45" width="14" height="80" fill="#FFD600" />
      <path d="M50 45 C 40 20, 20 25, 40 40 C 45 44, 58 45, 58 45 Z" fill="#FFD600" />
      <path d="M80 45 C 90 20, 110 25, 90 40 C 85 44, 72 45, 72 45 Z" fill="#FFD600" />
    </svg>
  );
}

function Tag() {
  return (
    <svg width="110" height="82" viewBox="0 0 120 90" fill="none" style={{ transform: 'rotate(-8deg)' }} aria-hidden="true">
      <path d="M10 20 L 80 20 L 110 45 L 80 70 L 10 70 Z" fill="#FFD600" />
      <circle cx="26" cy="45" r="7" fill="#1A1A1A" />
      <rect x="40" y="38" width="40" height="4" rx="2" fill="#1A1A1A" />
      <rect x="40" y="48" width="28" height="4" rx="2" fill="#1A1A1A" opacity="0.6" />
    </svg>
  );
}
