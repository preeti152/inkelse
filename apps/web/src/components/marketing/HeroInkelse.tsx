'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND, getWhatsAppUrl } from '@inkora/brand';
import { Container } from '@/components/layout/Container';

/**
 * Section 1 — Full-screen Hero.
 * Dark premium background with CMYK gradient wash, halftone dots, and gently
 * floating printed-product cards. Stable animations (no scroll-jank).
 */
export function HeroInkelse() {
  return (
    <div className="relative flex min-h-screen w-full items-center overflow-hidden bg-ink">
      {/* Background layers */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 12% 18%, rgba(10,174,236,0.40), transparent 60%),' +
              'radial-gradient(ellipse 45% 45% at 88% 28%, rgba(233,30,99,0.34), transparent 60%),' +
              'radial-gradient(ellipse 55% 45% at 65% 92%, rgba(255,214,0,0.24), transparent 60%),' +
              '#0F0F0F',
          }}
        />
        <div className="absolute inset-0 bg-halftone opacity-[0.12]" />
        <FloatingProducts />
      </div>

      <Container className="relative z-10 py-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-cyan" />
            <span className="text-xs font-semibold uppercase tracking-tracked-wide text-cyan">
              {BRAND.description}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-display-2xl uppercase tracking-tightest text-paper text-balance"
          >
            Everything your brand needs.{' '}
            <span className="text-cyan">Designed.</span>{' '}
            <span className="text-magenta">Printed.</span>{' '}
            <span className="text-yellow">Delivered.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-2xl text-lg text-paper/80 md:text-xl"
          >
            {BRAND.heroSubheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/#contact" className="btn-pill-cyan group">
              Get a quote
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
            <Link
              href="/projects"
              className="btn-pill bg-transparent text-paper ring-1 ring-paper/30 hover:bg-paper hover:text-ink"
            >
              View portfolio
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-paper/80 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
              WhatsApp us
            </a>
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-paper/60"
      >
        <span className="text-[10px] uppercase tracking-tracked-wide">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-0.5 bg-gradient-to-b from-paper/60 to-transparent"
        />
      </motion.div>
    </div>
  );
}

/**
 * Floating printed-product mockups (business card, box, flag, tag).
 * Pure SVG so they always render — no external images, nothing to break.
 */
function FloatingProducts() {
  const items = [
    { x: '6%',  y: '20%', delay: 0,   dur: 7, el: <BizCard /> },
    { x: '84%', y: '16%', delay: 0.6, dur: 8, el: <GiftBox /> },
    { x: '80%', y: '68%', delay: 1.2, dur: 6, el: <Flag /> },
    { x: '10%', y: '66%', delay: 1.8, dur: 9, el: <Tag /> },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: it.x, top: it.y }}
          animate={{ y: [0, -16, 0], rotate: [0, 3, 0] }}
          transition={{ duration: it.dur, delay: it.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="opacity-90 drop-shadow-2xl">{it.el}</div>
        </motion.div>
      ))}
    </div>
  );
}

function BizCard() {
  return (
    <svg width="150" height="100" viewBox="0 0 150 100" fill="none" style={{ transform: 'rotate(-10deg)' }}>
      <rect x="4" y="4" width="142" height="90" rx="6" fill="#FFFFFF" />
      <rect x="4" y="4" width="142" height="26" rx="6" fill="#0AAEEC" />
      <rect x="16" y="46" width="60" height="4" rx="2" fill="#1A1A1A" />
      <rect x="16" y="56" width="100" height="3" rx="1.5" fill="#AAA" />
      <rect x="16" y="63" width="80" height="3" rx="1.5" fill="#AAA" />
      <rect x="16" y="76" width="40" height="3" rx="1.5" fill="#E91E63" />
    </svg>
  );
}

function GiftBox() {
  return (
    <svg width="130" height="140" viewBox="0 0 130 140" fill="none" style={{ transform: 'rotate(8deg)' }}>
      <rect x="20" y="45" width="90" height="80" rx="6" fill="#E91E63" />
      <rect x="20" y="45" width="90" height="26" rx="6" fill="#C2185B" />
      <rect x="58" y="45" width="14" height="80" fill="#FFD600" />
      <path d="M50 45 C 40 20, 20 25, 40 40 C 45 44, 58 45, 58 45 Z" fill="#FFD600" />
      <path d="M80 45 C 90 20, 110 25, 90 40 C 85 44, 72 45, 72 45 Z" fill="#FFD600" />
    </svg>
  );
}

function Flag() {
  return (
    <svg width="90" height="160" viewBox="0 0 90 160" fill="none">
      <rect x="42" y="10" width="4" height="145" rx="2" fill="#1A1A1A" />
      <path d="M46 12 C 70 18, 80 6, 88 14 L 88 70 C 80 62, 70 74, 46 68 Z" fill="#0AAEEC" />
      <path d="M46 30 C 66 35, 76 26, 84 32" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.6" />
    </svg>
  );
}

function Tag() {
  return (
    <svg width="120" height="90" viewBox="0 0 120 90" fill="none" style={{ transform: 'rotate(12deg)' }}>
      <path d="M10 20 L 80 20 L 110 45 L 80 70 L 10 70 Z" fill="#FFD600" />
      <circle cx="26" cy="45" r="7" fill="#1A1A1A" />
      <rect x="40" y="38" width="40" height="4" rx="2" fill="#1A1A1A" />
      <rect x="40" y="48" width="28" height="4" rx="2" fill="#1A1A1A" opacity="0.6" />
    </svg>
  );
}
