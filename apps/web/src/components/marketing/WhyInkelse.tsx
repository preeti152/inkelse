'use client';

import { motion } from 'framer-motion';
import { Zap, Gem, Headset, Truck, Layers, Sparkles } from 'lucide-react';
import { WHY_INKELSE } from '@inkora/brand';
import { Stage } from '@/components/layout/Stage';
import { Reveal, SectionHeading, StaggerGroup, itemVariants } from '@/components/motion/Reveal';

const ICON_MAP: Record<string, typeof Zap> = {
  zap: Zap,
  gem: Gem,
  headset: Headset,
  truck: Truck,
  layers: Layers,
  sparkles: Sparkles,
};

/** Section — Why Inkelse: split header + a 3×2 hairline grid of reasons. */
export function WhyInkelse() {
  return (
    <Stage id="why" tone="sand">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-20 md:px-10 md:py-24 lg:grid-cols-12 lg:px-14">
        <SectionHeading className="lg:col-span-7" label="Why Inkelse" lines={['Why brands', 'choose us.']} />
        <Reveal delay={0.15} className="flex items-end lg:col-span-5">
          <p className="text-lg leading-relaxed text-coal/75">
            One accountable partner, an in-house design studio and production we check by hand — so every piece
            arrives exactly as approved.
          </p>
        </Reveal>
      </div>

      <StaggerGroup className="grid gap-px border-y border-coal/10 bg-coal/10 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_INKELSE.map((r, i) => {
          const Icon = ICON_MAP[r.icon] ?? Zap;
          return (
            <motion.div
              key={r.title}
              variants={itemVariants}
              className="group bg-sand p-8 transition-colors duration-500 hover:bg-sand-50 md:p-10"
            >
              <div className="flex items-start justify-between">
                <Icon className="h-8 w-8 text-coal transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1} />
                <span className="text-[11px] font-medium tracking-[0.2em] text-mute">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-10 text-2xl font-normal tracking-tight text-coal">{r.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-coal/70">{r.description}</p>
            </motion.div>
          );
        })}
      </StaggerGroup>
    </Stage>
  );
}
