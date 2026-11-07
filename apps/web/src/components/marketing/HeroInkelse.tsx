'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, PenTool, Printer, Package, Gift } from 'lucide-react';
import { BRAND, CONTACT } from '@inkora/brand';
import { MaskLines, EASE_OUT } from '@/components/motion/Reveal';

const PILLARS = [
  { icon: PenTool, label: 'Design' },
  { icon: Printer, label: 'Print' },
  { icon: Package, label: 'Packaging' },
  { icon: Gift, label: 'Corporate gifting' },
];

/**
 * Section 1 — Hero, composed like the brand board:
 * left — tagline, "Design. Print. Build Brands.", rule, subline, CTAs and the
 * four line-icon pillars; right — the full-bleed branded flat-lay photograph.
 */
export function HeroInkelse() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '8%']);

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  });

  return (
    <div ref={ref} className="relative bg-sand pt-20">
      <div className="studio-light paper relative grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12">
        {/* ── Copy ─────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col justify-center px-6 pb-14 pt-14 md:px-10 lg:col-span-5 lg:py-16 lg:pl-14 lg:pr-8 xl:pl-20">
          <motion.p {...fade(0)} className="label text-mute">
            {BRAND.description}
          </motion.p>

          <MaskLines
            as="h1"
            inView={false}
            delay={0.15}
            lines={['Design.', 'Print.', 'Build Brands.']}
            className="mt-8 text-[length:clamp(3.25rem,6.4vw,6.25rem)] font-normal leading-[1.02] tracking-[-0.025em] text-coal"
          />

          <motion.span {...fade(0.6)} className="rule mt-10 text-coal" />

          <motion.p {...fade(0.7)} className="mt-8 max-w-md text-lg leading-relaxed text-coal/75 md:text-xl">
            Premium branding, printing, packaging &amp; corporate gifting — designed in-house, delivered across India.
          </motion.p>

          <motion.div {...fade(0.8)} className="mt-10 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-dark group">
              Get a quote
              <ArrowRight className="arrow-nudge h-4 w-4" strokeWidth={1.5} />
            </Link>
            <Link href="/projects" className="btn-line">
              View our work
            </Link>
          </motion.div>

          {/* Pillars with vertical dividers */}
          <motion.ul {...fade(0.95)} className="mt-14 grid max-w-xl grid-cols-4 divide-x divide-coal/15">
            {PILLARS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-3 px-2 text-center first:pl-0 last:pr-0">
                <Icon className="h-7 w-7 text-coal" strokeWidth={1} />
                <span className="text-[10px] font-medium uppercase leading-snug tracking-[0.2em] text-coal/70 sm:text-[11px]">
                  {label}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.p {...fade(1.05)} className="mt-12 text-sm text-coal/60">
            inkelse.com <span className="mx-2 text-coal/30">·</span> {CONTACT.address.city}, {CONTACT.address.country}
          </motion.p>
        </div>

        {/* ── Flat-lay photograph ──────────────────────────── */}
        <motion.div
          initial={reduce ? false : { clipPath: 'inset(0 0 0 100%)' }}
          animate={{ clipPath: 'inset(0 0 0 0%)' }}
          transition={{ duration: 1.4, delay: 0.1, ease: EASE_OUT }}
          className="relative aspect-square overflow-hidden sm:aspect-[4/3] lg:col-span-7 lg:aspect-auto"
        >
          <motion.div
            style={{ y: imageY }}
            initial={reduce ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, delay: 0.1, ease: EASE_OUT }}
            className="absolute inset-[-4%_0]"
          >
            <Image
              src="/images/brand/hero-flatlay.jpg"
              alt="Inkelse branded stationery flat-lay: gift box, business cards, notebook, coffee cup, envelope with seal, swing tag and tote bag in matte black and stone."
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
